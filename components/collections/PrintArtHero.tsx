import ButtonLink from "../ui/ButtonLink"


const PrintArtHero = () => {
  return (
    <div className="hero min-h-[500px]"
      style={{
        backgroundImage: "url('/print-art-hero.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="hero-content text-center text-white">
        <div className="md:max-w-md">
          <h2 className="text-2xl md:text-4xl font-bold">PRINT ARTS SHOP</h2>
          <ButtonLink className='mt-6' href='/products/print-art'>Explore</ButtonLink>
        </div>
      </div>
    </div>
  )
}

export default PrintArtHero