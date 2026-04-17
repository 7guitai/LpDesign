import { defineCollection, z, reference } from "astro:content";
import { CATEGORIES } from "@/consts";

const categorySlugs = CATEGORIES.map((c) => c.slug) as [string, ...string[]];

const authors = defineCollection({
  type: "data",
  schema: z.object({
    name: z.string(),
    role: z.string().optional(),
    bio: z.string().min(40).max(400),
    avatar: z.string().optional(),
    expertise: z.array(z.string()).default([]),
    credentials: z.array(z.string()).default([]),
    social: z
      .object({
        twitter: z.string().optional(),
        instagram: z.string().optional(),
        website: z.string().url().optional(),
      })
      .default({}),
  }),
});

const posts = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string().max(70),
    description: z.string().min(50).max(160),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    lastReviewedDate: z.coerce.date().optional(),
    category: z.enum(categorySlugs),
    tags: z.array(z.string()).default([]),
    cover: z.string().optional(),
    draft: z.boolean().default(false),
    pr: z.boolean().default(true),

    // E-E-A-T fields
    author: reference("authors"),
    reviewedBy: reference("authors").optional(),
    experience: z
      .object({
        usagePeriod: z.string().optional(),
        context: z.string().optional(),
        itemsTested: z.number().int().optional(),
      })
      .optional(),
    methodology: z.array(z.string()).default([]),
    faq: z
      .array(
        z.object({
          q: z.string(),
          a: z.string(),
        }),
      )
      .default([]),
    sources: z
      .array(
        z.object({
          title: z.string(),
          url: z.string().url(),
          publisher: z.string().optional(),
          accessedAt: z.coerce.date().optional(),
        }),
      )
      .default([]),
  }),
});

export const collections = { posts, authors };
