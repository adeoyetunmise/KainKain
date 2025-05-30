'use client';

import React from 'react';
import ProductCard, { ProductCardProps } from './ProductCard';

interface ProductGridProps {
  products: ProductCardProps[];
}

const ProductGrid = ({ products }: ProductGridProps) => {
  return (
    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
      {products.map((product) => (
        <ProductCard
          id={product.id}
          key={product.slug}
          slug={product.slug}
          title={product.title}
          image={product.image}
          price={product.price}
          category={product.category}
          hoverImage={product.hoverImage}
        />
      ))}
    </div>
  );
};

export default ProductGrid;
