import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-4 text-center p-4">
      <h2 className="text-xl">Not Found</h2>
      <p className="text-xl">Could not find requested resource</p>
      <Image
        src="/404-page-medium.jpg"
        alt="404 Not Found"
        width={200}
        height={200}
      />
      <Link href="/" className="underline font-semibold text-[#dcb094]">Return Home</Link>
    </div>
  );
}
