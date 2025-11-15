"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useFormData } from "../../context/FormContext";
import PrimaryButton from "../../components/ui/PrimaryButton";
import StepIndicator from "../../components/ui/StepIndicator";
import Input from "../Input";
import Image from "next/image";
import Link from "next/link";

const Step2 = () => {
  const { data, update } = useFormData();
  const router = useRouter();
  const [errors, setErrors] = useState<{ [key: string]: string | boolean }>({});

    const validate = () => {
      const newErrors: { [key: string]: string } = {};


      if (!data.sellerName) newErrors.sellerName = "Seller name is required.";

      const phoneRegex = /^0\d{10}$/;
      if (!data.phone) newErrors.phone = "Phone number is required.";
      else if (!phoneRegex.test(data.phone))
        newErrors.phone =
          "Enter a valid 11-digit phone number starting with 0.";

      setErrors(newErrors);

      if (Object.keys(newErrors).length > 0) {
        setTimeout(() => setErrors({}), 3000);
      }
      return Object.keys(newErrors).length === 0;
    };

    const handleNext = () => {
      if (validate()) router.push("/form/review");
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
      <form className="form ">
        <h2 className=" font-bold text-2xl leading-4  ">Submit Price</h2>
        <h3 className="text-[#757575] sm:text-base text-sm  ">
          Try to answer as best as possible to give others a good idea and price
          range
        </h3>

        <Input
          label="Name of Seller"
          type="text"
          placeholder="Eg, Madam Kemi, John Doe"
          description="This helps other communicate with the seller better."
          value={data.sellerName}
          onChange={(e) => update({ sellerName: e.target.value })}
          showError={!!errors.sellerName}
          required
        />
        {errors.sellerName && (
          <p className="text-red-500 text-sm">{errors.sellerName}</p>
        )}

        <Input
          label="Seller’s Phone No"
          type="tel"
          placeholder="08000000000"
          description="Phone Number"
          value={data.phone}
          onChange={(e) => update({ phone: e.target.value })}
          showError={!!errors.phone}
          required
        />
        {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}

        <PrimaryButton type="button" text="Review Submission" onClick={handleNext} className="w-full" />
      </form>
    </div>
  );
};
export default Step2;
