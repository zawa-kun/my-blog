"use client";
import { useEffect, useRef } from "react";
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.css"; // ダークテーマのハイライト
import python from "highlight.js/lib/languages/python";
import bash from "highlight.js/lib/languages/bash";

// ハイライト対象言語の登録
hljs.registerLanguage("python", python);
hljs.registerLanguage("bash", bash);
hljs.registerLanguage("shell", bash); // shellとしても認識

interface ArticleProps {
  html: string;
  onHeadingsExtracted: (
    headings: Array<{ id: string; text: string; level: number }>
  ) => void;
}

export default function Article({ html, onHeadingsExtracted }: ArticleProps) {
  const articleRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (articleRef.current) {
      // 記事内の見出しを取得
      const headingElements = articleRef.current.querySelectorAll(
        "h1, h2, h3, h4, h5, h6"
      );
      const extractedHeadings = Array.from(headingElements).map((heading) => {
        const id =
          heading.id ||
          heading.textContent?.trim().toLowerCase().replace(/\s+/g, "-") ||
          "";

        // IDがなければ追加
        if (!heading.id) {
          heading.id = id;
        }

        return {
          id,
          text: heading.textContent || "",
          level: parseInt(heading.tagName.substring(1)),
        };
      });

      // 抽出した見出し情報を親コンポーネントに渡す
      onHeadingsExtracted(extractedHeadings);

      // コードブロックにシンタックスハイライトを適用
      const codeBlocks = articleRef.current.querySelectorAll("pre code");
      codeBlocks.forEach((block) => {
        // コードブロックの言語をdata属性として追加
        const parent = block.parentElement;
        const languageClass = Array.from(block.classList).find(
          (cls) => cls.startsWith("language-")
        );
        
        if (parent && languageClass) {
          const language = languageClass.replace("language-", "");
          parent.setAttribute("data-language", language);
        }
        
        // ハイライト適用
        hljs.highlightElement(block as HTMLElement);
      });
    }
  }, [html, onHeadingsExtracted]);

  return (
    <article
      ref={articleRef}
      className="blog-article prose prose-lg"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
