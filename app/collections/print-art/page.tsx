"use client";

import ProductCollectionListing from "@/components/collections/ProductCollectionListing";
import { motion } from "framer-motion";

const PrintArt = () => {
  return (
    <section className="w-full bg-smoke-white">
      <div className="max-w-full">
        <div
          className="relative flex flex-col items-center justify-center py-20 px-4 w-full h-[670px] md:h-[700px]"
          style={{
            backgroundImage: "url('/BirdsOfAFeather.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            margin: 0,
            width: "100%",
          }}
        >
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-4xl lg:text-6xl md:text-5xl text-center mt-0 text-smoke-white relative z-10 font-semibold"
          >
            KainKain Print Art
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="text-center text-lg md:text-xl lg:text-xl  py-5 text-smoke-white relative z-10 max-w-3xl font-bold"
          >
            Explore our exclusive collection of print art, where creativity
            meets craftsmanship in every carefully curated piece.
          </motion.p>
        </div>

        <div className="px-5 max-w-7xl mx-auto">
          <ProductCollectionListing category="printart" />
        </div>
      </div>
    </section>
  );
};

export default PrintArt;
