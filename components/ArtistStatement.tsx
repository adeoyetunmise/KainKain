import React from "react";
import Image from "next/image";

const ArtistStatement: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start gap-8 py-16 px-4 md:px-6 lg:px-8 container mx-auto bg-gray-50">
      {/* Left Content */}
      <div className="flex-1 space-y-10 space-x-20">
        <h2 className="text-2xl font-bold tracking-wide uppercase">
          ARTIST STATEMENT
        </h2>

        <p className="text-black">
          Kainkain embodies my authentic self and my deepest roots. My history
          with the material runs deep; my grandmother sold local sponges, and I
          vividly remember the transformative act of shaping them. This
          nostalgia emerged as I began my current project, driven by the belief
          that anything can be created from anything.
        </p>

        <p className="text-black">
          While photography started as a business, requiring me to pause my
          artistic endeavors, making art has connected me to my old self—the
          young boy who made things with his own hands. I was able to channel my
          soul into each of these pieces. Now, the camera is just one of the
          many tools I use in expressing myself.
        </p>

        <p className="text-black">
          Ultimately, Kainkain, made from a plant, symbolizes the essence of
          roots, bridging my childhood experiences and my artistic journey. This
          exhibition is not only a celebration of my art but also a tribute to
          the materials I work with and the endless possibilities they
          represent.
        </p>

        <button className="bg-black text-white px-6 py-2 mt-4 hover:bg-gray-800 transition-colors">
          Read More
        </button>
      </div>

      {/* Right Images - Overlapping layout */}
      <div className="flex-1 relative">
        {/* Container for the overlapping images */}
        <div className="relative h-[520px] w-full">
          {/* Rectangular Image (positioned slightly up from the bottom) */}
          <div className="absolute bottom-14 left-0 w-[96%] h-[250px]">
            <Image
              src="/Rectangle 2.png"
              alt="Additional gallery view"
              fill
              style={{ objectFit: "cover" }}
              className=" "
            />
          </div>

          {/* Main Image (positioned to overlap) */}
          <div className="absolute top-0 right-0 w-[96%] h-[440px] z-10">
            <Image
              src="/JOSH0310.jpeg"
              alt="Art gallery exhibition with colorful textile displays"
              fill
              style={{ objectFit: "cover" }}
              className=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtistStatement;
