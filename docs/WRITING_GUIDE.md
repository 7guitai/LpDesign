# 記事ライティングガイド（SEO × E-E-A-T）

Googleのランキング要因で特に重要な **E-E-A-T**（Experience / Expertise / Authoritativeness / Trust）を、このブログの記事フォーマットでどう担保するかをまとめたものです。

---

## 1. E-E-A-T を記事に落とし込む4つの柱

| 要素 | 意味 | 記事での担保方法 |
| --- | --- | --- |
| **Experience（経験）** | 実際に使った経験 | `experience` frontmatter／`<ExperienceNote>`／自分で撮った写真／期間と使用シーンの明記 |
| **Expertise（専門性）** | その分野を語れる専門性 | `author` の `expertise` / `credentials`／用語の正確さ／比較データ |
| **Authoritativeness（権威性）** | 業界で認知されているか | 著者プロフィール充実／SNSリンク／一次情報へのリンク／引用される構造 |
| **Trust（信頼）** | 情報が正確で透明か | `pr: true` と PR表記／`sources` で出典明示／`updatedDate` で最新性／免責事項 |

---

## 2. 必ず書く記事構成（ランキング記事）

```
1. 導入（150〜250字）         ← 読者の悩みを1文で言い換え、この記事で何が分かるかを約束
2. <AuthorCard />             ← 著者情報を最初に出す = Trust
3. <ExperienceNote />         ← 「いくつ試した／何ヶ月使った／どの場面で」= Experience
4. <MethodologyBox />         ← 「どう選んだか」3〜5項目 = Expertise
5. 目次
6. 選び方 3ポイント（H2）      ← 読者教育パート。専門性を示す
7. おすすめ5選（H2 × 5）      ← <ProductCard> で ranking + rating + verdict
8. 比較表                     ← 一覧で比較できるテーブル
9. <FaqList />                ← よくある質問（FAQ JSON-LD 自動出力）
10. まとめ                    ← 1位推し + 用途別推奨
11. <Sources />               ← 出典（メーカー公式・統計など）
```

---

## 3. frontmatter チェックリスト

```yaml
---
title: "大学生向けワイヤレスイヤホンおすすめ5選｜おしゃれ×コスパ重視"   # 32字前後、検索KW+ベネフィット
description: "講義の録音、通学のBGM、オンライン授業。大学生の一日に..."  # 50〜160字、リード文と別表現で
pubDate: 2026-04-15
updatedDate: 2026-04-17         # 内容を変更したら必ず更新
lastReviewedDate: 2026-04-17    # 変更していなくても情報確認したら更新
category: "gadget"
tags: ["イヤホン", "ワイヤレス", "コスパ", "大学生"]
cover: "/images/earphones-hero.jpg"
pr: true                         # アフィリを含むなら true

author: editor                   # src/content/authors/editor.json を参照
reviewedBy: editor               # （任意）監修者

experience:                      # ← Experience を明示
  usagePeriod: "3ヶ月以上"
  context: "通学・カフェ作業・オンライン授業"
  itemsTested: 12

methodology:                     # ← 選定の透明性
  - "1万円以下〜4万円までの価格帯から、大学生が買いやすい価格を優先"
  - "ノイズキャンセリング性能・連続再生時間・装着感を重点評価"
  - "実際に2週間以上使い、電車・教室・自宅で使用感を確認"
  - "Amazon・楽天のレビュー500件以上を参照し、長期的な故障傾向も確認"

faq:                             # ← FAQPage JSON-LDを自動出力
  - q: "大学生にワイヤレスイヤホンは必要ですか？"
    a: "必須ではありませんが、通学・図書館・オンライン授業など..."
  - q: "ノイズキャンセリングは必要？"
    a: "電車通学や学食で使うなら強く推奨..."

sources:                         # ← 信頼性を担保する出典
  - title: "Sony WF-1000XM5 製品仕様"
    url: "https://www.sony.jp/headphone/products/WF-1000XM5/"
    publisher: "Sony"
    accessedAt: 2026-04-15
---
```

---

## 4. SEOキーワード設計

- **メインKW**: `大学生 イヤホン おすすめ`（月間検索数 500〜2,000）
- **サジェスト**: `大学生 イヤホン ワイヤレス 安い`／`大学生 イヤホン おしゃれ`
- **共起語**: 通学・講義・録音・オンライン授業・ノイズキャンセリング

**タイトルの型**:
```
[ターゲット]向け[商品カテゴリ]おすすめ[数字]選｜[差別化ワード]
例）大学生向けワイヤレスイヤホンおすすめ5選｜おしゃれ×コスパ重視
```

---

## 5. 文章ルール

- **1文は60字以内、1段落3文まで**。スマホで読みやすく。
- **「〜と言われています」「〜かもしれません」は使わない**（Experience が弱く見える）。
  → 「3ヶ月使ったところ、〜でした」と断言する。
- **画像は必ず自分で撮る**。メーカー画像のみの記事は E-E-A-T で不利。
- **価格・スペックは必ず出典と取得日を書く**。
- **誤情報に気づいたら `updatedDate` を更新し、記事末尾に「更新履歴」を追記**。

### MDX記法の注意

コンポーネントの属性値 `summary="..."` などの中に **半角ダブルクォート `"` を直接入れない**。MDXが属性の終わりと解釈してビルドが壊れます。

- ❌ `summary="音楽を"ちゃんと"聴きたい人に"`
- ⭕ `summary="音楽を「ちゃんと」聴きたい人に"`
- ⭕ `summary={'音楽を"ちゃんと"聴きたい人に'}`（JSX式として渡す）

---

## 6. コンポーネントリファレンス

| コンポーネント | 用途 | 備考 |
| --- | --- | --- |
| `<Amazon asin="..." />` | Amazon アフィリエイトボタン | `src/consts.ts` の `amazonTag` を自動付与。`asin` または `url` / `search` で指定可能 |
| `<Rakuten url="..." />` | 楽天アフィリエイトボタン | もしも/楽天アフィリエイトで発行した URL をそのまま貼る |
| `<BuyBox name="..." amazonAsin="..." rakutenUrl="..." />` | Amazon + 楽天の2ボタンまとめ | 商品紹介後に置く購入導線 |
| `<Figure src="..." alt="..." caption="..." />` | キャプション付き画像 | `size="wide"` で本文幅より広く表示可能 |
| `<ExperienceNote />` | 記事冒頭で Experience を示す | HTML のみ |
| `<MethodologyBox />` | 選定基準を示す | HTML のみ |
| `<FaqList />` | FAQ | FAQPage JSON-LD を自動出力 |
| `<Sources />` | 参考出典 | HTML のみ |
| `<AuthorCard />` | 著者情報（記事の冒頭と末尾で自動表示） | Article.author / reviewedBy JSON-LD（post page 側） |

詳細は [`AFFILIATE_GUIDE.md`](./AFFILIATE_GUIDE.md) と [`IMAGE_GUIDE.md`](./IMAGE_GUIDE.md) を参照。

---

## 7. 公開前チェックリスト

- [ ] タイトル 32字前後 + メインKWを前方に
- [ ] description 120字前後、メインKWと共起語を含む
- [ ] 画像すべてに alt、`loading="lazy"`
- [ ] `pr: true` なら PR表示が出ているか
- [ ] FAQが3問以上ある
- [ ] 出典が1つ以上ある
- [ ] 本文中に「私/編集部が〜した」という経験記述がある
- [ ] 内部リンク 3つ以上（関連カテゴリ、関連記事）
- [ ] モバイルで読んで違和感がないか
- [ ] 公開後: Search Console でインデックス申請
