"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import combinedProducts from "@/public/data/combinedProducts.json";
import { useCartStore } from "@/store/cartStore";
import { useEffect, useState } from "react";

const ProductDetails = () => {
  const params = useParams(); // Get slug from the dynamic route
  const addToCart = useCartStore((state) => state.addToCart);

  // Define the product structure based on combinedProducts.json
  interface Product {
    id: number;
    slug: string;
    title: string;
    image: string;
    hoverImage?: string;
    price: number;
    category: string;
  }

  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (params?.slug) {
      // Find the product by slug from combinedProducts.json
      const foundProduct = combinedProducts.products.find(
        (p) => p.slug === params.slug
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

  return (
    <section>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mx-10 md:mx-20 mt-10 place-items-center">
        <div className="border-b lg:border-r lg:border-b-0 flex items-center justify-center">
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

        <div className="flex flex-col gap-8">
          <h1 className="text-2xl font-bold text-gray-700">{product.title}</h1>

          {/* {product.description && (
            <p className="text-gray-600">{product.description}</p>
          )} */}

          <div className="flex gap-4">
            <div className="rating text-black">
              <div className="mask mask-star " aria-label="1 star"></div>
              <div className="mask mask-star" aria-label="2 star"></div>
              <div className="mask mask-star" aria-label="3 star"></div>
              <div className="mask mask-star" aria-label="4 star"></div>
              <div
                className="mask mask-star"
                aria-label="5 star"
                aria-current="true"
              ></div>
            </div>
            <span className="text-gray-700">4 (1435)</span>
          </div>

          <p className="text-lg font-bold">
            ₦{new Intl.NumberFormat("en-NG").format(product.price)}
          </p>

          <div>
            <button
              className="btn btn-warning"
              onClick={() =>
                addToCart({
                  slug: product.slug,
                  title: product.title,
                  price: product.price.toString(),
                  img: product.image,
                })
              }
            >
              Buy Now
            </button>
          </div>

          <h3 className="text-lg text-gray-700">Limited stock</h3>
          <p className="text-sm text-gray-700">
            Order within <span className="font-bold">2 hrs 51 mins</span> and
            choose <span className="font-bold">2-Day shipping</span> to receive
            your product as soon as{" "}
            <span className="font-bold">Wednesday</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
