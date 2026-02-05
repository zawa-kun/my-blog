import BlogArticle from "@/features/blog/blogArticle/blogArticle";
import { getBlogPostBySlug } from "@/lib/blog";
import { Metadata } from "next";

export const runtime = "edge";

type Params = Promise<{
  slug: string;
}>;

// 動的メタデータ生成関数
export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  // paramsを先にawaitする
  const resolvedParams = await Promise.resolve(params);
  const slug = resolvedParams.slug;

  // メタデータの取得
  const { metadata } = await getBlogPostBySlug(slug);

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
export default async function BlogPostPage({ params }: { params: Params }) {
  // paramsを先にawaitする
  const resolvedParams = await Promise.resolve(params);
  const slug = resolvedParams.slug;

  // 記事データの取得
  const { html, metadata } = await getBlogPostBySlug(slug);

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
