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

## 記事の書き方（SEO × E-E-A-T）

詳しくは **[docs/WRITING_GUIDE.md](./docs/WRITING_GUIDE.md)** を必読。雛形は **[docs/post-template.mdx](./docs/post-template.mdx)** をコピーして使います。

### E-E-A-T を担保するしくみ

| 要素 | 実装 |
| --- | --- |
| Experience | `experience` frontmatter + `<ExperienceNote>` で使用期間/シーン/検証数を明示 |
| Expertise  | `authors` コレクションの `credentials`/`expertise`、`methodology` で選定基準 |
| Authoritativeness | `author`/`reviewedBy` を Person JSON-LD として埋め込み、SNS/websiteも |
| Trust | `pr` フラグでPR表記、`sources` で出典、`updatedDate`/`lastReviewedDate` で最新性 |

### 自動で埋まる構造化データ

- `Article`（author/reviewedBy を Person として）
- `BreadcrumbList`
- `WebSite`
- `FAQPage`（frontmatter `faq` があれば）
- `ItemList` + `Product` + `Review`（`<ProductCard rating={...}>` から自動生成）

### 著者の追加方法

`src/content/authors/*.json` に追加して、記事 frontmatter で `author: <ファイル名>` と参照します。

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

## デプロイ（Cloudflare Pages）

詳細は **[docs/DEPLOY.md](./docs/DEPLOY.md)** 参照。要点:

| 項目 | 値 |
| --- | --- |
| Framework preset | Astro |
| Build command | `npm run build` |
| Output directory | `dist` |
| 環境変数 | `NODE_VERSION=20` |

GitHub連携で自動デプロイ。セキュリティヘッダは `public/_headers`、キャッシュも同ファイルで 1年 immutable。

本番前:
- `src/consts.ts` の `SITE.url` を実ドメインに
- `astro.config.mjs` の `site` も同じく
- `public/robots.txt` の Sitemap URL を本番ドメインに
- `public/og-default.png`（1200×630）を配置
