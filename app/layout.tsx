import Footer from "@/components/Footer";
import "./globals.css";
import NavBar from "@/components/NavBar";
import { Big_Shoulders_Display } from 'next/font/google';

const bigShouldersDisplay = Big_Shoulders_Display({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
});

export const metadata = {
  // ...existing metadata...
};

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
        className={`antialiased bg-[#ece8e5] ${bigShouldersDisplay.className}`}
        suppressContentEditableWarning={true}
      >
        <NavBar />
        {children}
        <Footer />
      </body>
    </html>
  );
}