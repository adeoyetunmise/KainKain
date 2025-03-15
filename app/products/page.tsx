import Image from "next/image";
import productData from "@/public/data/productData.json";
import Link from "next/link";

const ProductPage = () => {
  return (
    <section className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 px-4 sm:px-6 lg:px-8 mt-6 md:mt-10">
      {productData.map((product, index) => (
        <div 
          key={index} 
          className="card bg-white shadow-md w-full max-w-[350px] rounded-lg overflow-hidden mx-auto"
        >
          {/* Image Container with fixed aspect ratio */}
          <div className="relative w-full pb-[75%]">  
            <Image
              src={product.img}
              alt={product.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover absolute top-0 left-0"
              priority={index < 3}
            />
          </div>

          {/* Card Content */}
          <div className="card-body p-4 text-center">
            <h2 className="card-title text-base sm:text-lg md:text-xl font-semibold line-clamp-2">
              {product.title}
              <div className="badge badge-secondary text-xs ml-1">NEW</div>
            </h2>
            <p className="text-black text-left font-semibold text-xs sm:text-sm md:text-base mt-1">
              From ₦{new Intl.NumberFormat("en-NG").format(product.price)}
            </p>

            {/* Buy Now Button */}
            <Link key={product.slug} href={`/products/${product.slug}`}>
              <div className="card-actions mt-3">
                <button className="btn btn-soft btn-warning w-full py-1 md:py-2 text-sm md:text-base">
                  Buy Now
                </button>
              </div>
            </Link>
          </div>
        </div>
      ))}
    </section>
  );
};

export default ProductPage;
