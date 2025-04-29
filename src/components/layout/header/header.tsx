"use client";
import NavLinks from "@/components/layout/header/nav-links";
import ZawaKunIcon from "@/components/layout/header/zawa-kun-icon";
import HamburgerMenu from "@/components/ui/hamburgerMenu";

export default function Header() {
  return (
    <header>
      <nav className="fixed top-0 left-0 w-full z-50 border-b border-gray-200 ">
        <div className="h-16 flex items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex gap-3">
            <HamburgerMenu />
            <ZawaKunIcon />
          </div>
          <div className="hidden md:block">
            <NavLinks />
          </div>
        </div>
      </nav>
    </header>
  );
}
