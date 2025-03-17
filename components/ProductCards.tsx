"use client"; // Ensure it's a Client Component

import Link from "next/link";
import Image from "next/image";

const products = [
  {
    id: 1,
    title: "Aladire",
    img: "/TJPG2393.jpg",
    description: "Dyed Kainkain, on canvas with resin, acrylic white paint. 36 x 48 inches.",
    price: "4,000,000",
    slug: "aladire"
  },
  {
    id: 2,
    title: "Egbon Adugbo ",
    img: "/EgbonAdugbo.jpg",
    description: "Acrylic print, Edition 1/5, 24 x 36 inches.",
    price: "1,000,000",
    slug: "egbon-adugbo"
  },
  {
    id: 3,
    title: "Lifegiver",
    img: "/TJPG2301.jpg",
    description: "Kainkain on canvas with resin oil and acrylic paint, 36 x 48 inches.",
    price: "3,000,000",
    slug: "life-giver"
  },
  {
    id: 4,
    title: "Echoes Of Freedom",
    img: "/EchoesOfFreedomi.jpg",
    description: "Acrylic and mixed media on canvas, 40 x 40 inches.",
    price: "500,000",
    slug: "sacred-threads"
  }
];

const ProductCards = () => {
  return (
    <div className="flex flex-col items-center space-y-4 md:space-y-6 px-4 py-6 md:py-10 container mx-auto">
      <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-center">
        Limited Edition Prints
      </h1>

      {/* Card Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 w-full max-w-7xl">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white text-black w-full overflow-hidden mx-auto aspect-[4/5]" // Increased height (4:5 aspect ratio)
          >
            {/* Clickable Image - Square Format */}
            <Link href={`/products/${product.slug}`} className="block relative w-full h-[70%]">
              <Image
                src={product.img}
                alt={product.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover absolute top-0 left-0 transition-transform duration-300 hover:scale-105 cursor-pointer"
                priority
              />
            </Link>

            <div className="p-3 text-center h-[30%] flex flex-col justify-start">
              <h2 className="text-base sm:text-lg font-semibold">
                {product.title}
              </h2>
              <p className="font-normal text-sm sm:text-lg text-gray-900 mt-1">From ₦ 
                {product.price} NGN
              </p>
              {/* <p className="text-gray-600 text-xs sm:text-sm">
                {product.description}
              </p> */}
              
            </div>
          </div>
        ))}
      </div>

      {/* View All Button */}
      <Link href="/products" className="mt-4 md:mt-6">
        <button className="btn-outline bg-black rounded-none text-white btn btn-default h-10 md:h-12 text-sm md:text-base px-6 md:px-8 py-2 md:py-3 border-0">
          View All
        </button>
      </Link>
    </div>
  );
};

export default ProductCards;
