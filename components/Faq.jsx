"use client";
import { useState } from "react";

const ITEMS = [
  { q: "What does “Made Traceable” mean?", a: "Each ingredient is named on the label with where it comes from, so you can follow what's in your capsule back to its source." },
  { q: "Why a clear capsule?", a: "So you can see what you're taking. The beads inside are the ingredients, with nothing hidden behind an opaque shell." },
  { q: "When should I take it?", a: "Most Ritual capsules are taken once a day. Follow the label for whether to take it with food." },
  { q: "Is Ritual right for pregnancy or perimenopause?", a: "Ritual makes formulas for both stages. As with any supplement, check with your healthcare provider before you start." },
  { q: "How do I choose a formula?", a: "Choose a life stage in Find yours to see a sample daily stack." },
  { q: "How does the welcome offer work?", a: "New customers save up to 30% on a first subscription order. Subscriptions renew at full retail price until you cancel." },
];

export default function Faq() {
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" className="px-5 py-20 md:px-10 md:py-28">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[0.8fr_1.2fr] md:gap-16">
        <div>
          <h2 data-text-reveal="heading" className="font-display text-[clamp(2.2rem,4.6vw,4rem)] font-semibold leading-[0.98] tracking-[-0.04em]">
            Questions, answered.
          </h2>
          <p data-text-reveal="copy" className="mt-5 text-lg text-ink/70">
            Need more?{" "}
            <a className="font-medium underline decoration-ultra decoration-2 underline-offset-4 hover:text-ultra" href="#manifesto">
              Read our story
            </a>
            .
          </p>
        </div>

        <ul className="border-t border-ink/15">
          {ITEMS.map((it, i) => {
            const isOpen = open === i;
            return (
              <li key={it.q} className="border-b border-ink/15">
                <h3>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`faq-${i}`}
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    className="flex w-full items-center justify-between gap-6 py-6 text-left font-display text-xl font-medium tracking-[-0.02em] md:text-2xl"
                  >
                    {it.q}
                    <span
                      aria-hidden="true"
                      className={`grid h-9 w-9 shrink-0 place-items-center rounded-full ring-1 ring-ink/20 transition-all duration-300 ${
                        isOpen ? "rotate-45 bg-ink text-white" : ""
                      }`}
                    >
                      <svg width="14" height="14" viewBox="0 0 14 14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
                        <path d="M7 1v12M1 7h12" />
                      </svg>
                    </span>
                  </button>
                </h3>
                <div
                  id={`faq-${i}`}
                  role="region"
                  aria-hidden={!isOpen}
                  inert={!isOpen}
                  className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(.22,1,.36,1)] ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="max-w-[56ch] pb-6 text-lg leading-snug text-ink/70">{it.a}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
