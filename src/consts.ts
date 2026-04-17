export const SITE = {
  name: "Kyampus",
  title: "Kyampus — 大学生のための、ちょうどいい。",
  description:
    "大学生が本当に使いたくなる、おしゃれで手の届くアイテムを厳選。イヤホン、ファッション小物、ガジェット、一人暮らしの道具まで。",
  url: "https://example.com",
  locale: "ja_JP",
  lang: "ja",
  author: "Kyampus 編集部",
  defaultOgImage: "/og-default.png",
  twitter: "@kyampus",
  instagram: "kyampus",
} as const;

export const CATEGORIES = [
  { slug: "gadget", name: "ガジェット", description: "イヤホン、キーボード、PC周り。講義もバイトも捗る道具たち。" },
  { slug: "fashion", name: "ファッション", description: "キャンパスで浮かない、でも人と被らない。シンプルで長く使える服と小物。" },
  { slug: "life", name: "暮らし", description: "一人暮らしをちょっと良くする、雑貨・家電・日用品。" },
  { slug: "study", name: "勉強", description: "ノート、ペン、アプリ。静かに集中できる環境の作り方。" },
] as const;

export type CategorySlug = (typeof CATEGORIES)[number]["slug"];

export const NAV = [
  { href: "/", label: "Home" },
  { href: "/category/gadget", label: "ガジェット" },
  { href: "/category/fashion", label: "ファッション" },
  { href: "/category/life", label: "暮らし" },
  { href: "/category/study", label: "勉強" },
  { href: "/about", label: "About" },
] as const;
