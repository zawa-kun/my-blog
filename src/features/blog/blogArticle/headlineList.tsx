"use client";
import { HeadlineListProps } from "@/types/type";


export default function HeadlineList({ headings }: HeadlineListProps) {
  return (
    <aside className="lg:w-1/4 hidden lg:block">
      <div className="sticky top-24">
        <h3 className="text-lg font-semibold mb-4">目次</h3>
        <nav className="toc">
          <ul className="space-y-2 text-sm">
            {headings.map((heading, index) => (
              <li
                key={index}
                style={{ paddingLeft: `${(heading.level - 1) * 0.75}rem` }}
                className="hover:text-blue-600"
              >
                <a href={`#${heading.id}`}>{heading.text}</a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
}
