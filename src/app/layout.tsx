import Header from "@/components/layout/header/header";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className="min-h-screen">
        {/* ヘッダー */}
        <Header />
        {/* メインコンテンツ */}
        {children}
      </body>
    </html>
  );
}
