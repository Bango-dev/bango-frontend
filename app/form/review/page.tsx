"use client";

import Image from "next/image";
import Link from "next/link";
import Input from "../Input";
import PrimaryButton from "../../components/ui/PrimaryButton";
import { useFormData } from "../../context/FormContext";
import { useRouter } from "next/navigation";

const Review = () => {
  const { data, saveToDB } = useFormData();
  const router = useRouter();

  const handleSubmit = async () => {
    await saveToDB();
    alert("Form saved locally (Dexie). Later this will be sent to backend!");
    router.push("/confirmation");
  };
  return (
    <div className="p-6  flex  flex-col w-full">
      <div className="flex items-center mb-6 cursor-pointer gap-2">
        <span>
          <Link href="/form/step-2">
            <div className="flex items-center mb-6 cursor-pointer gap-2">
              <Image
                src="/images/form/arrow-left.svg"
                alt="Back arrow"
                width={24}
                height={24}
              />
              <span className="font-bold sm:text-4xl text-xl  ">
                Review Submission
              </span>
            </div>
          </Link>
        </span>
      </div>

      <div className="flex md:flex-row flex-col items-center justify-center mx-auto gap-6">
        <div className="w-full md:w-1/3">
          {/* Render the uploaded image (data URL) if present */}
          {data.image ? (
            <div className="mb-4 rounded-md overflow-hidden ">
              {/* Use plain <img> because data URLs are safest with <img> */}
              <img
                src={data.image as string}
                alt={data.commodityName || "Commodity image"}
                className=" object-cover"
                width={504}
                height={470}
              />
            </div>
          ) : (
            <div className="mb-4 text-gray-500">No image uploaded</div>
          )}
        </div>
        <form className="form border border-none shadow-none md:w-2xl w-full ">
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
              type="number"
              value={data.price}
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
            className="w-full "
            labelClassName="text-base text-[#1E1E1E] font-normal"
            readOnly
          />
          <p className="text-lg text-[#757575]">Submitted: {data.date}</p>
          <PrimaryButton text="Submit" onClick={handleSubmit} />
        </form>
      </div>
    </div>
  );
};
export default Review;
