// utils/redirectValidation.ts

/**
 * Validates redirect URLs to prevent open redirect vulnerabilities
 * @param url - The URL to validate
 * @returns A safe redirect URL (defaults to /timeline if invalid)
 */
export const validateRedirectUrl = (url: string): string => {
  // Only allow internal URLs (must start with /)
  if (!url.startsWith("/")) {
    console.warn("Invalid redirect: URL must be internal (start with /)");
    return "/timeline";
  }

  // Prevent protocol-based attacks (e.g., //evil.com or javascript://...)
  if (url.startsWith("//") || url.includes("://")) {
    console.warn("Invalid redirect: Protocol-based URL detected");
    return "/timeline";
  }

  // Whitelist allowed paths
    const allowedPaths = [
    "/timeline",
    "/form",
    "/find-price",
    "/search-result",
  ];

  const isAllowed = allowedPaths.some((path) => url.startsWith(path));

  if (!isAllowed) {
    console.warn(`Invalid redirect: URL "${url}" is not in whitelist`);
    return "/timeline";
  }

  return url;
};
