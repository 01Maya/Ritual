"use client";
import { useState } from "react";
import Logo from "./Logo";

const LINKS = [
  ["Find your formula", "#stages"],
  ["Our story", "#manifesto"],
  ["Science", "#science"],
  ["Ingredient receipt", "#receipt"],
  ["Member voices", "#voices"],
  ["FAQ", "#faq"],
];

const SOCIALS = [
  ["Instagram", "https://www.instagram.com/yourbrand"],
  ["TikTok", "https://www.tiktok.com/@yourbrand"],
  ["Facebook", "https://www.facebook.com/yourbrand"],
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  return (
    <footer className="on-dark relative overflow-hidden bg-ink px-5 pt-20 text-white md:px-10 md:pt-28">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-x-8 gap-y-12 md:grid-cols-4 lg:grid-cols-6">
        <div className="col-span-2 min-w-0">
          <Logo className="text-white" />
          <p data-text-reveal="heading" className="mt-6 max-w-[30ch] font-display text-3xl font-semibold leading-[1.05] tracking-[-0.03em]">
            Get new studies and offers in your inbox.
          </p>
          <form
            className="mt-6 flex max-w-sm gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              if (email.includes("@")) setDone(true);
            }}
          >
            <label htmlFor="footer-email" className="sr-only">
              Email address
            </label>
            <input
              id="footer-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@email.com"
              className="min-w-0 flex-1 rounded-full bg-white/10 px-5 py-3 text-[15px] text-white placeholder:text-white/45 focus:bg-white/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-sun"
            />
            <button type="submit" className="rounded-full bg-sun px-5 py-3 text-[15px] font-medium text-ink transition-colors hover:bg-white">
              Subscribe
            </button>
          </form>
          <p className="mt-3 min-h-6 text-sm text-sun" role="status">
            {done ? "You're on the list. Check your inbox to confirm." : ""}
          </p>
        </div>

        <nav aria-label="Footer" className="col-span-2 min-w-0">
          <h3 className="text-sm text-white/50">Explore</h3>
          <ul className="mt-4 grid grid-cols-2 gap-x-8 gap-y-2.5 lg:grid-cols-2">
            {LINKS.map(([label, href]) => (
              <li key={label}>
                <a href={href} className="text-[15px] text-white/90 transition-colors hover:text-sun">
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="col-span-1 min-w-0 md:col-span-2 lg:col-span-1">
          <h3 className="text-sm text-white/50">Follow</h3>
          <ul className="mt-4 space-y-2.5">
            {SOCIALS.map(([label, href]) => (
              <li key={label}>
                <a href={href} target="_blank" rel="noreferrer" className="text-[15px] text-white/90 transition-colors hover:text-sun">
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="col-span-1 min-w-0 md:col-span-2 lg:col-span-1">
          <h3 className="text-sm text-white/50">Contact</h3>
          <a href="mailto:hello@example.com" className="mt-4 inline-block break-all text-[15px] text-white/90 transition-colors hover:text-sun sm:break-normal">
            hello@example.com
          </a>
        </div>
      </div>

      <div className="mx-auto mt-20 max-w-6xl border-t border-white/15 pt-6 text-[13px] leading-relaxed text-white/50">
        <p>
          *These statements have not been evaluated by the Food and Drug Administration. These products are not intended to diagnose, treat,
          cure, or prevent any disease. Talk to your healthcare provider before starting any supplement.
        </p>
        <p className="mt-3">© 2026 Ritual. Design concept.</p>
      </div>

      <div aria-hidden="true" className="pointer-events-none mt-6 select-none overflow-hidden">
        <p className="-mb-[5vw] text-center font-display text-[29vw] font-bold leading-[0.8] tracking-[-0.06em] text-white/[0.07]">Ritual</p>
      </div>
    </footer>
  );
}
