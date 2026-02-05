import { getRequestContext } from '@cloudflare/next-on-pages';

export interface Post {
  slug: string;
  title: string;
  created_at: string;
  content_md?: string;
  // 必要に応じて他のカラムも追加
}

export async function getPostsFromDB(): Promise<Post[]> {
  try {
    // ここで Cloudflare環境かどうかチェック（ローカルだとここでエラーが飛ぶ）
    const { env } = getRequestContext();

    if (!env || !env.DB) {
      throw new Error('DB binding not found');
    }

    // 本番（Cloudflare）の場合はDBから取得
    const { results } = await env.DB.prepare(
      "SELECT slug, title, created_at FROM posts ORDER BY created_at DESC"
    ).all<Post>();

    return results;

  } catch (e) {
    // エラーが出た＝ローカル開発環境 とみなしてモックデータを返す
    console.log('⚠️ Running in dev mode. Using Mock Data.');
    return [
      {
        slug: 'dev-test',
        title: '【開発用】テスト記事タイトル',
        created_at: new Date().toISOString(),
      },
      {
        slug: 'dev-design-check',
        title: 'デザイン確認用のモック記事',
        created_at: new Date().toISOString(),
      },
    ];
  }
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const { env } = getRequestContext();
    
    if (!env || !env.DB) {
      throw new Error('DB binding not found');
    }

    const { results } = await env.DB.prepare(
      "SELECT * FROM posts WHERE slug = ? LIMIT 1"
    ).bind(slug).all<Post>();

    return results[0] || null;

  } catch (e) {
    // ローカル開発用の詳細ページモック
    console.log('⚠️ Using Mock Data for Detail Page.');
    return {
      slug: slug,
      title: '【開発用】詳細ページのテスト',
      created_at: new Date().toISOString(),
      content_md: `# テスト記事\n\nこれは**ローカル開発用**のモックデータです。\n\n- リスト1\n- リスト2`,
    } as any;
  }
}