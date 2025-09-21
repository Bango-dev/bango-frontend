"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className="flex items-center bg-[var(--color-secondary)] p-6 cursor-pointer">
      <div className="flex-shrink-0 w-[153px]">
        <Image
          className=" justify-self-start border-bottom"
          src="/images/navbar/navbar-logo.png"
          alt="The logo at the navigation bar"
          width={153}
          height={32}
        />
      </div>

      <ul className="hidden md:flex justify-center flex-1 gap-6 list-none">
        <Link href="/comming-soon" className="nav-link">
          <li>Submit Price</li>
        </Link>

        <Link href="/comming-soon" className="nav-link">
          <li>Top Sellers</li>
        </Link>
        <Link href="/comming-soon" className="nav-link">
          <li>Find Prices</li>
        </Link>
      </ul>

      {/* Right: Hamburger menu (Mobile only) */}
      <div className="flex-shrink-0  flex flex-1 justify-end md:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex flex-col gap-1.5"
        >
          <span className="block w-6 h-0.5 bg-black"></span>
          <span className="block w-6 h-0.5 bg-black"></span>
          <span className="block w-6 h-0.5 bg-black"></span>
        </button>
      </div>

      {/* Slide-in Mobile Menu */}
      <div
        className={`fixed top-0 left-0 h-screen w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        md:hidden z-10 `}
      >
        {/* Close button inside menu */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 text-xl font-bold"
        >
          ✕
        </button>

        {/* Menu items */}
        <ul className="flex flex-col items-start gap-6 mt-16 ml-6  list-none">
          <Link
            href="/comming-soon"
            className="hover:text-purple-600 cursor-pointer"
          >
            <li>Submit Price</li>
          </Link>

          <Link
            href="/comming-soon"
            className="hover:text-purple-600 cursor-pointer"
          >
            <li>Top Sellers</li>
          </Link>
          <Link
            href="/comming-soon"
            className="hover:text-purple-600 cursor-pointer"
          >
            <li>Find Prices</li>
          </Link>
        </ul>
      </div>

      {/* Dark overlay behind the menu */}
      {isOpen && (
        <div
          className="fixed inset-0  bg-opacity-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </nav>
  );
};
export default Navbar;
