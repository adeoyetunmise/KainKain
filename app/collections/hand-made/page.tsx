"use client";

import ProductCollectionListing from "@/components/collections/ProductCollectionListing";
import MotionWrapper from "@/components/MotionWrapper";

const HandMade = () => {
  return (
    <section className="w-full bg-smoke-white">
      <div className="max-w-full">
        <MotionWrapper
          direction="up"
          mobileDirection="up"
          duration={0.8}
          mobileDuration={1.0}
        >
          <div
            className="relative flex flex-col items-center justify-center py-20 px-4 w-full h-[670px] md:h-[700px]"
            style={{
              backgroundImage: "url('/TJPG2277.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              margin: 0,
              width: "100%",
            }}
          >
            <MotionWrapper
              direction="up"
              delay={0.2}
              duration={0.8}
              mobileDuration={1.0}
            >
              <h1 className="text-4xl lg:text-6xl md:text-5xl text-center mt-0 text-smoke-white relative z-10 font-semibold">
                KainKain HandMade
              </h1>
            </MotionWrapper>

            <MotionWrapper
              direction="up"
              delay={0.5}
              duration={0.8}
              mobileDuration={1.0}
            >
              <p className="text-center text-lg md:text-xl lg:text-xl  py-5 text-smoke-white relative z-10 max-w-3xl font-bold">
                Discover the unique charm of our handmade collection, where each
                piece is crafted with care and creativity.
              </p>
            </MotionWrapper>
          </div>
        </MotionWrapper>

        <div className="px-5 max-w-7xl mx-auto">
          <ProductCollectionListing category="handmade" />
        </div>
      </div>
    </section>
  );
};

export default HandMade;
