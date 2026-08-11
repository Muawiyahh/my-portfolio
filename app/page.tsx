import Intro from "@/components/Intro";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import Grain from "@/components/Grain";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Projects from "@/components/Projects";
import Booking from "@/components/Booking";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Intro />
      <SmoothScroll />
      <CustomCursor />
      <Grain />
      <main>
        <Hero />
        <About />
        <Services />
        <Projects />
        <Booking />
        <Contact />
      </main>
    </>
  );
}
