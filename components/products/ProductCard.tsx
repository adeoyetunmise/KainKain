"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export interface ProductCardProps {
  id: number;
  slug: string;
  title: string;
  image: string;
  price: number;
  category?: string;
  hoverImage?: string;
}

const ProductCard = ({ id, slug, title, image, price }: ProductCardProps) => {
  return (
    <motion.div
      key={id}
      className="bg-[#ece8e5] text-black w-full overflow-hidden mx-auto aspect-[4/5]"
      initial={{ opacity: 0, y: 50 }} // Start hidden & slightly below
      whileInView={{ opacity: 1, y: 0 }} // Animate in when visible
      transition={{ duration: 0.6, ease: "easeOut" }} // Animation
      viewport={{ once: true }} // Animate only once
    >
      {/* Clickable Image */}
      <Link
        href={`/products/${slug}`}
        className="block relative w-full h-[70%]"
      >
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover font-bold absolute top-0 left-0 transition-all duration-500 ease-in-out"
          priority
        />
      </Link>

      {/* Title, Price & Rating */}
      <div className="p-3 text-left h-[30%] flex flex-col justify-start">
        <h2 className="text-sm lg:text-sm sm:text-lg font-semibold">{title}</h2>
      </div>
    </motion.div>
  );
};

export default ProductCard;
