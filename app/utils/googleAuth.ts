/**
 * Initiates Google OAuth flow by redirecting to backend endpoint
 * Backend handles the entire OAuth process and redirects to callback
 */
export const handleGoogleSignIn = () => {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const googleAuthUrl = `${apiBaseUrl}/auth/google`;

  console.log("Redirecting to Google OAuth:", googleAuthUrl);
  window.location.href = googleAuthUrl;
};
