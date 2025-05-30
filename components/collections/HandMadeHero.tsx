import ButtonLink from '../ui/ButtonLink'

const HandMadeHero = () => {
  return (
    <div className="hero min-h-[500px]"
      style={{
        backgroundImage: "url('/hand-made-bg.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="hero-content text-center text-white">
        <div className="md:max-w-md">
          <h2 className="text-2xl md:text-4xl font-bold">HAND MADE ARTS SHOP</h2>
          <ButtonLink className='mt-6' href='/collections/hand-made'>Explore</ButtonLink>
        </div>
      </div>
    </div>
  )
}

export default HandMadeHero