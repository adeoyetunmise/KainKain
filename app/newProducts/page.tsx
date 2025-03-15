"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import productsData from "@/app/data/products.json"; // Import JSON file

// Define the Product interface
interface Product {
  id: number;
  title: string;
  price: string;
  image: string;
  hoverImage: string;
  slug: string;
}

export default function Products() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold text-center mb-6">Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
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
      className="block border p-4 text-center rounded-lg shadow-md hover:shadow-xl transition"
    >
      <div
        className="relative w-full h-64 overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Image
          src={isHovered ? product.hoverImage : product.image}
          alt={product.title}
          width={300}
          height={200}
          className="mx-auto transition-all duration-500 ease-in-out"
        />
      </div>
      <h2 className="text-xl font-semibold mt-2">{product.title}</h2>
      <p className="text-lg">{product.price}</p>
    </Link>
  );
};
