"use client";

import Image from "next/image";
import Link from "next/link";
import Button from "../../components/ui/Button";
import { useState, useRef, useEffect } from "react";
// import NotificationsDialog from "../../components/NotificationsDialog";

const PublicNavbar = () => {
  const [open, setOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

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
  }, [isOpen]);

  return (
    <nav className="w-full flex items-center justify-between bg-(--color-secondary) py-4 cursor-pointer px-4 md:px-8">
      {/* <NotificationsDialog isOpen={open} onClose={() => setOpen(false)} /> */}

      {/* Logo */}
      <Link href="/about-us">
        <div>
          <Image
            src="/images/navbar/new-bango-logo.svg"
            alt="The logo at the navigation bar"
            width={153}
            height={32}
          />
        </div>
      </Link>

      {/* Middle Navigation Menu */}
      <ul className="hidden flex-1 md:flex list-none justify-center gap-8">
        <Link href="/timeline" className="nav-link">
          <li>Timeline</li>
        </Link>
        <Link href="/form/step-1" className="nav-link">
          <li>Submit Price</li>
        </Link>
        <Link href="/find-price" className="nav-link">
          <li>Find Prices</li>
        </Link>
        <Link href="/about-us" className="nav-link">
          <li>About Us</li>
        </Link>
      </ul>

      {/* Right side - Buttons */}
      <Button
        firstBtn="Login"
        secondBtn="Register"
        firstHref="/login"
        secondHref="/register"
        className="hidden md:flex"
      />

      {/* Mobile menu button */}
      <div className="flex justify-end md:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex flex-col gap-1.5 mr-4"
        >
          <span className="block w-6 h-0.5 bg-black"></span>
          <span className="block w-6 h-0.5 bg-black"></span>
          <span className="block w-6 h-0.5 bg-black"></span>
        </button>
      </div>

      {/* Mobile menu */}
      <div
        ref={menuRef}
        className={`fixed top-0 left-0 h-screen w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        md:hidden z-20`}
      >
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 text-xl font-bold"
        >
          ✕
        </button>

        <ul className="flex flex-col gap-6 mt-16 list-none px-4">
          <Link
            href="/timeline"
            className="hover:text-purple-600 cursor-pointer"
            onClick={() => setIsOpen(false)}
          >
            <li>Timeline</li>
          </Link>
          <Link
            href="/form/step-1"
            className="hover:text-purple-600 cursor-pointer"
            onClick={() => setIsOpen(false)}
          >
            <li>Submit Price</li>
          </Link>
          <Link
            href="/find-price"
            className="hover:text-purple-600 cursor-pointer"
            onClick={() => setIsOpen(false)}
          >
            <li>Find Prices</li>
          </Link>
          <Link
            href="/about-us"
            className="hover:text-purple-600 cursor-pointer"
            onClick={() => setIsOpen(false)}
          >
            <li>About Us</li>
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

      {isOpen && (
        <div
          className="fixed inset-0 bg-opacity-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </nav>
  );
};

export default PublicNavbar;
