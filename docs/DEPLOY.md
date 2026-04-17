# Cloudflare Pages デプロイ手順

このブログは **全ページ事前生成（SSG）** のため、Cloudflare Pages に adapter なしでそのままデプロイできます。

---

## 方法A: GitHub 連携（推奨・自動デプロイ）

### 1. Cloudflare Pages プロジェクト作成

1. https://dash.cloudflare.com/ → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**
2. リポジトリ `7guitai/lpdesign` を選択
3. Production ブランチ: `main`（現在の開発ブランチを main にマージした後）

### 2. ビルド設定

| 項目 | 値 |
| --- | --- |
| Framework preset | **Astro** |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Root directory | （空） |
| Node version (環境変数) | `NODE_VERSION` = `20` |

### 3. 環境変数（必要なら）

Settings → Environment variables:
- `NODE_VERSION` = `20`
- （解析用）`PUBLIC_GA_ID` = `G-XXXXXXXXXX` など

### 4. デプロイ

Save and Deploy を押すと、2〜3分で初回デプロイ完了。以降は push 毎に自動デプロイされます。

### 5. 本番ドメイン設定

1. Pages プロジェクト → Custom domains → Set up a custom domain
2. 独自ドメイン（例: `kyampus.com`）を入力 → Cloudflareが自動でCNAME/Aレコード設定
3. `src/consts.ts` の `SITE.url` を本番ドメインに更新 → commit & push
4. `public/robots.txt` の Sitemap URL も合わせる

---

## 方法B: Wrangler CLI（手動デプロイ）

ローカルから直接デプロイする方法。GitHub連携が使えない場合や、テスト目的に。

```bash
# 初回のみ: ログイン
npx wrangler login

# ローカルでビルドをプレビュー（本番と同じ環境）
npm run build
npm run cf:preview   # http://localhost:8788

# 本番デプロイ
npm run build
npm run cf:deploy
```

初回デプロイ時にプロジェクト名（`kyampus`）を聞かれます。以降は同じ名前で上書きされます。

---

## デプロイ前チェックリスト

- [ ] `src/consts.ts` の `SITE.url` を本番ドメインに
- [ ] `astro.config.mjs` の `site` も同じ本番ドメインに
- [ ] `public/robots.txt` の Sitemap URL を本番ドメインに
- [ ] `public/og-default.png`（1200×630）を配置
- [ ] `src/content/authors/editor.json` の social を実アカウントに
- [ ] 全記事の `pr: true` と PR表記が正しいか
- [ ] ローカルで `npm run build && npm run preview` してエラーがないか

---

## デプロイ後にやること

1. **Search Console 登録**
   https://search.google.com/search-console → プロパティ追加 → `https://ドメイン/sitemap-index.xml` を送信

2. **Cloudflare Web Analytics を有効化**（無料）
   Pages プロジェクト → Settings → Web Analytics を ON にするだけ。計測タグの埋め込みは不要。

3. **キャッシュ設定の確認**
   `public/_headers` で `/_astro/*` と `/assets/*` を 1年キャッシュしています。CF Dashboard の Caching で Purge Everything できます。

4. **画像の最適化**
   Cloudflare Images（有料）または Polish（Pro以上）を有効化すると、WebP/AVIF 変換が自動でかかります。

---

## トラブルシュート

| 症状 | 原因 / 対処 |
| --- | --- |
| `Cannot find module 'astro'` | `NODE_VERSION=20` が環境変数に設定されていない |
| ビルドは通るが404が出る | `dist` 以下の構造を確認。`_routes.json` は不要（純静的のため） |
| CSSが当たらない | Tailwind の build output が `/_astro/*.css` として出力されているか確認 |
| sitemap が空 | `astro.config.mjs` の `site` が未設定。本番ドメインを入れる |
| OG画像が出ない | `SITE.defaultOgImage` が `/og-default.png` 前提。`public/og-default.png` を配置 |

---

## SSR（動的機能）が欲しくなったら

Cloudflare Workers 上で SSR したい場合は adapter を追加:

```bash
npm install @astrojs/cloudflare
```

```js
// astro.config.mjs
import cloudflare from "@astrojs/cloudflare";
export default defineConfig({
  output: "server",
  adapter: cloudflare(),
  // ...
});
```

ただし、**ブログは基本的に SSG で十分** です。検索機能・コメント・会員機能などを追加するまでは adapter なしで運用してください。
