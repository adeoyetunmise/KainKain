'use client';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

export interface ProductCardProps {
  product: {
    id?: string | number;
    slug: string;
    title: string;
    image: string;
    price: number;
    category: string;
  };
  index: number;
  showRating?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, index, showRating = false }) => {
  return (
    <motion.div
      key={product.id || index}
      className=' text-black w-full overflow-hidden mx-auto aspect-[4/5]'
      initial={{ opacity: 0, y: 50 }} // Start hidden & slightly below
      whileInView={{ opacity: 1, y: 0 }} // Animate in when visible
      transition={{ duration: 0.6, ease: 'easeOut', delay: index * 0.2 }} // Staggered delay
      viewport={{ once: true }} // Animate only once
    >
      {/* Clickable Image */}
      <Link href={`/products/${product.slug}`} className='block relative w-full h-[70%]'>
        <Image
          src={product.image}
          alt={product.title}
          fill
          sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw'
          className='object-cover absolute top-0 left-0 transition-transform duration-300 hover:scale-105 cursor-pointer'
          priority
        />
      </Link>

      {/* Title, Price & Rating */}
      <div className='p-3 text-left h-[30%] flex flex-col justify-start'>
        <h2 className='text-sm lg:text-sm sm:text-lg font-normal'>{product.title}</h2>

        <p className='font-normal lg:text-sm text-xs sm:text-lg text-gray-600 mt-0.5'>
          ₦ {product.price} NGN
        </p>

        {/* Rating (Dark Stars) - shown only if showRating is true */}
        {showRating && (
          <div className='rating flex justify-center mt-1 scale-75'>
            <input
              type='radio'
              name={`rating-${product.id}`}
              className='mask mask-star bg-gray-950'
              aria-label='1 star'
            />
            <input
              type='radio'
              name={`rating-${product.id}`}
              className='mask mask-star bg-gray-950'
              aria-label='2 star'
              defaultChecked
            />
            <input
              type='radio'
              name={`rating-${product.id}`}
              className='mask mask-star bg-gray-950'
              aria-label='3 star'
            />
            <input
              type='radio'
              name={`rating-${product.id}`}
              className='mask mask-star bg-gray-950'
              aria-label='4 star'
            />
            <input
              type='radio'
              name={`rating-${product.id}`}
              className='mask mask-star bg-gray-950'
              aria-label='5 star'
            />
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ProductCard;
