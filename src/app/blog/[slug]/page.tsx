import BlogArticle from "@/features/blog/blogArticle/blogArticle";
import { getBlogPostBySlug } from "@/lib/blog";

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  // 記事データの取得をライブラリ関数に分離
  const { html, metadata } = await getBlogPostBySlug(params.slug);

  return (
    <div className="px-30 py-18">
      <BlogArticle
        html={html}
        title={metadata.title}
        date={metadata.date}
        tags={metadata.tags}
      />
    </div>
  );
}
