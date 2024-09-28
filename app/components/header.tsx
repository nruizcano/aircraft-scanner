import { ModeToggle } from "./mode-toggle";
import Image from "next/image";

export const Header = () => {
  return (
    <header className="text-center bg-[linear-gradient(to_top,var(--light-header-footer),#2a2a2a)] dark:bg-[linear-gradient(to_top,var(--dark-header-footer),#131f40)] w-full p-2 flex flex-row items-center justify-between">
      <div className="flex flex-row items-center">
        <Image
          src="/logo.jpg"
          alt="App Logo"
          width={30}
          height={30}
          className="rounded-full"
        />
        <div className="px-2 text-white font-bold">Aircraft Scanner</div>
      </div>

      <ModeToggle />
    </header>
  );
};
