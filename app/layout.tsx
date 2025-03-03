
import Hero from "@/components/Hero";
import "./globals.css";
import NavBar from "@/components/NavBar";



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <NavBar />
        <Hero />

        {children}
      </body>
    </html>
  );
}
