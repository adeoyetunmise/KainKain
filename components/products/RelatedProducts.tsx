'use client';
import { useState, useEffect } from 'react';
import combinedProducts from '@/public/data/combinedProducts.json';
import ProductCard from '@/components/ui/ProductCard';

// Define the shape of a product object to ensure type safety
interface Product {
  id: number;
  slug: string;
  title: string;
  image: string;
  hoverImage?: string;
  price: number;
  category: string;
}

// Props that can be passed to customize the RelatedProducts component
interface RelatedProductsProps {
  currentProductSlug?: string; // The slug of the current product being viewed (to exclude it)
  maxItems?: number;           // How many related products to show (default: 4)
  category?: string;           // Optional: only show products from this category
}

const RelatedProducts: React.FC<RelatedProductsProps> = ({ 
  currentProductSlug, 
  maxItems = 4,     // Default to showing 4 products if not specified
  category 
}) => {
  // State to store the randomly selected products
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);

  // useEffect runs when the component mounts or when dependencies change
  useEffect(() => {
    // STEP 1: Filter out the current product so we don't show it in related products
    let filteredProducts = combinedProducts.products.filter(
      (product) => product.slug !== currentProductSlug
    );

    // STEP 2: If a specific category is provided, only show products from that category
    if (category) {
      filteredProducts = filteredProducts.filter(
        (product) => product.category === category
      );
    }

    // STEP 3: Randomize the order of products
    // We create a copy with [...filteredProducts] to avoid mutating the original array
    // sort(() => Math.random() - 0.5) randomly shuffles the array
    // Math.random() returns 0-1, subtracting 0.5 gives us -0.5 to 0.5 for random sorting
    const shuffled = [...filteredProducts].sort(() => Math.random() - 0.5);
    
    // STEP 4: Take only the number of products we want to display
    const randomProducts = shuffled.slice(0, maxItems);
    
    // STEP 5: Update the state with our final selection
    setRelatedProducts(randomProducts);
  }, [currentProductSlug, maxItems, category]); // Re-run when any of these values change

  // If no products to show, don't render anything
  if (relatedProducts.length === 0) {
    return null;
  }
  
  return (
    <section className="mt-16">
      <h2 className="text-2xl mb-8">You may also like</h2>
      
      {/* Container with overflow hidden to prevent page shifting */}
      <div className="w-full overflow-hidden">
        <div className="carousel carousel-start w-full overflow-x-auto gap-4 pb-4">
          {relatedProducts.map((product, index) => (
            <div key={product.id} className="carousel-item w-64 flex-shrink-0">
              <ProductCard
                product={{
                  id: product.id,
                  slug: product.slug,
                  title: product.title,
                  image: product.image,
                  price: product.price,
                  category: product.category,
                }}
                index={index}
                showRating={false}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RelatedProducts;