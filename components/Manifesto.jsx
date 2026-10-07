"use client";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

const TEXT =
  "Our radical idea: supplements should work. From university-led clinical studies to patented capsule design, every Ritual formula is built for efficacy, and the proof is published for anyone to read.";

function Word({ children, p, start, end, reduce }) {
  const o = useTransform(p, [start, end], [0.16, 1]);
  return (
    <motion.span style={{ opacity: reduce ? 1 : o }} className="mr-[0.26em] inline-block">
      {children}
    </motion.span>
  );
}

export default function Manifesto() {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.55"] });
  const words = TEXT.split(" ");
  const n = words.length;

  return (
    <section id="manifesto" ref={ref} className="px-5 py-20 md:px-10 md:py-32">
      <div className="mx-auto max-w-5xl">
        <p className="font-display text-[clamp(1.9rem,4.6vw,4rem)] font-medium leading-[1.08] tracking-[-0.025em]">
          {words.map((w, i) => (
            <Word key={i} p={scrollYProgress} start={(i / n) * 0.85} end={(i / n) * 0.85 + 0.1} reduce={reduce}>
              {w}
            </Word>
          ))}
        </p>
        <a
          href="#science"
          className="mt-10 inline-block text-lg font-medium underline decoration-ultra decoration-2 underline-offset-8 transition-colors hover:text-ultra"
        >
          Explore the science
        </a>
      </div>
    </section>
  );
}
