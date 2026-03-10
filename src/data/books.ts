export type Book = {
  id: number;
  title: string;
  author: string;
  category: string;
  color: string;
  readDate: string;
  rating: number;
  review?: string;
};

export const books: Book[] = [
  {
    id: 1,
    title: "リーダブルコード",
    author: "Dustin Boswell, Trevor Foucher",
    category: "技術書",
    color: "#4A90D9",
    readDate: "2024-06",
    rating: 5,
    review: "コードの可読性・保守性を高めるための実践的な知識が詰まった名著。",
  },
  {
    id: 2,
    title: "Clean Architecture 達人に学ぶソフトウェアの構造と設計",
    author: "Robert C. Martin",
    category: "技術書",
    color: "#6C5CE7",
    readDate: "2024-09",
    rating: 4,
    review: "ソフトウェア設計の原則を体系的に学べる一冊。",
  },
  {
    id: 3,
    title: "ゼロから作るDeep Learning",
    author: "斎藤 康毅",
    category: "技術書",
    color: "#E17055",
    readDate: "2024-04",
    rating: 5,
    review: "ディープラーニングの仕組みを手を動かしながら理解できる。",
  },
  {
    id: 4,
    title: "プロになるためのWeb技術入門",
    author: "小森 裕介",
    category: "技術書",
    color: "#00B894",
    readDate: "2023-12",
    rating: 4,
    review: "Web の基礎技術を広く学べる入門書。",
  },
  {
    id: 5,
    title: "Docker/Kubernetes 実践コンテナ開発入門",
    author: "山田 明憲",
    category: "技術書",
    color: "#0984E3",
    readDate: "2025-02",
    rating: 4,
    review: "コンテナ技術の基礎から実践まで丁寧に解説されている。",
  },
  {
    id: 6,
    title: "SQLアンチパターン",
    author: "Bill Karwin",
    category: "技術書",
    color: "#D63031",
    readDate: "2025-01",
    rating: 5,
    review: "DBアンチパターンを学ぶことで良い設計が身につく。",
  },
  {
    id: 7,
    title: "アルゴリズムとデータ構造",
    author: "渡部 有隆",
    category: "技術書",
    color: "#FDCB6E",
    readDate: "2023-08",
    rating: 4,
    review: "競技プログラミングを通じてアルゴリズムの基礎を学んだ一冊。",
  },
  {
    id: 8,
    title: "イシューからはじめよ",
    author: "安宅 和人",
    category: "ビジネス・思考",
    color: "#2D3436",
    readDate: "2024-11",
    rating: 5,
    review: "問題解決のフレームワークが体系化されており、思考の質が上がる。",
  },
  {
    id: 9,
    title: "エンジニアリング組織論への招待",
    author: "広木 大地",
    category: "ビジネス・思考",
    color: "#636E72",
    readDate: "2025-03",
    rating: 4,
    review: "エンジニアリングを組織・人・技術の観点から考えさせられる一冊。",
  },
];
