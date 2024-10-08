import React, { useState, useEffect, useRef } from "react";

type DropdownItem = {
  name: string;
  link: string;
};

export type DropdownProps = {
  buttonText: string;
  dropdownItems: DropdownItem[];
};

export default function Dropdown({ buttonText, dropdownItems }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [alignLeft, setAlignLeft] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && dropdownRef.current) {
      const dropdownRect = dropdownRef.current.getBoundingClientRect();
      if (dropdownRect.right > window.innerWidth) {
        setAlignLeft(true);
      } else {
        setAlignLeft(false);
      }
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <div
      className="relative inline-block text-left"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        id="dropdownHoverButton"
        className="text-white bg-darker-blue hover:text-light-seafoam focus:ring-4 focus:ring-darker-blue focus:outline-none font-semibold rounded-lg text-lg px-4 py-2 text-center inline-flex items-center"
        type="button"
        onClick={() => setIsOpen(!isOpen)}
      >
        {buttonText}
        <svg
          className="w-2.5 h-2.5 ms-3"
          aria-hidden="true"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>

      <div
        id="dropdownHover"
        ref={dropdownRef}
        className={`absolute z-10 ${
          isOpen ? "block" : "hidden"
        } bg-dark-blue divide-y divide-gray-100 rounded-lg shadow w-48 ${
          alignLeft ? "right-0" : "left-0"
        }`}
      >
        <ul
          className="py-2 text-lg text-white"
          aria-labelledby="dropdownHoverButton"
        >
          {dropdownItems.map((item) => (
            <li key={item.link}>
              <a
                href={item.link}
                className="block px-4 py-2 hover:text-light-seafoam"
              >
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
