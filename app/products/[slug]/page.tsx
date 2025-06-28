"use client";

import { useParams } from "next/navigation";
import combinedProducts from "@/public/data/combinedProducts.json";
import { useEffect, useState } from "react";
import RelatedProducts from "@/components/products/RelatedProducts";
import ProductDetails from "@/components/products/ProductDetails";

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

const ProductPage = () => {
  const params = useParams(); // Get slug from the dynamic route
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
      <div className="min-h-screen flex gap-10 items-center justify-center">
        <div className="flex w-52 flex-col gap-4">
          <div className="skeleton h-32 w-full"></div>
          <div className="skeleton h-4 w-28"></div>
          <div className="skeleton h-4 w-full"></div>
          <div className="skeleton h-4 w-full"></div>
        </div>
        <div className="flex w-52 flex-col gap-4">
          <div className="skeleton h-32 w-full"></div>
          <div className="skeleton h-4 w-28"></div>
          <div className="skeleton h-4 w-full"></div>
          <div className="skeleton h-4 w-full"></div>
        </div>
      </div>
    );
  }

  return (
    <section className="bg-smoke-white">
      <div className="mx-10 md:mx-20 pt-20">
        <ProductDetails />

        {/* Related Products Section - shows random products from the same category */}
        <RelatedProducts
          currentProductSlug={product?.slug} // Don't show the current product
          maxItems={4} // Show 4 related products
          category={product?.category} // Only show products from same category (handmade/printart)
        />
      </div>
    </section>
  );
};

export default ProductPage;
