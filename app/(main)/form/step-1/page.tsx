"use client";
import PrimaryButton from "../../../components/ui/PrimaryButton";
import StepIndicator from "../../../components/ui/StepIndicator";
import Input from "../Input";
import Image from "next/image";
import Link from "next/link";
import FileUpload from "../../../components/FileUpload";
import LocationSelect from "../../../components/LocationSelect";
import { useRouter } from "next/navigation";
import { useFormData } from "../../../context/FormContext";
import { useState } from "react";
import ProtectedRoute from "../../../components/protectedRoute";
import SuggestionInput from "../../../components/ui/SuggestionInput";
import { parseNumber, formatNumber } from "../../../utils/numberHelpers";

const Step1 = () => {
  const { data, update } = useFormData();
  const router = useRouter();
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!data.commodityName)
      newErrors.commodityName = "Commodity name is required.";

    if (data.price == null || data.price <= 0) {
      newErrors.price = "Price must be a valid positive number.";
    }

    if (!data.quantity) newErrors.quantity = "Quantity is required.";
    if (!data.location) newErrors.location = "Please select your location.";
    if (!data.market) newErrors.market = "Market name is required.";
    if (!data.date) newErrors.date = "Please select a date.";

    setErrors(newErrors);

    // Auto-clear errors after 3 seconds
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

    // Allow the overlay to show briefly before navigating
    setTimeout(() => {
      router.push("/form/step-2");
    }, 600);
  };

  return (
    <ProtectedRoute>
      <div className="flex flex-col min-h-screen pt-5 px-3 sm:px-4 lg:px-4 mx-auto w-full ">
        <div className="relative flex items-center">
          <Link href="/">
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
            Try to answer as best as possible to give others a good idea and
            price range
          </h3>

          <SuggestionInput
            label="Name of Commodity"
            type="text"
            placeholder="Eg, rice, Airforce 1, sugar"
            value={data.commodityName}
            field="commodityName"
            onChange={(val) => update({ commodityName: val })}
            description="What's the name of the item you bought?"
            showError={!!errors.commodityName}
            required
          />
          {errors.commodityName && (
            <p className="text-red-500 text-sm">{errors.commodityName}</p>
          )}

          <Input
            label="Price Paid (NGN)"
            type="text"
            inputMode="numeric"
            placeholder="Enter price"
            description="How much did you pay the seller?"
            value={data.price != null ? formatNumber(data.price) : ""}
            showError={!!errors.price}
            onChange={(e) => {
              const numericValue = parseNumber(e.target.value);
              update({ price: numericValue });
            }}
            required
          />
          {errors.price && (
            <p className="text-red-500 text-sm">{errors.price}</p>
          )}

          <SuggestionInput
            label="Quantity"
            type="text"
            placeholder="1 mudu, 1 Kg, I pair, 1 Pack"
            value={data.quantity}
            field="quantity"
            onChange={(val) => update({ quantity: val })}
            description="Specify the exact way it was bought."
            showError={!!errors.quantity}
            required
          />
          {errors.quantity && (
            <p className="text-red-500 text-sm">{errors.quantity}</p>
          )}

          <LocationSelect
            value={data.location}
            onChange={(val) => update({ location: val })}
            error={errors.location || null}
            required
          />

          <SuggestionInput
            label="Market Name"
            type="text"
            placeholder="Wuse Market"
            value={data.market}
            field="market"
            onChange={(val) => update({ market: val })}
            description="Where did you buy it?"
            showError={!!errors.marketName}
            required
          />
          {errors.market && (
            <p className="text-red-500 text-sm">{errors.market}</p>
          )}

          <div className="mb-4">
            <FileUpload
              initial={data.image ?? null}
              onFileSelect={(file) => update({ image: file })}
              // error={errors.image}
            />
          </div>

          <Input
            label="Date"
            type="date"
            required
            value={data.date}
            onChange={(e) => update({ date: e.target.value })}
            showError={!!errors.date}
          />
          {errors.date && <p className="text-red-500 text-sm">{errors.date}</p>}

          <PrimaryButton
            text={loading ? "Loading..." : "Next"}
            type="button"
            disabled={loading}
            onClick={handleNext}
            className="w-full"
          />
        </form>
      </div>
    </ProtectedRoute>
  );
};
export default Step1;
