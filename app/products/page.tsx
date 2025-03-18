"use client"; // Ensure it's a Client Component

import Image from "next/image";
import productData from "@/public/data/productData.json";
import Link from "next/link";
import { motion } from "framer-motion";

const ProductPage = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }} // Start position (hidden below)
      whileInView={{ opacity: 1, y: 0 }} // Slide up into view
      transition={{ duration: 0.8, ease: "easeOut" }} // Smooth animation
      viewport={{ once: true }} // Only animate once
      className="container mx-auto grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 gap-3 sm:gap-4 md:gap-6 px-3 sm:px-6 lg:px-8 mt-4 sm:mt-6 md:mt-10"
    >
      {productData.map((product, index) => (
        <Link key={index} href={`/products/${product.slug}`} className="block w-full">
          <div className="relative w-full pb-[100%] overflow-hidden shadow-md  group">
            {/* Product Image */}
            <Image
              src={product.img}
              alt={product.title}
              fill
              sizes="(max-width: 480px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover absolute top-0 left-0 scale-95 transition-transform duration-300 ease-in-out group-hover:scale-110"
              priority={index < 3} // Prioritize first 3 images for performance
            />

            {/* Title (Appears on Hover) */}
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
              <span className="text-white bg-opacity-50 px-3 py-1 rounded-md text-sm sm:text-base font-semibold whitespace-nowrap truncate max-w-[90%]">
                {product.title}
              </span>
            </div>
          </div>
        </Link>
      ))}
    </motion.section>
  );
};

export default ProductPage;
