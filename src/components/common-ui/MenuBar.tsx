"use client";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import Link from "next/link";

const MenuOptions: { key: string; title: string; href: string }[] = [
  {
    key: "home",
    title: "Home",
    href: "/",
  },
  { key: "map", title: "Map", href: "/map" },
  { key: "explore", title: "Explore", href: "/explore" },
  { key: "trip", title: "Plan Trip with Jha-AI", href: "/plan" },
];

export default function MenuBar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    console.log(window.scrollY);
    const scrolling = () => {
      setScrolled(window.scrollY > 700);
    };

    window.addEventListener("scroll", scrolling);
    return () => window.removeEventListener("scroll", scrolling);
  }, []);

  return (
    <div
      className={`flex justify-between items-center px-4 h-1/10 w-screen fixed top-0 z-1000 transition-all duration-200 bg-black text-white ${
        scrolled
          ? "border-b-2 shadow-md backdrop-blur-md"
          : "opacity-60 border-0"
      }`}
    >
      <div className="">
        <Button asChild variant="ghost" size="menuButton">
          <Link href="/">Jhar-Safar </Link>
        </Button>
      </div>
      <div className="flex justify-between space-x-5">
        {MenuOptions.map((option) => (
          <Button key={option.key} asChild variant="ghost" size="menuButton">
            <Link href={option.href}>{option.title}</Link>
          </Button>
        ))}
      </div>
      <div className="">
        <Button asChild variant="ghost" size="menuButton">
          <Link href="/login">Login/Logout</Link>
        </Button>
      </div>
    </div>
  );
}
