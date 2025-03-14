"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import React, { useState, useEffect } from "react";
import Link from "next/link";

const slides = [
  { id: 1, src: "/TimePassesInSoundii.jpg", title: "Time Passes In Sounds" },
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
    <div className="relative h-screen w-full overflow-hidden bg-black">
      <div className="relative h-full w-full">
        <AnimatePresence mode="wait">
          {slides.map((slide, index) =>
            index === currentIndex ? (
              <motion.div
                key={slide.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className="absolute inset-0 flex flex-col items-center justify-center text-center"
              >
                {/* Background Image */}
                <Image
                  src={slide.src}
                  fill
                  style={{ objectFit: "cover" }}
                  alt={slide.title}
                  priority
                  className="transition-opacity duration-1000"
                />

                {/* Text and Button (Inside same animated div) */}
                <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 px-4">
                  <motion.h1
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 1 }}
                    className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white drop-shadow-lg"
                  >
                    {slide.title}
                  </motion.h1>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 1 }}
                    className="mt-4"
                  >
                    <Link href={`/products/${slide.title.toLowerCase().replace(/\s+/g, "-")}`}>
                      <button className="btn border border-white bg-transparent px-6 sm:px-8 py-3 sm:py-4 text-lg sm:text-xl font-semibold text-white transition-all duration-300 hover:bg-white hover:text-black">
                        Shop This Print
                      </button>
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            ) : null
          )}
        </AnimatePresence>
      </div>

      {/* Navigation Buttons */}
      <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
        <button
          className="btn btn-circle w-6 h-6 bg-white text-gray-700 p-2 sm:p-4"
          onClick={() =>
            setCurrentIndex((prevIndex) =>
              prevIndex === 0 ? slides.length - 1 : prevIndex - 1
            )
          }
        >
          ❮
        </button>
        <button
          className="btn btn-circle w-6 h-6 bg-white text-gray-700 p-2 sm:p-4"
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
