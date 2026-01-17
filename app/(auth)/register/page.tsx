"use client";
import Input from "../../(main)/form/Input";
import Image from "next/image";
import PrimaryButton from "../../components/ui/PrimaryButton";
import SecondaryButton from "../../components/ui/SecondaryButton";
import Link from "next/link";
import { Figtree, Poppins } from "next/font/google";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
// import api from "../../utils/api";
import toast from "react-hot-toast";
import publicApi from "../../utils/api";
import { formatNigerianPhone } from "../../utils/formatNigerianPhone";
import { handleGoogleSignIn } from "../../utils/googleAuth";
import { validateRedirectUrl } from "../../utils/redirectvalidation";


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
  const searchParams = useSearchParams();

  // ✅ Validate redirect URL
  const redirectTo = validateRedirectUrl(
    searchParams.get("redirect") || "/timeline"
  );
  
  const [formData, setFormData] = useState({
    email: "",
    phoneNumber: "",
    firstName: "",
    password: "",
    passwordConfirmation: "",
  });

  const [loading, setLoading] = useState(false);
  const [errorMessages, setErrorMessages] = useState({
    email: "",
    phoneNumber: "",
    firstName: "",
    password: "",
    passwordConfirmation: "",
  });
  // const [error, setError] = useState("");
  // const [success, setSuccess] = useState("");

  // validation function
  const validateForm = () => {
    let isValid = true;
    const errors = {
      email: "",
      phoneNumber: "",
      firstName: "",
      password: "",
      passwordConfirmation: "",
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

    const formattedPhone = formatNigerianPhone(formData.phoneNumber);
    if (!formData.phoneNumber) {
      errors.phoneNumber = "Phone number is required.";
      isValid = false;
    } else if (!formattedPhone) {
      errors.phoneNumber = "Enter a valid Nigerian phone number.";
      isValid = false;
    }

    if (!formData.password.trim()) {
      errors.password = "Password is required.";
      isValid = false;
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters.";
      isValid = false;
    }

    if (!formData.passwordConfirmation.trim()) {
      errors.passwordConfirmation = "Please confirm your password.";
      isValid = false;
    } else if (formData.password !== formData.passwordConfirmation) {
      errors.passwordConfirmation = "Passwords do not match.";
      isValid = false;
    }

    setErrorMessages(errors);
    if (!isValid) {
      toast.error("Please complete all required fields correctly");
    }
    return isValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrorMessages((prev) => ({ ...prev, [name]: "" }));
  };

  // Handle Google Sign-Up
  const handleGoogleSignUp = () => {
    handleGoogleSignIn(redirectTo);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    try {
      const response = await publicApi.post("/auth/register", {
        firstName: formData.firstName,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        password: formData.password,
        passwordConfirmation: formData.passwordConfirmation,
      });
      // console.log(response)
      toast.success("Signup successful! Redirecting to login...");

      setFormData({
        email: "",
        phoneNumber: "",
        firstName: "",
        password: "",
        passwordConfirmation: "",
      });

      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (err) {
      console.log(err);
      toast.error(err.response || "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  //   const handleSubmit = async (e) => {
  //     e.preventDefault();
  //     // setError("");
  //     // setSuccess("");

  //     if (!validateForm()){
  //       toast.error("Please fix the errors in the form");
  //     };

  //     setLoading(true);

  //     try {
  //       const response = await api.post("/auth/register", {
  //         firstName: formData.firstName,
  //         email: formData.email,
  //         password: formData.password,
  //       });

  //       console.log(response.data);
  // toast.success("Signup successful! Redirecting to login...");
  //       // setSuccess("Signup successful!");
  //       setFormData({
  //         email: "",
  //         firstName: "",
  //         password: "",
  //         confirmPassword: "",
  //       });

  //       setTimeout(() => router.push("/login"), 2500);
  //     } catch (err) {
  //       console.error("Signup error:", err);
  //       // setError(
  //       //   err.response?.data?.message || "Signup failed. Please try again."
  //       // );
  //       toast.error(
  //       err.response?.data?.message ||
  //         "Signup failed. Please try again."
  //     );
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  const handlePhoneBlur = () => {
    const formatted = formatNigerianPhone(formData.phoneNumber);
    if (formatted) {
      setFormData((prev) => ({
        ...prev,
        phoneNumber: formatted,
      }));
    }
  };

  return (
    <div
      className={`flex justify-around items-center min-h-screen mx-auto w-full ${figtree.className}`}
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
        {/* {errorMessages.firstName && (
          <p className="text-red-500 text-sm -mt-2.5 mb-2">
            {errorMessages.firstName}
          </p>
        )} */}

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
        {/* {errorMessages.email && (
          <p className="text-red-500 text-sm -mt-2.5 mb-2">
            {errorMessages.email}
          </p>
        )} */}

        {/* phone Number */}
        <Input
          label="Phone Number"
          type="tel"
          placeholder="+2348172197475"
          name="phoneNumber"
          autoComplete="tel"
          required
          value={formData.phoneNumber}
          onChange={handleChange}
          onBlur={handlePhoneBlur}
        />
        {/* {errorMessages.phoneNumber && (
          <p className="text-red-500 text-sm mt-2.5 mb-2">
            {errorMessages.phoneNumber}
          </p>
        )} */}

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
        {/* {errorMessages.password && (
          <p className="text-red-500 text-sm -mt-2.5 mb-2">
            {errorMessages.password}
          </p>
        )} */}

        {/* CONFIRM PASSWORD */}
        <Input
          label="Confirm Password"
          type="password"
          placeholder="********"
          name="passwordConfirmation"
          required
          value={formData.passwordConfirmation}
          onChange={handleChange}
        />
        {/* {errorMessages.confirmPassword && (
          <p className="text-red-500 text-sm -mt-2.5 mb-2">
            {errorMessages.confirmPassword}
          </p>
        )} */}

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

        {/* {error && <p className="text-red-500 text-center text-sm">{error}</p>}
        {success && (
          <p className="text-green-600 text-center text-sm">{success}</p>
        )} */}

        <p className="text-center text-[#757575] text-sm mt-2">
          Already have an account?
          <Link
            href={`/login${
              searchParams.get("redirect")
                ? `?redirect=${searchParams.get("redirect")}`
                : ""
            }`}
            className="ml-2 text-(--color-primary) font-bold"
          >
            Sign in
          </Link>
        </p>
      </form>

      <div className="hidden md:flex h-screen w-[50%] ">
        <div className="hidden md:flex h-screen w-full   onboarding-slideshow" />
      </div>
    </div>
  );
};

export default SignUp;
