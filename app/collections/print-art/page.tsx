import ProductCollectionListing from '@/components/collections/ProductCollectionListing'
import React from 'react'

const PrintArt = () => {
  return (
    <section className='mt-20 px-5 max-w-7xl mx-auto'>
        <h1 className='text-2xl md:text-4xl text-center'>KainKain Print Art</h1>
    
        <p className='text-center text-lg md:text-xl lg:text-2xl font-light py-10'>
            Explore our exclusive collection of print art, where creativity meets craftsmanship.
        </p>
    
        <section className='flex flex-col items-center justify-center gap-4 mt-10'>
            <div 
              className='w-full h-[300px] mb-20 rounded-4xl shadow-lg' 
              style={{
                backgroundImage: "url('/TimePassesInSoundii.jpg')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                maxWidth: '1100px'
              }}
            />
        </section>        {/* ProductCollectionListing component with printart category filter */}
        <ProductCollectionListing category="printart" />
    </section>
  )
}

export default PrintArt