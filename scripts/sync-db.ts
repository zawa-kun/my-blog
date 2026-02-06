import fs from "fs";
import path from "path";
import crypto from "crypto";
import matter from "gray-matter";
import { execSync } from "child_process";

// =================================
// 設定・定数
// =================================
const BLOG_DIR = path.join(process.cwd(), "src/content/blog");
const DB_NAME = "my-blog-db"; // wrangler.jsoncのdatabase_nameと合わせる
const IS_LOCAL = process.argv.includes("--local"); // コマンドライン引数で判定

// 型定義 (Frontmatter)
interface PostMetadata {
  title: string;
  created_at: string; // 記事内の作成日
  updated_at?: string; // 記事内の更新日 (任意)
  tags?: string[];
  visibility?: "public" | "private";
}

console.log(
  `🚀 sync-dbを開始します。 (Mode: ${IS_LOCAL ? "Local" : "Remote"})`,
);

// =================================
// Helper: Wrangler経由でSQLを実行する関数
// =================================
function executeSql(sql: string) {
  // 一時ファイルにSQLを書き出す
  const tmpFile = path.join(process.cwd(), ".tmp-query.sql");
  fs.writeFileSync(tmpFile, sql, "utf-8");

  const command = `npx wrangler d1 execute ${DB_NAME} ${IS_LOCAL ? "--local" : "--remote"} --file "${tmpFile}" --yes`;

  try {
    const result = execSync(command, { encoding: "utf-8", stdio: "pipe" });
    fs.unlinkSync(tmpFile); // 実行後に削除
    return result;
  } catch (error) {
    fs.unlinkSync(tmpFile); // エラー時も削除
    console.error("❌ SQL Execution Error:", error);
    throw error;
  }
}

// =================================
// Helper: 全記事のハッシュを取得 (変更検知用)
// =================================
function getExistingHashes(): Map<string, string> {
  try {
    // JSONフォーマットで結果を取得
    const tmpFile = path.join(process.cwd(), ".tmp-query.sql");
    fs.writeFileSync(tmpFile, "SELECT slug, content_hash FROM posts", "utf-8");

    const command = `npx wrangler d1 execute ${DB_NAME} ${IS_LOCAL ? "--local" : "--remote"} --file "${tmpFile}" --json`;
    const result = execSync(command, { encoding: "utf-8", stdio: "pipe" });
    fs.unlinkSync(tmpFile);

    // Wranglerの出力をパース
    const parsed = JSON.parse(result);
    const hashMap = new Map<string, string>();

    // Wranglerの出力構造: [{results: [...]}] または {results: [...]}
    const results = Array.isArray(parsed)
      ? parsed[0]?.results
      : parsed?.results;

    if (results && Array.isArray(results)) {
      results.forEach((row: { slug: string; content_hash: string }) => {
        if (row.slug && row.content_hash) {
          hashMap.set(row.slug, row.content_hash);
        }
      });
    }

    console.log(`📊 既存の記事ハッシュを ${hashMap.size} 件取得しました。`);
    return hashMap;
  } catch (e) {
    console.log("⚠️ 既存ハッシュの取得に失敗。全記事を更新します。");
    return new Map();
  }
}

// ================================
// メイン処理
// =================================
async function main() {
  // 既存記事のハッシュを取得
  const existingHashes = getExistingHashes();

  // ファイル一覧取得
  const files = fs.readdirSync(BLOG_DIR).filter((file) => file.endsWith(".md"));
  console.log(`📂 ${files.length} 個のMarkdownファイルが見つかりました。`);

  let updatedCount = 0;
  let skippedCount = 0;

  for (const file of files) {
    const slug = file.replace(".md", ""); // YYMMDD-title.md -> YYMMDD-title
    const filePath = path.join(BLOG_DIR, file);
    const fileContent = fs.readFileSync(filePath, "utf-8");

    // メタデータ読み込み & バリデーション
    const { data, content } = matter(fileContent);
    const meta = data as PostMetadata;

    if (!meta.title || !meta.created_at) {
      console.warn(`⚠️ Skipped ${file}: Missing title or date.`);
      continue;
    }

    // コンテンツのハッシュ計算(変更検知用)
    const contentHash = crypto.createHash("md5").update(content).digest("hex");

    // --------------------------------
    // ハッシュ比較：変更がない場合はスキップ
    // --------------------------------
    const existingHash = existingHashes.get(slug);
    if (existingHash === contentHash) {
      console.log(`⏭️  スキップ: ${meta.title} (${slug}) - 変更なし`);
      skippedCount++;
      continue;
    }

    console.log(
      `🔄 ${existingHash ? "更新" : "新規作成"}: ${meta.title} (${slug})`,
    );

    // 日付の正規化 (ISO形式へ)
    const createdAt = new Date(meta.created_at).toISOString();
    const updatedAt = meta.updated_at
      ? new Date(meta.updated_at).toISOString()
      : createdAt;
    const visibility = meta.visibility || "public";

    // --------------------------------
    // 4. DB同期処理 (SQL生成)
    // --------------------------------

    // トランザクション的に処理したいが、CLI経由なので1つずつ実行

    // A. 記事テーブルへのUpsert (あれば更新、なければ挿入)
    // SQLiteの "INSERT OR REPLACE" または "ON CONFLICT" を使用
    const upsertPostSql = `
      INSERT INTO posts (slug, title, content_md, created_at, updated_at, visibility, content_hash)
      VALUES ('${slug}', '${meta.title}', '${content.replace(/'/g, "''")}', '${createdAt}', '${updatedAt}', '${visibility}', '${contentHash}')
      ON CONFLICT(slug) DO UPDATE SET
        title=excluded.title,
        content_md=excluded.content_md,
        updated_at=excluded.updated_at,
        visibility=excluded.visibility,
        content_hash=excluded.content_hash;
    `;
    executeSql(upsertPostSql);
    updatedCount++;

    // B. タグの処理
    if (meta.tags && meta.tags.length > 0) {
      // B-1. タグマスタへの登録 (存在しなければ)
      for (const tag of meta.tags) {
        // 大文字小文字を統一 (LowerCase)
        const safeTag = tag.toLowerCase().replace(/'/g, "''");
        executeSql(`INSERT OR IGNORE INTO tags (name) VALUES ('${safeTag}');`);

        // B-2. 中間テーブル (Post_Tags) の更新
        // まず紐付け、競合したら無視
        executeSql(`
          INSERT OR IGNORE INTO post_tags (post_slug, tag_name)
          VALUES ('${slug}', '${safeTag}');
        `);
      }

      // B-3. 削除されたタグのクリーニング (記事から外されたタグを消す処理)
      // 今回は簡易化のため省略。厳密にやるなら「一旦全削除して入れ直す」のが楽。
      // executeSql(`DELETE FROM post_tags WHERE post_slug = '${slug}';`); // これをループ前にやると良い
    }
  }

  console.log("\n✅ Sync Complete!");
  console.log(
    `📊 統計: 更新=${updatedCount}件, スキップ=${skippedCount}件, 合計=${files.length}件`,
  );
}

main().catch(console.error);
