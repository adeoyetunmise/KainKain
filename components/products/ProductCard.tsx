'use client';

import Image from 'next/image';
import Link from 'next/link';

export interface ProductCardProps {
  id: number;
  slug: string;
  title: string;
  image: string;
  price: number;
  category?: string;
  hoverImage?: string;
}

const ProductCard = ({ slug, title, image, price, }: ProductCardProps) => {
  return (
    <div className="product-card group">
      <Link href={`/products/${slug}`}>
        <div className="relative overflow-hidden mb-3 rounded-lg">
          <div className="aspect-square relative">
            <Image 
              src={image} 
              alt={title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        </div>
        <div className="product-info">
          <h3 className="text-lg font-medium">{title}</h3>
          <p className="text-gray-700 mt-1">&#8358;{price.toLocaleString()}</p>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
