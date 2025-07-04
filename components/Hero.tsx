"use client";

import React, { useEffect, useState } from "react";

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
    <div
      className="hero min-h-[500px] md:min-h-[800px] bg-no-repeat bg-cover"
      style={{
        backgroundImage: "url('/New-hero.jpg')",
        backgroundPosition: isMobile ? "40% center" : "center center",
      }}
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
    </div>
  );
};

export default Hero;
