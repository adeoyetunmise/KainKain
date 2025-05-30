'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

const Collections = () => {
  const collections = [
    {
      title: 'Print Arts',
      description: 'Explore our collection of stunning print arts.',
      image: '/EchoesOfFreedomi.jpg',
      link: '/collections/print-arts',
    },
    {
      title: 'Hand Made',
      description: 'Discover unique handmade items crafted with care.',
      image: '/TJPG2219.jpg',
      link: '/collections/hand-made',
    },
    {
      title: 'Exhibition',
      description: 'Join us for our latest exhibition showcasing local artists.',
      image: '/KainKain - Solo Exhibition.jpg',
      link: '/collections/exhibition',
    },
  ];

  return (
    <section className='container mx-auto px-4 py-6 mt-20 mb-12'>
      <h1 className='text-xl sm:text-2xl md:text-3xl lg:text-2xl font-bold text-center mb-8 md:mb-10'>
        Our Collections
      </h1>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        viewport={{ once: true }}
        className='grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8'
      >
        {collections.map((collection, index) => (
          <motion.div
            key={collection.title}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: index * 0.2 }}
            viewport={{ once: true }}
            className='bg-white transition-shadow duration-300'
          >
            <Link href={collection.link} className='block'>
              <div className='relative w-full pb-[70%] overflow-hidden'>
                <Image
                  src={collection.image}
                  alt={collection.title}
                  fill
                  sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
                  className='object-cover transition-transform duration-300 hover:scale-105'
                />
              </div>
              <div className='p-5'>
                <h2 className='text-sm lg:text-lg font-semibold mb-2'>{collection.title}</h2>
                <p className='text-gray-600 text-sm mb-4'>{collection.description}</p>
                <div className='inline-flex items-center text-black hover:underline'>
                  View Collection
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='16'
                    height='16'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    className='ml-2'
                  >
                    <line x1='5' y1='12' x2='19' y2='12'></line>
                    <polyline points='12 5 19 12 12 19'></polyline>
                  </svg>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Collections;
