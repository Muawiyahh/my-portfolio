import { after } from "next/server";
import { createHash } from "node:crypto";

/**
 * Meta Conversions API relay for the lead gen pages.
 * The browser Pixel and this route send the same event with the same event_id;
 * Meta keeps one, and this copy still arrives when ad blockers stop the Pixel.
 *
 * Env: NEXT_PUBLIC_META_PIXEL_ID, META_CAPI_TOKEN, optional META_TEST_EVENT_CODE, META_GRAPH_VERSION.
 * Without the first two it does nothing (204), so the page works before tracking is set up.
 */

const EVENTS = new Set(["Lead"]);
const GRAPH_VERSION = process.env.META_GRAPH_VERSION ?? "v25.0";

const hits = new Map<string, number[]>();
function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 10 * 60_000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 20;
}

const sha256 = (value: string) => createHash("sha256").update(value).digest("hex");
const str = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

function normalizePhone(raw: string, market: string) {
  let digits = raw.replace(/\D/g, "");
  if (!digits || digits.length < 7) return "";
  if (market === "us" && digits.length === 10) digits = `1${digits}`;
  if (market === "uk" && digits.startsWith("0")) digits = `44${digits.slice(1)}`;
  return digits;
}

function readCookie(header: string | null, name: string) {
  const match = header?.match(new RegExp(`(?:^|;\\s*)${name}=([^;]+)`));
  return match ? decodeURIComponent(match[1]) : undefined;
}

export async function POST(req: Request) {
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
  const token = process.env.META_CAPI_TOKEN;
  if (!pixelId || !token) return new Response(null, { status: 204 });

  // Only accept events from our own pages.
  const origin = req.headers.get("origin");
  const host = req.headers.get("host");
  if (origin && host && new URL(origin).host !== host) return new Response(null, { status: 403 });

  const ip = (
    req.headers.get("x-nf-client-connection-ip") ??
    req.headers.get("x-forwarded-for")?.split(",")[0] ??
    req.headers.get("x-real-ip") ??
    ""
  ).trim();
  if (limited(ip || "unknown")) return new Response(null, { status: 429 });

  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return new Response(null, { status: 400 });
  }

  const event = str(body.event, 20);
  const eventId = str(body.eventId, 100);
  const sourceUrl = str(body.sourceUrl, 500);
  const market = str(body.market, 4) === "uk" ? "uk" : "us";
  if (!EVENTS.has(event) || !eventId || !sourceUrl.startsWith("http")) return new Response(null, { status: 400 });

  const email = str(body.email, 200).toLowerCase();
  const phone = normalizePhone(str(body.phone, 30), market);
  const firstName = str(body.firstName, 60).toLowerCase();

  const cookieHeader = req.headers.get("cookie");
  const fbp = readCookie(cookieHeader, "_fbp");
  let fbc = readCookie(cookieHeader, "_fbc");
  if (!fbc) {
    const fbclid = new URL(sourceUrl).searchParams.get("fbclid");
    if (fbclid) fbc = `fb.1.${Date.now()}.${fbclid}`;
  }

  const userData: Record<string, unknown> = {
    client_ip_address: ip || undefined,
    client_user_agent: req.headers.get("user-agent") ?? undefined,
    fbp,
    fbc,
    country: [sha256(market === "uk" ? "gb" : "us")],
  };
  if (email) {
    userData.em = [sha256(email)];
    userData.external_id = [sha256(email)];
  }
  if (phone) userData.ph = [sha256(phone)];
  if (firstName) userData.fn = [sha256(firstName)];

  const payload: Record<string, unknown> = {
    data: [
      {
        event_name: event,
        event_time: Math.floor(Date.now() / 1000),
        event_id: eventId,
        event_source_url: sourceUrl,
        action_source: "website",
        user_data: userData,
        custom_data: { content_name: `lead-page-${market}` },
      },
    ],
    access_token: token,
  };
  if (process.env.META_TEST_EVENT_CODE) payload.test_event_code = process.env.META_TEST_EVENT_CODE;

  // Answer the browser straight away; talk to Meta after the response.
  after(async () => {
    try {
      const res = await fetch(`https://graph.facebook.com/${GRAPH_VERSION}/${pixelId}/events`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) console.error("[meta-capi]", res.status, (await res.text()).slice(0, 500));
    } catch (err) {
      console.error("[meta-capi]", err);
    }
  });

  return new Response(null, { status: 202 });
}
