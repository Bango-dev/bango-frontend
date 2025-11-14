"use client";

import Image from "next/image";
import Link from "next/link";
import Input from "../Input";
import PrimaryButton from "../../components/ui/PrimaryButton";
import { useFormData } from "../../context/FormContext";
import { useRouter } from "next/navigation";
import api from "../../utils/api";
import { uploadToCloudinary } from "../../utils/upload-to-cloudinary";
import { useState } from "react";

const Review = () => {
  const { data } = useFormData();
  const router = useRouter();
  const [loading, setLoading] = useState(false); // ✅ loading state

  const handleSubmit = async () => {
    setLoading(true); // start loading
    try {
      let imageUrl = null;

      if (data.image) {
        const res = await fetch(data.image as string);
        const blob = await res.blob();
        const file = new File([blob], "upload.jpg", { type: blob.type });

        const upload = await uploadToCloudinary(file);
        imageUrl = upload.secure_url;
      }

      const payload = {
        commodityName: data.commodityName,
        price: data.price,
        quantity: data.quantity,
        location: data.location,
        market: data.marketName,
        photoUrl: imageUrl,
        purchaseDate: data.date,
        sellerPhoneNumber: data.phone,
        sellerName: data.sellerName,
      };

      await api.post("/submissions", payload);
      router.push("/confirmation");
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Try again.");
    } finally {
      setLoading(false); // stop loading
    }
  };

  return (
    <div className="p-6 flex flex-col w-full">
      {/* Header */}
      <div className="flex items-center mb-6 cursor-pointer gap-2">
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
      </div>

      <div className="flex md:flex-row flex-col items-center justify-center mx-auto gap-6">
        {/* Image preview */}
        <div className="w-full md:w-1/3">
          {data.image ? (
            <div className="mb-4 rounded-md overflow-hidden">
              <img
                src={data.image as string}
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
            <Input
              label="Name of Seller"
              type="text"
              value={data.sellerName}
              className="flex-1 min-w-0"
              labelClassName="text-base text-[#1E1E1E] font-normal"
              readOnly
            />
            <Input
              label="Seller’s Phone No"
              type="text"
              value={data.phone}
              className="flex-1 min-w-0"
              labelClassName="text-base text-[#1E1E1E] font-normal"
              readOnly
            />
          </div>

          <div className="flex gap-4 mb-4">
            <Input
              label="Name of Commodity"
              type="text"
              value={data.commodityName}
              className="flex-1 min-w-0"
              labelClassName="text-base text-[#1E1E1E] font-normal"
              readOnly
            />
            <Input
              label="Price Paid (NGN)"
              type="text"
              value={
                data.price ? `₦${Number(data.price).toLocaleString()}` : ""
              }
              className="flex-1 min-w-0"
              labelClassName="text-base text-[#1E1E1E] font-normal"
              readOnly
            />
          </div>

          <div className="flex gap-4 mb-4">
            <Input
              label="Location"
              type="text"
              value={data.location}
              className="flex-1 min-w-0"
              rightIcon="/images/form/map-marker-outline.svg"
              labelClassName="text-base text-[#1E1E1E] font-normal"
              readOnly
            />
            <Input
              label="Quantity"
              type="text"
              value={data.quantity}
              className="flex-1 min-w-0"
              labelClassName="text-base text-[#1E1E1E] font-normal"
              readOnly
            />
          </div>

          <Input
            label="Market Name"
            type="text"
            value={data.marketName}
            rightIcon="/images/form/map-marker-outline.svg"
            className="w-full"
            labelClassName="text-base text-[#1E1E1E] font-normal"
            readOnly
          />

          <p className="text-lg text-[#757575]">Submitted: {data.date}</p>

          {/* Submit button with loading state */}
          <PrimaryButton
            text={loading ? "Submitting..." : "Submit"}
            onClick={handleSubmit}
            disabled={loading} // disable while loading
            // icon={loading ? "/images/spinner.svg" : undefined} // optional spinner icon
          />
        </form>
      </div>
    </div>
  );
};

export default Review;
