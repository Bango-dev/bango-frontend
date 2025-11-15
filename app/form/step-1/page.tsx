"use client";
import PrimaryButton from "../../components/ui/PrimaryButton";
import StepIndicator from "../../components/ui/StepIndicator";
import Input from "../Input";
import Image from "next/image";
import Link from "next/link";
import FileUpload from "../../components/FileUpload";
import LocationSelect from "../../components/LocationSelect";
import { useRouter } from "next/navigation";
import { useFormData } from "../../context/FormContext";
import { useState } from "react";

const Step1 = () => {
  const { data, update } = useFormData();
  const router = useRouter();
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!data.commodityName)
      newErrors.commodityName = "Commodity name is required.";
    if (!data.price) newErrors.price = "Price is required.";
    else if (isNaN(Number(data.price)) || Number(data.price) <= 0)
      newErrors.price = "Enter a valid price.";

    if (!data.quantity) newErrors.quantity = "Quantity is required.";
    if (!data.location) newErrors.location = "Please select your location.";
    if (!data.marketName) newErrors.marketName = "Market name is required.";
    if (!data.date) newErrors.date = "Please select a date.";
    if (!data.image) newErrors.image = "An image of the commodity is required.";

    setErrors(newErrors);

    // Auto-clear errors after 3 seconds
    if (Object.keys(newErrors).length > 0) {
      setTimeout(() => setErrors({}), 3000);
    }

    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {

    if (validate()) router.push("/form/step-2");
  };

  return (
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
      <form className="form ">
        <h2 className=" font-bold text-2xl leading-4  ">Submit Price</h2>
        <h3 className="text-[#757575] sm:text-base text-sm  ">
          Try to answer as best as possible to give others a good idea and price
          range
        </h3>

        <Input
          label="Name of Commodity"
          type="text"
          placeholder="Eg, rice, Airforce 1, sugar"
          description="What’s the name of the item you bought?"
          value={data.commodityName}
          showError={!!errors.commodityName}
          onChange={(e) => update({ commodityName: e.target.value })}
          required
        />
        {errors.commodityName && (
          <p className="text-red-500 text-sm">{errors.commodityName}</p>
        )}

        <Input
          label="Price Paid (NGN)"
          type="number"
          placeholder="Enter price"
          description="How much did you pay the seller?"
          value={data.price}
          showError={!!errors.price}
          onChange={(e) => update({ price: e.target.value })}
          required
        />
        {errors.price && <p className="text-red-500 text-sm">{errors.price}</p>}

        <Input
          label="Quantity"
          type="text"
          placeholder="1 mudu, 1 Kg, I pair, 1 Pack"
          description="Specify the exact way it was bought."
          value={data.quantity}
          showError={!!errors.quantity}
          onChange={(e) => update({ quantity: e.target.value })}
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

        <Input
          label="Market Name"
          type="text"
          placeholder="Wuse Market"
          rightIcon="/images/form/map-marker-outline.svg"
          value={data.marketName}
          onChange={(e) => update({ marketName: e.target.value })}
          showError={!!errors.marketName}
          required
        />
        {errors.marketName && (
          <p className="text-red-500 text-sm">{errors.marketName}</p>
        )}

        <div className="mb-4">
          <FileUpload
            initial={data.image ?? null}
            onFileSelect={(file) => update({ image: file })}
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

        <PrimaryButton text="Next" type="button" onClick={handleNext} className="w-full" />
      </form>
    </div>
  );
};
export default Step1;
