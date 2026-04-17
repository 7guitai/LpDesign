# Kyampus — 大学生向けおしゃれ商品アフィリエイトブログ

Astro + MDX + Tailwind CSS で構築した、大学生向けのアフィリエイトブログのテンプレートです。Instagram と連携した運用を前提に、SEO と UI を重視して設計しています。

## 技術スタック

- **Astro 5** — 静的サイトジェネレータ。Core Web Vitals 最適化済み
- **MDX** — Markdown 内で `<ProductCard />` などの Astro コンポーネントを埋め込み可能
- **Tailwind CSS** + `@tailwindcss/typography` — 余白・タイポ重視のミニマル設計
- **@astrojs/sitemap / rss** — sitemap.xml と rss.xml を自動生成
- **JSON-LD** — `Article`, `BreadcrumbList`, `WebSite` 構造化データ内蔵

## セットアップ

```bash
npm install
npm run dev        # http://localhost:4321
npm run build
npm run preview
```

## ディレクトリ構成

```
src/
  components/      # Header, Footer, PostCard, ProductCard, Prose
  content/
    config.ts      # 記事の frontmatter スキーマ (zod)
    posts/*.mdx    # 記事本体
  layouts/
    BaseLayout.astro  # SEOメタ、OGP、JSON-LDを集約
  pages/
    index.astro            # トップ
    posts/[...slug].astro  # 記事詳細
    category/[category].astro
    about.astro / privacy.astro / disclaimer.astro / 404.astro
    rss.xml.js
  styles/global.css
  consts.ts        # サイト名・カテゴリ・ナビ
public/
  robots.txt
  favicon.svg
```

## 記事の書き方

`src/content/posts/` に `.mdx` ファイルを追加します。frontmatter は以下の通り。

```yaml
---
title: "大学生向けワイヤレスイヤホンおすすめ5選"
description: "50〜160字。検索意図を意識したリード文と重なる内容で。"
pubDate: 2026-04-15
category: "gadget"   # gadget | fashion | life | study
tags: ["イヤホン", "ワイヤレス"]
cover: "/images/xxx.jpg"  # 任意
draft: false
pr: true   # アフィリエイトを含む場合は true（PRタグが表示されます）
---

import ProductCard from "@/components/ProductCard.astro";

<ProductCard
  rank={1}
  brand="SoundCore"
  name="Liberty 4 NC"
  price="12,990円"
  summary="..."
  pros={["..."]}
  cons={["..."]}
  amazon="https://..."
  rakuten="https://..."
/>
```

## SEO チェックリスト

- [x] `<title>` は `記事タイトル | サイト名` 形式で 60 字以内
- [x] `description` 50〜160 字（zod で検証）
- [x] OGP / Twitter Card
- [x] canonical / sitemap / RSS
- [x] JSON-LD: `Article` + `BreadcrumbList` + `WebSite`
- [x] 画像は `loading="lazy"` + `decoding="async"`
- [x] アフィリエイトリンクは `rel="sponsored nofollow noopener"`
- [ ] 本番デプロイ時: `astro.config.mjs` の `site` を実ドメインに変更
- [ ] Google Search Console にサイトマップ送信
- [ ] 各記事に OGP 画像（1200×630）を用意

## 運用フロー（ブログ × Instagram）

1. **キーワード選定** — 「大学生 ◯◯ おすすめ」系のロングテール
2. **ブログ執筆** — 3,000〜5,000字、選び方 → 5選 → 比較表 → FAQ
3. **Instagram カルーセル** — 同じ5選を10枚の画像に
4. **リール動画** — 30秒で1〜2商品の使用感
5. **プロフィール欄** — ブログ URL へ導線

## デプロイ

Vercel / Cloudflare Pages / Netlify どれでも可。推奨は **Vercel**。

```
Build command: npm run build
Output directory: dist
```

本番前にやること:
- `src/consts.ts` の SITE.url, twitter, instagram を実値に
- `astro.config.mjs` の `site` を実ドメインに
- `public/robots.txt` の Sitemap URL を実ドメインに
- `/og-default.png` を `public/` に配置（1200×630）
