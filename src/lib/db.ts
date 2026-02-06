// DB操作関連
import { getRequestContext } from "@cloudflare/next-on-pages";
import { Post, PostDetail } from "@/types/type";
import { getMockPostDetail, getMockAllPosts } from "./mock";

// =====================================================================
// スラッグからタグ付き個別の記事データ（内容含め）を取得する関数
// 引数: slug - 記事のスラッグ
// 戻り値: PostDetail型（内容のmdファイル含む）のオブジェクトまたはnull（記事が見つからなかった場合）
// =====================================================================
export async function getPostBySlug(slug: string): Promise<PostDetail | null> {
  try {
    // Cloudflare Workersのリクエストコンテキストを取得
    const { env } = getRequestContext();

    // ---------------------------------------------------------------
    // DBから記事に関する情報を取得
    // ---------------------------------------------------------------
    // postsテーブルから記事の基本情報（content_mdを含む）を取得
    const post = await env.DB.prepare(
      `SELECT slug, title, content_md, created_at, updated_at, visibility,content_hash
       FROM posts 
       WHERE slug = ? AND visibility = 'public'`,
    )
      .bind(slug) // SQLインジェクション対策で"?"部分にslugを置き換える。プレースホルダを使用。
      .first<Omit<PostDetail, "tags">>(); // tagsを除く投稿の基本情報を取得

    // 記事が見つからなかった場合はnullを返す
    if (!post) {
      return null;
    }

    // post_tagsテーブルから記事のタグを取得
    // {tag_name: string}[]型のresultsを取得
    const { results: tagResults } = await env.DB.prepare(
      `SELECT tag_name FROM post_tags WHERE post_slug = ?`,
    )
      .bind(slug) // "?"部分にslugを置き換える。
      .all<{ tag_name: string }>();

    // tag_name[]型に変換
    const tags = tagResults.map((t: { tag_name: string }) => t.tag_name);

    return {
      ...post,
      tags,
    };
  } catch (e) {
    // getRequestContext()呼び出しエラーまたはDB接続エラー
    console.error("DB Error:", e);
    console.log("⚠️ 開発環境または接続エラー。モックデータを返します。");
    return getMockPostDetail();
  }
}

// =====================================================================
// 投稿の基本情報を全て取得する関数
// 引数: なし
// 戻り値: Post型の配列
// =====================================================================
export async function getAllPostsWithTagsFromDB(): Promise<Post[]> {
  try {
    // Cloudflare Workersのリクエストコンテキストを取得
    const { env } = getRequestContext();

    // ----------------------------------------------------
    // 記事の基本情報を取得
    // ----------------------------------------------------
    const { results: posts } = await env.DB.prepare(
      "SELECT slug, title, created_at, updated_at, visibility FROM posts WHERE visibility = 'public' ORDER BY created_at DESC",
    ).all<Post>();

    // 各記事のタグを取得
    // Promise.allで非同期処理を並列実行
    const postsWithTags = await Promise.all(
      posts.map(async (post: Post) => {
        const { results: tagResults } = await env.DB.prepare(
          `SELECT tag_name FROM post_tags WHERE post_slug = ?`,
        )
          .bind(post.slug) // "?"部分にslugを置き換える。
          .all<{ tag_name: string }>(); // {tag_name: string}[]型のresultsを取得

        // tag_name[]型に変換
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
    console.log("⚠️ エラーが発生しました。モックデータを返します。");
    return getMockAllPosts();
  }
}
