"use client";

import { useState, useRef, useEffect } from "react";
import ProductGrid from "../products/ProductGrid";
import { ProductCardProps } from "../products/ProductCard";
import { motion, Variants } from "framer-motion";
import productsData from "@/public/data/combinedProducts.json";
import ButtonLink from "../ui/ButtonLink";
import AnimatedSection from "../ui/AnimatedSection";

type SortOption = "featured" | "price-low-high" | "price-high-low" | "newest";

interface ProductCollectionListingProps {
  category?: string;
}

const ProductCollectionListing = ({
  category,
}: ProductCollectionListingProps) => {
  const [error, setError] = useState<string | null>(null);

  let initialProducts: ProductCardProps[] = [];
  try {
    initialProducts =
      category && productsData?.products
        ? productsData.products.filter(
            (product) => product.category === category
          )
        : productsData?.products || [];
  } catch (err) {
    console.error("Error loading products data:", err);
    setError("Failed to load products. Please try again later.");
    initialProducts = [];
  }

  const [products] = useState<ProductCardProps[]>(initialProducts);
  const [filteredProducts, setFilteredProducts] =
    useState<ProductCardProps[]>(products);
  const [selectedSort] = useState<SortOption>("featured");
  const [priceRange] = useState({ from: "", to: "" });
  const [availability] = useState({
    inStock: false,
    outOfStock: false,
  });
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  useEffect(() => {
    let result = [...products];

    if (priceRange.from !== "" || priceRange.to !== "") {
      const minPrice = priceRange.from !== "" ? parseFloat(priceRange.from) : 0;
      const maxPrice =
        priceRange.to !== "" ? parseFloat(priceRange.to) : Infinity;
      result = result.filter(
        (product) => product.price >= minPrice && product.price <= maxPrice
      );
    }

    switch (selectedSort) {
      case "price-low-high":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high-low":
        result.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        result.sort((a, b) => (b.id || 0) - (a.id || 0));
        break;
      default:
        break;
    }

    setFilteredProducts(result);
  }, [products, selectedSort, priceRange, availability]);

  const [openFilters, setOpenFilters] = useState({
    availability: false,
    price: false,
    sort: false,
  });

  const availabilityRef = useRef<HTMLDivElement>(null);
  const priceRef = useRef<HTMLDivElement>(null);
  const sortRef = useRef<HTMLDivElement>(null);
  const mobileFilterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        openFilters.availability &&
        availabilityRef.current &&
        !availabilityRef.current.contains(event.target as Node)
      ) {
        setOpenFilters((prev) => ({ ...prev, availability: false }));
      }
      if (
        openFilters.price &&
        priceRef.current &&
        !priceRef.current.contains(event.target as Node)
      ) {
        setOpenFilters((prev) => ({ ...prev, price: false }));
      }
      if (
        openFilters.sort &&
        sortRef.current &&
        !sortRef.current.contains(event.target as Node)
      ) {
        setOpenFilters((prev) => ({ ...prev, sort: false }));
      }
      if (
        mobileFilterOpen &&
        mobileFilterRef.current &&
        !mobileFilterRef.current.contains(event.target as Node)
      ) {
        setMobileFilterOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openFilters, mobileFilterOpen]);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.42, 0, 1, 1],
      },
    },
  };

  return (
    <AnimatedSection>
      <motion.section
        className="py-6 sm:py-8 md:py-10 px-2 sm:px-4 md:px-8 lg:px-8"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {error ? (
          <div className="text-center py-10">
            <p className="text-red-500">{error}</p>
            <ButtonLink href="/" className="mt-4">
              Return to Home
            </ButtonLink>
          </div>
        ) : (
          <>
            <motion.div className="mb-6" variants={itemVariants}>
              <ProductGrid products={filteredProducts} />
            </motion.div>
          </>
        )}
      </motion.section>
    </AnimatedSection>
  );
};

export default ProductCollectionListing;
