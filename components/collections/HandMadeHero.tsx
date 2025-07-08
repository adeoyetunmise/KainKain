"use client";

import ButtonLink from "../ui/ButtonLink";
import { useEffect, useState } from "react";

const HandMadeHero = () => {
  const [backgroundImage, setBackgroundImage] = useState("/TJPG2215.jpg");

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setBackgroundImage("/hand-made-bg.jpg"); // Replace with your desktop image path
      } else {
        setBackgroundImage("/TJPG2215.jpg"); // Current mobile image
      }
    };

    // Set initial image
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Clean up
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className="hero min-h-[80vh] -mt-4"
      style={{
        backgroundImage: `url('${backgroundImage}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="hero-content text-center text-smoke-white pt-24 md:pt-0">
        <div className="md:max-w-md ">
          <h2 className="text-2xl md:text-4xl font-bold">
            HAND MADE ARTS SHOP
          </h2>
          <ButtonLink
            className="lg:mt-6 w-[30px] bg-smoke-white border-none rounded-none shadow-none text-custom-black"
            href="/collections/hand-made"
          >
            Explore
          </ButtonLink>
        </div>
      </div>
    </div>
  );
};

export default HandMadeHero;
