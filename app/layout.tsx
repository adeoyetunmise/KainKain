import Footer from "@/components/Footer";
import "./globals.css";
import NavBar from "@/components/NavBar";
import { Big_Shoulders_Display } from "next/font/google";

export const metadata = {
  // ...existing metadata...
}


const bigShoulders = Big_Shoulders_Display({
  weight: ["400", "700"], // You can add other weights like "300", "800", etc.
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
      </head>
      <body className={`${bigShoulders.className} antialiased bg-[#ece8e5]`}>
        <NavBar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
