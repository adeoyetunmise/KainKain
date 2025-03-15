import Footer from "@/components/Footer";
// import { Merriweather } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";

// const merriweather = Merriweather({
//   subsets: ["latin"],
//   weight: ["400", "700"],
// });

export const metadata = {
  // ...existing metadata...
}

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
      <body >
        <NavBar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
