import Image from "next/image";
import productData from '@/public/data/productData.json';

interface ProductPageProps {
  params: {
    slug: string;
  };
}

const ProductDetails = ({ params }: ProductPageProps) => {
  const product = productData.find((p) => p.slug === params.slug);

  if (!product) {
    return (
      <h1 className="text-center text-2xl font-bold mt-10">
        Product Not Found
      </h1>
    )
  }

  return (
    <section>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mx-10 md:mx-20 mt-10 place-items-center">
        <div className="border-b lg:border-r lg:border-b-0 flex items-center justify-center">
          <figure>
            <Image
              src={product.img || "/TJPG2415.jpg"} // Ensure src is not an empty string
              alt={product.title}
              width={300}
              height={300}
              className="p-10"
            />
          </figure>
        </div>

        <div className="flex flex-col gap-8">
          <h1 className="text-4xl font-bold">{product.title}</h1>

          <div className="flex gap-4">
            <div className="rating">
              <div className="mask mask-star" aria-label="1 star"></div>
              <div className="mask mask-star" aria-label="2 star"></div>
              <div className="mask mask-star" aria-label="3 star"></div>
              <div className="mask mask-star" aria-label="4 star"></div>
              <div
                className="mask mask-star"
                aria-label="5 star"
                aria-current="true"
              ></div>
            </div>
            <span className="text-gray-400">4 (1435)</span>
          </div>
          <p className="text-2xl">{product.price}</p>
          <div>
            <button className="btn btn-warning">Buy Now</button>
          </div>
          <h3 className="text-3xl">Limited stock</h3>
          <p>
            Order within <span className="font-bold">2 hrs 51 mins</span> and
            choose <span className="font-bold">2-Day shipping</span> to receive
            your product as soon as <span className="font-bold">Wednesday</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
