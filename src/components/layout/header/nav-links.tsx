'use client'; // client side

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';


const links = [
    { name: 'About', href: '/about'},
    { name: 'Blog', href: '/blog'},
    { name: 'Skill', href: '/skill'}
];

export default function NavLinks() {
  const  pathname = usePathname(); // get current path

  return (
    <nav className="flex gap-10">
      {links.map((link) => {
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              "flex h-[48px] items-center justify-center gap-2 p-3 text-xl font-bold hover:text-gray-600",
              {
                'text-gray-600' : pathname === link.href, //アクティブリンクの条件
              },
            )}
          >
            <span>{link.name}</span>
          </Link>
        );
      })}
    </nav>
  );
}