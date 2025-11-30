"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useFormData } from "../../context/FormContext";
import PrimaryButton from "../../components/ui/PrimaryButton";
import StepIndicator from "../../components/ui/StepIndicator";
import SuggestionInput from "../../components/ui/SuggestionInput";
import Image from "next/image";
import Link from "next/link";

const Step2 = () => {
  const { data, update } = useFormData();
  const router = useRouter();
  const [errors, setErrors] = useState<{ [key: string]: string | boolean }>({});
    const [loading, setLoading] = useState(false);

    const validate = () => {
      const newErrors: { [key: string]: string } = {};


      if (!data.sellerName) newErrors.sellerName = "Seller name is required.";

      const phoneRegex = /^0\d{10}$/;
      if (!data.sellerPhoneNumber)
        newErrors.phone = "Phone number is required.";
      else if (!phoneRegex.test(data.sellerPhoneNumber))
        newErrors.phone =
          "Enter a valid 11-digit phone number starting with 0.";

      setErrors(newErrors);

      if (Object.keys(newErrors).length > 0) {
        setTimeout(() => setErrors({}), 3000);
      }
      return Object.keys(newErrors).length === 0;
    };

    const handleNext = () => {
      setLoading(true);

      const isValid = validate();

      if (!isValid) {
        setLoading(false);
        return;
      }

      // Allow the overlay to show briefly before navigation
      setTimeout(() => {
        router.push("/form/review");
      }, 600);
    };
  return (
    <div className="flex flex-col min-h-screen pt-5 px-3 sm:px-4 lg:px-4 mx-auto w-full ">
      <div className="relative flex items-center">
        <Link href="/form/step-1">
          <div className="flex items-center mb-6 cursor-pointer gap-2">
            <Image
              src="/images/form/arrow-left.svg"
              alt="Back arrow"
              width={24}
              height={24}
            />
            <span>Back</span>
          </div>
        </Link>
        {/* Step Indicator*/}
        <div className="step-indicator">
          <div className="pointer-events-auto">
            <StepIndicator />
          </div>
        </div>
      </div>

      {/* spinner */}
      {loading && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
          <svg
            className="animate-spin h-15 w-15 text-white"
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
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            ></path>
          </svg>
        </div>
      )}

      <form className="form ">
        <h2 className=" font-bold text-2xl leading-4  ">Submit Price</h2>
        <h3 className="text-[#757575] sm:text-base text-sm  ">
          Try to answer as best as possible to give others a good idea and price
          range
        </h3>

        <SuggestionInput
          label="Seller's Name"
          type="text"
          placeholder="Wuse Market"
          value={data.sellerName}
          field="sellerName"
          onChange={(val) => update({ sellerName: val })}
          description="Where did you buy it?"
          showError={!!errors.sellerName}
          required
        />
        {errors.sellerName && (
          <p className="text-red-500 text-sm">{errors.sellerName}</p>
        )}
        
        <SuggestionInput
          label="Seller’s Phone No"
          type="tel"
          placeholder="08000000000"
          value={data.sellerPhoneNumber}
          field="sellerPhoneNumber"
          onChange={(val) => update({ sellerPhoneNumber: val })}
          description="Phone Number"
          showError={!!errors.sellerPhoneNumber}
          required
        />
        {errors.sellerPhoneNumber && (
          <p className="text-red-500 text-sm">{errors.sellerPhoneNumber}</p>
        )}

        <PrimaryButton
          text={loading ? "Loading..." : "Next"}
          type="button"
          disabled={loading}
          onClick={handleNext}
          className="w-full"
        />
      </form>
    </div>
  );
};
export default Step2;
