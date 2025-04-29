import Header from "@/components/layouts/header/header";
import "./globals.css";
import ThreeBackground from "@/components/layouts/background/ThreeBackground";

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
