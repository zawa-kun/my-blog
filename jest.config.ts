import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest", // TypeScriptをサポートするプリセット
  testEnvironment: "node", // Node.js環境でテストを実行
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"], // 対応するファイル拡張子
  transform: {
    "^.+\\.tsx?$": "ts-jest", // TypeScriptファイルをトランスパイル
  },
  moduleNameMapper: {
    // エイリアスをサポートする場合
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  testMatch: ["**/*.test.ts"], // テストファイルのパターン
};

export default config;