import ButtonLink from "../ui/ButtonLink";

const HandMadeHero = () => {
  return (
    <div
      className="hero min-h-[500px] -mt-10"
      style={{
        backgroundImage: "url('/hand-made-bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="hero-content text-center text-[#faf9f6]">
        <div className="md:max-w-md">
          <h2 className="text-2xl md:text-4xl font-bold">
            HAND MADE ARTS SHOP
          </h2>
          <ButtonLink
            className="mt-6 bg-[#faf9f6] border-none rounded-none shadow-none w-[30px] text-[#1a1a1a]"
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
