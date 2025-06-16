"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion"; // Import Framer Motion
import combinedProducts from "@/public/data/combinedProducts.json"; // Import combined JSON file
import ButtonLink from "./ui/ButtonLink";

// Define the Product type
type Product = {
  id?: number;
  title: string;
  image: string;
  hoverImage?: string;
  price: number;
  slug: string;
  category: string;
};

export default function ProductList() {
  return (
    <div className="container flex flex-col items-center mx-auto px-4 py-6 md:my-20">
      <div className="w-full self-start">
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-2xl font-bold mb-4 md:mb-6">
          HAND MADE ARTS SHOP
        </h1>
      </div>

      {/* Wrap the whole grid in a motion.div to animate when scrolled into view */}
      <motion.div
        initial={{ opacity: 0, y: 50 }} // Start hidden and slightly below
        whileInView={{ opacity: 1, y: 0 }} // Animate when in viewport
        transition={{ duration: 0.8, ease: "easeOut" }} // Smooth animation
        viewport={{ once: true }} // Only animate once per scroll
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-7xl"
      >
        {combinedProducts.products
          .filter((product) => product.category === "handmade")
          .slice(0, 4) // Take only the first item
          .map((product: Product, index) => (
            <ProductCard key={index} product={product} />
          ))}
      </motion.div>
      <div className="flex justify-center mt-4 md:mt-6">
        <ButtonLink
          className="bg-black border-none rounded-none shadow-none text-white py-1 flex items-center justify-center whitespace-nowrap w-auto text-sm"
          href="/collections/hand-made"
        >
          View All
          {/* <FaChevronRight className="text-xs flex-shrink-0" /> <span className="ml-1">View All</span> */}
        </ButtonLink>
      </div>
    </div>
  );
}

const ProductCard = ({ product }: { product: Product }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Format price with commas
  const formattedPrice = product.price.toLocaleString();

  return (
    <Link
      href={`/products/${product.slug}`}
      className="block bg-[#ece8e5] text-center hover:transition max-w-[350px] mx-auto w-full"
    >
      <div
        className="relative w-full pb-[460px]" // Increased height with 125% aspect ratio
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Image
          src={
            isHovered && product.hoverImage ? product.hoverImage : product.image
          }
          alt={product.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover font-bold absolute top-0 left-0 transition-all duration-500 ease-in-out"
        />
      </div>
      <h2 className="text-sm lg:text-lg sm:text-lg md:text-xl font-bold mt-2 line-clamp-2 text-left">
        {product.title}
      </h2>
      <p className="text-sm lg:text-lg text-dark sm:text-base md:text-lg mt-1 text-left">
        &#8358; {formattedPrice}
      </p>
    </Link>
  );
}
