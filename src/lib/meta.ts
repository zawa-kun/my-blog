import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { BlogPostMeta } from "@/types/type";

export function getAllPostMeta() :BlogPostMeta[]{
  const dir = path.join(process.cwd(), "src/content/blog");
  return fs.readdirSync(dir)
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
      const raw = fs.readFileSync(path.join(dir, file), "utf-8");
      const { data } = matter(raw);
      return {
        slug: file.replace(/\.md$/, ""),
        title: data.title,
        date: data.date,
        tags: data.tags,
      };
    });
}