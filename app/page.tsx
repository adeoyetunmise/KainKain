import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import ProductCards from "@/components/ProductCards";
import ProductList from "@/components/ProductList";

export default function Home() {
  return (
    <section>
      <Hero />
      <Marquee />
      <ProductCards />
      <hr className="text-gray-300"/>
      <ProductList />
    </section>
  );
}
