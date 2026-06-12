"use client";
import Link from "next/link";
import Image from "next/image";
import MotionWrapper from "../MotionWrapper";
import combinedProducts from "@/public/data/combinedProducts.json";
import ButtonLink from "../ui/ButtonLink";

const ProductCards = () => {
  return (
    <MotionWrapper
      direction="up"
      mobileDirection="up"
      duration={0.8}
      mobileDuration={1.0}
      className="flex flex-col items-center space-y-4 md:space-y-6 px-4 py-6 md:py-10 container mx-auto"
    >
      <MotionWrapper
        direction="left"
        mobileDirection="right"
        delay={0.2}
        duration={0.6}
        mobileDuration={0.8}
      >
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-2xl font-bold text-center">
          PRINT ARTS SHOP
        </h1>
      </MotionWrapper>

      {/* Card Grid */}
      <MotionWrapper
        direction="up"
        delay={0.4}
        duration={0.8}
        mobileDuration={1.0}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-7xl"
      >
        {combinedProducts.products
          .filter((product) => product.category === "printart")
          .slice(0, 4)
          .map((product, index) => (
            <div
              key={product.id || index}
              className="bbg-[#ece8e5] text-black w-full overflow-hidden mx-auto aspect-[4/5]"
            >
              {/* Clickable Image */}
              <Link
                href={`/products/${product.slug}`}
                className="block relative w-full h-[70%]"
              >
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover absolute top-0 left-0 transition-transform duration-300 hover:scale-105 cursor-pointer"
                  priority
                />
              </Link>

              {/* Title, Price & Rating */}
              <div className="p-3 text-left h-[30%] flex flex-col justify-start">
                <h2 className="text-sm lg:text-sm sm:text-lg font-normal">
                  {product.title}
                </h2>

                {/* Rating (Dark Stars)
              <div className="rating flex justify-center mt-1 scale-75">
                <input type="radio" name={`rating-${product.id}`} className="mask mask-star bg-gray-950" aria-label="1 star" />
                <input type="radio" name={`rating-${product.id}`} className="mask mask-star bg-gray-950" aria-label="2 star" defaultChecked />
                <input type="radio" name={`rating-${product.id}`} className="mask mask-star bg-gray-950" aria-label="3 star" />
                <input type="radio" name={`rating-${product.id}`} className="mask mask-star bg-gray-950" aria-label="4 star" />
                <input type="radio" name={`rating-${product.id}`} className="mask mask-star bg-gray-950" aria-label="5 star" />
              </div> */}
              </div>
            </div>
          ))}
      </MotionWrapper>

      {/* View All Button */}
      <MotionWrapper
        direction="up"
        delay={0.3}
        duration={0.6}
        mobileDuration={0.8}
        className="flex justify-center"
      >
        <ButtonLink href="/products/print-arts"> View More</ButtonLink>
      </MotionWrapper>
    </MotionWrapper>
  );
};

export default ProductCards;
