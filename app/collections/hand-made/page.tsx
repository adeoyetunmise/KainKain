import ProductCollectionListing from "@/components/collections/ProductCollectionListing";

const HandMade = () => {
  return (
    <section className="w-full bg-[#ece8e5]" >
      <div className='pt-20 px-5 max-w-7xl mx-auto '>
      <h1 className='text-2xl md:text-4xl text-center mt-20'>KainKain HandMade</h1>

      <p className='text-center text-lg md:text-xl lg:text-2xl font-light py-10'>
        Discover the unique charm of our handmade collection, where each piece is crafted with care
        and creativity.
      </p>

      {/* <section className='flex flex-col items-center justify-center gap-4 mt-10'>
        <div
          className='w-full h-[300px] mb-20 rounded-4xl shadow-lg'
          style={{
            backgroundImage: "url('/TJPG6830.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            maxWidth: '1100px'
          }}
        />
      </section> */}

      <ProductCollectionListing category="handmade" />
</div>
    </section>
  );
};

export default HandMade;
