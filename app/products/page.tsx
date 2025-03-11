import Image from "next/image";
import productData from "@/public/data/productData.json";
import Link from "next/link";

const productPage = () => {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 mx-10 md:mx-20 mt-10 place-items-center">
      {productData.map((product, index) => (
        <div key={index} className="card shadow-lg  w-96  rounded-lg mx-auto  ">
          <figure>
            <Image
              src={product.img}
              alt={product.title}
              width={300}
              height={300}
            />
          </figure>
          <div className="card-body mx-auto">
            <h2 className="card-title">
              {product.title}
              <div className="badge badge-secondary">NEW</div>
            </h2>
            <p>From {product.price} NGN</p>
            <Link key={product.slug} href={`/products/${product.slug}`}>
              <div className="card-actions">
                <button className="btn btn-soft btn-warning">Buy Now</button>
              </div>
            </Link>
          </div>
        </div>
      ))}
    </section>
  );
};

export default productPage;
