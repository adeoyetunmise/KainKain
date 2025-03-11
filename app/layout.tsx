import Footer from "@/components/Footer";
import { Merriweather } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";


const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["400", "700"],
});



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body  className={merriweather.className}>
        <NavBar />
        
        {children}
        <Footer />
      </body>
    </html>
  );
}
