"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import React, { useState, useEffect } from "react";
import Link from "next/link";

const slides = [
  { id: 1, src: "/TimePassesInSoundii.jpg", title: "Time Passes In Sound" },
  { id: 2, src: "/Oori.jpg", title: "Oori" },
  { id: 3, src: "/BirdsOfAFeatheri.jpg", title: "Birds Of a Feather" },
  { id: 4, src: "/Restless.jpg", title: "Restless" },
];

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative  h-screen w-full overflow-hidden">
      <div className="relative h-full w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={slides[currentIndex].id}
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: "0%", opacity: 1 }}
            exit={{ x: "-100%", opacity: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="absolute h-full w-full"
          >
            <Image
              src={slides[currentIndex].src}
              layout="fill"
              objectFit="cover"
              alt={slides[currentIndex].title}
              className="transition-all duration-700"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute  left-0 right-0 top-1/2 flex flex-col items-center -translate-y-1/2 text-center px-4">
        <AnimatePresence mode="wait">
          <motion.h1
            key={slides[currentIndex].title}
            initial={{ x: "-50%", opacity: 0 }}
            animate={{ x: "0%", opacity: 1 }}
            exit={{ x: "-50%", opacity: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
            className="text-2xl  sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white drop-shadow-lg"
          >
            {slides[currentIndex].title}
          </motion.h1>
        </AnimatePresence>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 20, opacity: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="relative mt-4"
        >
          <Link href="/shop">
            <button className="btn border  border-white bg-transparent px-6 sm:px-8 py-3 sm:py-4 text-lg sm:text-xl font-semibold text-white transition-all duration-300 hover:bg-white hover:text-black">
              Shop This Print
            </button>
          </Link>
        </motion.div>
      </div>

      <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
        <button
          className="btn btn-circle w-6 h-6  bg-white text-gray-700 p-2 sm:p-4"
          onClick={() =>
            setCurrentIndex((prevIndex) =>
              prevIndex === 0 ? slides.length - 1 : prevIndex - 1
            )
          }
        >
          ❮
        </button>
        <button
          className="btn btn-circle  w-6 h-6  bg-white text-gray-700 p-2 sm:p-4"
          onClick={() =>
            setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length)
          }
        >
          ❯
        </button>
      </div>
    </div>
  );
};

export default Hero;
