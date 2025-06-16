import ButtonLink from "../ui/ButtonLink";

const PrintArtHero = () => {
  return (
    <div
      className="hero min-h-[500px]"
      style={{
        backgroundImage: "url('/print-art-hero.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="hero-content text-center text-[#faf9f6]">
        <div className="md:max-w-md">
          <h2 className="text-2xl lg:text-5xl md:text-4xl font-bold">
            PRINT ARTS SHOP
          </h2>
          <ButtonLink
            className="mt-6 bg-[#faf9f6] text-[#1a1a1a] border-none rounded-none shadow-none w-[30px] text-sm"
            href="/collections/print-art"
          >
            Explore
          </ButtonLink>
        </div>
      </div>
    </div>
  );
};

export default PrintArtHero;
