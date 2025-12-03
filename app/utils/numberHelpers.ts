// Parse user input (string) into a number
export const parseNumber = (value: string): number | null => {
  const numericValue = value.replace(/\D/g, "");
  return numericValue ? Number(numericValue) : null;
};

// Format number for display with commas
export const formatNumber = (value: number | null): string => {
  return value != null ? value.toLocaleString() : "";
};
