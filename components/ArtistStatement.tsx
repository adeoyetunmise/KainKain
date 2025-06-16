import React from "react";
import Image from "next/image";

const ArtistStatement: React.FC = () => {
  return (
    <div className="flex flex-col lg:flex-row justify-between items-start gap-8 py-16 px-6 md:px-8 lg:px-4 container md:max-w-7xl mx-auto bg-[#ece8e5]">
      {/* Left Content */}
      <div className="flex-1 space-y-6">
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

      {/* Right Image */}
      <div className="flex-1 relative min-h-80 lg:h-96 w-full">
        <Image
          src="/JOSH0310.png"
          alt="Artist Image"
          fill
          className="object-cover"
        />
      </div>
    </div>
  );
};

export default ArtistStatement;
