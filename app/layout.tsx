import Footer from "@/components/Footer";
import "./globals.css";
import NavBar from "@/components/NavBar";

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
      <body>
        <NavBar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
