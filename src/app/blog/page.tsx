import AllBlogCards from "@/features/blog/allBlogCards";
import { getAllPostMeta } from "@/lib/meta";

export default function BlogPage() {
  const posts = getAllPostMeta();

  return (
    <div className="px-4 sm:px-6 py-18 w-full max-w-6xl mx-auto">
      <AllBlogCards posts={posts} />
    </div>
  );
}
