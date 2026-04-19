# アフィリエイトリンクの貼り方ガイド

記事の本文にアフィリエイトリンクを **1行で挿入** できるようコンポーネント化してあります。MDX 記事の中に書くだけで、自動的に以下が付与されます。

- `rel="sponsored nofollow noopener"`
- `target="_blank"`
- Amazon アソシエイトのトラッキングID（`src/consts.ts` の `amazonTag`）

---

## 1. 事前設定

`src/consts.ts` を開いて、自分のトラッキングIDに書き換えてください。

```ts
export const SITE = {
  // ...
  amazonTag: "kyampus-22",      // ← 自分の Amazon アソシエイトID
  rakutenAffiliateId: "",       // （任意）
};
```

---

## 2. Amazon ボタン：`<Amazon />`

MDXの先頭でインポート。

```mdx
import Amazon from "@/components/Amazon.astro";
```

### 2-a. ASIN で貼る（推奨）

商品ページのURLに含まれる `dp/XXXXXXXXXX` の10桁が ASIN です。

```mdx
<Amazon asin="B0CHL5BZ1P" />
```

→ `https://www.amazon.co.jp/dp/B0CHL5BZ1P?tag=kyampus-22` に展開されます。

### 2-b. URL で貼る

ASINが分かりにくいページ（検索結果・ストア特集など）はURLを直接指定。

```mdx
<Amazon url="https://www.amazon.co.jp/stores/Anker/page/xxxxx" label="Ankerストアを見る" />
```

### 2-c. 検索キーワードで貼る（ASIN未定の暫定）

記事を書き進めて後でASINを埋める予定のときの暫定措置として使えます。

```mdx
<Amazon search="Sony WF-1000XM5" />
```

### ボタンの見た目

- デフォルトはブロック表示（幅いっぱい or PCでは最小240px）
- インラインで使いたいときは `block={false}`

---

## 3. 楽天ボタン：`<Rakuten />`

楽天アフィリエイトや「もしもアフィリエイト」で発行した**最終リンクURL**をそのまま貼ります（トラッキングは URL 側に含まれるため）。

```mdx
import Rakuten from "@/components/Rakuten.astro";

<Rakuten url="https://hb.afl.rakuten.co.jp/xxx" />
```

検索フォールバック：

```mdx
<Rakuten search="ワイヤレスイヤホン おしゃれ" />
```

---

## 4. Amazon + 楽天 まとめボタン：`<BuyBox />`

商品紹介の直後に置く「購入導線ボックス」。商品名とブランド名を表示し、Amazon / 楽天のボタンを横並びで出します。

```mdx
import BuyBox from "@/components/BuyBox.astro";

<BuyBox
  brand="Anker / Soundcore"
  name="Soundcore Liberty 4 NC"
  amazonAsin="B0CHL5BZ1P"
  rakutenUrl="https://hb.afl.rakuten.co.jp/xxx"
  note="※価格は変動します。最新はリンク先で確認してください。"
/>
```

---

## 5. 規約面で守るべきポイント

- **PR表記**：記事 frontmatter で `pr: true` にする。記事ヘッダーに「本記事にはアフィリエイト広告が含まれます（PR）」が自動表示されます。
- **価格・在庫の断定回避**：価格や在庫は変動するため、「◯◯円」と本文で断定するより「各ECで価格を確認してください」が安全。
- **出典の明示**：スペック数値は必ず `sources` frontmatter でメーカー公式ページにリンク。
- **rel属性**：本コンポーネントは自動で `sponsored nofollow noopener` を付けるので、自前で `<a>` を書くのは極力避ける。

---

## 6. リンクの健全性チェック（任意）

公開前に、各アフィリエイトリンクが実際に商品ページへ飛ぶかを自分でクリックして確認してください。リンク切れや差し替えはSearch Consoleよりも収益に直結します。
