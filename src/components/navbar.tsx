import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import Link from "next/link";
import {
  ChevronDownIcon,
  EnvelopeClosedIcon,
  Pencil1Icon,
  PersonIcon,
  HomeIcon,
  HeartIcon,
  PaperPlaneIcon,
  CodeIcon,
  DrawingPinIcon,
} from "@radix-ui/react-icons";
import { useRef, useState } from "react";
import { Drawer, DrawerContent, DrawerTrigger } from "./ui/drawer";

const dropdownItems = [
  { name: "My three favorite", link: "/my-three-favorite", Icon: HeartIcon },
  {
    name: "Blog posts I like",
    link: "/blog-posts-i-like",
    Icon: DrawingPinIcon,
  },
  { name: "Going places", link: "/travel", Icon: PaperPlaneIcon },
  { name: "Code", link: "/code", Icon: CodeIcon },
];

export function DesktopNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const openMenu = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }
    setIsOpen(true);
  };

  const closeMenu = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 500);
  };

  return (
    <nav className="bg-darker-blue py-4 md:px-8 justify-between items-center w-full hidden md:flex">
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
        <Link href="/contact">
          <div className="text-white font-semibold hover:text-light-seafoam text-lg py-2 px-4">
            Contact
          </div>
        </Link>
        <DropdownMenu open={isOpen}>
          <DropdownMenuTrigger
            asChild
            onMouseEnter={openMenu}
            onMouseLeave={closeMenu}
          >
            <Button className="text-white font-semibold hover:text-light-seafoam text-lg py-2 px-2 m-0 bg-transparent border-none hover:bg-transparent h-[44px]">
              About Me
              <ChevronDownIcon className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-56 bg-darker-blue text-white"
            onMouseEnter={openMenu}
            onMouseLeave={closeMenu}
          >
            <DropdownMenuGroup className="hover:bg-none focus:bg-none">
              {dropdownItems.map((item) => (
                <DropdownMenuItem
                  key={item.name}
                  className="focus:bg-darker-blue focus:text-light-seafoam w-full"
                >
                  <Link
                    href={item.link}
                    onClick={() => setIsOpen(false)}
                    className="w-full"
                  >
                    {item.name}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
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
      <nav className="fixed bottom-0 w-full bg-darker-blue py-1 flex justify-around items-center shadow-lg md:hidden border-t border-white z-50 h-14">
        <NavItem type="link" text="Home" href="/" Icon={HomeIcon} />
        <NavItem type="link" text="Blog" href="/blog" Icon={Pencil1Icon} />
        <NavItem
          type="link"
          text="Contact"
          href="/contact"
          Icon={EnvelopeClosedIcon}
        />
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
          <DrawerContent className="m-0 p-0 py-2 bg-darker-blue rounded-none border-none">
            {dropdownItems.map((item) => (
              <div key={item.name} className="bg-white rounded-none">
                <Link href={item.link} onClick={() => setDrawerOpen(false)}>
                  <Button className="w-full justify-start items-start text-left text-white hover:bg-opacity-10 bg-darker-blue rounded-none">
                    <item.Icon className="w-6 h-6" />
                    {item.name}
                  </Button>
                </Link>
              </div>
            ))}
          </DrawerContent>
        </Drawer>
      </nav>
    </>
  );
}
