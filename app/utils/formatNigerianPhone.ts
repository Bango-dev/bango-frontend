// utils/phoneFormatter.ts (or wherever you have this function)
export const formatNigerianPhone = (phone: string): string | null => {
  if (!phone) return null;

  // Remove all spaces, hyphens, parentheses, and plus signs
  const cleaned = phone.replace(/[\s\-()+ ]/g, "");

  // Case 1: Starts with 234 (already international format without +)
  if (cleaned.startsWith("234")) {
    const number = cleaned.slice(3);
    if (number.length === 10 && /^\d{10}$/.test(number)) {
      return `+234${number}`;
    }
  }

  // Case 2: Starts with 0 (local Nigerian format)
  if (cleaned.startsWith("0")) {
    const number = cleaned.slice(1);
    if (number.length === 10 && /^\d{10}$/.test(number)) {
      return `+234${number}`;
    }
  }

  // Case 3: Just 10 digits (e.g. 8012345678)
  if (/^\d{10}$/.test(cleaned)) {
    return `+234${cleaned}`;
  }

  // Invalid format
  return null;
};
