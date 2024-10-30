import { clsx, type ClassValue } from "clsx";
import { type Prisma } from "@prisma/client";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function parsePrismaJson(json: Prisma.JsonValue) {
  return JSON.parse(json as string) as unknown;
}
