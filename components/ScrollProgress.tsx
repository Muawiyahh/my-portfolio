"use client";
import { motion, useScroll, useSpring } from "framer-motion";

/** Thin gradient bar at the top that fills as you scroll the page. */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.3,
  });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 z-[110] h-[3px] origin-left bg-gradient-to-r from-accent to-accent2"
    />
  );
}
