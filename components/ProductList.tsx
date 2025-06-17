"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import combinedProducts from "@/public/data/combinedProducts.json";
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
    <section className="w-full bg-smoke-white">
      <div className="container  mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16">
        <h1 className="text-xl lg:text-2xl text-custom-black mt-1 sm:text-2xl md:text-3xl font-bold mb-6">
          HAND MADE ARTS SHOP
        </h1>

        {/* Wrap the whole grid in a motion.div to animate when scrolled into view */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full"
        >
          {combinedProducts.products
            .filter((product) => product.category === "handmade")
            .slice(0, 4)
            .map((product: Product, index) => (
              <ProductCard key={index} product={product} />
            ))}
        </motion.div>
        <div className="flex justify-center mt-8">
          <ButtonLink
            className="bg-custom-black border-none rounded-none shadow-none text-smoke-white  flex items-center justify-center whitespace-nowrap w-3 text-sm  "
            href="/collections/hand-made"
          >
            View All
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}

const ProductCard = ({ product }: { product: Product }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Format price with commas
  const formattedPrice = product.price.toLocaleString();

  return (
    <Link
      href={`/products/${product.slug}`}
      className="block bg-smoke-white text-center  transition duration-300 h-full"
    >
      <div
        className="relative w-full aspect-[3/4]"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Image
          src={
            isHovered && product.hoverImage ? product.hoverImage : product.image
          }
          alt={product.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover absolute top-0 left-0 transition-all duration-500 ease-in-out"
        />
      </div>
      <div className="">
        <h2 className="text-base font-bold text-custom-black mt-2 line-clamp-2 text-left">
          {product.title}
        </h2>
        <p className="text-base text-custom-black mt-1 text-left">
          &#8358; {formattedPrice}
        </p>
      </div>
    </Link>
  );
}
