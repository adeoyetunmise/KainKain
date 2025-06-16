import HandMadeHero from "@/components/collections/HandMadeHero";
import Hero from "@/components/Hero";
// import PrintArtHero from '@/components/PrintArtHero';
import HomeProductCard from "@/components/HomeProductCard";
import ProductList from "@/components/ProductList";
import PrintArtHero from "@/components/collections/PrintArtHero";
import ArtistStatement from "@/components/ArtistStatement";

export default function Home() {
  return (
    <section className="bg-[#ece8e5]">
      <Hero />
      <ArtistStatement />
      <HandMadeHero />
      <ProductList />
      <hr className="text-gray-300" />
      <PrintArtHero />
      <HomeProductCard />
    </section>
  );
}
