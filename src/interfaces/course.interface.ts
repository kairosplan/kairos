export interface EnrichedCourse {
  id: string;
  slug: string;
  published: boolean;
  title: string;
  description: string;
  img: Image;
  trailerUrl: string;
  createdAt: Date;
  updatedAt?: Date;
  category: Category;
  tag: Tag;
  level: Level;
  authors: Author[];
  modules: Module[];
}

export interface Module {
  title: string;
  lessons: Lesson[];
}

export interface Image {
  src: string;
  height: number;
  width: number;
  format: "png" | "jpg" | "jpeg" | "tiff" | "webp" | "gif" | "svg" | "avif";
}

export interface Lesson {
  index: number;
  id: string;
  slug: string;
  published: true;
  title: string;
  videoUrl?: string;
  minutes: number;
  author: Author;
}

interface Author {
  id: string;
  name: string;
  img: Image;
}

export interface Category {
  id: string;
  name: string;
  color: CategoryColor;
}

export type CategoryColor =
  | "blue"
  | "red"
  | "orange"
  | "gray"
  | "teal"
  | "lime"
  | "purple"
  | "green";

interface Tag {
  id: string;
  name: string;
  parentCategory: string;
}

interface Level {
  id: string;
  name: string;
}
