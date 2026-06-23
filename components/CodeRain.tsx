"use client";
import { useEffect, useRef } from "react";
import { useScroll } from "framer-motion";

const SYMBOLS = ["<", ">", "/", "{", "}", ";", "=", "(", ")", "=>", "*/", "/*"];
const GOLD = "#C9A84C";

interface Particle {
  x: number;
  y: number;
  symbol: string;
  speed: number;
  alpha: number;
  size: number;
}

function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

function makeParticle(canvasWidth: number, canvasHeight: number): Particle {
  return {
    x: Math.random() * canvasWidth,
    y: Math.random() * canvasHeight,
    symbol: SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
    speed: 0.4 + Math.random() * 0.4,
    alpha: 0.15 + Math.random() * 0.3,
    size: 11 + Math.floor(Math.random() * 5),
  };
}

export default function CodeRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { scrollY } = useScroll();
  const scrollRef = useRef(0);

  useEffect(() => {
    const unsubscribe = scrollY.on("change", (v) => {
      scrollRef.current = v;
    });
    return unsubscribe;
  }, [scrollY]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let rafId: number;
    let particles: Particle[] = [];

    function resize() {
      if (!canvas) return;
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      const count = window.innerWidth >= 768 ? 120 : 80;
      particles = Array.from({ length: count }, () =>
        makeParticle(canvas.width, canvas.height)
      );
    }

    function draw() {
      if (!canvas || !ctx) return;
      const { width, height } = canvas;
      const scrollFactor = Math.min(1, scrollRef.current / (window.innerHeight || height));
      const speedMult = 1 + scrollFactor * 2.5;
      const drift = scrollFactor * 1.2;

      ctx.clearRect(0, 0, width, height);
      ctx.font = `${12}px monospace`;

      for (const p of particles) {
        const fadeTop = smoothstep(0, 80, p.y);
        const fadeBottom = smoothstep(height, height - 80, p.y);
        const alpha = p.alpha * fadeTop * fadeBottom;

        ctx.globalAlpha = alpha;
        ctx.fillStyle = GOLD;
        ctx.font = `${p.size}px monospace`;
        ctx.fillText(p.symbol, p.x, p.y);

        p.y += p.speed * speedMult;
        p.x += drift;

        if (p.y > height + 20 || p.x > width + 20) {
          p.y = -20;
          p.x = Math.random() * width;
          p.symbol = SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
        }
      }

      ctx.globalAlpha = 1;
      rafId = requestAnimationFrame(draw);
    }

    resize();
    window.addEventListener("resize", resize);
    rafId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 w-full h-full"
    />
  );
}
