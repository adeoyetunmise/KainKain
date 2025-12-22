"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Hero = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  }, []);

  return (
    <>
      <motion.div
        className="hero min-h-[500px] md:min-h-[800px] bg-no-repeat bg-cover"
        style={{
          backgroundImage: "url('/New-hero.jpg')",
          backgroundPosition: isMobile ? "40% center" : "center center",
        }}
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* <div className="hero-content text-center text-smoke-white">
          <div className="md:max-w-md lg:max-w-lg">
            <p className="text-2xl">Explore</p>
            <h1 className="text-3xl lg:text-6xl md:text-5xl font-bold tracking-wider whitespace-nowrap overflow-visible">
              KAINKAIN COLLECTION
            </h1>
            <p className="text-2xl">By Tosin Josh</p>
          </div>
        </div> */}
      </motion.div>
      {/* Floating Gmail Icon */}
      <a
        href="mailto:themodalandexperience@gmail.com"
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 bg-white hover:bg-gray-100 rounded-full shadow-lg p-2 sm:p-3 flex items-center justify-center transition-colors duration-200"
        aria-label="Send Email"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 48 48"
          className="sm:w-8 sm:h-8 w-6 h-6"
        >
          <rect width="48" height="48" rx="8" fill="#fff" />
          <path
            d="M8 13l16 12 16-12"
            stroke="#EA4335"
            strokeWidth="4"
            fill="none"
          />
          <rect
            x="8"
            y="13"
            width="32"
            height="22"
            rx="2"
            fill="none"
            stroke="#EA4335"
            strokeWidth="4"
          />
        </svg>
      </a>
    </>
  );
};

export default Hero;
