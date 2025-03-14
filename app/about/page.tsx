import Image from "next/image";

export default function About() {
  return (
    <section className="container mx-auto p-6">
      <div className="flex flex-col md:flex-row mt-10 items-center gap-8">
        {/* Artist Image */}
        <div className="w-full md:w-1/3">
          <Image
            src="/TJPG5795bb.jpg" // Update with actual image path
            alt="Artist Portrait"
            width={400}
            height={500}
            className="rounded-lg shadow-lg object-cover w-full"
          />
        </div>

        {/* Biography */}
        <div className="w-full md:w-2/3 space-y-6">
          <h2 className="text-lg lg:text-xl text-gray-700   font-bold">BIOGRAPHY</h2>
          <p className="text-gray-700 text-sm lg:text-lg text-justify">
            Tosin Josh is a self-taught photographer based in Lagos, Nigeria, with a passion for art in its many forms.
            His artistic journey began in childhood, exploring drawing, painting, crafting, and sound engineering. 
            What started as a side hustle in photography has evolved into a significant part of his career.
          </p>
          <p className="text-gray-700 text-sm lg:text-lg text-justify">
            Tosin has collaborated with prominent organizations such as UBA, Zenith Bank, HushD.ng, and RedTV, and 
            his work has been featured on various platforms across Africa. With over 130,000 followers on social media, 
            he recognizes the vast potential still ahead of him.
          </p>
          <p className="text-gray-700 text-sm lg:text-lg text-justify">
            Inspired by his love for Lagos, his home, and the rich culture of Africa, Tosin creates unique art using 
            the local kainkain sponge. In November 2024, he held his first solo exhibition at Utilitied Gallery, Ikoyi, 
            Lagos, showcasing his journey of self-discovery and artistic reconnection. At heart, he is an artist dedicated 
            to exploring the endless possibilities of his craft.
          </p>
        </div>
      </div>

      {/* Artist Statement */}
      <div className="mt-12">
        <h2 className="text-lg lg:text-xl text-gray-700  font-bold">ARTIST STATEMENT</h2>
        <p className="text-gray-700 text-sm lg:text-lg text-justify mt-2">
          Kainkain embodies my authentic self and my deepest roots. My history with the material runs deep; my grandmother 
          sold local sponges, and I vividly remember the transformative act of shaping them. This nostalgia emerged as I 
          began my current project, driven by the belief that anything can be created from anything.
        </p>
        <p className="text-gray-700 text-sm lg:text-lg text-justify mt-5">
          While photography started as a business, requiring me to pause my artistic endeavors, making art has connected 
          me to my old self—the young boy who made things with his own hands. I was able to channel my soul into each of 
          these pieces. Now, the camera is just one of the many tools I use in expressing myself.
        </p>
        <p className="text-gray-700 text-sm lg:text-lg text-justify mt-5">
          Ultimately, Kainkain, made from a plant, symbolizes the essence of roots, bridging my childhood experiences and 
          my artistic journey. This exhibition is not only a celebration of my art but also a tribute to the materials I 
          work with and the endless possibilities they represent.
        </p>
      </div>
    </section>
  );
}
