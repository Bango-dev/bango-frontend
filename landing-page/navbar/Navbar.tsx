"use client";
import Image from "next/image";
import Link from "next/link";
import Button from "../../app/components/ui/Button";
import { useState, useRef, useEffect } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // ✅ Close when clicking outside the menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, setIsOpen]);
  return (
    <nav className=" w-full flex   items-center justify-between   bg-[var(--color-secondary)] py-4 cursor-pointer">
      <div>
        <Image
          className=" pl-4"
          src="/images/navbar/navbar-logo.svg"
          alt="The logo at the navigation bar"
          width={153}
          height={32}
        />
      </div>

      <ul className="hidden md:flex   list-none ">
        <Link href="/form/step-1" className="nav-link">
          <li>Submit Price</li>
        </Link>

        <Link href="/coming-soon" className="nav-link">
          <li>Top Sellers</li>
        </Link>
        <Link href="/find-price" className="nav-link">
          <li>Find Prices</li>
        </Link>
      </ul>

      <div>
        <Button
          firstBtn="Login"
          secondBtn="Register"
          firstHref="/sign-in"
          secondHref="/sign-up"
          className="hidden md:flex"
        />
      </div>

      {/* Right: Hamburger menu (Mobile only) */}
      <div className="flex-shrink-0  flex  justify-end md:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex flex-col gap-1.5 mr-4"
        >
          <span className="block w-6 h-0.5 bg-black"></span>
          <span className="block w-6 h-0.5 bg-black"></span>
          <span className="block w-6 h-0.5 bg-black"></span>
        </button>
      </div>

      {/* Slide-in Mobile Menu */}
      <div
        ref={menuRef}
        className={`fixed top-0 left-0 h-screen w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out
    ${isOpen ? "translate-x-0" : "-translate-x-full"}
  md:hidden z-20 `}
      >
        {/* Close button inside menu */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 text-xl font-bold"
        >
          ✕
        </button>

        {/* Menu items */}
        <ul className="flex flex-col items-start gap-6 mt-16 ml-6 list-none">
          <Link
            href="/form/step-1"
            className="hover:text-purple-600 cursor-pointer"
            onClick={() => setIsOpen(false)}
          >
            <li>Submit Price</li>
          </Link>

          <Link
            href="/coming-soon"
            className="hover:text-purple-600 cursor-pointer"
            onClick={() => setIsOpen(false)}
          >
            <li>Top Sellers</li>
          </Link>

          <Link
            href="/find-price"
            className="hover:text-purple-600 cursor-pointer"
            onClick={() => setIsOpen(false)}
          >
            <li>Find Prices</li>
          </Link>
          <Button
            firstBtn="Login"
            secondBtn="Register"
            firstHref="/login"
            secondHref="/register"
            onClick={() => setIsOpen(false)}
          />
        </ul>
      </div>

      {/* Dark overlay behind the menu */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-opacity-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </nav>
  );
};
export default Navbar;
