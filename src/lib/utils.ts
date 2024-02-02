import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { z } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Get time passed in years and months(eg 2 Years 5 Months) given datetime.
export function getTimePassed(startDate: Date) {
  const currentDate = new Date();
  const start = new Date(startDate);

  let years = currentDate.getFullYear() - start.getFullYear();
  let months = currentDate.getMonth() - start.getMonth();

  // Adjust years and months if the month difference is negative
  if (months < 0) {
    years--;
    months += 12; // Adding 12 months as we decreased a year
  }

  return `${years} Years ${months} Months`;
}

export function titleCase(str: string) {
  return str
    .split(" ")
    .map((word) => word[0]!.toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

export function getInstagramUsername(url?: string) {
  if (!url) return "";
  const username = url.split("/")[3];
  return username;
}
export function getInstagramUrl(username?: string) {
  if (!username) return "";
  return `https://www.instagram.com/${username}`;
}

export function removeLastSlash(url?: string) {
  if (!url) return "";
  return url.replace(/\/$/, "");
}

export function dateToISTString(date: Date) {
  if (!date) return "";

  return date.toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
  });
}

export function isValidCuid(cuid: string) {
  const zobParse = z.string().cuid().safeParse(cuid);

  if (zobParse.success === false) {
    return false;
  }

  return true;
}
