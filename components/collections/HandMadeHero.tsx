"use client";

import ButtonLink from "../ui/ButtonLink";
import MotionWrapper from "../MotionWrapper";
import { useEffect, useState } from "react";

const HandMadeHero = () => {
  const [backgroundImage, setBackgroundImage] = useState("/TJPG2215.jpg");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);

      if (mobile) {
        setBackgroundImage("/spongetub1.jpg");
      } else {
        setBackgroundImage("/hand-made-bg.jpg");
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <MotionWrapper
      direction="up"
      mobileDirection="up"
      duration={0.6}
      mobileDuration={0.7}
    >
      <div
        className="hero min-h-[80vh] -mt-4"
        style={{
          backgroundImage: `url('${backgroundImage}')`,
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
          <div className="hero-content text-center mt-10 text-smoke-white pt-24 md:pt-0">
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
        </MotionWrapper>
      </div>
    </MotionWrapper>
  );
};

export default HandMadeHero;

