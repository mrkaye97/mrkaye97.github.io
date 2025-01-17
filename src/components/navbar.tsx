import { Button } from "./ui/button";
import Link from "next/link";
import {
  Pencil1Icon,
  PersonIcon,
  HomeIcon,
  HeartIcon,
  PaperPlaneIcon,
  DrawingPinIcon,
} from "@radix-ui/react-icons";
import { useState } from "react";
import { Drawer, DrawerContent, DrawerTrigger } from "./ui/drawer";

const dropdownItems = [
  { name: "My three favorite", link: "/my-three-favorite", Icon: HeartIcon },
  {
    name: "Blog posts I like",
    link: "/blogroll",
    Icon: DrawingPinIcon,
  },
  { name: "Going places", link: "/travel", Icon: PaperPlaneIcon },
];

export function DesktopNavbar() {
  return (
    <nav className="bg-blue-600 py-4 md:px-8 justify-between items-center w-full hidden md:flex">
      <div className="flex space-x-2 max-w-screen-xl mx-auto">
        <Link href="/">
          <div className="text-white font-semibold hover:text-light-seafoam text-lg py-2 px-4">
            Home
          </div>
        </Link>
        <Link href="/blog">
          <div className="text-white font-semibold hover:text-light-seafoam text-lg py-2 px-4">
            Blog
          </div>
        </Link>
        <Link href="/my-three-favorite">
          <div className="text-white font-semibold hover:text-light-seafoam text-lg py-2 px-4">
            My three favorite
          </div>
        </Link>
        <Link href="/blogroll">
          <div className="text-white font-semibold hover:text-light-seafoam text-lg py-2 px-4">
            Blog posts I like
          </div>
        </Link>
        <Link href="/travel">
          <div className="text-white font-semibold hover:text-light-seafoam text-lg py-2 px-4">
            Travel
          </div>
        </Link>
      </div>
    </nav>
  );
}

type NavLinkProps = {
  type: "link";
  text: string;
  href: string;
  onClick?: never;
  Icon: React.ComponentType;
};

type NavButtonProps = {
  type: "button";
  text: string;
  href?: never;
  onClick: () => void;
  Icon: React.ComponentType;
};

function NavItem({
  type,
  href,
  text,
  onClick,
  Icon,
}: NavLinkProps | NavButtonProps) {
  switch (type) {
    case "link":
      return (
        <div className="flex h-[40px] items-center justify-center">
          <Link href={href} onClick={(e) => e.stopPropagation()}>
            <div className="flex flex-col items-center text-white hover:text-light-seafoam">
              <Icon />
              <p className="text-xs font-semibold">{text}</p>
            </div>
          </Link>
        </div>
      );
    case "button":
      return (
        <div className="flex h-[40px]">
          <Button
            variant="ghost"
            size="icon"
            onClick={onClick}
            className="flex flex-col items-center text-white hover:text-light-seafoam bg-transparent hover:bg-transparent gap-0"
          >
            <Icon />
            <p className="text-xs font-semibold">{text}</p>
          </Button>
        </div>
      );
  }
}

export function MobileNavbar() {
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <nav className="fixed bottom-0 w-full bg-blue-600 py-1 flex justify-around items-center shadow-lg md:hidden border-t border-white z-50 h-14">
        <NavItem type="link" text="Home" href="/" Icon={HomeIcon} />

        <Drawer
          open={isDrawerOpen}
          onOpenChange={setDrawerOpen}
          direction="bottom"
        >
          <DrawerTrigger asChild>
            <NavItem
              type="button"
              text="About"
              onClick={() => setDrawerOpen(!isDrawerOpen)}
              Icon={PersonIcon}
            />
          </DrawerTrigger>
          <DrawerContent className="m-0 p-0 py-2 bg-blue-600 rounded-none border-none">
            {dropdownItems.map((item) => (
              <div key={item.name} className="bg-white rounded-none">
                <Link href={item.link} onClick={() => setDrawerOpen(false)}>
                  <Button className="w-full justify-start items-start text-left text-white hover:bg-opacity-10 bg-blue-600 rounded-none">
                    <item.Icon className="w-6 h-6" />
                    {item.name}
                  </Button>
                </Link>
              </div>
            ))}
          </DrawerContent>
        </Drawer>
        <NavItem type="link" text="Blog" href="/blog" Icon={Pencil1Icon} />
      </nav>
    </>
  );
}
