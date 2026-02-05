// src/lib/db.ts
import { getRequestContext } from "@cloudflare/next-on-pages";
import { marked } from 'marked';

export interface Post {
  slug: string;
  title: string;
  created_at: string;
  updated_at?: string;
  visibility?: string;
}

export interface PostDetail {
  slug: string;
  title: string;
  content_md: string;
  created_at: string;
  updated_at?: string;
  visibility?: string;
  content_hash: string;
  tags: string[];
}

// 記事一覧を取得
export async function getPostsFromDB(): Promise<Post[]> {
  const { env } = getRequestContext();

  if (!env || !env.DB) {
    console.warn(
      "⚠️ D1 Database not found. Are you running on Cloudflare Pages?",
    );
    return [];
  }

  const { results } = await env.DB.prepare(
    `SELECT slug, title, created_at, updated_at, visibility 
     FROM posts 
     WHERE visibility = 'public'
     ORDER BY created_at DESC`,
  ).all<Post>();

  return results;
}

// 記事詳細を取得（タグ込み）
export async function getPostBySlug(slug: string): Promise<PostDetail | null> {
  const { env } = getRequestContext();

  if (!env || !env.DB) {
    console.warn("⚠️ D1 Database not found.");
    return null;
  }

  // 記事本体を取得
  const post = await env.DB.prepare(
    `SELECT slug, title, content_md, created_at, updated_at, visibility, content_hash
     FROM posts 
     WHERE slug = ? AND visibility = 'public'`,
  )
    .bind(slug)
    .first<Omit<PostDetail, "tags">>();

  if (!post) {
    return null;
  }

  // タグを取得
  const { results: tagResults } = await env.DB.prepare(
    `SELECT tag_name FROM post_tags WHERE post_slug = ?`,
  )
    .bind(slug)
    .all<{ tag_name: string }>();

  const tags = tagResults.map((t: { tag_name: string }) => t.tag_name);

  return {
    ...post,
    tags,
  };
}



export async function markdownToHtml(markdown: string) {
  // marked.parse は Promise を返すこともあるため await しておく
  return await marked.parse(markdown);
}
