export interface BlogPostMeta {
  slug: string; // 記事のスラッグ
  title: string; // 記事のタイトル
  date: string; // 公開日("YYYY-MM-DD" ISO形式の文字列)
  tags: string[];
}

export interface AllBlogCardsProps {
  posts: BlogPostMeta[];
}

export interface BlogArticleProps {
  html: string;
}

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
