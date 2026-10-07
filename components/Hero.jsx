"use client";
import { useRef } from "react";
import { motion, useMotionValue, useReducedMotion, useScroll, useTransform } from "framer-motion";
import CapsuleScene from "./CapsuleScene";
import Button from "./Button";

/* Illustrative ingredient labels — replace with your real formula data. */
const LABELS = [
  { name: "Vitamin D3", src: "from lichen", l: "7%", t: "56%" },
  { name: "Omega-3 DHA", src: "from microalgae", l: "73%", t: "50%" },
  { name: "Vitamin K2", src: "by fermentation", l: "3%", t: "78%" },
  { name: "Folate", src: "as L-5-MTHF", l: "79%", t: "76%" },
];

function Label({ item, i, p }) {
  const s = 0.62 + i * 0.05;
  const opacity = useTransform(p, [s, s + 0.1], [0, 1]);
  const y = useTransform(p, [s, s + 0.1], [16, 0]);
  return (
    <motion.li
      style={{ opacity, y, "--l": item.l, "--t": item.t }}
      className="rounded-2xl border border-white/20 bg-white/10 px-4 py-3 backdrop-blur-md md:absolute md:left-[var(--l)] md:top-[var(--t)]"
    >
      <p className="font-display text-base font-semibold leading-tight">{item.name}</p>
      <p className="text-sm text-white/70">{item.src}</p>
    </motion.li>
  );
}

const line = {
  hidden: { y: "110%" },
  show: (i) => ({ y: "0%", transition: { duration: 1.1, delay: 0.5 + i * 0.12, ease: [0.22, 1, 0.36, 1] } }),
};

export default function Hero() {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const fixed = useMotionValue(0.85);
  const p = reduce ? fixed : scrollYProgress;

  const aOpacity = useTransform(p, [0, 0.2, 0.36], [1, 1, 0]);
  const aY = useTransform(p, [0.2, 0.4], [0, -80]);
  const aEvents = useTransform(p, (v) => (v < 0.3 ? "auto" : "none"));
  const bOpacity = useTransform(p, [0.56, 0.7], [0, 1]);
  const bY = useTransform(p, [0.56, 0.7], [30, 0]);
  const rotate = useTransform(p, [0, 1], [-10, -3]);
  const scale = useTransform(p, [0, 0.5, 1], [1, 1.04, 0.94]);
  const hint = useTransform(p, [0, 0.08], [1, 0]);

  return (
    <section id="ritual" ref={ref} className={`on-blue relative ${reduce ? "h-[100svh]" : "h-[320svh]"}`} aria-label="Introduction">
      <div className="sticky top-0 h-[100svh] overflow-hidden bg-[radial-gradient(70%_70%_at_50%_75%,#5163FF_0%,#3346FF_55%,#2736D6_100%)] text-white">
        {/* text layers share one grid cell */}
        <div className="relative z-20 grid px-5 pt-[calc(144px+9svh)] md:px-10 md:pt-[136px]">
          <motion.div
            style={{ opacity: aOpacity, y: aY, pointerEvents: aEvents }}
            className="col-start-1 row-start-1 grid gap-6 md:grid-cols-12 md:gap-8"
          >
            <h1 className="font-display text-[clamp(2.9rem,8.2vw,7.4rem)] font-semibold leading-[0.92] tracking-[-0.045em] md:col-span-8">
              <span className="block overflow-hidden pb-[0.08em]">
                <motion.span className="block" variants={line} custom={0} initial="hidden" animate="show">
                  Supplements that
                </motion.span>
              </span>
              <span className="block overflow-hidden pb-[0.08em]">
                <motion.span className="block" variants={line} custom={1} initial="hidden" animate="show">
                  show their work.
                </motion.span>
              </span>
            </h1>
            <motion.div
              className="flex flex-col gap-6 md:col-span-4 md:self-end md:pb-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="max-w-[34ch] text-lg leading-snug text-white/85">
                Clear capsules. Named ingredients. Clinical studies you can read.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button href="#stages" variant="sun">
                  Find your Ritual
                </Button>
                <Button href="#science" variant="ghost">
                  How it works
                </Button>
              </div>
            </motion.div>
          </motion.div>

          <motion.div style={{ opacity: bOpacity, y: bY }} className="pointer-events-none col-start-1 row-start-1 mt-0 w-full min-w-0 md:max-w-[52%]">
            <p className="w-full max-w-full font-display text-[clamp(2rem,5vw,4.2rem)] font-semibold leading-[1] tracking-[-0.04em]">
              Open one up. Every ingredient has a name, a source, and a test result.
            </p>
          </motion.div>
        </div>

        {/* capsule */}
        <div className="absolute inset-x-0 bottom-[calc(160px-9svh)] z-10 flex justify-center md:-bottom-[4svh]">
          <motion.div style={{ rotate, scale }} className="w-[135vw] shrink-0 md:w-[min(1200px,92vw,110svh)]">
            <CapsuleScene progress={p} intro beadCount={46} />
          </motion.div>
        </div>

        {/* ingredient labels */}
        <ul className="absolute inset-x-4 top-[calc(144px+9svh+clamp(5.8rem,16.4vw,14.8rem)+36px)] z-20 grid grid-cols-2 gap-2 md:static md:block">
          {LABELS.map((item, i) => (
            <Label key={item.name} item={item} i={i} p={p} />
          ))}
        </ul>

        {/* scroll hint */}
        <motion.div
          style={{ opacity: hint }}
          className="pointer-events-none absolute bottom-6 left-1/2 z-20 hidden -translate-x-1/2 flex-col items-center gap-2 text-sm text-white/80 md:flex"
        >
          Scroll to open one
          <span className="drip block h-10 w-px bg-white/80" />
        </motion.div>
      </div>
    </section>
  );
}
