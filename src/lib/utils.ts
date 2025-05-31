import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  // vercel shadcn function for handling classname literals
  return twMerge(clsx(inputs))
}
