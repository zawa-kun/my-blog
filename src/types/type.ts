// =====================================================================
// データベース関連の型定義
// =====================================================================

// 投稿の基本情報
export interface Post {
  slug: string;
  title: string;
  created_at: string;
  updated_at?: string;
  visibility?: string;
  tags: string[];
}

// 個別記事表示用：投稿の基本情報にMarkdownコンテンツとタグを追加したもの
export interface PostDetail extends Post {
  content_md: string;
  content_hash?: string;
}

// =====================================================================
// UI表示用の型定義（レガシー）
// =====================================================================

// ブログ記事のメタデータ（表示用に変換したもの）
export interface BlogPostMeta {
  slug: string;
  title: string;
  date: string; // created_atを'date'として表示
  tags: string[];
}

export interface AllBlogCardsProps {
  posts: BlogPostMeta[];
}

// =====================================================================
// コンポーネントProps
// =====================================================================

export interface BlogArticleProps {
  html: string;
  title?: string;
  date?: string;
  tags?: string[];
}

export interface BlogMetadataProps {
  title?: string;
  date?: string;
  tags?: string[];
}

export interface HeadlineListProps {
  headings: Array<{ id: string; text: string; level: number }>;
}
