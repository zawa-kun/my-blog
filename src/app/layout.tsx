import Header from "@/components/layout/header/header";
import "./globals.css";
import ThreeBackground from "@/components/layout/background/ThreeBackground";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className="min-h-screen">
        {/* 背景コンポーネント */}
        <ThreeBackground />
        {/* ヘッダー */}
        <Header />
        {/* メインコンテンツ */}
        {children}
      </body>
    </html>
  );
}
