# 開発時備忘録
## 開発の始め方

1. レポジトリクローン:
   ```bash
   git clone https://github.com/zawa-kun/my-blog.git
   cd my-blog
   ```

2. 依存関係のインストール:
   ```bash
   npm install
   ```

1. 開発用サーバの起動:
   ```bash
   npm run dev
   ```

2. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## ブランチ作成ルール

トランクベース開発（`main`に対して短命のブランチをPRでマージ）で運用します。

### 命名の型
```shell
feature/機能名                 # 機能追加
refactor/機能名やコンポーネント     # リファクタリング
content/post/yyyy-mm-記事名    # ブログ記事追加
docs/短い説明                  # ドキュメント関連（開発体験の改善）
fix/短い説明                   # バグ修正
```

- すべて小文字（ASCIIのみ）
- 単語区切りはハイフン（kebab-case）
- 記事名はURLに使うslug（短く・わかりやすく・安定した識別子）

### スラッグ（slug）規則（ブログ記事の「記事名」）
- 小文字・英数字とハイフンのみ（例: `ap-review`, `dark-mode`, `search-pagination`）
- 記号は削除、空白はハイフン、連続ハイフンは1個に
- 5語以内を目安に短く要点だけ
- 重複したら `-2`, `-3`… を付与（例: `about-me-2`）

### 例
- `feature/search-pagination`
- `refactor/header-component`
- `content/post/2025-10-ap-review`
- `docs/readme-update`
- `fix/rss-date-parsing`

### 運用ルール
- `main` は直接 push せず PR 経由でマージ
- ブランチは小さく・短命（目安 1〜3 日）
- マージは基本 Squash、マージ後はブランチ削除