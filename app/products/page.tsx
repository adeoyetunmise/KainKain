import Image from "next/image";
import productData from "@/public/data/productData.json";
import Link from "next/link";

const ProductPage = () => {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6 sm:px-10 lg:px-20 mt-10 place-items-center">
      {productData.map((product, index) => (
        <div 
          key={index} 
          className="card shadow-lg w-full sm:w-80 lg:w-96 rounded-lg mx-auto"
        >
          {/* Image Container (Fixed Height) */}
          <figure className="w-full h-80">  
            <Image
              src={product.img}
              alt={product.title}
              width={400}
              height={320} // Ensures consistent height
              className="object-cover w-full h-full rounded-t-lg"
            />
          </figure>

          {/* Card Content */}
          <div className="card-body text-center">
            <h2 className="card-title text-sm  sm:text-xl font-semibold">
              {product.title}
              <div className="badge badge-secondary lg:text-xs text-xs sm:text-sm ml-2">NEW</div>
            </h2>
            <p className="text-black text-left font-semibold text-sm sm:text-base">
              From ₦{new Intl.NumberFormat("en-NG").format(product.price)}
            </p>

            {/* Buy Now Button */}
            <Link key={product.slug} href={`/products/${product.slug}`}>
              <div className="card-actions">
                <button className="btn btn-soft btn-warning w-full sm:w-auto px-6 py-2 text-sm sm:text-base">
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
