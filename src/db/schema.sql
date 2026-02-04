-- 親・子テーブルの整合性を保つために、外部キー制約を有効
PRAGMA foreign_keys = ON; 

-- Postテーブル
-- slugを主キーにする事で、Git管理ファイルとの連携を高速化
CREATE TABLE posts (
    slug TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    content_md TEXT NOT NULL,   -- Markdown全文
    created_at TEXT NOT NULL,   -- SQLLiteにはDATETIME型が無い為TEXT型
    updated_at TEXT  NOT NULL,  -- SQLLiteにはDATETIME型が無い為TEXT型
    visibility TEXT NOT NULL DEFAULT 'public' ,
    content_hash TEXT NOT NULL
);

-- Resourceテーブル
-- idは自動裁判。link_urlの一意制約で重複を防ぐ
CREATE TABLE resources (
    id INTEGER PRIMARY KEY,
    title TEXT NOT NULL,
    type TEXT NOT NULL,
    creator TEXT NOT NULL,
    status TEXT NOT NULL,
    link_url TEXT UNIQUE,
    img_link_url TEXT
);

-- Tagテーブル
-- nameを主キーにして、ID管理の手間を削除
CREATE TABLE tags (
    name TEXT PRIMARY KEY
);

-- Post-Tagの関連実体テーブル
-- 記事のSlug変更やタグ名変更に追従するようにCASCADEを設定
CREATE TABLE post_tags (
    post_slug TEXT NOT NULL,
    tag_name TEXT NOT NULL,
    PRIMARY KEY (post_slug, tag_name),  -- 複合主キー
    FOREIGN KEY (post_slug) REFERENCES posts(slug) 
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (tag_name) REFERENCES tags(name) 
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

-- Post-Resourceの関連実体テーブル
-- 記事のSlug変更に追従するようにCASCADEを設定
CREATE TABLE post_resources (
    post_slug TEXT NOT NULL,
    resource_id INTEGER NOT NULL,
    PRIMARY KEY (post_slug, resource_id),  -- 複合主キー
    FOREIGN KEY (post_slug) REFERENCES posts(slug) 
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (resource_id) REFERENCES resources(id) 
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

-- Resource-Tagの関連実体テーブル
-- タグ名変更に追従するようにCASCADEを設定
CREATE TABLE resource_tags (
    resource_id INTEGER NOT NULL,
    tag_name TEXT NOT NULL,
    PRIMARY KEY (resource_id, tag_name),  -- 複合主キー
    FOREIGN KEY (resource_id) REFERENCES resources(id) 
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (tag_name) REFERENCES tags(name) 
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

-- B-treeインデックスの作成
CREATE INDEX idx_post_tags_tag_name ON post_tags(tag_name); -- タグで記事検索の高速化
CREATE INDEX idx_resource_tags_tag_name ON resource_tags(tag_name); -- タグでリソース検索の高速化