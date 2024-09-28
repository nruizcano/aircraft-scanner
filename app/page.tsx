import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center h-full">
      <Image
        src="/logo.jpg"
        alt="App Logo"
        width={250}
        height={250}
        className="rounded-full"
      />

      <h1 className="pt-10 pb-14 font-bold text-3xl">Aircraft Scanner</h1>

      <Link
        href="/camera"
        prefetch={true}
        className="flex rounded-lg px-5 py-2 bg-[--buttons] text-white text-xl font-bold shadow-xl transition-all duration-100 hover:bg-[--hover-buttons] hover:scale-110"
      >
        Scan
      </Link>
    </main>
  );
}
