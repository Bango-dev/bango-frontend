"use client";
import Input from "../form/Input";
import Image from "next/image";
import Button from "../components/ui/Button";
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
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [errorMessages, setErrorMessages] = useState({
    email: "",
    phone: "",
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
      phone: "",
      password: "",
      confirmPassword: "",
    };

    if (!formData.email.trim()) {
      errors.email = "Email is required.";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Please enter a valid email address.";
      isValid = false;
    }

    if (!formData.phone.trim()) {
      errors.phone = "Phone number is required.";
      isValid = false;
    } else if (!/^\d{10,15}$/.test(formData.phone)) {
      errors.phone = "Please enter a valid phone number.";
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
    setErrorMessages((prev) => ({ ...prev, [name]: "" })); // clear field-specific error as user types
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!validateForm()) return;

    setLoading(true);

    try {
      console.log("TEST");

      const response = await api.post("/auth/register", {
        firstName: "BangoUser",
        email: formData.email,
        phoneNumber: "+2348012345674",
        password: formData.password,
      });

      console.log(response.data);

      setSuccess("Signup successful!");
      setFormData({
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
      });

      setTimeout(() => router.push("/sign-in"), 2500);
    } catch (err) {
      console.error("Signup error:", err);
      setError(err.message || "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
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

        {/* PHONE */}
        <Input
          label="Phone Number"
          type="tel"
          placeholder="08134534543"
          name="phone"
          autoComplete="tel"
          required
          value={formData.phone}
          onChange={handleChange}
        />
        {errorMessages.phone && (
          <p className="text-red-500 text-sm mt-[-10px] mb-2">
            {errorMessages.phone}
          </p>
        )}

        {/* PASSWORD */}
        <Input
          label="Password"
          type="password"
          placeholder="XXXXXXXXX"
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
          placeholder="XXXXXXXXX"
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

        <Button
          firstBtn={
            loading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Signing Up...
              </>
            ) : (
              "Sign Up"
            )
          }
          secondBtn="Sign Up with Google"
          className="px-0 w-full flex flex-col"
          src="/images/on-boarding/google-icon.svg"
          type="submit"
        />

        {/*  General feedback messages */}
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
