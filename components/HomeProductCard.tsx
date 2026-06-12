"use client";
import combinedProducts from "@/public/data/combinedProducts.json";
import ButtonLink from "./ui/ButtonLink";
import MotionWrapper from "./MotionWrapper";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";

// Define the Product type to match ProductList
type Product = {
  id?: number;
  title: string;
  image: string;
  hoverImage?: string;
  mobileImage?: string; // Add mobile image property
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

// Create a custom ProductCard component similar to the one in ProductList
const CustomProductCard = ({ product }: { product: Product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const isMobile = useMobileDetect();

  // Determine which image to display based on screen size
  const displayImage = isMobile
    ? product.mobileImage || product.image // Use mobile image if available, otherwise fallback
    : isHovered && product.hoverImage
      ? product.hoverImage
      : product.image;

  return (
    <Link
      href={`/products/${product.slug}`}
      className={`block ${
        isMobile ? "" : "bg-smoke-white"
      } text-center hover:transition max-w-[350px] mx-auto w-full`}
    >
      <div
        className="relative w-full aspect-[3/4] overflow-hidden"
        onMouseEnter={() => !isMobile && setIsHovered(true)}
        onMouseLeave={() => !isMobile && setIsHovered(false)}
      >
        <Image
          src={displayImage}
          alt={product.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover absolute top-0 left-0 transition-all duration-500 ease-in-out group-hover:scale-105"
        />
      </div>
      <div className="pt-3">
        <h2
          className={`text-sm lg:text-base ${
            isMobile ? "text-smoke-white" : "text-custom-black"
          } font-bold line-clamp-2 text-left`}
        >
          {product.title}
        </h2>
      </div>
    </Link>
  );
};

const HomeProductCard = () => {
  const isMobile = useMobileDetect();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [currentPage, setCurrentPage] = useState(0);

  const printArtProducts = combinedProducts.products
    .filter((product) => product.category === "printart")
    .slice(0, 4);

  const totalPages = Math.ceil(printArtProducts.length / 2); // Show 2 items per page on mobile

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
    <MotionWrapper
      direction="up"
      mobileDirection="up"
      duration={0.8}
      mobileDuration={1.0}
      className={`w-full ${
        isMobile ? "bg-custom-black" : ""
      } max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center py-6 md:py-20`}
    >
      <MotionWrapper
        direction="left"
        mobileDirection="right"
        delay={0.2}
        duration={0.6}
        mobileDuration={0.8}
        className="w-full self-start"
      >
        <h1
          className={`text-xl sm:text-2xl ${
            isMobile ? "text-[#dba05d]" : "text-custom-black"
          } md:text-3xl lg:text-2xl font-bold mb-4 md:mb-6`}
        >
          PRINT ARTS SHOP
        </h1>
      </MotionWrapper>

      {isMobile ? (
        // Mobile horizontal scroll layout with larger images
        <MotionWrapper
          direction="right"
          mobileDirection="left"
          delay={0.4}
          duration={0.8}
          mobileDuration={1.0}
          className="relative w-full"
        >
          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto snap-x snap-mandatory gap-3 scrollbar-hide pb-1 w-full"
          >
            {printArtProducts.map((product, index) => (
              <div
                key={product.id || index}
                className="min-w-[55%] flex-shrink-0 snap-center"
              >
                <CustomProductCard product={product} />
              </div>
            ))}
          </div>

          {/* Pagination indicator with React icons */}
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
        </MotionWrapper>
      ) : (
        // Desktop grid layout
        <MotionWrapper
          direction="up"
          delay={0.4}
          duration={0.8}
          className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full"
        >
          {printArtProducts.map((product, index) => (
            <CustomProductCard key={product.id || index} product={product} />
          ))}
        </MotionWrapper>
      )}

      {/* View All Button */}
      <MotionWrapper
        direction="up"
        delay={0.2}
        duration={0.6}
        mobileDuration={0.8}
        className="flex justify-center mt-8 md:mt-10"
      >
        <ButtonLink
          className={`${
            isMobile ? "bg-[#dba05d] text-black" : "bg-[#1a1a1a] text-[#faf9f6]"
          } border-none rounded-none shadow-none flex items-center justify-center whitespace-nowrap w-3 text-sm`}
          href="/collections/print-art"
        >
          View All
        </ButtonLink>
      </MotionWrapper>
    </MotionWrapper>
  );
};

export default HomeProductCard;
