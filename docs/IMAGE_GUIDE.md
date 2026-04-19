# 画像の入れ方ガイド

画像は手動でアップロードする運用に統一します。**記事ごとにフォルダを切る**ルールだけ守れば、何年経っても迷子になりません。

---

## 1. ディレクトリ構成

```
public/
└─ images/
   └─ posts/
      └─ <記事のslug>/
         ├─ cover.jpg           ← 記事カバー（OGP & ヒーロー）
         ├─ lineup.jpg          ← 本文内で使う画像
         ├─ detail-01.jpg
         └─ ...
```

- slug は MDX のファイル名から `.mdx` を外したもの。例: `daigakusei-wireless-earphones-5sen.mdx` → `daigakusei-wireless-earphones-5sen`。
- MDX からは **`/images/posts/<slug>/filename.jpg`** の絶対パスで参照します。

---

## 2. 推奨サイズ・形式

| 種類 | サイズ | 形式 | ファイルサイズ目安 |
| --- | --- | --- | --- |
| カバー画像（hero / OGP） | 1200 × 675px（16:9） | JPEG / WebP | 200〜400KB |
| 本文画像（通常） | 横 1200px 以内 | JPEG / WebP | 150〜300KB |
| 本文画像（ワイド表示） | 横 1600px 以内 | JPEG / WebP | 250〜450KB |

**縦横比16:9**をカバー画像の既定にしてください。記事ページのヒーロー表示・OGP生成の両方に使い回します。

**圧縮**は [Squoosh](https://squoosh.app/) や [TinyPNG](https://tinypng.com/) を通してください。原寸のスマホ写真（5〜10MB）をそのまま上げると Cloudflare の表示が重くなります。

---

## 3. カバー画像の指定

MDX frontmatter で `cover` を絶対パスで指定するだけで、以下が自動的に設定されます。

- 記事ページ上部にヒーロー表示（16:9 クロップ）
- OGP（`og:image`）と Twitter Card の画像
- Article JSON-LD の `image`

```yaml
---
cover: "/images/posts/daigakusei-wireless-earphones-5sen/cover.jpg"
---
```

**空のまま（`cover: ""`）**にすると、サイト共通の `/og-default.png` がOGPに使われます（ヒーローは非表示）。

---

## 4. 本文内で画像を挿入する：`<Figure />`

MDXの先頭でインポートして使います。

```mdx
import Figure from "@/components/Figure.astro";

<Figure
  src="/images/posts/daigakusei-wireless-earphones-5sen/lineup.jpg"
  alt="編集部で検証した5モデル"
  caption="編集部で比較検討した代表的な5モデル"
/>
```

オプション：

- `size="wide"` — 本文幅より広く、やや引いた画で見せたいとき
- `aspect="16/9"` — 縦横比を固定したいとき（バラツキを抑えて見栄えが揃う）

---

## 5. alt テキストの書き方

**alt は画像検索と E-E-A-T の両方で効きます。** 「イヤホン」ではなく「机に並んだ5モデルのワイヤレスイヤホン」のように、**何が・どんな状態で・どの文脈で**写っているかを書いてください。

---

## 6. 画像の出どころ

- **自分で撮影した写真** を最優先（E-E-A-T の Experience に直結）
- メーカー公式画像を使う場合は**各メーカーの素材利用規約を確認**
- フリー素材（Unsplash など）は最後の選択肢。同じ写真を他サイトでも見かけやすいため、独自性が落ちる

---

## 7. 画像追加の流れ（まとめ）

1. `public/images/posts/<slug>/` を作る
2. 圧縮済みのJPEG / WebPを配置
3. MDX frontmatter に `cover` を書く（ヒーロー用）
4. 本文で `<Figure src="..." alt="..." />` を差し込む
5. ビルドして表示確認 → コミット & プッシュ → Cloudflare Pages 側で自動デプロイ
