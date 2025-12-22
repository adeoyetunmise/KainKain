"use client";

import ButtonLink from "../ui/ButtonLink";
import MotionWrapper from "../MotionWrapper";
import { useEffect, useState } from "react";

const PrintArtHero = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <MotionWrapper
      direction="up"
      mobileDirection="up"
      duration={0.8}
      mobileDuration={1.0}
    >
      <div
        className="hero min-h-[80vh] -mt-4"
        style={{
          backgroundImage: isMobile
            ? "url('/KelegbeMegbe.jpg')"
            : "url('/print-art-hero.png')",
          backgroundSize: "cover",
          backgroundPosition: isMobile ? "40% center" : "center",
        }}
      >
        <MotionWrapper
          direction="up"
          mobileDirection="up"
          duration={0.6}
          mobileDuration={0.7}
          delay={0.3}
        >
          <div className="hero-content text-center text-smoke-white">
            <div className="md:max-w-md">
              <h2 className="text-2xl lg:text-5xl md:text-4xl font-bold">
                PRINT ARTS SHOP
              </h2>
              <ButtonLink
                className="lg:mt-6 bg-smoke-white text-custom-black border-none rounded-none shadow-none w-[30px] text-sm"
                href="/collections/print-art"
              >
                Explore
              </ButtonLink>
            </div>
          </div>
        </MotionWrapper>
      </div>
    </MotionWrapper>
  );
};

export default PrintArtHero;
