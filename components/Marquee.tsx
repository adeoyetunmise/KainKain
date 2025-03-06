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
    <div className="overflow-hidden h-48 bg-gray-100 py-4">
      <motion.div
        className="flex space-x-8 w-max"
        initial={{ x: "100%" }}
        animate={{ x: "-100%" }}
        transition={{
          repeat: Infinity,
          duration: 8,
          ease: "linear",
        }}
      >
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
