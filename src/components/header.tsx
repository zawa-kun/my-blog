'use client'

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const linkClass =
    "hover:text-gray-600 hover:scale-110 transition duration-300";

  return (
    <header className="absolute flex flex-col">
    </header>
  );
}
