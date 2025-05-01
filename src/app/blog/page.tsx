import AllBlogCards from "@/features/blog/allBlogCards";
import { getAllPostMeta } from "@/lib/meta";

export default function BlogPage() {
  const posts = getAllPostMeta();

  return (
    <div className="px-30 py-18">
      <AllBlogCards posts= { posts } />
    </div>
  );
}
