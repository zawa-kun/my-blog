import Header from "@/components/header";
import "./globals.css";
import ThreeBackground from "@/components/ThreeBackground";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="relative min-h-screen">
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
