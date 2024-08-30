import Link from "next/link";
import Dropdown from "./dropdown";

export default function Navbar() {
  return (
    <nav className="bg-darker-blue py-4 md:px-8 flex justify-between items-center w-full">
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
        <Dropdown
          buttonText="About Me"
          dropdownItems={[
            { name: "My three favorite", link: "/my-three-favorite" },
            { name: "Going places", link: "/travel" },
            { name: "Code", link: "/code" },
          ]}
        />
      </div>
    </nav>
  );
}
