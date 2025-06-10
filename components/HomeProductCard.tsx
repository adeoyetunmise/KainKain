"use client";
import combinedProducts from "@/public/data/combinedProducts.json";
import ButtonLink from "./ui/ButtonLink";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaChevronRight } from "react-icons/fa";
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
      className="block bg-white p-1 md:p-2 text-center hover:transition max-w-[350px] mx-auto w-full"
    >
      <div
        className="relative w-full pb-[460px]" // Same height as ProductList
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
};

const HomeProductCard = () => {
  return (
    <div className="container flex flex-col items-center mx-auto px-4 py-6 md:py-10">
      <div className="w-full self-start">
        <h1 className="text-xl lg:ml-30 sm:text-2xl md:text-3xl lg:text-2xl font-bold mb-4 md:mb-6">
          PRINT ARTS SHOP
        </h1>
      </div>

      {/* Wrap the grid with motion.div like in ProductList */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-7xl"
      >
        {combinedProducts.products
          .filter((product) => product.category === "printart")
          .slice(0, 4)
          .map((product, index) => (
            <CustomProductCard key={product.id || index} product={product} />
          ))}
      </motion.div>

      {/* View All Button - match styling with ProductList */}
      <div className="flex justify-center mt-4 md:mt-6">
        <ButtonLink
          className="bg-black border-none rounded-none shadow-none text-white px-2 py-1 flex items-center justify-center whitespace-nowrap w-auto min-w-[80px] text-sm"
          href="/collections/print-art"
        >
          <FaChevronRight className="text-xs flex-shrink-0" />{" "}
          <span className="ml-1">View All</span>
        </ButtonLink>
      </div>
    </div>
  );
};

export default HomeProductCard;
