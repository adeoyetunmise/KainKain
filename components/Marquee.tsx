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
  "/Kainkain symbol.png",
  "/KainKainn.png",
  "/KainKain - Solo Exhibition.jpg",
  "/Kainkain symbol.png",
  "/KainKainn.png",
  "/KainKain - Solo Exhibition.jpg",
  "/KainKainn.png",
  "/KainKain - Solo Exhibition.jpg",
  "/Kainkain symbol.png",
  "/KainKainn.png",
  "/KainKain - Solo Exhibition.jpg",
  "/Kainkain symbol.png",
  "/Kainkain symbol.png",
  "/KainKainn.png",
  "/KainKain - Solo Exhibition.jpg",
  "/Kainkain symbol.png",
  "/KainKainn.png",
  "/KainKain - Solo Exhibition.jpg",
];

const Marquee: React.FC = () => {
  return (
    <div className="overflow-hidden flex items-center relative my-8">
      <motion.div
        className="flex space-x-8 w-max"
        initial={{ x: 0 }} // Start immediately at 0
        animate={{ x: "-100%" }} // Move left continuously
        transition={{
          repeat: Infinity,
          repeatType: "loop",
          duration: 60, // Adjust speed (shorter = faster)
          ease: "linear", // Smoother, continuous movement
        }}
      >
        {/* Duplicate the logos twice for a seamless loop */}
        {[...logos, ...logos].map((logo, index) => (
          <Image
            key={index}
            src={logo}
            alt="logo"
            width={50}
            height={50}
            className="object-contain mt-7"
          />
        ))}
      </motion.div>
    </div>
  );
};

export default Marquee;
