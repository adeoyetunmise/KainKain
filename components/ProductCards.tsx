"use client"; // Ensure it's a Client Component

import Link from "next/link";
import Image from "next/image";

const products = [
  {
    id: 1,
    title: "Aladire",
    img: "/TJPG2393.jpg",
    description: "Dyed Kainkain, on canvas with resin, acrylic white paint. 36 x 48 inches.",
    price: "N4,000,000",
    slug: "aladire"
  },
  {
    id: 2,
    title: "Egbon Adugbo (kęlęgbę Męgbę series) 2024",
    img: "/EgbonAdugbo.jpg",
    description: "Acrylic print, Edition 1/5, 24 x 36 inches.",
    price: "N1,000,000",
    slug: "egbon-adugbo"
  },
  {
    id: 3,
    title: "Lifegiver",
    img: "/TJPG2301.jpg",
    description: "Kainkain on canvas with resin oil and acrylic paint, 36 x 48 inches.",
    price: "N3,000,000",
    slug: "life-giver"
  },
];

const ProductCards = () => {
  return (
    <div className="flex flex-col items-center space-y-4 md:space-y-6 px-4 py-6 md:py-10 container mx-auto">
      <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-center">
        Limited Edition Prints
      </h1>

      {/* Card Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 w-full max-w-7xl">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white text-black w-full max-w-[350px] shadow-md rounded-lg overflow-hidden mx-auto"
          >
            {/* Image with aspect ratio */}
            <div className="relative w-full pb-[75%]">
              <Image
                src={product.img}
                alt={product.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover absolute top-0 left-0 transition-transform duration-300 hover:scale-105"
                priority
              />
            </div>
            
            <div className="p-4 text-center">
              <h2 className="text-base sm:text-lg md:text-xl font-semibold line-clamp-2">
                {product.title}
              </h2>
              <p className="text-gray-600 text-xs sm:text-sm mt-1 line-clamp-2">
                {product.description}
              </p>
              <p className="font-bold text-sm sm:text-base md:text-lg text-gray-800 mt-2">
                PRICE: {product.price}
              </p>
              <div className="mt-3 md:mt-4">
                <Link href={`/products/${product.slug}`}>
                  <button className="btn btn-soft btn-warning w-full py-1 md:py-2 text-xs sm:text-sm md:text-base">
                    Buy Now
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* View All Button */}
      <Link href="/products" className="mt-4 md:mt-6">
        <button className="btn-outline btn btn-default h-10 md:h-12 lg:h-14 text-sm md:text-base lg:text-lg px-6 md:px-8 py-2 md:py-3">
          View All
        </button>
      </Link>
    </div>
  );
};

export default ProductCards;
