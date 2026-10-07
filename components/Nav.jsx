"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import Button from "./Button";
import Logo from "./Logo";

const LINKS = [
  { label: "The ritual", href: "#ritual" },
  { label: "Find yours", href: "#stages" },
  { label: "Science", href: "#science" },
  { label: "Voices", href: "#voices" },
  { label: "FAQ", href: "#faq" },
];

const SECTION_IDS = ["ritual", "stages", "science", "voices", "faq"];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("ritual");
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 60], [0, -36]);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  const scrollToSection = (event, id) => {
    event.preventDefault();
    const section = document.getElementById(id);
    if (section) {
      if (window.__ritualLenis) {
        window.__ritualLenis.scrollTo(section, { offset: -112 });
      } else {
        section.scrollIntoView({ behavior: "auto", block: "start" });
      }
    }
    window.history.replaceState(null, "", `#${id}`);
    setActiveSection(id);
    setOpen(false);
  };

  useEffect(() => {
    const sections = SECTION_IDS.map((id) => document.getElementById(id)).filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActiveSection(visible[0].target.id);
      },
      { rootMargin: "-30% 0px -55%", threshold: [0.1, 0.35, 0.65] },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <motion.header style={{ y }} className="pointer-events-none fixed inset-x-0 top-0 z-50">
        <div className="pointer-events-auto flex h-9 items-center justify-center gap-2 bg-ink px-4 text-[13px] text-white">
          <span>Save up to 30% for fall</span>
          <a href="#stages" onClick={(event) => scrollToSection(event, "stages")} className="font-medium underline underline-offset-4 hover:text-sun">
            Find yours.
          </a>
        </div>

        <nav
          aria-label="Primary"
          className="pointer-events-auto mx-auto mt-3 flex w-[min(1120px,calc(100%-24px))] items-center justify-between rounded-full bg-white/80 py-2 pl-5 pr-2 text-ink shadow-[0_10px_40px_-14px_rgba(16,26,74,.45)] ring-1 ring-ink/5 backdrop-blur-xl"
        >
          <a href="#" aria-label="Ritual home">
            <Logo />
          </a>

          <ul className="hidden items-center gap-1 lg:flex">
            {LINKS.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  onClick={(event) => scrollToSection(event, l.href.slice(1))}
                  aria-current={activeSection === l.href.slice(1) ? "location" : undefined}
                  className={`rounded-full px-4 py-2 text-[15px] transition-colors hover:bg-ink/5 ${activeSection === l.href.slice(1) ? "bg-ink text-white" : ""}`}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-1">
            <Button href="#stages" variant="ink" className="hidden !py-2.5 sm:inline-flex">
              Get started
            </Button>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
              className="grid h-10 w-10 place-items-center rounded-full transition-colors hover:bg-ink/5 lg:hidden"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
                <path d="M4 8h16M4 16h16" />
              </svg>
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            key="menu"
            initial={{ clipPath: "circle(0% at calc(100% - 36px) 52px)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 36px) 52px)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 36px) 52px)" }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            className="on-dark fixed inset-0 z-[60] flex flex-col overflow-y-auto overscroll-contain bg-ink px-6 pb-10 pt-5 text-white"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
          >
            <div className="flex items-center justify-between">
              <Logo className="text-white" />
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="grid h-10 w-10 place-items-center rounded-full ring-1 ring-white/30"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
                  <path d="M5 5l14 14M19 5L5 19" />
                </svg>
              </button>
            </div>

            <ul className="mt-10 flex flex-col gap-2 sm:mt-14">
              {LINKS.map((l, i) => (
                <motion.li
                  key={l.label}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 + i * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <a
                    href={l.href}
                    onClick={(event) => scrollToSection(event, l.href.slice(1))}
                    className="block font-display text-[clamp(2.5rem,12vw,3rem)] font-semibold tracking-[-0.04em] transition-colors hover:text-sun sm:text-5xl"
                  >
                    {l.label}
                  </a>
                </motion.li>
              ))}
            </ul>

            <div className="mt-auto flex flex-col gap-3">
              <Button href="#stages" variant="sun">
                Get started
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
