import HandMadeHero from '@/components/collections/HandMadeHero';
import Hero from '@/components/Hero';
import Marquee from '@/components/Marquee';
// import PrintArtHero from '@/components/PrintArtHero';
import HomeProductCard from '@/components/HomeProductCard';
import ProductList from '@/components/ProductList';
import PrintArtHero from '@/components/collections/PrintArtHero';

export default function Home() {
  return (
    <section>
      <Hero />
      <Marquee />
      <HandMadeHero />
      <ProductList />
      <hr className='text-gray-300' />
      <PrintArtHero />
      <HomeProductCard />
    </section>
  );
}
