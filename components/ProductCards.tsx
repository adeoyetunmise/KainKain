"use client"; // Ensure it's a Client Component

import Link from "next/link";

const products = [
  {
    id: 1,
    title: "Aladire",
    img: "/TJPG2393.jpg",
    description: "Dyed Kainkain, on canvas with resin, acrylic white paint. 36 x 48 inches,",
    price: "N4,000,000",
    slug:"aladire"
  },
  {
    id: 2,
    title: "Egbon Adugbo (kęlęgbę Męgbę series) 2024",
    img: "/EgbonAdugbo.jpg",
    description: "Acrylic print, Edition 1/5, 24 x 36 inches.",
    price: "N1,000,000",
    slug:"egbon-adugbo"
  },
  {
    id: 3,
    title: "Lifegiver",
    img: "/TJPG2301.jpg",
    description: "Kainkain on canvas with resin oil and acrylic paint, 36 x 48 inches.",
    price: "N3,000,000",
    slug:"life-giver"

  },
];

const ProductCards = () => {
  return (
    <div className="flex flex-col items-center space-y-6 px-4 py-10">
      <h1 className="text-2xl sm:text-4xl lg:text-4xl font-bold text-center">
        Limited Edition Prints
      </h1>

      {/* Card Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white border text-black w-full max-w-sm shadow-lg p-4 rounded-lg mx-auto"
          >
            <figure className="overflow-hidden rounded-lg">
              <img
                src={product.img}
                alt={product.title}
                className="transition-transform duration-300 hover:scale-110 w-full h-64 object-cover"
              />
            </figure>
            <div className="text-center py-4">
              <h2 className="text-sm lg:text-lg font-semibold">{product.title}</h2>
              <p className="text-gray-600 lg:text-xs text-xs">{product.description}</p>
              <p className="font-bold lg:text-lg text-sm text-gray-800 mt-2">PRICE: {product.price}</p>
              <div className="mt-4">
              <Link href={`/products/${product.slug}`}>
                <button className="btn btn-soft btn-warning w-full sm:w-auto px-6 py-2">
                  Buy Now
                </button>
                </Link>

              </div>
            </div>
          </div>
        ))}
      </div>

      {/* View All Button */}
      <Link href="/products">
        <button className=" btn-outline btn  btn-default  lg:h-16 text-lg px-8 py-3  sm:w-auto">
          View All
        </button>
      </Link>
    </div>
  );
};

export default ProductCards;
