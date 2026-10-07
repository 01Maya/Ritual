/* Sample member notes — replace with real, permissioned reviews. */
export default function Voices() {
  return (
    <section id="voices" className="px-5 pb-20 md:px-10 md:pb-28">
      <div className="mx-auto max-w-6xl" data-reveal>
        <h2 data-text-reveal="heading" className="max-w-[18ch] font-display text-[clamp(2.2rem,4.6vw,4rem)] font-semibold leading-[0.98] tracking-[-0.04em]">
          What members tell us.
        </h2>

        <div className="mt-12 grid gap-4 md:grid-cols-12">
          <figure className="hover-lift rounded-[32px] bg-white p-8 md:col-span-7 md:row-span-2 md:rounded-[44px] md:p-12">
            <blockquote className="font-display text-[clamp(1.7rem,3.2vw,3rem)] font-medium leading-[1.08] tracking-[-0.03em]">
              I finally know what's in the thing I take every morning. That's the whole reason I switched.
            </blockquote>
            <figcaption className="mt-8 text-[15px] text-ink/60">Maya R., member since 2024</figcaption>
          </figure>

          <figure className="hover-lift rounded-[32px] bg-sun p-8 md:col-span-5 md:rounded-[36px]">
            <blockquote className="font-display text-2xl font-medium leading-[1.15] tracking-[-0.02em]">
              The capsule is clear and I can see the beads. Small thing, big trust.
            </blockquote>
            <figcaption className="mt-6 text-[15px] text-ink/70">Daniel K., member since 2023</figcaption>
          </figure>

          <figure className="hover-lift rounded-[32px] bg-ink p-8 text-white md:col-span-5 md:rounded-[36px]">
            <blockquote className="font-display text-2xl font-medium leading-[1.15] tracking-[-0.02em]">
              Delivery shows up before I run out. That's my whole review.
            </blockquote>
            <figcaption className="mt-6 text-[15px] text-white/65">Priya S., member since 2025</figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
