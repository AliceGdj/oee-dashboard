import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function percentToDecimal(value: string) {
  return parseFloat(value) / 100;
}

export function highlight(value: string) {
  if (!value || value === undefined) {
    return;
  }
  if (Number(value) >= 85) {
    return "bg-green-400";
  }
  if (Number(value) > 65) {
    return "bg-amber-400";
  }
  if (Number(value) < 65) {
    return "bg-red-400";
  }
}
