import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number, currency: string): string {
  // Format number with commas
  const formattedAmount = amount
    ?.toString()
    ?.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  // Return formatted amount with currency
  return `${formattedAmount} ${currency}`;
}

export function isEmptyArray(array?: unknown[]) {
  if (!array) return true;

  if (!Array.isArray(array)) return true;

  if (array.length === 0) return true;

  return false;
}

// Generate random pastel colors for avatars
export const getRandomPastelColor = (name: string) => {
  const colors = [
    "bg-red-500",
    "bg-orange-500",
    "bg-amber-500",
    "bg-yellow-500",
    "bg-lime-500",
    "bg-green-500",
    "bg-emerald-500",
    "bg-teal-500",
    "bg-cyan-500",
    "bg-sky-500",
    "bg-blue-500",
    "bg-indigo-500",
    "bg-violet-500",
    "bg-purple-500",
    "bg-fuchsia-500",
    "bg-pink-500",
    "bg-rose-500",
  ];

  // Use the name to deterministically select a color
  const index =
    name.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0) %
    colors.length;
  return colors[index];
};

export const generateRandomID = (min = 0, max = 9999) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};
