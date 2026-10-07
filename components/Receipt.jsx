"use client";
import { motion, useReducedMotion } from "framer-motion";

/* Sample data for illustration — swap in real lot / sourcing records. */
const INGREDIENTS = [
  ["Vitamin D3", "lichen"],
  ["Omega-3 DHA", "microalgae"],
  ["Vitamin E", "sunflower"],
  ["Vitamin K2", "fermentation"],
  ["Folate", "L-5-MTHF"],
  ["Magnesium", "mineral"],
];
const TESTS = ["Heavy metals", "Microbial", "Identity"];

export default function Receipt() {
  const reduce = useReducedMotion();

  return (
    <section id="receipt" className="px-5 pb-20 pt-16 md:px-10 md:pb-28 md:pt-0">
      <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2 md:gap-16">
        <div>
          <h2 data-text-reveal="heading" className="font-display text-[clamp(2.4rem,5vw,4.4rem)] font-semibold leading-[0.96] tracking-[-0.045em]">
            Every ingredient comes with a receipt.
          </h2>
          <p data-text-reveal="copy" className="mt-6 max-w-[44ch] text-lg leading-snug text-ink/70">
            Made Traceable means each ingredient is named, sourced, and tested, so you can follow what's in your capsule back to where it started.
          </p>
        </div>

        <div className="perspective-[1000px] drop-shadow-[0_28px_28px_rgba(16,26,74,0.18)]">
          <motion.div
            initial={reduce ? false : { rotateX: -78, scaleY: 0.08, y: -12, opacity: 0 }}
            whileInView={{ rotateX: 0, scaleY: 1, y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 1.25, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: "top center" }}
            className="mx-auto w-full max-w-100 rotate-2"
          >
            <div className="bg-white px-6 pb-3 pt-8 font-mono text-[13px] leading-6 text-ink">
              <p className="text-center text-base font-medium tracking-[0.2em]">RITUAL</p>
              <p className="text-center text-ink/60">Essential for Women</p>
              <p className="text-center text-ink/60">Lot A4291 · sample receipt</p>

              <hr className="my-4 border-t border-dashed border-ink/30" />

              <div className="grid grid-cols-[1fr_auto_auto] gap-x-3">
                {INGREDIENTS.map(([name, src]) => (
                  <div key={name} className="contents">
                    <span>{name}</span>
                    <span className="text-ink/60">{src}</span>
                    <span className="text-right">PASS</span>
                  </div>
                ))}
              </div>

              <hr className="my-4 border-t border-dashed border-ink/30" />

              <div className="grid grid-cols-[1fr_auto] gap-x-3">
                {TESTS.map((t) => (
                  <div key={t} className="contents">
                    <span>{t}</span>
                    <span className="text-right">PASS</span>
                  </div>
                ))}
              </div>

              <hr className="my-4 border-t border-dashed border-ink/30" />

              <p className="text-center">Every listed ingredient traced.</p>
              <div
                aria-hidden="true"
                className="mx-auto mt-4 h-12 w-4/5"
                style={{
                  background:
                    "repeating-linear-gradient(90deg,#101A4A 0 2px,transparent 2px 4px,#101A4A 4px 5px,transparent 5px 9px,#101A4A 9px 12px,transparent 12px 14px)",
                }}
              />
              <p className="mt-3 text-center text-ink/60">Thanks for reading your label.</p>
            </div>
            <div aria-hidden="true" className="zig-bottom" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
