import React from "react";

const Hero = () => {
  return (
    <div
      className="hero min-h-[800px] "
      style={{
        backgroundImage: "url('/home-hero.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="hero-content text-center text-smoke-white">
        <div className="md:max-w-md lg:max-w-lg">
          <p className="text-2xl">Explore</p>
          <h1 className="text-3xl lg:text-6xl md:text-5xl font-bold tracking-wider whitespace-nowrap overflow-visible">
            KAINKAIN COLLECTION
          </h1>
          <p className="text-2xl">By Tosin Josh</p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
