"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import combinedProducts from "@/public/data/combinedProducts.json";
import { useCartStore } from "@/store/cartStore";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ButtonLink from "../ui/ButtonLink";
import CheckoutSidebar from "../ui/CheckoutSidebar";

interface Product {
  id: number;
  slug: string;
  title: string;
  image: string;
  hoverImage?: string;
  price: number;
  category: string;
}

const ProductDetails = () => {
  const params = useParams();
  const addToCart = useCartStore((state) => state.addToCart);
  
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isCheckoutSidebarOpen, setIsCheckoutSidebarOpen] = useState(false);

  useEffect(() => {
    if (params?.slug) {
      const foundProduct = combinedProducts.products.find(
        (p) => p.slug === params.slug
      );
      setProduct(foundProduct || null);
    }
  }, [params]);

  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decrementQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const handleAddToCart = () => {
    if (product) {
      for (let i = 0; i < quantity; i++) {
        addToCart({
          slug: product.slug,
          title: product.title,
          price: product.price.toString(),
          img: product.image,
        });
      }
      // Show the checkout sidebar after adding to cart
      setIsCheckoutSidebarOpen(true);
    }
  };

  if (!product) {
    return (
      <h1 className="text-center text-2xl font-bold mt-10">
        Product Not Found
      </h1>
    );
  }

  // Create array of images (main image + hover image if available)
  const images = [product.image];
  if (product.hoverImage && product.hoverImage !== product.image) {
    images.push(product.hoverImage);
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-8 md:h-screen">
        <div className="h-full overflow-y-scroll no-scrollbar">
          {/* Mobile Image Gallery */}
          <div className="md:hidden">
            <div className="relative overflow-hidden">
              <div 
                className="flex transition-transform duration-300 ease-in-out"
                style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
              >
                {images.map((image, index) => (
                  <div key={index} className="w-full flex-shrink-0 flex items-center justify-center">
                    <figure className="relative w-full max-w-md">
                      <Image
                        src={image || "/TJPG2415.jpg"}
                        alt={product.title}
                        width={400}
                        height={400}
                        className="w-full h-auto"
                      />
                    </figure>
                  </div>
                ))}
              </div>
              
              {/* Navigation arrows - only show if more than 1 image */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors z-10"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors z-10"
                  >
                    <ChevronRight size={20} />
                  </button>
                </>
              )}
            </div>
            
            {/* Image indicators - only show if more than 1 image */}
            {images.length > 1 && (
              <div className="flex justify-center gap-2 mt-4">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      currentImageIndex === index ? 'bg-black' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Desktop Image Layout */}
          <div className="hidden md:block">
            <div className="flex items-center justify-center">
              <figure>
                <Image
                  src={product.image || "/TJPG2415.jpg"}
                  alt={product.title}
                  width={400}
                  height={400}
                  className="p-10"
                />
              </figure>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <figure>
                <Image
                  src={product.hoverImage || "/TJPG2415.jpg"}
                  alt={product.title}
                  width={400}
                  height={400}
                />
              </figure>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col gap-8 md:sticky md:mt-14 h-full">
          <h1 className="text-2xl font-bold text-gray-700">
            {product.title}
          </h1>

          <p className="text-lg font-bold">
            ₦{new Intl.NumberFormat("en-NG").format(product.price)}
          </p>

          <div>
            <p className="">Quantity</p>

            <div className="inline-flex items-center border gap-4 p-1">
              <button
                className="px-3 py-1 text-lg font-medium cursor-pointer"
                onClick={decrementQuantity}
              >
                -
              </button>
              <span className="px-3 py-1 text-lg">{quantity}</span>
              <button
                className="px-3 py-1 text-lg font-medium cursor-pointer"
                onClick={incrementQuantity}
              >
                +
              </button>
            </div>
          </div>

          <div>
            <button
              className="btn w-full py-6 bg-black text-white hover:bg-gray-800 transition-colors"
              onClick={handleAddToCart}
            >
              Add to Cart ({quantity})
            </button>
          </div>

          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius
            nulla quidem sapiente, nam esse ipsam in eum quia neque dolorem
            impedit? Officiis veritatis quas quidem asperiores in, iste
            expedita laborum?
          </p>
        </div>
      </div>

      {/* Checkout Sidebar */}
      <CheckoutSidebar
        isOpen={isCheckoutSidebarOpen}
        onClose={() => setIsCheckoutSidebarOpen(false)}
      />
    </>
  );
};

export default ProductDetails;