import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";

// 特定のスラッグのブログ記事を取得する関数
export async function getBlogPostBySlug(slug: string) {
  // HTMLファイルの取得
  const filePath = path.join(process.cwd(), "public/posts", `${slug}.html`);
  const html = await fs.readFile(filePath, "utf-8");

  // メタデータの取得（Markdownファイルからfrontmatter情報を取得）
  const mdPath = path.join(process.cwd(), "src/content/blog", `${slug}.md`);
  const mdContent = await fs.readFile(mdPath, "utf-8");
  const { data } = matter(mdContent);

  return {
    html,
    metadata: {
      title: data.title,
      date: data.date,
      tags: data.tags,
      slug: slug,
    },
  };
}
