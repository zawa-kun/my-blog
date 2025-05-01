import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const inputDir = path.join(process.cwd(), "src/content/blog");
const outputDir = path.join(process.cwd(), "public/posts");

fs.mkdirSync(outputDir, { recursive: true });

async function buildHtml() {
  const files = fs.readdirSync(inputDir);

  for (const file of files) {
    if (!file.endsWith(".md")) continue;

    const raw = fs.readFileSync(path.join(inputDir, file), "utf-8");
    const { content } = matter(raw);
    const result = await remark().use(html).process(content);

    const slug = file.replace(/\.md$/, "");
    fs.writeFileSync(path.join(outputDir, `${slug}.html`), result.toString());
    console.log(`Generated: ${slug}.html`);
  }
}

buildHtml().catch((err) => {
  console.error("Error building HTML:", err);
});
