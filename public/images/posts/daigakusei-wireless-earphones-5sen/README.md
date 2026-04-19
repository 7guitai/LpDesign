# この記事で使う画像

## 配置ルール

この記事の画像はすべてこのディレクトリに置きます。

```
public/images/posts/daigakusei-wireless-earphones-5sen/
  ├─ cover.jpg       ← 記事カバー（1200×675 / 16:9 推奨）
  ├─ lineup.jpg      ← 本文内の比較カット
  └─ ...
```

## 推奨サイズ

- **カバー画像**: 1200 × 675px（16:9）、JPEG、200〜400KB 程度
- **本文画像**: 横 1200px 以内、JPEG、150〜300KB 程度

画像を置いたら MDX 側では `/images/posts/<slug>/filename.jpg` の絶対パスで参照してください。
