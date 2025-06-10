import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-black">
      <div className="container max-w-7xl mx-auto">
        <div className="footer sm:footer-horizontal justify-between text-white py-10 px-4 lg:px-6">
          <aside>
            <Image
              src="/KainKainn.png"
              alt="KainKain Logo"
              width={150}
              height={50}
            />
          </aside>

          <nav className="gap-4">
            <h6 className="font-bold text-lg">Links</h6>
            <Link className="link link-hover" href="/">
              Home
            </Link>
            <Link className="link link-hover" href="/about">
              About
            </Link>
            <Link className="link link-hover" href="/collections/print-art">
              Print Arts
            </Link>
            <Link className="link link-hover" href="/collections/hand-made">
              Hand Made Arts
            </Link>
          </nav>

          <nav>
            <h6 className="font-bold text-lg">Address</h6>
            <p>
              This catalogue was published on <br /> the occassion of the
              exhibition KAINKAIN 2024 <br /> at Untitiled, 59 Raymond Njoku
              Ikoyi
            </p>
            <p>© Toshjosh 2024</p>
          </nav>

          <nav>
            <h6 className="font-bold text-lg">For Enquires</h6>
            <p>
              <a href="tel:+2348036614674">+234 803 661 4674</a>
            </p>
            <p>
              {" "}
              <a href="mailto:themodalandexperience@gmail.com">
                themodalandexperience@gmail.com
              </a>
            </p>
            <div className="relative">
              <input
                type="search"
                placeholder="Search...."
                className="input bg-[#D9D9D9] placeholder:text-[#000000] w-[170px] text-black border-none rounded-none pr-10"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-black"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
