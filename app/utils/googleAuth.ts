
import { validateRedirectUrl } from "./redirectvalidation";
/**
 * Initiates Google OAuth flow by redirecting to backend endpoint
 * @param redirectTo - Optional URL to redirect to after successful authentication
 */
export const handleGoogleSignIn = (redirectTo?: string) => {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  // Get the current page URL if no redirect is specified
  const currentUrl =
    typeof window !== "undefined" ? window.location.pathname : "/timeline";
  const targetUrl = redirectTo || currentUrl;

  // Encode the redirect URL to safely pass it as a query parameter

  // ✅ Validate before encoding
  const validatedUrl = validateRedirectUrl(targetUrl);
  const encodedRedirect = encodeURIComponent(validatedUrl);

  // Append redirect parameter to the OAuth URL
  const googleAuthUrl = `${apiBaseUrl}/auth/google?redirect=${encodedRedirect}`;

  console.log("Redirecting to Google OAuth:", googleAuthUrl);
  console.log("Will redirect back to:", targetUrl);

  window.location.href = googleAuthUrl;
};
