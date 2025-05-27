import HandMadeHero from "@/components/HandMadeHero";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import PrintArtHero from "@/components/PrintArtHero";
import ProductCards from "@/components/ProductCards";
import ProductList from "@/components/ProductList";

export default function Home() {
  return (
    <section>
      <Hero />
      <Marquee />
      <HandMadeHero />
      <ProductList />
      <hr className="text-gray-300"/>
      <PrintArtHero />
      <ProductCards />
    </section>
  );
}
