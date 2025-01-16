import { getCollection } from "astro:content";
import type {
  EnrichedCourse,
  Module,
  CategoryColor,
} from "@/interfaces/course.interface";

export function normalizeSlug(slug: string) {
  return slug.endsWith("/") ? slug.slice(0, -1) : slug;
}

// Helper to get the course structure with lesson data
export async function getEnrichedCourse(courseSlug: string) {
  const courses = await getCollection("course");
  const course = courses.find((course) => course.slug === courseSlug);

  if (!course) {
    throw new Error(`Course with slug "${courseSlug}" not found.`);
  }

  const lessons = await getCollection("lesson");
  const courseLessons = lessons.filter(
    (lesson) =>
      lesson.slug.startsWith(courseSlug) && lesson.data.published === true,
  );

  if (courseLessons.length === 0) {
    throw new Error(`No lessons found for course with slug "${courseSlug}".`);
  }

  const authors = await getCollection("author");
  const levels = await getCollection("level");
  const categories = await getCollection("category");
  const tags = await getCollection("tag");

  const modules = course.data.modules;

  let lessonIndex = 1;

  // Enrich the structure with lesson data
  const structure: Module[] = modules.map((module) => ({
    title: module.title,
    lessons: module.lessons
      .map((lesson) => {
        const lessonData = courseLessons.find(
          // ⚠️ BUG: slug is being passed as id. That is why I'm adding it manually
          (courseLesson) => courseLesson.slug === (lesson as any).id,
        );

        if (!lessonData) {
          return null;
        }

        const author = authors.find(
          (author) => author.id === lessonData?.data.author.id,
        )!;

        if (!author) {
          throw new Error(
            `Author with id "${lessonData.data.author.id}" not found.`,
          );
        }

        return lessonData
          ? {
              index: lessonIndex++,
              id: lessonData.id,
              slug: lessonData.slug,
              published: lessonData.data.published as true,
              title: lessonData.data.title,
              minutes: lessonData.data.minutes,
              videoUrl: lessonData.data.videoUrl,
              author: {
                id: author.id,
                name: author.data.name,
                img: author.data.img,
                height: author.data.img.height,
                width: author.data.img.width,
                format: author.data.img.format,
              },
            }
          : null;
      })
      // Filter out null (unpublished) lessons
      .filter((lesson) => lesson !== null),
  }));

  const level = levels.find((l) => l.id === course.data.level.id)!;
  const category = categories.find((c) => c.id === course.data.category.id)!;
  const tag = tags.find((t) => t.id === course.data.tag.id)!;

  if (!level || !category || !tag) {
    throw new Error(
      `Missing metadata: level, category, or tag not found for course "${courseSlug}"`,
    );
  }

  const enrichedCourse: EnrichedCourse = {
    id: course.id,
    slug: course.slug,
    published: course.data.published,
    title: course.data.title,
    description: course.data.description,
    img: course.data.img,
    trailerUrl: course.data.trailerUrl,
    createdAt: course.data.createdAt,
    updatedAt: course.data.updatedAt,
    category: {
      id: category.id,
      name: category.data.name,
      color: category.data.color as CategoryColor,
    },
    tag: {
      id: tag.id,
      name: tag.data.name,
      parentCategory: tag.data.parentCategory.id,
    },
    level: {
      id: level.id,
      name: level.data.name,
    },
    authors: course.data.authors.map((authorRef) => {
      const author = authors.find((a) => a.id === authorRef.id)!;
      return {
        id: author.id,
        name: author.data.name,
        img: author.data.img,
      };
    }),
    modules: structure,
  };

  return enrichedCourse;
}

// Helper to get the next and previous lessons
export async function getNextAndPreviousLesson(
  courseSlug: string,
  lessonSlug: string,
) {
  const enrichedCourse = await getEnrichedCourse(courseSlug);
  const normalizedLessonSlug = normalizeSlug(lessonSlug);

  // Flatten the lessons into a single array
  const allLessons = enrichedCourse.modules.flatMap((module) => module.lessons);

  // Find the current lesson index
  const currentIndex = allLessons.findIndex(
    (lesson) => lesson.slug === normalizedLessonSlug,
  );

  if (currentIndex === -1) {
    throw new Error(`Lesson with slug "${normalizedLessonSlug}" not found.`);
  }

  // Determine previous and next lessons
  const previousLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
  const currentLesson = allLessons[currentIndex];
  const nextLesson =
    currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;

  return { previousLesson, currentLesson, nextLesson };
}
