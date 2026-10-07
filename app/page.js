import SmoothScroll from "@/components/SmoothScroll";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Manifesto from "@/components/Manifesto";
import FindRitual from "@/components/FindRitual";
import Science from "@/components/Science";
import Receipt from "@/components/Receipt";
import Voices from "@/components/Voices";
import Offer from "@/components/Offer";
import Faq from "@/components/Faq";
import Footer from "@/components/Footer";

export default function Page() {
  return (
    <SmoothScroll>
      <a
        href="#main"
        className="fixed left-3 top-3 z-[100] -translate-y-20 rounded-full bg-sun px-4 py-2 text-sm font-medium text-ink focus:translate-y-0"
      >
        Skip to content
      </a>
      <Nav />
      <main id="main">
        <Hero />
        <Manifesto />
        <FindRitual />
        <Science />
        <Receipt />
        <Voices />
        <Offer />
        <Faq />
      </main>
      <Footer />
    </SmoothScroll>
  );
}
