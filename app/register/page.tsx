"use client";
import Input from "../form/Input";
import Image from "next/image";
import PrimaryButton from "../components/ui/PrimaryButton";
import SecondaryButton from "../components/ui/SecondaryButton";
import Link from "next/link";
import { Figtree, Poppins } from "next/font/google";
import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "../utils/api";

const figtree = Figtree({
  subsets: ["latin"],
  weight: ["400"],
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400"],
});

const SignUp = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [errorMessages, setErrorMessages] = useState({
    email: "",
    firstName: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // validation function
  const validateForm = () => {
    let isValid = true;
    const errors = {
      email: "",
      firstName: "",
      password: "",
      confirmPassword: "",
    };

    if (!formData.firstName.trim()) {
      errors.firstName = "First name is required.";
      isValid = false;
    }

    if (!formData.email.trim()) {
      errors.email = "Email is required.";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Please enter a valid email address.";
      isValid = false;
    }

    if (!formData.password.trim()) {
      errors.password = "Password is required.";
      isValid = false;
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters.";
      isValid = false;
    }

    if (!formData.confirmPassword.trim()) {
      errors.confirmPassword = "Please confirm your password.";
      isValid = false;
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match.";
      isValid = false;
    }

    setErrorMessages(errors);
    return isValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrorMessages((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!validateForm()) return;

    setLoading(true);

    try {
      const response = await api.post("/auth/register", {
        firstName: formData.firstName,
        email: formData.email,
        password: formData.password,
      });

      console.log(response.data);

      setSuccess("Signup successful!");
      setFormData({
        email: "",
        firstName: "",
        password: "",
        confirmPassword: "",
      });

      setTimeout(() => router.push("/login"), 2500);
    } catch (err) {
      console.error("Signup error:", err);
      setError(
        err.response?.data?.message || "Signup failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = () => {
    // Add your Google sign-up logic here
    console.log("Google sign-up clicked");
  };

  return (
    <div
      className={`flex justify-around min-h-screen mx-auto w-full ${figtree.className}`}
    >
      <form
        className="form shadow-none border border-none"
        onSubmit={handleSubmit}
        noValidate
      >
        <h2
          className={`font-bold md:text-2xl text-base text-center leading-4 border border-none ${poppins.className}`}
        >
          Sign-Up to Bango
        </h2>
        <h3 className="text-[#757575] text-center sm:text-base text-sm">
          Crowdsourced prices for all your needs
        </h3>

        {/* FIRST NAME */}
        <Input
          label="First Name"
          type="text"
          placeholder="John"
          name="firstName"
          required
          value={formData.firstName}
          onChange={handleChange}
        />
        {errorMessages.firstName && (
          <p className="text-red-500 text-sm mt-[-10px] mb-2">
            {errorMessages.firstName}
          </p>
        )}

        {/* EMAIL */}
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
        {errorMessages.email && (
          <p className="text-red-500 text-sm mt-[-10px] mb-2">
            {errorMessages.email}
          </p>
        )}

        {/* PASSWORD */}
        <Input
          label="Password"
          type="password"
          placeholder="********"
          name="password"
          required
          value={formData.password}
          onChange={handleChange}
        />
        {errorMessages.password && (
          <p className="text-red-500 text-sm mt-[-10px] mb-2">
            {errorMessages.password}
          </p>
        )}

        {/* CONFIRM PASSWORD */}
        <Input
          label="Confirm Password"
          type="password"
          placeholder="********"
          name="confirmPassword"
          required
          value={formData.confirmPassword}
          onChange={handleChange}
        />
        {errorMessages.confirmPassword && (
          <p className="text-red-500 text-sm mt-[-10px] mb-2">
            {errorMessages.confirmPassword}
          </p>
        )}

        <div className="flex flex-col gap-4 w-full px-0">
          <PrimaryButton
            text="Sign Up"
            type="submit"
            loading={loading}
            loadingText="Signing up..."
            className="w-full"
          />

          <SecondaryButton
            text="Sign Up with Google"
            onClick={handleGoogleSignUp}
            iconSrc="/images/on-boarding/google-icon.svg"
            className="w-full"
          />
        </div>

        {error && <p className="text-red-500 text-center text-sm">{error}</p>}
        {success && (
          <p className="text-green-600 text-center text-sm">{success}</p>
        )}

        <p className="text-center text-[#757575] text-sm mt-2">
          Already have an account?
          <Link
            href="/login"
            className="ml-2 text-[var(--color-primary)] font-bold"
          >
            Sign in
          </Link>
        </p>
      </form>

      <div className="hidden md:flex h-screen">
        <Image
          src="/images/on-boarding/on-boarding-image.png"
          alt="onboarding image"
          width={686}
          height={50}
        />
      </div>
    </div>
  );
};

export default SignUp;
