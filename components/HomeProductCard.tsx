"use client";
import combinedProducts from "@/public/data/combinedProducts.json";
import ButtonLink from "./ui/ButtonLink";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

// Define the Product type to match ProductList
type Product = {
  id?: number;
  title: string;
  image: string;
  hoverImage?: string;
  price: number;
  slug: string;
  category: string;
};

// Create a custom ProductCard component similar to the one in ProductList
const CustomProductCard = ({ product }: { product: Product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const formattedPrice = product.price.toLocaleString();

  return (
    <Link
      href={`/products/${product.slug}`}
      className="block bg-smoke-white text-center hover:transition max-w-[350px] mx-auto w-full"
    >
      <div
        className="relative w-full aspect-[3/4] overflow-hidden"
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
          className="object-cover absolute top-0 left-0 transition-all duration-500 ease-in-out group-hover:scale-105"
        />
      </div>
      <div className="pt-3">
        <h2 className="text-sm lg:text-base font-bold line-clamp-2 text-left">
          {product.title}
        </h2>
        <p className="text-sm lg:text-base text-dark mt-1 text-left font-medium">
          &#8358; {formattedPrice}
        </p>
      </div>
    </Link>
  );
};

const HomeProductCard = () => {
  return (
    <div className="container flex flex-col items-center mx-auto px-4 py-6 md:py-20">
      <div className="w-full self-start">
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-2xl font-bold mb-4 md:mb-6">
          PRINT ARTS SHOP
        </h1>
      </div>

        {/* Wrap the grid with motion.div like in ProductList */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-6 w-full"
        >
          {combinedProducts.products
            .filter((product) => product.category === "printart")
            .slice(0, 4)
            .map((product, index) => (
              <CustomProductCard key={product.id || index} product={product} />
            ))}
        </motion.div>

        {/* View All Button - match styling with ProductList */}
        <div className="flex justify-center mt-8 md:mt-10">
        <ButtonLink
            className="bg-[#1a1a1a] border-none rounded-none shadow-none text-[#faf9f6]  flex items-center justify-center whitespace-nowrap w-3 text-sm  "
            href="/collections/print-art"
          >
            View All
          </ButtonLink>
        </div>
      </div>
  );
};

export default HomeProductCard;
