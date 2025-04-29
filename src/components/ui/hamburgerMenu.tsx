"use client";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { name: "About", href: "/about" },
  { name: "Blog", href: "/blog" },
  { name: "Skill", href: "/skill" },
];

export default function HamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = React.useRef<HTMLDivElement>(null);
  const buttonRef = React.useRef<HTMLButtonElement>(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const pathname = usePathname();

  // メニュー外をクリックで閉じる処理
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // メニューのアニメーション設定
  const menuVariants = {
    closed: {
      x: "-100%",
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
        ease: "easeInOut",
        duration: 0.3,
      },
    },
    open: {
      x: 0,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
        ease: "easeOut",
        duration: 0.3,
      },
    },
  };

  // 各リンクのアニメーション設定
  const linkVariants = {
    closed: { opacity: 0, x: -20 },
    open: { opacity: 1, x: 0 },
  };

  // オーバーレイのアニメーション設定
  const overlayVariants = {
    closed: { opacity: 0 },
    open: { opacity: 0.5 },
  };

  return (
    <>
      <motion.button
        ref={buttonRef}
        onClick={toggleMenu}
        className="font-bold text-2xl p-2 z-50 relative"
        aria-label={isOpen ? "メニューを閉じる" : "メニューを開く"}
        whileTap={{ scale: 0.9 }}
      >
        {isOpen ? "✕" : "☰"}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black z-30"
              variants={overlayVariants}
              initial="closed"
              animate="open"
              exit="closed"
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              ref={menuRef}
              className="fixed top-0 left-0 h-full w-2/5 p-5 pt-20 bg-black z-40 overflow-y-auto"
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              <div className="flex flex-col space-y-2">
                {links.map((link) => (
                  <motion.div key={link.name} variants={linkVariants}>
                    <Link
                      href={link.href}
                      className={clsx(
                        "flex h-[48px] items-center gap-2 p-3 text-xl font-bold hover:text-gray-600",
                        {
                          "text-gray-600": pathname === link.href,
                        }
                      )}
                      onClick={() => setIsOpen(false)}
                    >
                      <span>{link.name}</span>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
