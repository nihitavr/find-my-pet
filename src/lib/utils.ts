import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

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
