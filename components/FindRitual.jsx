"use client";
import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Bottle from "./Bottle";
import Button from "./Button";

/* Product names come from ritual.com; descriptions are neutral placeholders — confirm with your regulatory team. */
const STAGES = [
  {
    id: "women",
    label: "Women",
    color: "#FFCB2E",
    items: [
      { name: "Essential for Women", when: "Morning, with food", desc: "A daily multivitamin in a clear, delayed-release capsule.", tone: "#3346FF", shape: "bottle" },
      { name: "Synbiotic+", when: "Morning", desc: "Gut health support in one daily capsule.", tone: "#101A4A", shape: "jar" },
      { name: "Magnesium+", when: "Evening", desc: "A magnesium drink for your wind-down.", tone: "#FF7A59", shape: "glass" },
    ],
  },
  {
    id: "men",
    label: "Men",
    color: "#7EE0B5",
    items: [
      { name: "Essential for Men", when: "Morning, with food", desc: "A daily multivitamin in a clear, delayed-release capsule.", tone: "#101A4A", shape: "bottle" },
      { name: "Synbiotic+", when: "Morning", desc: "Gut health support in one daily capsule.", tone: "#3346FF", shape: "jar" },
      { name: "Magnesium+", when: "Evening", desc: "A magnesium drink for your wind-down.", tone: "#8D77F0", shape: "glass" },
    ],
  },
  {
    id: "pregnancy",
    label: "Pregnancy",
    color: "#FF9B7B",
    items: [
      { name: "Essential Prenatal", when: "Morning, with food", desc: "A daily prenatal multivitamin in a clear capsule.", tone: "#3346FF", shape: "bottle" },
      { name: "Natalbiotic", when: "Morning", desc: "Microbiome support for mom.", tone: "#101A4A", shape: "jar" },
      { name: "Choline", when: "Any time", desc: "Mom-to-baby support.", tone: "#8D77F0", shape: "bottle" },
    ],
  },
  {
    id: "peri",
    label: "Perimenopause",
    color: "#B9A6FF",
    items: [
      { name: "Essential for Women", when: "Morning, with food", desc: "A daily multivitamin in a clear, delayed-release capsule.", tone: "#101A4A", shape: "bottle" },
      { name: "Magnesium+", when: "Evening", desc: "A magnesium drink for your wind-down.", tone: "#3346FF", shape: "glass" },
      { name: "Hyacera", when: "Any time", desc: "Skin hydration support.", tone: "#FF7A59", shape: "jar" },
    ],
  },
];

const OFFSETS = ["0px", "36px", "12px"];

export default function FindRitual() {
  const [active, setActive] = useState(0);
  const tabRefs = useRef([]);
  const stage = STAGES[active];

  const handleTabKeyDown = (event, index) => {
    let nextIndex;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      nextIndex = (index + 1) % STAGES.length;
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      nextIndex = (index - 1 + STAGES.length) % STAGES.length;
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = STAGES.length - 1;
    } else {
      return;
    }

    event.preventDefault();
    setActive(nextIndex);
    tabRefs.current[nextIndex]?.focus();
  };

  return (
    <section id="stages" className="px-5 pb-20 md:px-10 md:pb-28">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div className="lg:pt-6">
          <h2 className="max-w-[12ch] font-display text-[clamp(2.2rem,4.6vw,4rem)] font-semibold leading-[0.98] tracking-[-0.04em]">
            Built for where you are right now.
          </h2>
          <p className="mt-4 max-w-[34ch] text-base leading-snug text-ink/70 sm:text-lg">
            Pick a stage and see the daily stack that fits it.
          </p>

          <div role="tablist" aria-label="Life stage" className="mt-7 grid grid-cols-2 gap-1 sm:flex sm:gap-2 sm:overflow-x-auto sm:pb-2 lg:flex-col lg:gap-1 lg:overflow-visible">
            {STAGES.map((s, i) => {
              const on = i === active;
              return (
                <button
                  key={s.id}
                  role="tab"
                  id={`tab-${s.id}`}
                  aria-selected={on}
                  aria-controls="stage-panel"
                  tabIndex={on ? 0 : -1}
                  onClick={() => setActive(i)}
                  onKeyDown={(event) => handleTabKeyDown(event, i)}
                  ref={(element) => {
                    tabRefs.current[i] = element;
                  }}
                  className={`relative flex min-w-0 items-center gap-2 rounded-full py-2 pl-2 pr-2 text-left font-display text-[1.2rem] font-semibold tracking-[-0.03em] transition-colors sm:shrink-0 sm:gap-3 sm:pl-3 sm:pr-5 sm:text-[1.7rem] lg:text-[2.4rem] ${
                    on ? "text-ink" : "text-ink/35 hover:text-ink/70"
                  }`}
                >
                  <span className="relative grid h-4 w-4 place-items-center">
                    {on && (
                      <motion.span
                        layoutId="stage-dot"
                        className="absolute inset-0 rounded-full"
                        style={{ backgroundColor: stage.color }}
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span className={`h-2 w-2 rounded-full ${on ? "bg-ink" : "bg-ink/25"}`} />
                  </span>
                  {s.label}
                </button>
              );
            })}
          </div>
        </div>

        <motion.div
          id="stage-panel"
          role="tabpanel"
          aria-labelledby={`tab-${stage.id}`}
          animate={{ backgroundColor: stage.color }}
          initial={false}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-[32px] p-5 md:rounded-[44px] md:p-10"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={stage.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.15 } }}
              className="grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-4"
            >
              {stage.items.map((it, i) => (
                <div key={it.name + i} style={{ "--o": OFFSETS[i] }} className="sm:translate-y-[var(--o)]">
                  <motion.article
                    initial={{ opacity: 0, y: 36, rotate: i === 1 ? 2 : -2 }}
                    animate={{ opacity: 1, y: 0, rotate: 0 }}
                    transition={{ delay: 0.05 + i * 0.08, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className="flex flex-row items-center gap-5 sm:flex-col sm:items-start sm:gap-4"
                  >
                    <Bottle color={it.tone} shape={it.shape} className="h-36 w-auto shrink-0 sm:h-52" />
                    <div>
                      <span className="inline-block rounded-full bg-white/70 px-3 py-1 text-[13px] font-medium">{it.when}</span>
                      <h3 className="mt-3 font-display text-2xl font-semibold leading-none tracking-[-0.03em]">{it.name}</h3>
                      <p className="mt-2 max-w-[26ch] text-[15px] leading-snug text-ink/75">{it.desc}</p>
                    </div>
                  </motion.article>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>

          <div className="mt-10 flex flex-wrap items-center gap-3 sm:mt-14">
            <Button href="#offer" variant="ink">
              See the offer
            </Button>
            <span className="text-sm text-ink/70">Save up to 30% on new subscriptions.</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
