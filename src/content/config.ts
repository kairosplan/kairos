import { defineCollection, reference, z } from "astro:content";

const course = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      published: z.boolean().default(false),
      title: z.string(),
      description: z.string(),
      img: image(),
      trailerUrl: z.string().url(),
      createdAt: z.date(),
      updatedAt: z.date().optional(),
      category: reference("category"),
      tag: reference("tag"),
      level: reference("level"),
      authors: z.array(reference("author")),
      modules: z.array(
        z.object({
          title: z.string(),
          lessons: z.array(reference("lesson")),
        }),
      ),
    }),
});

const lesson = defineCollection({
  type: "content",
  schema: z.object({
    published: z.boolean().default(false),
    title: z.string(),
    videoUrl: z.string().url().optional(),
    minutes: z.number().int().min(1),
    author: reference("author"),
  }),
});

const category = defineCollection({
  type: "data",
  schema: z.object({
    name: z.string(),
    description: z.string().optional(),
    color: z.string(),
  }),
});

const tag = defineCollection({
  type: "data",
  schema: z.object({
    name: z.string(),
    description: z.string().optional(),
    parentCategory: reference("category"),
  }),
});

const level = defineCollection({
  type: "data",
  schema: z.object({
    name: z.enum(["Beginner", "Intermediate", "Advanced"]),
  }),
});

const author = defineCollection({
  type: "data",
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      description: z.string(),
      img: image(),
    }),
});

const route = defineCollection({
  type: "data",
  schema: z.object({
    name: z.string(),
    description: z.string().optional(),
    category: reference("category"),
    tag: reference("tag"),
    level: reference("level"),
    authors: z.array(reference("author")),
    courses: z.array(reference("course")),
  }),
});

export const collections = {
  course,
  lesson,
  category,
  tag,
  level,
  author,
  route,
};
