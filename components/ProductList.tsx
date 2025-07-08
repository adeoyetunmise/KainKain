"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import combinedProducts from "@/public/data/combinedProducts.json";
import ButtonLink from "./ui/ButtonLink";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";

// Define the Product type
type Product = {
  id?: number;
  title: string;
  image: string;
  hoverImage?: string;
  price: number;
  slug: string;
  category: string;
};

// Custom hook to detect if viewport is mobile
const useMobileDetect = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return isMobile;
};

export default function ProductList() {
  const isMobile = useMobileDetect();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [currentPage, setCurrentPage] = useState(0);

  const handmadeProducts = combinedProducts.products
    .filter((product) => product.category === "handmade")
    .slice(0, 4); // Limit to exactly 4 products

  const totalPages = Math.ceil(handmadeProducts.length / 2); // Show 2 items per page on mobile

  const scrollNext = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: scrollContainerRef.current.offsetWidth,
        behavior: "smooth",
      });
      setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1));
    }
  };

  const scrollPrev = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -scrollContainerRef.current.offsetWidth,
        behavior: "smooth",
      });
      setCurrentPage((prev) => Math.max(prev - 1, 0));
    }
  };

  // Monitor scroll position to update currentPage
  useEffect(() => {
    if (!isMobile || !scrollContainerRef.current) return;

    const handleScroll = () => {
      if (scrollContainerRef.current) {
        const scrollPosition = scrollContainerRef.current.scrollLeft;
        const containerWidth = scrollContainerRef.current.offsetWidth;
        const newPage = Math.round(scrollPosition / containerWidth);
        setCurrentPage(newPage);
      }
    };

    const container = scrollContainerRef.current;
    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [isMobile]);

  return (
    <section
      className={`w-full ${isMobile ? "bg-custom-black" : "bg-smoke-white"}`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16">
        <h1
          className={`text-xl lg:text-2xl ${
            isMobile ? "text-[#dba05d]" : "text-custom-black"
          } mt-1 sm:text-2xl md:text-3xl font-bold mb-6`}
        >
          HAND MADE ARTS SHOP
        </h1>

        {isMobile ? (
          // Mobile horizontal scroll layout with larger images
          <div className="relative">
            <div
              ref={scrollContainerRef}
              className="flex overflow-x-auto snap-x snap-mandatory gap-3 scrollbar-hide pb-1"
            >
              {handmadeProducts.map((product: Product, index) => (
                <div
                  key={index}
                  className="min-w-[55%] flex-shrink-0 snap-center" // Increased from 45% to 55%
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>

            {/* Pagination indicator with React icons and fixed denominator of 4 */}
            <div className="w-full flex justify-center items-center mt-4">
              <button
                onClick={scrollPrev}
                className="text-smoke-white p-1"
                aria-label="Previous page"
              >
                <IoChevronBack size={18} />
              </button>
              <span className="mx-2 text-sm text-smoke-white">
                {currentPage + 1}/4
              </span>
              <button
                onClick={scrollNext}
                className="text-smoke-white p-1"
                aria-label="Next page"
              >
                <IoChevronForward size={18} />
              </button>
            </div>
          </div>
        ) : (
          // Desktop grid layout
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full"
          >
            {handmadeProducts.map((product: Product, index) => (
              <ProductCard key={index} product={product} />
            ))}
          </motion.div>
        )}

        <div className="flex justify-center mt-8">
          <ButtonLink
            className="bg-[#dba05d] text-black sm:bg-custom-black sm:text-smoke-white flex items-center justify-center whitespace-nowrap w-3 text-sm rounded-none"
            href="/collections/hand-made"
          >
            View All
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}

const ProductCard = ({ product }: { product: Product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const isMobile = useMobileDetect();

  // Format price with commas
  const formattedPrice = product.price.toLocaleString();

  return (
    <Link
      href={`/products/${product.slug}`}
      className={`block ${
        isMobile ? "" : "bg-smoke-white"
      } text-center transition duration-300 h-full`}
    >
      <div
        className="relative w-full aspect-[3/4]" // Adjusted aspect ratio to make image taller
        onMouseEnter={() => !isMobile && setIsHovered(true)}
        onMouseLeave={() => !isMobile && setIsHovered(false)}
      >
        <Image
          src={
            isHovered && product.hoverImage ? product.hoverImage : product.image
          }
          alt={product.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover absolute top-0 left-0 transition-all duration-500 ease-in-out"
        />

        {product.price < 150000 && (
          <div className="absolute bottom-0 right-0  text-smoke-white text-xs py-1 px-2">
            Sale
          </div>
        )}
      </div>
      <div className="mt-1">
        <h2
          className={`text-sm font-bold ${
            isMobile ? "text-smoke-white" : "text-custom-black"
          } line-clamp-2 text-left`}
        >
          {product.title}
        </h2>
        <p
          className={`text-sm ${
            isMobile ? "text-smoke-white" : "text-custom-black"
          } mt-0.5 text-left`}
        >
          &#8358; {formattedPrice}
        </p>
      </div>
    </Link>
  );
};
