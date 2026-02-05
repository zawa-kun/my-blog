// src/app/page.tsx
import Link from "next/link";
import { getPostsFromDB } from "@/lib/db"; // さっき作った関数

// Cloudflare Pages (Edge) で動かすための設定
export const runtime = "edge";

export default async function Home() {
  // DBから記事一覧を取得
  const posts = await getPostsFromDB();

  return (
    <main className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">My Blog (Powered by D1)</h1>

      {posts.length === 0 ? (
        <p>記事が見つかりません（またはDB接続エラー）</p>
      ) : (
        <ul className="space-y-4">
          {posts.map((post) => (
            <li
              key={post.slug}
              className="border p-4 rounded shadow-sm hover:shadow-md transition"
            >
              <Link href={`/blog/${post.slug}`} className="block">
                <h2 className="text-xl font-semibold">{post.title}</h2>
                <time className="text-gray-500 text-sm">{post.created_at}</time>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
