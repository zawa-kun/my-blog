"use client";
import NavLinks from "@/components/layouts/header/nav-links";
import ZawaKunIcon from "@/components/layouts/header/zawa-kun-icon";

export default function Header() {
  return (
    <header>
      <nav className="fixed top-0 left-0 w-full z-50 border-b border-gray-200 ">
        <div className="h-16 flex items-center justify-between px-4 sm:px-6 lg:px-8">
          <ZawaKunIcon />
          <div className="hidden md:block">
            <NavLinks />
          </div>
        </div>
      </nav>
    </header>
  );
}
