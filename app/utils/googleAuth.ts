/**
 * Initiates Google OAuth flow by redirecting to backend endpoint
 * Backend handles the entire OAuth process and redirects to callback
 */
export const handleGoogleSignIn = () => {
  const googleApiBaseUrl = process.env.NEXT_PUBLIC_GOOGLE_API_BASE_URL;
  const googleAuthUrl = `${googleApiBaseUrl}/auth/google`;

  console.log("Redirecting to Google OAuth:", googleAuthUrl);
  window.location.href = googleAuthUrl;
};
