"use client";

import React from "react";
import ProductCard, { ProductCardProps } from "./ProductCard";
import { motion } from "framer-motion";

interface ProductGridProps {
  products: ProductCardProps[];
}

const ProductGrid = ({ products }: ProductGridProps) => {
  // Custom wrapper component to apply Tailwind styling
  const StyledProductCard = ({
    product,
    index,
  }: {
    product: ProductCardProps;
    index: number;
  }) => (
    <motion.div
      className="flex flex-col relative h-full"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1, // stagger effect
        ease: "easeOut",
      }}
    >
      <div className="relative w-full h-0 pb-[125%] overflow-hidden">
        <img
          src={product.image}
          alt={product.title}
          className="absolute top-0 left-0 h-full w-full object-cover object-center z-10"
        />
        {product.hoverImage && (
          <img
            src={product.hoverImage}
            alt={`${product.title} hover`}
            className="absolute top-0 left-0 h-full w-full object-cover object-center opacity-0 hover:opacity-100 transition-opacity duration-300 z-10"
          />
        )}
      </div>

      <div className="mt-2 md:mt-3 relative z-20 bg-transparent w-full pt-1 md:pt-2">
        <h3 className="text-black bg-transparent static text-sm sm:text-base">
          {product.title}
        </h3>
        <p className="text-black bg-transparent static text-sm sm:text-base">
          ₦
          {typeof product.price === "number"
            ? product.price.toLocaleString()
            : product.price}
        </p>
      </div>

      <a href={`/products/${product.slug}`} className="absolute inset-0 z-30">
        <span className="sr-only">View {product.title}</span>
      </a>
    </motion.div>
  );

  return (
    <div className="px-2 sm:px-4 md:px-8 lg:px-1">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
        {products.map((product, index) => (
          <StyledProductCard key={product.id} product={product} index={index} />
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
