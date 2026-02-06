// ブログ操作関連
import { getPostBySlug } from "./db";
import { marked } from "marked";

// =====================================================================
// スラッグからブログ記事の内容（HTML変換済み）とメタデータを取得する関数
// 引数: slug - 記事のスラッグ
// 戻り値: { html: string; metadata: { title: string; date: string; tags: string[]; slug: string } }
// =====================================================================
export async function getBlogPostBySlug(slug: string) {
  // DBから記事データを取得
  const post = await getPostBySlug(slug);

  // 記事が見つからなかった場合はエラー
  if (!post) {
    throw new Error(`Post not found: ${slug}`);
  }

  // MarkdownをHTMLに変換
  const html = await marked.parse(post.content_md);

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
