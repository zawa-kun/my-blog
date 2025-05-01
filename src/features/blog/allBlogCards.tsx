import Link from "next/link";
import { AllBlogCardsProps } from "@/types/type"

export default function AllBlogCards({ posts } : AllBlogCardsProps) {
  return (
    <div className=" divide-y divide-white">
      {posts.map((post) => (
        <div
          key={post.slug}
          className="p-5 shadow hover:shadow-lg transition "
        >
          <Link href={`/blog/${post.slug}`}>
            <h2 className="text-2xl font-bold hover:text-blue-600 transition">
              {post.title}
            </h2>
            <p className="text-gray-500 mt-2">{post.date}</p>
            <p className="text-sm text-gray-400 mt-1">{`タグ : ${post.tags.join(
              ", "
            )}`}</p>
          </Link>
        </div>
      ))}
    </div>
  );
}
