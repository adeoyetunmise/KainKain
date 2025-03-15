"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import productsData from "@/app/data/products.json"; // Import JSON file

// Define the Product type
type Product = {
  id: number;
  title: string;
  image: string;
  hoverImage?: string;
  price: string;
  slug: string;
};

export default function ProductList() {
  return (
    <div className="container mx-auto px-4 py-6 md:py-10">
      <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-4 md:mb-6">
        Photography By Tosin Josh
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
        {productsData.map((product: Product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

const ProductCard = ({ product }: { product: Product }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      href={`/products/${product.slug}`}
      className="block bg-white p-3 md:p-4 text-center rounded-lg shadow-md hover:shadow-xl transition max-w-[350px] mx-auto w-full"
    >
      <div
        className="relative w-full pb-[100%]" // Square aspect ratio
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Image
          src={isHovered && product.hoverImage ? product.hoverImage : product.image}
          alt={product.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover absolute top-0 left-0 transition-all duration-500 ease-in-out"
        />
      </div>
      <h2 className="text-base sm:text-lg md:text-xl font-semibold mt-2 line-clamp-2">{product.title}</h2>
      <p className="text-sm sm:text-base md:text-lg mt-1">{product.price}</p>
    </Link>
  );
};
