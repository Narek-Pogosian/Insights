import { clsx, type ClassValue } from "clsx";
import { type Response, type Prisma } from "@prisma/client";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function parsePrismaJson(json: Prisma.JsonValue) {
  return JSON.parse(json as string) as unknown;
}

export function answersToCsv(answers: Response[]) {
  const csvRows = [];
  const arr = answers.map(
    (a) => parsePrismaJson(a.answers) as Record<string, string>,
  );
  const headers = Object.keys(arr[0]!);

  csvRows.push(headers.join(","));
  for (const obj of arr) {
    csvRows.push(Object.values(obj).join(","));
  }

  return csvRows.join("\n");
}

export const downloadCsv = (filename: string, csv: string) => {
  const csvFile = new Blob([csv], { type: "text/csv" });
  const downloadLink = document.createElement("a");

  downloadLink.download = filename;
  downloadLink.href = window.URL.createObjectURL(csvFile);
  downloadLink.style.display = "none";

  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
};
