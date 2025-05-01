import Link from "next/link";
import { AllBlogCardsProps } from "@/types/type";

export default function AllBlogCards({ posts }: AllBlogCardsProps) {
  return (
    <div className="w-full divide-y divide-gray-200">
      {posts.map((post) => (
        <div
          key={post.slug}
          className="p-5 shadow hover:shadow-lg transition-shadow duration-300 w-full"
        >
          <Link href={`/blog/${post.slug}`} className="block w-full">
            <h2 className="text-xl md:text-2xl font-bold hover:text-blue-600 transition-colors">
              {post.title}
            </h2>
            <p className="text-gray-500 mt-2 text-sm md:text-base">
              {post.date}
            </p>
            <p className="text-xs md:text-sm text-gray-400 mt-1">{`タグ : ${post.tags.join(
              ", "
            )}`}</p>
          </Link>
        </div>
      ))}
    </div>
  );
}
