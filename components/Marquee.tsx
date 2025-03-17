"use client";
import Image from "next/image";
import { motion } from "framer-motion";

const logos = [
  "/KainKainn.png",
  "/KainKain - Solo Exhibition.jpg",
  "/Kainkain symbol.png",
  "/KainKainn.png",
  "/KainKain - Solo Exhibition.jpg",
  "/Kainkain symbol.png",
];

const Marquee: React.FC = () => {
  return (
    <div className="overflow-hidden h-48 bg-gray-100 py-4 relative">
      <motion.div
        className="flex space-x-8 w-max"
        initial={{ x: "0%" }} // Start at normal position
        animate={{ x: "-100%" }} // Move fully left
        transition={{
          repeat: Infinity, // Infinite loop
          duration: 10, // Adjust speed as needed
          ease: "linear", // Perfectly smooth transition
        }}
      >
        {/* Duplicate logos twice for continuous scrolling */}
        {[...logos, ...logos].map((logo, index) => (
          <Image
            key={index}
            src={logo}
            alt="logo"
            width={100}
            height={50}
            className="object-contain mt-7"
          />
        ))}
      </motion.div>
    </div>
  );
};

export default Marquee;
