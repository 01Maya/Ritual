"use client";
import { useRef } from "react";
import { useMotionValue, useReducedMotion, useScroll, useTransform, motion } from "framer-motion";
import CapsuleScene from "./CapsuleScene";
import Button from "./Button";

export default function Offer() {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const closed = useMotionValue(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const rotate = useTransform(scrollYProgress, [0, 1], reduce ? [-12, -12] : [-34, 8]);
  const x = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [-60, 60]);

  return (
    <section id="offer" ref={ref} className="px-3 pb-3 md:px-6 md:pb-6">
      <div data-reveal="scale" className="relative overflow-hidden rounded-[36px] bg-sun px-6 py-20 sm:py-24 md:rounded-[56px] md:px-14 md:py-36">
        <div className="relative z-10 max-w-3xl">
          <h2 data-text-reveal="heading" className="font-display text-[clamp(2.8rem,8vw,7rem)] font-semibold leading-[0.9] tracking-[-0.05em]">
            Start with one capsule a day.
          </h2>
          <p data-text-reveal="copy" className="mt-6 max-w-[40ch] text-lg leading-snug text-ink/80">
            Save up to 30% on your first subscription. Explore the formulas designed for your daily needs.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Button href="#stages" variant="ink">
              Find your formula
            </Button>
          </div>
          <p className="mt-10 max-w-[62ch] text-[13px] leading-snug text-ink/65">
            Offer valid for new customers on a first subscription order only. Subscriptions renew at full retail price until you cancel.
          </p>
        </div>

        <motion.div
          aria-hidden="true"
          style={{ rotate, x }}
          className="pointer-events-none absolute -bottom-10 -right-24 w-[420px] opacity-90 md:-right-10 md:bottom-4 md:w-[640px] lg:w-[760px]"
        >
          <CapsuleScene progress={closed} beadCount={40} />
        </motion.div>
      </div>
    </section>
  );
}
