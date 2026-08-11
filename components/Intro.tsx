"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// The three words that drop in on load. Easy to change.
const words = ["Design.", "Build.", "Ship."];

export default function Intro() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setShow(false), 2400);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[120] flex items-center justify-center bg-cream"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="text-center px-6">
            {words.map((w, i) => (
              <motion.span
                key={w}
                initial={{ opacity: 0, y: -44 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 0.2 + i * 0.45,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="display block text-6xl md:text-8xl lg:text-9xl leading-[0.95] text-ink"
              >
                {w}
              </motion.span>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
