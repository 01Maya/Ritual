"use client";
import { useState } from "react";
import { AnimatePresence, motion, useMotionValue, useTransform } from "framer-motion";
import CapsuleScene from "./CapsuleScene";

const ZONES = [
  { id: "mouth", name: "Swallow", size: "20%", title: "Easy to take", text: "One clear capsule, once a day." },
  { id: "stomach", name: "Stomach", size: "40%", title: "Stays sealed", text: "Built to hold together through stomach acid, so what's inside arrives intact." },
  { id: "gut", name: "Small intestine", size: "40%", title: "Opens here", text: "Delayed release lets the beads out where nutrients are absorbed." },
];

const FACTS = [
  { title: "University-led clinical studies", text: "Formulas are tested with academic partners, and the results are public." },
  { title: "Patented capsule design", text: "A clear, delayed-release capsule you can see into." },
  { title: "Independent testing", text: "Every lot is checked by a third-party lab before it ships." },
];

function zoneIndex(v) {
  if (v < 20) return 0;
  if (v < 60) return 1;
  return 2;
}

export default function Science() {
  const [val, setVal] = useState(8);
  const v = useMotionValue(8);
  const open = useTransform(v, [60, 100], [0.1, 0.95]);
  const left = useTransform(v, (x) => `calc(14px + (100% - 28px) * ${x / 100})`);
  const zone = ZONES[zoneIndex(val)];

  return (
    <section id="science" className="on-dark overflow-hidden bg-ink px-5 py-16 text-white md:px-10 md:py-24">
      <div className="mx-auto max-w-6xl" data-reveal>
        <h2 data-text-reveal="heading" className="max-w-[16ch] font-display text-[clamp(2.4rem,5.6vw,5rem)] font-semibold leading-[0.96] tracking-[-0.045em]">
          Designed to open where it counts.
        </h2>
        <p data-text-reveal="copy" className="mt-4 max-w-[48ch] text-lg leading-snug text-white/70">
          Drag the capsule along its trip. Illustration, not to scale.
        </p>

        <div className="mt-8 px-12 md:mt-12 md:px-28">
          <div className="relative h-[120px] md:h-[160px]">
            <motion.div style={{ left }} className="absolute bottom-0 -ml-[100px] w-[200px] md:-ml-[170px] md:w-[340px]">
              <CapsuleScene progress={open} beadCount={26} />
            </motion.div>
          </div>

          <div className="relative h-8">
            <div className="absolute inset-x-0 top-1/2 flex h-3 -translate-y-1/2 overflow-hidden rounded-full">
              <div className="h-full bg-white/20" style={{ width: "20%" }} />
              <div className="h-full bg-coral/70" style={{ width: "40%" }} />
              <div className="h-full bg-mint/70" style={{ width: "40%" }} />
            </div>
            <input
              type="range"
              min={0}
              max={100}
              step={1}
              value={val}
              aria-label="Follow the capsule through digestion"
              aria-valuetext={`${zone.name}: ${zone.title}`}
              className="follow-range absolute inset-0"
              onChange={(e) => {
                const n = Number(e.target.value);
                setVal(n);
                v.set(n);
              }}
            />
          </div>

          <div className="mt-3 flex text-sm">
            {ZONES.map((z, i) => (
              <span
                key={z.id}
                style={{ width: z.size }}
                className={`transition-colors ${zoneIndex(val) === i ? "font-medium text-sun" : "text-white/50"}`}
              >
                {z.name}
              </span>
            ))}
          </div>

          <div className="mt-6 h-36 md:h-32" aria-live="polite">
            <AnimatePresence mode="wait">
              <motion.div
                key={zone.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8, transition: { duration: 0.12 } }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="font-display text-3xl font-semibold tracking-[-0.03em] md:text-5xl">{zone.title}</p>
                <p className="mt-2 max-w-[50ch] text-lg leading-snug text-white/70">{zone.text}</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <ul className="mt-12 grid border-t border-white/15 md:mt-16 md:grid-cols-3">
          {FACTS.map((f, i) => (
            <li key={f.title} className={`hover-lift border-b border-white/15 py-6 md:border-b-0 md:py-8 md:pr-8 ${i > 0 ? "md:border-l md:pl-8" : ""}`}>
              <h3 data-text-reveal="heading" className="font-display text-2xl font-semibold leading-tight tracking-[-0.03em]">{f.title}</h3>
              <p data-text-reveal="copy" className="mt-3 max-w-[32ch] leading-snug text-white/65">{f.text}</p>
            </li>
          ))}
        </ul>
        <p className="mt-8 text-sm text-white/45">Individual results vary.</p>
      </div>
    </section>
  );
}
