"use client";
import NavLinks from "@/components/layout/header/nav-links";
import ZawaKunIcon from "@/components/layout/header/zawa-kun-icon";
import HamburgerMenu from "@/components/ui/hamburgerMenu";

export default function Header() {
  return (
    <header>
      <nav className="fixed top-0 left-0 w-full z-50 border-b border-gray-200 bg-black/80">
        <div className="h-16 flex items-center justify-between text-xl px-4 sm:px-6 lg:px-8">
          {/* 左側 */}
          <div className="flex gap-3">
            <HamburgerMenu />
            <ZawaKunIcon />
          </div>

          {/* 中央 - NavLinks */}
          <div className="absolute left-1/2 transform -translate-x-1/2 hidden md:block">
            <NavLinks />
          </div>

          {/* 右側（バランス用の空のdiv） */}
          <div className="invisible flex gap-3">
            <HamburgerMenu />
            <ZawaKunIcon />
          </div>
        </div>
      </nav>
    </header>
  );
}
