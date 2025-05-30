'use client';
import combinedProducts from '@/public/data/combinedProducts.json';
import ButtonLink from './ui/ButtonLink';
import ProductCard from './ui/ProductCard';

const HomeProductCard = () => {
  return (
    <div className='flex flex-col items-center space-y-4 md:space-y-6 px-4 py-6 md:py-10 container mx-auto'>
      <h1 className='text-xl sm:text-2xl md:text-3xl lg:text-2xl font-bold text-center'>
        PRINT ARTS SHOP
      </h1>

      {/* Card Grid */}
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-7xl'>
        {combinedProducts.products
          .filter((product) => product.category === 'printart')
          .slice(0, 4) // Take only the first 4 items
          .map((product, index) => (
            <ProductCard key={product.id || index} product={product} index={index} />
          ))}
      </div>

      {/* View All Button */}
      <div className='flex justify-center'>
        <ButtonLink href='/collections/print-art'>View More</ButtonLink>
      </div>
    </div>
  );
};

export default HomeProductCard;
