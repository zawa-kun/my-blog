import { getPostBySlug, markdownToHtml } from "./db";

// D1から記事を取得してHTMLに変換
export async function getBlogPostBySlug(slug: string) {
  const post = await getPostBySlug(slug);

  if (!post) {
    throw new Error(`Post not found: ${slug}`);
  }

  // MarkdownをHTMLに変換
  const html = await markdownToHtml(post.content_md);

  return {
    html,
    metadata: {
      title: post.title,
      date: post.created_at,
      tags: post.tags,
      slug: post.slug,
    },
  };
}
