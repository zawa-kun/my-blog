import BlogArticle from "@/features/blog/blogArticle/blogArticle";
import { getBlogPostBySlug } from "@/lib/blog";
import { Metadata } from "next";

// 動的メタデータ生成関数
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  // params自体を先にawaitする
  const resolvedParams = await params;

  // メタデータの取得
  const { metadata } = await getBlogPostBySlug(resolvedParams.slug);

  return {
    title: metadata.title,
    description: `${metadata.title}に関する記事`,
    openGraph: {
      title: metadata.title,
      description: `${metadata.title}に関する記事`,
      type: "article",
      publishedTime: metadata.date,
      tags: metadata.tags,
    },
  };
}

// ページコンポーネント
export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  // params自体を先にawaitする
  const resolvedParams = await params;

  // 記事データの取得をライブラリ関数に分離
  const { html, metadata } = await getBlogPostBySlug(resolvedParams.slug);

  return (
    <div className="px-4 py-18">
      <BlogArticle
        html={html}
        title={metadata.title}
        date={metadata.date}
        tags={metadata.tags}
      />
    </div>
  );
}
