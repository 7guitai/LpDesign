/**
 * 日本語本文の読了時間をざっくり計算する。
 * 日本人の平均読速 400-600 文字/分のうち、ゆったり読む前提で 500 文字/分 を採用。
 */
export function readingTime(content: string): number {
  const cleaned = content
    .replace(/<[^>]+>/g, "")
    .replace(/\s+/g, "")
    .trim();
  const minutes = Math.ceil(cleaned.length / 500);
  return Math.max(1, minutes);
}
