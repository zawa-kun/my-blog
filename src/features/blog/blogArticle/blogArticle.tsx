"use client";
import { BlogArticleProps } from "@/types/type";
import { useState, useCallback } from "react";
import BlogMetadata from "./metadata";
import HeadlineList from "./headlineList";
import Article from "./article";

export default function BlogArticle({
  html,
  title,
  date,
  tags,
}: BlogArticleProps) {
  const [headings, setHeadings] = useState<
    Array<{ id: string; text: string; level: number }>
  >([]);

  // 見出し抽出処理を行うコールバック関数
  const handleHeadingsExtracted = useCallback(
    (extractedHeadings: Array<{ id: string; text: string; level: number }>) => {
      setHeadings(extractedHeadings);
    },
    []
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-3/4">
          {/* 記事メタデータ（上部） */}
          <BlogMetadata title={title} date={date} tags={tags} />

          {/* 記事本文 - 分離したコンポーネントを使用 */}
          <Article html={html} onHeadingsExtracted={handleHeadingsExtracted} />
        </div>

        {/* 目次（見出し一覧） */}
        <HeadlineList headings={headings} />
      </div>
    </div>
  );
}
