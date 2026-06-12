"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import combinedProducts from "@/public/data/combinedProducts.json";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Product {
  id: number;
  slug: string;
  title: string;
  image: string;
  hoverImage?: string;
  images?: string[];
  description?: string;
  price: number;
  category: string;
}

const ProductDetails = () => {
  const params = useParams();

  const [product, setProduct] = useState<Product | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (params?.slug) {
      const foundProduct = combinedProducts.products.find(
        (p) => p.slug === params.slug,
      );
      setProduct(foundProduct || null);
    }
  }, [params]);

  if (!product) {
    return (
      <h1 className="text-center text-2xl font-bold mt-10">
        Product Not Found
      </h1>
    );
  }

  // Create array of images (main image + hover image + additional images if available)
  const images = product.images || [product.image];
  if (product.hoverImage && !product.images?.includes(product.hoverImage)) {
    images.push(product.hoverImage);
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
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
                <div
                  key={index}
                  className="w-full flex-shrink-0 flex items-center justify-center"
                >
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
                    currentImageIndex === index ? "bg-black" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Desktop Image Layout */}
        <div className="hidden md:block">
          <div className="flex items-center justify-center mb-4">
            <figure className="w-full">
              <Image
                src={images[currentImageIndex] || "/TJPG2415.jpg"}
                alt={product.title}
                width={400}
                height={400}
                className="p-10"
              />
            </figure>
          </div>

          <div className="grid grid-cols-4 gap-4 p-4">
            {images.map((image, index) => (
              <figure
                key={index}
                className={`cursor-pointer ${
                  currentImageIndex === index ? "border-2 border-black" : ""
                }`}
                onClick={() => setCurrentImageIndex(index)}
              >
                <Image
                  src={image}
                  alt={`${product.title} view ${index + 1}`}
                  width={200}
                  height={200}
                  className="w-full h-auto object-cover"
                />
              </figure>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-6 md:sticky md:mt-14 h-full">
        <h1 className="text-2xl font-bold text-gray-700">{product.title}</h1>

        {product.description && (
          <div className="text-gray-700 text-sm leading-relaxed">
            <p className="whitespace-pre-line">{product.description}</p>
          </div>
        )}

        <div className="border border-[#B5622A]/30 rounded-none p-5 bg-[#ECE8E5]">
          <h2 className="text-lg font-semibold text-[#1a1a1a] mb-1 tracking-wide uppercase">
            Need the Price?
          </h2>
          <p className="text-sm text-[#1a1a1a]/60 mb-5">
            Contact us on WhatsApp or via email to request pricing, check
            availability, and get more information about this product.
          </p>

          <div className="flex flex-col gap-3">
            <a
              href={`https://wa.me/2348036614674?text=${encodeURIComponent(`Hello, I'm interested in ${product.title}. Could you please provide the price and any additional details? Thank you.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-[#B5622A] hover:bg-[#9A5124] text-white font-medium py-3 px-4 transition-colors w-full tracking-wide"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
                className="w-5 h-5 fill-white"
              >
                <path d="M16 0C7.163 0 0 7.163 0 16c0 2.822.736 5.473 2.027 7.774L0 32l8.476-2.004A15.94 15.94 0 0 0 16 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm0 29.333a13.27 13.27 0 0 1-6.77-1.851l-.485-.287-5.03 1.188 1.234-4.902-.317-.503A13.267 13.267 0 0 1 2.667 16C2.667 8.636 8.636 2.667 16 2.667S29.333 8.636 29.333 16 23.364 29.333 16 29.333zm7.27-9.862c-.398-.199-2.355-1.162-2.72-1.294-.366-.133-.632-.199-.898.199-.266.398-1.03 1.294-1.263 1.56-.232.265-.465.298-.863.1-.398-.2-1.681-.619-3.202-1.977-1.183-1.057-1.982-2.362-2.214-2.76-.232-.398-.025-.613.175-.811.18-.178.398-.465.597-.697.2-.233.266-.399.398-.665.133-.266.067-.498-.033-.697-.1-.199-.898-2.165-1.23-2.963-.324-.778-.653-.673-.898-.685-.232-.01-.498-.013-.764-.013s-.697.1-.1063.498c-.365.398-1.395 1.363-1.395 3.323s1.428 3.857 1.628 4.122c.199.266 2.81 4.29 6.81 6.018.952.411 1.695.656 2.274.84.955.304 1.825.261 2.512.158.766-.114 2.355-.962 2.688-1.892.332-.93.332-1.727.232-1.892-.1-.166-.366-.266-.764-.465z" />
              </svg>
              Request Price on WhatsApp
            </a>

            <a
              href={`mailto:themodalandexperience@gmail.com?subject=${encodeURIComponent(`Price Inquiry – ${product.title}`)}&body=${encodeURIComponent(`Hello,\nI'm interested in ${product.title} and would like to know the current price, availability, and any additional information.\nThank you.`)}`}
              className="flex items-center justify-center gap-2 border border-[#B5622A] text-[#B5622A] hover:bg-[#B5622A] hover:text-white font-medium py-3 px-4 transition-colors w-full tracking-wide"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
                className="w-5 h-5"
              >
                <rect width="48" height="48" rx="8" fill="#fff" />
                <path
                  d="M8 13l16 12 16-12"
                  stroke="#EA4335"
                  strokeWidth="4"
                  fill="none"
                />
                <rect
                  x="8"
                  y="13"
                  width="32"
                  height="22"
                  rx="2"
                  fill="none"
                  stroke="#EA4335"
                  strokeWidth="4"
                />
              </svg>
              Email for Pricing
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
