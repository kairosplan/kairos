import type { Category } from "@/interfaces/course.interface";

type ColorKey = Category["color"];

export const colorMapping: Record<
  ColorKey,
  { text: string; bg: string; border: string }
> = {
  blue: {
    text: "text-blue-950 dark:text-blue-50",
    bg: "bg-blue-50/70 dark:bg-blue-950/70 hover:bg-blue-50/90 dark:hover:bg-blue-800/90 transition-colors duration-200",
    border: "border-blue-800 dark:border-blue-100",
  },
  red: {
    text: "text-red-950 dark:text-red-50",
    bg: "bg-red-50/70 dark:bg-red-950/70 hover:bg-red-50/90 dark:hover:bg-red-800/90 transition-colors duration-200",
    border: "border-red-800 dark:border-red-100",
  },
  green: {
    text: "text-green-950 dark:text-green-50",
    bg: "bg-green-50/70 dark:bg-green-950/70 hover:bg-green-50/90 dark:hover:bg-green-800/90 transition-colors duration-200",
    border: "border-green-800 dark:border-green-100",
  },
  orange: {
    text: "text-orange-950 dark:text-orange-50",
    bg: "bg-orange-50/70 dark:bg-orange-950/70 hover:bg-orange-50/90 dark:hover:bg-orange-800/90 transition-colors duration-200",
    border: "border-orange-800 dark:border-orange-100",
  },
  gray: {
    text: "text-gray-950 dark:text-gray-50",
    bg: "bg-gray-50/70 dark:bg-gray-950/70 hover:bg-gray-50/90 dark:hover:bg-gray-800/90 transition-colors duration-200",
    border: "border-gray-800 dark:border-gray-100",
  },
  teal: {
    text: "text-teal-950 dark:text-teal-50",
    bg: "bg-teal-50/70 dark:bg-teal-950/70 hover:bg-teal-50/90 dark:hover:bg-teal-800/90 transition-colors duration-200",
    border: "border-teal-800 dark:border-teal-100",
  },
  lime: {
    text: "text-lime-950 dark:text-lime-50",
    bg: "bg-lime-50/70 dark:bg-lime-950/70 hover:bg-lime-50/90 dark:hover:bg-lime-800/90 transition-colors duration-200",
    border: "border-lime-800 dark:border-lime-100",
  },
  purple: {
    text: "text-purple-950 dark:text-purple-50",
    bg: "bg-purple-50/70 dark:bg-purple-950/70 hover:bg-purple-50/90 dark:hover:bg-purple-800/90 transition-colors duration-200",
    border: "border-purple-800 dark:border-purple-100",
  },
  // Add more colors as needed
};
