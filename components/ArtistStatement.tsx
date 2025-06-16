import React from "react";
import Image from "next/image";

const ArtistStatement: React.FC = () => {
  return (
    <section className="bg-smoke-white pt-6">
      <div className="flex flex-col md:flex-row justify-between items-stretch gap-8 py-16 px-4 md:px-6 lg:px-8 container mx-auto">
        {/* Left Content */}
        <div className="flex-1 space-y-10 space-x-18 flex flex-col">
          <h2 className="text-2xl font-bold tracking-wide uppercase">
            ARTIST STATEMENT
          </h2>

          <div className="flex-1 space-y-6">
            <p className="text-[#1a1a1a]">
              Kainkain embodies my authentic self and my deepest roots. My history
              with the material runs deep; my grandmother sold local sponges, and I
              vividly remember the transformative act of shaping them. This
              nostalgia emerged as I began my current project, driven by the belief
              that anything can be created from anything.
            </p>

            <p className="text-[#1a1a1a]">
              While photography started as a business, requiring me to pause my
              artistic endeavors, making art has connected me to my old self—the
              young boy who made things with his own hands. I was able to channel my
              soul into each of these pieces. Now, the camera is just one of the
              many tools I use in expressing myself.
            </p>

            <p className="text-[#1a1a1a]">
              Ultimately, Kainkain, made from a plant, symbolizes the essence of
              roots, bridging my childhood experiences and my artistic journey. This
              exhibition is not only a celebration of my art but also a tribute to
              the materials I work with and the endless possibilities they
              represent.
            </p>
          </div>

          <button className="bg-[#1a1a1a] text-[#faf9f6] px-6 py-2 mt-auto hover:bg-gray-800 transition-colors self-start">
            Read More
          </button>
        </div>

        {/* Right Image */}
        <div className="flex-1 relative min-h-[500px] w-full">
          <Image
            src="/JOSH0310.png"
            alt="Artist Image"
            fill
            className="object-fit"
          />
        </div>
      </div>
    </section>
  );
};

export default ArtistStatement;
