import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { BlogPostMeta } from "@/types/type";

export function getAllPostMeta() :BlogPostMeta[]{
  const dir = path.join(process.cwd(), "src/content/blog");
  return fs.readdirSync(dir) // dir(src/content/blog)内のすべてのファイルを読み込む
    .filter((file) => file.endsWith(".md")) // 拡張子が.mdのファイルのみ取り出す
    .map((file) => {
      // UTF-8エンコーディングしてファイルを読み込む
      // matter ライブラリでMarkdownファイルを解析するには、
      // 文字列として読み込まなくてはいけないから。
      const raw = fs.readFileSync(path.join(dir, file), "utf-8");
      // matter()でメタデータの解析を取り出す
      const { data } = matter(raw);
      
      return {
        slug: file.replace(/\.md$/, ""), // 拡張子を無くす
        title: data.title,
        date: data.date,
        tags: data.tags,
      };
    });
}


// ブログ記事一覧を投稿順（新しい順,降順）に表示するための比較関数
export function comparePostsByDate(aMeta: BlogPostMeta, bMeta: BlogPostMeta): number {
  // Date.parse()により、
  // yyyy-mm-ddの形を
  // タイムスタンプ（UTCの1970/01/01/0:00からの経過時間に型変換
  const aTime = Date.parse(aMeta.date);
  const bTime = Date.parse(bMeta.date);

  // yyyy-mm-dd形式でない場合の処理.
  if (isNaN(aTime) && isNaN(bTime)) {
    console.warn(`dateの形式が誤っている可能性があります: aMeta.date=${aMeta.date}, bMeta.date=${bMeta.date}`);
    return 0; // 両方とも無効な場合、等しいと見なす
  }

  return bTime - aTime;
}
