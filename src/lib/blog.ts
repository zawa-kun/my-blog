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

  // カスタムレンダラーで見出しにIDを自動付与
  let headingIndex = 0;
  const renderer = new marked.Renderer();
  renderer.heading = ({ text, depth }: { text: string; depth: number }) => {
    const id = `heading-${headingIndex++}`;
    return `<h${depth} id="${id}">${text}</h${depth}>`;
  };

  // MarkdownをHTMLに変換（カスタムレンダラー使用）
  const html = await marked.parse(post.content_md, { renderer });

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
