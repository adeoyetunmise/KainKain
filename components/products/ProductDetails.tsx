"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import combinedProducts from "@/public/data/combinedProducts.json";
import { useCartStore } from "@/store/cartStore";
import { useEffect, useState } from "react";

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

     const params = useParams(); // Get slug from the dynamic route
      const addToCart = useCartStore((state) => state.addToCart);
    
      const [product, setProduct] = useState<Product | null>(null);
      const [quantity, setQuantity] = useState(1);
    
      useEffect(() => {
        if (params?.slug) {
          // Find the product by slug from combinedProducts.json
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
        }
      };
    
      if (!product) {
        return (
          <h1 className="text-center text-2xl font-bold mt-10">
            Product Not Found
          </h1>
        );
      }

  return (
    <div className="grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-8 md:h-screen">
          <div className="h-full overflow-y-scroll no-scrollbar">
            <div className="flex items-center justify-center">
              <figure>
                <Image
                  src={product.image || "/TJPG2415.jpg"} // Using the image property from combinedProducts
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
                  src={product.hoverImage || "/TJPG2415.jpg"} // Using the hoverImage property if available
                  alt={product.title}
                  width={400}
                  height={400}
                  className="hidden md:block"
                />
              </figure>
            </div>
          </div>
          <div className="flex flex-col gap-8 md:sticky md:mt-14 h-full">
            <h1 className="text-2xl font-bold text-gray-700">
              {product.title}
            </h1>

            {/* {product.description && (
            <p className="text-gray-600">{product.description}</p>
          )} */}

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
              <button className="btn w-full py-6" onClick={handleAddToCart}>
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
  )
}

export default ProductDetails