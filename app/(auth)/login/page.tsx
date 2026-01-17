"use client";

import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import Input from "../../(main)/form/Input";
import PrimaryButton from "../../components/ui/PrimaryButton";
import SecondaryButton from "../../components/ui/SecondaryButton";
import Link from "next/link";
import authApi from "../../utils/api";
import { AuthContext } from "../../context/AuthContext";
import toast from "react-hot-toast";
import { handleGoogleSignIn } from "../../utils/googleAuth";
import { useSearchParams } from "next/navigation";
import { validateRedirectUrl } from "../../utils/redirectvalidation";

const SignIn = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  if (!AuthContext) {
    throw new Error("AuthContext must be used within AuthProvider");
  }
  const { setUser } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Get the redirect URL from query params (if protected route sent them here)
  // ✅ Validate the redirect URL
  const redirectTo = validateRedirectUrl(
    searchParams.get("redirect") || "/timeline"
  );

  const handleGoogleClick = () => {
    // ✅ Pass the redirect URL to Google OAuth
    handleGoogleSignIn(redirectTo);
  };

  // (auth)/login/page.tsx
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error("Please enter your email and password");
      return;
    }

    setLoading(true);

    try {
      const response = await authApi.post("/auth/login", formData);
      console.log("Login response:", response.data);
      console.log("Login headers:", response.headers);
      console.log("Cookies after login:", document.cookie); // ✅ Check cookies
      if (response.data.entity) {
        console.log("Setting user:", response.data.entity.user);

        // ✅ Set user first
        setUser(response.data.entity);

        // ✅ Wait for React to process the state update
        await new Promise((resolve) => setTimeout(resolve, 0));

        toast.success("Login successful!");

        // ✅ Then navigate
        // ✅ Redirect to intended page or default timeline
        console.log("Redirecting to:", redirectTo);
        router.replace(redirectTo);
      } else {
        toast.error("Login succeeded but user data is missing");
      }
    } catch (err: any) {
      console.error("Login error:", err);
      toast.error(
        err.response?.data?.message ||
          err.message ||
          "Login failed. Please check your credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-around items-center min-h-screen mx-auto w-full">
      <form
        className="form shadow-none border border-none"
        onSubmit={handleSubmit}
      >
        <h2 className="font-bold md:text-2xl text-base text-center">
          Sign-In to Bango
        </h2>
        <h3 className="text-[#757575] text-center sm:text-base text-sm">
          Crowdsourced prices for all your needs
        </h3>

        <Input
          label="Email"
          type="email"
          placeholder="Johndoe@gmail.com"
          name="email"
          autoComplete="email"
          required
          value={formData.email}
          onChange={handleChange}
        />

        <Input
          label="Password"
          type="password"
          placeholder="********"
          name="password"
          required
          value={formData.password}
          onChange={handleChange}
        />

        <div className="flex items-center">
          <input type="checkbox" className="border rounded-md" />
          <label className="text-sm text-[#757575] ml-2">Remember me</label>
          <Link
            href="/forgot-password"
            className="text-(--color-primary) font-bold ml-auto"
          >
            Forgot Password?
          </Link>
        </div>

        <div className="flex flex-col gap-4 w-full">
          <PrimaryButton
            text="Sign In"
            type="submit"
            loading={loading}
            loadingText="Signing In..."
            className="w-full"
          />

          <SecondaryButton
            text="Sign In with Google"
            onClick={handleGoogleClick}
            iconSrc="/images/on-boarding/google-icon.svg"
            className="w-full"
          />
        </div>

        <p className="text-center text-sm text-[#757575] mt-4">
          Don&apos;t have an account?
          <Link
            href={`/register${
              searchParams.get("redirect")
                ? `?redirect=${searchParams.get("redirect")}`
                : ""
            }`}
            className="ml-2 text-(--color-primary) font-bold"
          >
            Sign up
          </Link>
        </p>
      </form>

      <div className="hidden md:flex h-screen w-[50%]">
        <div className="hidden md:flex h-screen w-full onboarding-slideshow" />
      </div>
    </div>
  );
};

export default SignIn;
