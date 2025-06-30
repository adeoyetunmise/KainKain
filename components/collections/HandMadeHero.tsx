import ButtonLink from "../ui/ButtonLink";

const HandMadeHero = () => {
  return (
    <div
      className="hero min-h-[80vh] -mt-10"
      style={{
        backgroundImage: "url('/hand-made-bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="hero-content text-center text-smoke-white">
        <div className="md:max-w-md ">
          <h2 className="text-2xl md:text-4xl font-bold">
            HAND MADE ARTS SHOP
          </h2>
          <ButtonLink
            className="mt-6 md:w-[30px] bg-smoke-white border-none rounded-none shadow-none text-custom-black"
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
