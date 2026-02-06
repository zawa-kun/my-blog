// src/app/blog/page.tsx
import Link from "next/link";
import { getAllPostsWithTagsFromDB } from "@/lib/db";

export const runtime = "edge";

export default async function BlogPage() {
  const posts = await getAllPostsWithTagsFromDB();
  console.log(posts);

  return (
    <main className="max-w-4xl mx-auto px-4 py-20">
      {/* ヘッダーセクション */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight mb-3">Blog</h1>
        <p className="text-gray-600 dark:text-gray-400">
          技術記事や学んだことを書いています
        </p>
      </div>

      {/* 記事一覧 */}
      {posts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">
            記事が見つかりません
          </p>
        </div>
      ) : (
        <div className="space-y-8">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="group border-b border-gray-200 dark:border-gray-800 pb-8 last:border-b-0"
            >
              <Link href={`/blog/${post.slug}`} className="block">
                <div className="space-y-2">
                  {/* タイトル */}
                  <h2 className="text-2xl font-semibold tracking-tight group-hover:text-gray-600 dark:group-hover:text-gray-400 transition-colors">
                    {post.title}
                  </h2>

                  {/* タグ */}
                  {post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 py-1">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-block bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-xs px-2 py-1 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* 日付 */}
                  <time className="block text-sm text-gray-500 dark:text-gray-400">
                    {new Date(post.created_at).toLocaleDateString("ja-JP", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                </div>
              </Link>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}
