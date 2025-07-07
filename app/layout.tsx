import Footer from "@/components/Footer";
import "./globals.css";
import NavBar from "@/components/NavBar";
import { Big_Shoulders_Display } from "next/font/google";

export const metadata = {
  // ...existing metadata...
};

// Updated font configuration with display option
const bigShoulders = Big_Shoulders_Display({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-big-shoulders",
  adjustFontFallback: false, // Try disabling font fallback optimization
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0"
        />
      </head>
      <body
        className={`${bigShoulders.className} antialiased bg-[#ece8e5]`}
        suppressContentEditableWarning={true}
      >
        <NavBar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
