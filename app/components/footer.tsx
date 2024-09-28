import Link from "next/link";
import Image from "next/image";

const NAVLINKS = [
  {
    link: "../",
    img: "/home-page.png",
    alt: "Home",
  },
  {
    link: "/camera",
    img: "/camera-page.png",
    alt: "Camera",
  },
  {
    link: "/camera/scanned",
    img: "/scanned-page.png",
    alt: "Scanned",
  },
];

export const Footer = () => {
  return (
    <footer
      className="bg-[--light-header-footer] dark:bg-[--dark-header-footer] w-full py-2 px-7 flex items-center justify-between"
    >
      {NAVLINKS.map(({ link, img, alt }, index) => (
        <Link key={index} href={link}>
          <Image src={img} alt={alt} width={24} height={24} />
        </Link>
      ))}
    </footer>
  );
};
