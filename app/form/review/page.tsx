"use client";
import { MdEdit, MdSave, MdCancel } from "react-icons/md";
import Image from "next/image";
import Link from "next/link";
import Input from "../Input";
import PrimaryButton from "../../components/ui/PrimaryButton";
import { useFormData } from "../../context/FormContext";
import { useRouter } from "next/navigation";
import api from "../../utils/api";
import { uploadToCloudinary } from "../../utils/upload-to-cloudinary";
import { useState } from "react";
import LocationSelect from "../../components/LocationSelect";
import SuggestionInput from "../../components/ui/SuggestionInput";
import { parseNumber, formatNumber } from "../../utils/numberHelpers";

const Review = () => {
  const { data, update, clear } = useFormData();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [originalData, setOriginalData] = useState(null);

  const clearError = (field: string) => {
    setErrors((prev) => {
      const updated = { ...prev };
      delete updated[field];
      return updated;
    });
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!data.commodityName)
      newErrors.commodityName = "Commodity name is required.";

    if (data.price == null || data.price <= 0)
      newErrors.price = "Enter a valid price.";

    if (!data.quantity) newErrors.quantity = "Quantity is required.";

    if (!data.sellerName) newErrors.sellerName = "Seller's Name is required.";

    const phoneRegex = /^0\d{10}$/;
    if (!data.sellerPhoneNumber)
      newErrors.sellerPhoneNumber = "Phone number is required.";
    else if (!phoneRegex.test(data.sellerPhoneNumber))
      newErrors.sellerPhoneNumber =
        "Enter a valid 11-digit phone number starting with 0.";

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

  const handleSubmit = async () => {
    setLoading(true);

    const isValid = validate();
    if (!isValid) {
      setLoading(false);
      return;
    }

    try {
      let imageUrl = null;

      if (data.image) {
        let file: File;

        if (data.image instanceof Blob) {
          file = new File([data.image], "upload.jpg", {
            type: data.image.type,
          });
        } else {
          const res = await fetch(data.image);
          const blob = await res.blob();
          file = new File([blob], "upload.jpg", { type: blob.type });
        }

        const upload = await uploadToCloudinary(file);
        imageUrl = upload.secure_url;
      }

      const payload = {
        commodityName: data.commodityName,
        price: data.price, // number
        quantity: data.quantity,
        location: data.location,
        market: data.market,
        photoUrl: imageUrl,
        purchaseDate: data.date,
        sellerPhoneNumber: data.sellerPhoneNumber,
        sellerName: data.sellerName,
      };

      await api.post("/submissions", payload);
      router.push("/confirmation");
      clear();
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 flex flex-col w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 cursor-pointer gap-2">
        <Link href="/form/step-2" className="flex items-center gap-2">
          <Image
            src="/images/form/arrow-left.svg"
            alt="Back arrow"
            width={24}
            height={24}
          />
          <span className="font-bold sm:text-4xl text-xl">
            Review Submission
          </span>
        </Link>
        {isEditing ? (
          <div className="flex gap-2">
            <MdSave
              className="h-8 w-8 cursor-pointer"
              onClick={() => {
                setIsEditing(false);
                setOriginalData(null);
              }}
              title="Stop Editing"
            />
            <MdCancel
              className="h-8 w-8 cursor-pointer"
              onClick={() => {
                update(originalData);
                setIsEditing(false);
                setOriginalData(null);
              }}
              title="Cancel"
            />
          </div>
        ) : (
          <MdEdit
            className="h-8 w-8 cursor-pointer"
            onClick={() => {
              setOriginalData({ ...data });
              setIsEditing(true);
            }}
            title="Edit Submission"
          />
        )}
      </div>

      <div className="flex md:flex-row flex-col items-center justify-center mx-auto gap-6">
        {/* Image preview */}
        <div className="w-full md:w-1/3">
          {data.image ? (
            <div className="mb-4 rounded-md overflow-hidden">
              <img
                src={
                  data.image instanceof Blob
                    ? URL.createObjectURL(data.image)
                    : data.image
                }
                alt={data.commodityName || "Commodity image"}
                className="object-cover"
                width={504}
                height={470}
              />
            </div>
          ) : (
            <div className="mb-4 text-gray-500">No image uploaded</div>
          )}
        </div>

        {/* Form */}
        <form className="form border-none shadow-none md:w-2xl w-full">
          <div className="flex gap-4 mb-4">
            <div className="flex-1 min-w-0">
              <SuggestionInput
                label="Seller's Name"
                type="text"
                placeholder="Wuse Market"
                value={data.sellerName}
                field="sellerName"
                onChange={(val) => update({ sellerName: val })}
                className="flex-1 min-w-0"
                showError={!!errors.sellerName}
                readOnly={!isEditing}
                required
              />
              {errors.sellerName && (
                <p className="text-red-500 text-sm">{errors.sellerName}</p>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <SuggestionInput
                label="Seller’s Phone No"
                type="tel"
                placeholder="08000000000"
                value={data.sellerPhoneNumber}
                field="sellerPhoneNumber"
                onChange={(val) => update({ sellerPhoneNumber: val })}
                className="flex-1 min-w-0"
                showError={!!errors.sellerPhoneNumber}
                readOnly={!isEditing}
                required
              />
              {errors.sellerPhoneNumber && (
                <p className="text-red-500 text-sm">
                  {errors.sellerPhoneNumber}
                </p>
              )}
            </div>
          </div>

          <div className="flex gap-4 mb-4">
            <div className="flex-1 min-w-0">
              <SuggestionInput
                label="Name of Commodity"
                type="text"
                placeholder="Eg, rice, Airforce 1, sugar"
                value={data.commodityName}
                field="commodityName"
                onChange={(val) => update({ commodityName: val })}
                className="flex-1 min-w-0"
                showError={!!errors.commodityName}
                readOnly={!isEditing}
                required
              />
              {errors.commodityName && (
                <p className="text-red-500 text-sm">{errors.commodityName}</p>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <Input
                label="Price Paid (NGN)"
                type="text"
                value={data.price != null ? `₦${formatNumber(data.price)}` : ""}
                onChange={(e) => {
                  const numericValue = parseNumber(e.target.value);
                  update({ price: numericValue });
                  clearError("price");
                }}
                className="flex-1 min-w-0"
                labelClassName="text-xs sm:text-xl font-bold text-[#1E1E1E]"
                readOnly={!isEditing}
                required
              />
              {errors.price && (
                <p className="text-red-500 text-sm">{errors.price}</p>
              )}
            </div>
          </div>

          <div className="flex gap-4 mb-4">
            <LocationSelect
              value={data.location || ""}
              onChange={(val) => {
                update({ location: val });
                clearError("location");
              }}
              error={errors.location}
              required
            />
            <div className="flex-1 min-w-0">
              <SuggestionInput
                label="Quantity"
                type="text"
                placeholder="1 mudu, 1 Kg, I pair, 1 Pack"
                value={data.quantity}
                field="quantity"
                onChange={(val) => update({ quantity: val })}
                className="flex-1 min-w-0"
                showError={!!errors.quantity}
                readOnly={!isEditing}
                required
              />
              {errors.quantity && (
                <p className="text-red-500 text-sm">{errors.quantity}</p>
              )}
            </div>
          </div>

          <div>
            <SuggestionInput
              label="Market Name"
              type="text"
              placeholder="Wuse Market"
              value={data.market}
              field="market"
              onChange={(val) => update({ market: val })}
              className="w-full"
              showError={!!errors.market}
              readOnly={!isEditing}
              required
            />
            {errors.market && (
              <p className="text-red-500 text-sm">{errors.market}</p>
            )}
          </div>

          <p className="text-lg text-[#757575]">Submitted: {data.date}</p>

          <PrimaryButton
            text={
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
                  Submitting...
                </>
              ) : (
                "Submit"
              )
            }
            onClick={handleSubmit}
            className="w-full"
            disabled={loading || isEditing}
          />
        </form>
      </div>
    </div>
  );
};

export default Review;
