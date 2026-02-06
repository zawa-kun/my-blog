import { Post, PostDetail } from "@/types/type";

export function getMockPostDetail(): PostDetail {
    return {
        slug: "mock-post",
        title: "【開発用】詳細ページのテスト",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        visibility: "public",
        content_md: `# テスト記事\n\nこれは**ローカル開発用**のモックデータです。\n\n- リスト1\n- リスト2\n\n## サブ見出し\n\n段落のテキスト。# テスト記事\n\nこれは**ローカル開発用**のモックデータです。\n\n- リスト1\n- リスト2\n\n## サブ見出し\n\n段落のテキスト。# テスト記事\n\nこれは**ローカル開発用**のモックデータです。\n\n- リスト1\n- リスト2\n\n## サブ見出し\n\n段落のテキスト。# テスト記事\n\nこれは**ローカル開発用**のモックデータです。\n\n- リスト1\n- リスト2\n\n## サブ見出し\n\n段落のテキスト。`,
        tags: ["開発", "テスト"],
    }
};

export function getMockAllPosts(): Post[] {
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