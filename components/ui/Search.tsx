"use client";

import { Search } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import combinedProducts from "@/public/data/combinedProducts.json";

interface Product {
  id: number;
  slug: string;
  title: string;
  image: string;
  hoverImage?: string;
  price: number;
  category: string;
}

const SearchIcon = () => {
  const [iconClicked, setIconClicked] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    setIconClicked(!iconClicked);
    if (iconClicked) {
      setSearchQuery("");
      setShowSuggestions(false);
    }
  };

  // Filter products based on search query
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredProducts([]);
      setShowSuggestions(false);
      return;
    }

    const filtered = combinedProducts.products.filter((product) =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    setFilteredProducts(filtered.slice(0, 5)); // Show max 5 suggestions
    setShowSuggestions(filtered.length > 0);
  }, [searchQuery]);

  // Handle click outside to close search
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIconClicked(false);
        setShowSuggestions(false);
        setSearchQuery("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleProductClick = () => {
    setIconClicked(false);
    setShowSuggestions(false);
    setSearchQuery("");
  };

  return (
    <div className="relative flex items-center gap-4" ref={searchRef}>
      {iconClicked && (
        <div className="relative">
          <input
            type="search"
            placeholder="Search products..."
            value={searchQuery}
            onChange={handleInputChange}
            className="input bg-transparent border border-neutral w-64"
            autoFocus
          />
          
          {/* Search Suggestions */}
          {showSuggestions && filteredProducts.length > 0 && (
            <div className="absolute top-full left-0 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-50 max-h-80 overflow-y-auto">
              {filteredProducts.map((product) => (
                <Link
                  key={product.id}
                  href={`/products/${product.slug}`}
                  onClick={handleProductClick}
                  className="flex items-center gap-3 p-3 hover:bg-gray-100 transition-colors border-b last:border-b-0"
                >
                  <div className="relative w-12 h-12 flex-shrink-0">
                    <Image
                      src={product.image}
                      alt={product.title}
                      fill
                      className="object-cover rounded"
                      sizes="48px"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-gray-900 truncate">
                      {product.title}
                    </h4>
                    <p className="text-xs text-gray-500">
                      ₦{new Intl.NumberFormat("en-NG").format(product.price)}
                    </p>
                  </div>
                </Link>
              ))}
              
              {/* Show "View all results" if there are more products */}
              {combinedProducts.products.filter((product) =>
                product.title.toLowerCase().includes(searchQuery.toLowerCase())
              ).length > 5 && (
                <Link
                  href={`/products?search=${encodeURIComponent(searchQuery)}`}
                  onClick={handleProductClick}
                  className="block p-3 text-center text-sm text-blue-600 hover:bg-gray-50 font-medium"
                >
                  View all results
                </Link>
              )}
            </div>
          )}
          
          {/* No results message */}
          {showSuggestions && filteredProducts.length === 0 && searchQuery.trim() !== "" && (
            <div className="absolute top-full left-0 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-50">
              <div className="p-4 text-center text-gray-500 text-sm">
                No products found for &quot;{searchQuery}&quot;
              </div>
            </div>
          )}
        </div>
      )}
      <Search onClick={handleClick} className="cursor-pointer" />
    </div>
  );
};

export default SearchIcon;