export const formatNigerianPhone = (phone: string): string | null => {
  // Remove spaces, hyphens, parentheses
  const cleaned = phone.replace(/[\s\-()]/g, "");

  // Case 1: Starts with +234
  if (cleaned.startsWith("+234")) {
    const number = cleaned.slice(4);
    return number.length === 10 ? `+234${number}` : null;
  }

  // Case 2: Starts with 234
  if (cleaned.startsWith("234")) {
    const number = cleaned.slice(3);
    return number.length === 10 ? `+234${number}` : null;
  }

  // Case 3: Starts with 0 (local format)
  if (cleaned.startsWith("0")) {
    const number = cleaned.slice(1);
    return number.length === 10 ? `+234${number}` : null;
  }

  // Case 4: Just 10 digits (e.g. 8012345678)
  if (/^\d{10}$/.test(cleaned)) {
    return `+234${cleaned}`;
  }

  // Invalid Nigerian number
  return null;
};
