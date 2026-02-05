import { getRequestContext } from "@cloudflare/next-on-pages";
import { marked } from "marked";

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

export async function getPostsFromDB(): Promise<Post[]> {
  try {
    const { env } = getRequestContext();

    if (!env || !env.DB) {
      throw new Error("DB binding not found");
    }

    const { results } = await env.DB.prepare(
      "SELECT slug, title, created_at, updated_at, visibility FROM posts WHERE visibility = 'public' ORDER BY created_at DESC",
    ).all<Post>();

    return results;
  } catch (e) {
    console.error("DB Error:", e);
    console.log("⚠️ Running in dev mode. Using Mock Data.");
    return [
      {
        slug: "dev-test",
        title: "【開発用】テスト記事タイトル",
        created_at: new Date().toISOString(),
        visibility: "public",
      },
      {
        slug: "dev-design-check",
        title: "デザイン確認用のモック記事",
        created_at: new Date().toISOString(),
        visibility: "public",
      },
    ];
  }
}

export async function getPostBySlug(slug: string): Promise<PostDetail | null> {
  try {
    const { env } = getRequestContext();

    if (!env || !env.DB) {
      throw new Error("DB binding not found");
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
  } catch (e) {
    console.error("DB Error:", e);
    console.log("⚠️ Using Mock Data for Detail Page.");
    return {
      slug: slug,
      title: "【開発用】詳細ページのテスト",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      visibility: "public",
      content_md: `# テスト記事\n\nこれは**ローカル開発用**のモックデータです。\n\n- リスト1\n- リスト2\n\n## サブ見出し\n\n段落のテキスト。# テスト記事\n\nこれは**ローカル開発用**のモックデータです。\n\n- リスト1\n- リスト2\n\n## サブ見出し\n\n段落のテキスト。# テスト記事\n\nこれは**ローカル開発用**のモックデータです。\n\n- リスト1\n- リスト2\n\n## サブ見出し\n\n段落のテキスト。# テスト記事\n\nこれは**ローカル開発用**のモックデータです。\n\n- リスト1\n- リスト2\n\n## サブ見出し\n\n段落のテキスト。`,
      content_hash: "dev-mock-hash",
      tags: ["開発", "テスト"],
    };
  }
}

export async function markdownToHtml(markdown: string): Promise<string> {
  return await marked.parse(markdown);
}

// lib/db.ts に追加する型定義と関数

export interface PostWithTags extends Post {
  tags: string[];
}

export async function getPostsWithTagsFromDB(): Promise<PostWithTags[]> {
  try {
    const { env } = getRequestContext();

    if (!env || !env.DB) {
      throw new Error("DB binding not found");
    }

    // 記事一覧を取得
    const { results: posts } = await env.DB.prepare(
      "SELECT slug, title, created_at, updated_at, visibility FROM posts WHERE visibility = 'public' ORDER BY created_at DESC",
    ).all<Post>();

    // 各記事のタグを取得
    const postsWithTags = await Promise.all(
      posts.map(async (post: Post) => {
        const { results: tagResults } = await env.DB.prepare(
          `SELECT tag_name FROM post_tags WHERE post_slug = ?`,
        )
          .bind(post.slug)
          .all<{ tag_name: string }>();

        const tags = tagResults.map((t: { tag_name: string }) => t.tag_name);

        return {
          ...post,
          tags,
        };
      }),
    );

    return postsWithTags;
  } catch (e) {
    console.error("DB Error:", e);
    console.log("⚠️ Running in dev mode. Using Mock Data with Tags.");
    return [
      {
        slug: "dev-test",
        title: "【開発用】テスト記事タイトル",
        created_at: new Date().toISOString(),
        visibility: "public",
        tags: ["開発", "テスト"],
      },
      {
        slug: "dev-design-check",
        title: "デザイン確認用のモック記事",
        created_at: new Date().toISOString(),
        visibility: "public",
        tags: ["デザイン", "UI"],
      },
    ];
  }
}
