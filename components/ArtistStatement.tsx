import React from "react";
import Image from "next/image";

const ArtistStatement: React.FC = () => {
  return (
    <section className="bg-custom-black sm:bg-smoke-white pt-3 sm:pt-4 md:pt-6">
      <div className="flex flex-col lg:flex-row justify-between items-start gap-6 sm:gap-8 py-8 sm:py-12 md:py-16 px-4 sm:px-6 lg:px-8 container mx-auto">
        {/* Left Content */}
        <div className="flex-1 space-y-6 lg:space-x-14 sm:space-y-8 md:space-y-10">
          <h2 className=" text-[#dba05d] sm:text-custom-black text-xl sm:text-2xl font-bold tracking-wide uppercase">
            ARTIST STATEMENT
          </h2>

          <p className="text-white sm:text-custom-black text-sm sm:text-base">
            Kainkain embodies my authentic self and my deepest roots. My history
            with the material runs deep; my grandmother sold local sponges, and
            I vividly remember the transformative act of shaping them. This
            nostalgia emerged as I began my current project, driven by the
            belief that anything can be created from anything.
          </p>

          <p className="text-white sm:text-custom-black text-sm sm:text-base">
            While photography started as a business, requiring me to pause my
            artistic endeavors, making art has connected me to my old self—the
            young boy who made things with his own hands. I was able to channel
            my soul into each of these pieces. Now, the camera is just one of
            the many tools I use in expressing myself.
          </p>

          <p className="text-white sm:text-custom-black text-sm sm:text-base">
            Ultimately, Kainkain, made from a plant, symbolizes the essence of
            roots, bridging my childhood experiences and my artistic journey.
            This exhibition is not only a celebration of my art but also a
            tribute to the materials I work with and the endless possibilities
            they represent.
          </p>

          <button className="bg-[#dba05d] text-black sm:bg-custom-black sm:text-smoke-white px-4 sm:px-6 py-2 lg:mt-10 mt-2 sm:mt-4 hover:bg-yellow-500 sm:hover:bg-custom-black/80 transition-colors text-sm sm:text-base">
            Read More
          </button>
        </div>

        {/* Right Images - Hidden on mobile, visible on lg screens and up */}
        <div className="hidden lg:block flex-1 relative w-full mt-8 lg:mt-0 max-w-full sm:max-w-[500px] lg:max-w-full mx-auto lg:mx-0">
          {/* Container for the overlapping images - responsive height */}
          <div className="relative h-[300px] sm:h-[350px] md:h-[400px] lg:h-[480px] xl:h-[520px] w-full">
            {/* Rectangular Image - responsive positioning */}
            <div className="absolute bottom-8 sm:bottom-10 md:bottom-12 lg:bottom-14 left-0 w-[88%] sm:w-[90%] md:w-[92%] lg:w-[96%] h-[160px] sm:h-[180px] md:h-[200px] lg:h-[230px] xl:h-[250px]">
              <Image
                src="/Rectangle 2.png"
                alt="Additional gallery view"
                fill
                style={{ objectFit: "cover" }}
                className="shadow-md"
              />
            </div>

            {/* Main Image - responsive positioning */}
            <div className="absolute top-0 right-0 w-[88%] sm:w-[90%] md:w-[92%] lg:w-[96%] h-[260px] sm:h-[300px] md:h-[350px] lg:h-[400px] xl:h-[440px] z-10">
              <Image
                src="/JOSH0310.jpeg"
                alt="Art gallery exhibition with colorful textile displays"
                fill
                style={{ objectFit: "cover" }}
                className="shadow-md"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ArtistStatement;
