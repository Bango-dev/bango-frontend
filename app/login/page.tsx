"use client";

import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import Input from "../form/Input";
import Image from "next/image";
import Button from "../components/ui/Button";
import Link from "next/link";
import api from "../utils/api";
import { AuthContext } from "../context/AuthContext";

const SignIn = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await api.post("/auth/login", {
        email: formData.email,
        password: formData.password,
      });

      console.log("Login response:", response.data);

      console.log(response.data.access_token);

      // Extract user and token from response
      const { user, access_token } = response.data;

      if (!access_token) {
        throw new Error("No access token received from server");
      }

      // Pass both user and token to login function
      console.log(access_token);
      login(user, access_token);

      setSuccess("Login successful!");

      setTimeout(() => router.push("/"), 2500);
    } catch (err) {
      console.error("Login error:", err);
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-around min-h-screen mx-auto w-full">
      <form
        className="form shadow-none border border-none"
        onSubmit={handleSubmit}
      >
        <h2 className="font-bold md:text-2xl text-base text-center leading-4 border border-none">
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
          placeholder="XXXXXXXXX"
          name="password"
          required
          value={formData.password}
          onChange={handleChange}
        />

        <div className="flex items-center">
          <input
            type="checkbox"
            className="border-1 border-[#757575] rounded-md"
          />
          <label className="text-sm text-[#757575] ml-2">Remember me</label>
          <Link
            href="/forgot-password"
            className="text-[var(--color-primary)] font-bold ml-auto"
          >
            Forgot Password?
          </Link>
        </div>

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
                Signing In...
              </>
            ) : (
              "Sign In"
            )
          }
          secondBtn="Sign In with Google"
          firstHref="#"
          secondHref="#"
          className="sm:w-full w-full flex flex-col px-0"
          src="/images/on-boarding/google-icon.svg"
        />

        {error && <p className="text-red-500 text-center mt-2">{error}</p>}
        {success && (
          <p className="text-green-600 text-center mt-2">{success}</p>
        )}
        <p className="text-center text-sm text-[#757575] mt-4">
          Don&apos;t have an account?
          <Link
            href="/sign-up"
            className="ml-2 text-[var(--color-primary)] font-bold"
          >
            Sign up
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

export default SignIn;
