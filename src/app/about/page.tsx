export default function About() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-20">
      {/* Profile Overview */}
      <section className="mb-15">
        <div className="mb-5">
        <h1 className="text-4xl font-bold tracking-tight mb-3">About</h1>
        <p className="text-gray-600 dark:text-gray-400">
          ブログ執筆者の自己紹介
        </p>
      </div>
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
            Overview
          </h2>
          <div className="space-y-3 text-gray-700 dark:text-gray-300 leading-relaxed">
            <p className="font-medium">
              Name : <span className="text-lg font-bold">zawa-kun（ざわくん）</span>
            </p>
            <p>地方国公立大学でCSを専攻している大学4年生です！
                大学2年生までは、遊び惚けていましたが、3年次就活時に自分で一からWebアプリを制作した際に、Web開発の楽しさに気づき、そこからその空白の２年間を取り戻すべく、CSにのめり込む日々が始まり、今に至ります。
            </p>
            <p>
              本サイトでは、ソフトウェア開発やコンピュータサイエンスの学習過程を中心に、理解した内容の整理や実践の記録を発信しています。
              記事の多くは学習ログとしての側面が強く、学んだことを自分なりにまとめ直すことを目的としています。
            </p>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
          Skills
        </h2>
        <div className="space-y-4 text-gray-700 dark:text-gray-300">
          <p>
            大学での学習および個人開発を通して、以下の分野に触れてきました。
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>プログラミング（Python / TypeScript / C / Java / PHP等）</li>
            <li>Webアプリケーション開発(React, Next.js, Node.js等)</li>
            <li>データベース設計</li>
            <li>アルゴリズムとデータ構造</li>
            <li>Github Actionsを用いたCI/CDの構築</li>
            <li>クラウドサービスを利用した簡易的なアプリ運用(Cloudflare Pages, Vercel)</li>
          </ul>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
            いずれも学習途上であり、実務レベルの高度な専門性を持っているわけではありません。
            本ブログは、その過程で得た知識や経験を整理する場として運用しています。
          </p>
        </div>
      </section>

      {/* Qualifications */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
          Qualifications
        </h2>
        <ul className="space-y-3 text-gray-700 dark:text-gray-300">
          <li className="flex items-center">
            <span className="mr-2">•</span>
            <span>ITパスポート</span>
            <span className="text-sm text-gray-500 dark:text-gray-500">　　　 2024年10月</span>
          </li>
          <li className="flex items-center">
            <span className="mr-2">•</span>
            <span>基本情報技術者</span>
            <span className="text-sm text-gray-500 dark:text-gray-500">　　2025年4月</span>
          </li>
          <li className="flex items-center">
            <span className="mr-2">•</span>
            <span>応用情報技術者</span>
            <span className="text-sm text-gray-500 dark:text-gray-500">　　2025年12月</span>
          </li>
          <li className="flex items-center">
            <span className="mr-2">•</span>
            <span>TOEIC 545</span>
            <span className="text-sm text-gray-500 dark:text-gray-500">　　　　  2024年5月</span>
          </li>
        </ul>
      </section>

      {/* Activities */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
          Activities
        </h2>
        <div className="space-y-6">
            Coming soon...
        </div>
      </section>

      {/* Links */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
          Links
        </h2>
        <div className="space-y-2 text-gray-700 dark:text-gray-300">
          <p>
            <span className="font-medium">Blog:</span>{" "}
            <a
              href="https://zawa-kun.dev/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              https://zawa-kun.dev/
            </a>
          </p>
          <p>
            <span className="font-medium">GitHub:</span>{" "}
            <a
              href="https://github.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              https://github.com/
            </a>
          </p>
        </div>
      </section>

      {/* Note */}
      <section className="border-t pt-8 border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
          Note
        </h2>
        <div className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
          <p>本ページの内容は随時更新しています。</p>
          <p>
            記事内容や本プロフィールに関して、誤りや改善点などがあればご連絡ください。
          </p>
        </div>
      </section>
    </div>
  );
}
