import AllBlogCards from "@/features/blog/allBlogCards";
import { getAllPostMeta, comparePostsByDate } from "@/lib/meta";


export default function BlogPage() {
  // 投稿のメタデータを取得
  const posts = getAllPostMeta();
  // 投稿を降順（新しい順）で並び替え（元配列を変更しない）
  // 比較関数（comparePostsByDate)により
  // メタデータ内の日付(date)を取り出し並び替え。
  const sortedPosts = [...posts].sort(comparePostsByDate);
  
  return (
    <div className="px-4 sm:px-6 py-18 w-full max-w-6xl mx-auto">
      <AllBlogCards posts={sortedPosts} />
    </div>
  );
}
