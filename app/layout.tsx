import Footer from "@/components/Footer";
import "./globals.css";
import NavBar from "@/components/NavBar";

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
        {/* Add Google Font link directly */}
        <link
          href="https://fonts.googleapis.com/css2?family=Big+Shoulders+Display:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className="antialiased bg-[#ece8e5]"
        style={{ fontFamily: "'Big Shoulders Display', sans-serif" }}
        suppressContentEditableWarning={true}
      >
        <NavBar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
