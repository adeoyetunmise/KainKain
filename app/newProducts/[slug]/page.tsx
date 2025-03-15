import { notFound } from "next/navigation";
import Image from "next/image";
import productsData from "@/app/data/products.json"; // Import JSON file

type Product = {
  id: number;
  title: string;
  image: string;
  hoverImage?: string;
  price: string;
  slug: string;
};

// Generate all possible slug values at build time
export async function generateStaticParams() {
  return productsData.map((product: Product) => ({
    slug: product.slug,
  }));
}

export default function ProductPage({
  params,
}: {
  params: { slug: string }
}) {
  // Find the product based on the slug
  const product = productsData.find(
    (p: Product) => p.slug === params.slug
  );

  // If product not found, return 404
  if (!product) {
    return notFound();
  }

  return (
    <div className="container mx-auto p-6 text-center">
      <h1 className="text-4xl font-bold mb-4">{product.title}</h1>
      <Image src={product.image} alt={product.title} width={400} height={300} className="mx-auto" />
      <p className="text-xl font-semibold mt-2">{product.price}</p>
    </div>
  );
}
