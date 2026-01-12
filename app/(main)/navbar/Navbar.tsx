"use client";

import Image from "next/image";
import Link from "next/link";
import Button from "../../components/ui/Button";
import { useState, useRef, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import PrimaryButton from "../../components/ui/PrimaryButton";
import { MdOutlineLogout } from "react-icons/md";
import NotificationsDialog from "../../components/NotificationsDialog";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const { user, logout, loading } = useContext(AuthContext);

  console.log("Navbar user:", user);
  const logoHref = user ? "/timeline" : "/about-us";

  //  Close mobile menu when clicking outside
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

  if (loading) return null; // or skeleton navbar

  return (
    <nav className="w-full flex items-center justify-between bg-(--color-secondary) py-4 cursor-pointer">
      <NotificationsDialog isOpen={open} onClose={() => setOpen(false)} />
      <Link href={logoHref}>
        <div>
          <Image
            className="pl-4"
            src="/images/navbar/new-bango-logo.svg"
            alt="The logo at the navigation bar"
            width={153}
            height={32}
          />
        </div>
      </Link>

      <ul className="hidden md:flex list-none">
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

      {/* DESKTOP: If user NOT logged in → show Login/Register */}
      {!user && (
        <div>
          <Button
            firstBtn="Login"
            secondBtn="Register"
            firstHref="/login"
            secondHref="/register"
            className="hidden md:flex"
          />
        </div>
      )}

      {/* DESKTOP: If logged in → Show logout */}
      {user && (
        <div className="flex items-center justify-center ">
          {/* <Image
            className="hidden md:block"
            src="/images/navbar/bell-icon.svg"
            alt="The logo at the navigation bar"
            width={18}
            height={21}
            onClick={() => setOpen(true)}
          />
          <span className="hidden md:block nav-link ">Rose Doe</span>
          <Image
            // className="pl-4"
            src="/images/navbar/profile-pic.png"
            alt="The logo at the navigation bar"
            width={32}
            height={32}
            className="hidden md:block"
          /> */}
          {/* <PrimaryButton
            text="Logout"
            onClick={logout}
            className="hidden md:flex px-4 py-2 mx-4"
          /> */}
          <MdOutlineLogout
            onClick={logout}
            className="text-(--color-primary) w-8 h-8 hidden md:flex  mx-2 "
          />
        </div>
      )}

      {/* Right: Hamburger menu (Mobile only) */}
      <div className=" flex justify-end md:hidden">
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
        md:hidden z-20`}
      >
        {/* Close button */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 text-xl font-bold"
        >
          ✕
        </button>

        {/* Menu items */}
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

          {!user && (
            <Button
              firstBtn="Login"
              secondBtn="Register"
              firstHref="/login"
              secondHref="/register"
              onClick={() => setIsOpen(false)}
            />
          )}

          {user && (
            <PrimaryButton
              text="Logout"
              className="mt-6 w-full"
              onClick={() => {
                setIsOpen(false);
                logout();
              }}
            />
          )}
        </ul>
      </div>

      {/* Dark overlay */}
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
