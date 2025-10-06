"use client";
import { useParams } from "next/navigation";
import Image from "next/image";
import { searchResults } from "../../searchResults";
import Link from "next/link";
import InfoBox from "../../../../components/ui/InfoBox";

const MobileFullDetails = () => {
  const params = useParams();
  const id = params.id;
  const product = searchResults.find((item) => String(item.id) === String(id));

  if (!product) {
    return <div className="p-6">Product not found.</div>;
  }

  return (
    <div className="flex flex-col sm:flex-row sm:shadow-none shadow-md p-5 items-center justify-center mx-auto w-full">
      <div>
        <Image
          src={product.image}
          alt="Image of a commodity"
          width={504}
          height={470}
        />
      </div>
      <div className="bg-white rounded-lg p-6 space-y-4 w-full">
        <h2 className="text-2xl font-bold text-[#1E1E1E]">{product.title}</h2>
        <div className="flex-col items-baseline gap-2 sm:flex hidden">
          <p className="text-base font-semibold text-[#4D3594] p-1.5 bg-[#E2D8FF] rounded-md">
            Price
          </p>
          <p className="text-4xl text-[#1E1E1E] font-bold">{product.price}</p>
        </div>
        {/* Submission Date */}
        <p className="text-base text-[#757575] font-medium">
          Submitted: {product.submitted}
        </p>
        <div className="items-center justify-between mb-4 flex w-full ">
          <div>
            <p className="submission-key">Name of Seller</p>
            <p className="submission-value">{product.seller}</p>
          </div>
          <div>
            <p className="submission-key">Seller’s Phone number</p>
            <p className="submission-value">{product.phone}</p>
          </div>
        </div>
        <div className="items-center justify-between mb-4 flex">
          {/* Location */}
          <div>
            <p className="submission-key">Location</p>
            <p className="submission-value">{product.location}</p>
          </div>
          {/* Price Paid */}
          <div>
            <p className="submission-key">Price Paid</p>
            <p className="submission-value">{product.price}</p>
          </div>
        </div>
        <div className="items-center justify-between mb-4 flex">
          {/* Market */}
          <div>
            <p className="submission-key">Market</p>
            <p className="submission-value">{product.market}</p>
          </div>
          {/* Quantity */}
          <div>
            <p className="submission-key">Quantity</p>
            <p className="submission-value">{product.quantity}</p>
          </div>
        </div>
        {/* Average Price */}
        <div>
          <p className="submission-key">Average Price</p>
          <p className="submission-value">{product.averagePrice}</p>
        </div>
        <InfoBox />
        <div className="w-full mt-4 flex sm:hidden">
          <Link
            href={`/search-result/grid-view/${product.id}`}
            className="w-full"
          ></Link>
        </div>
      </div>
    </div>
  );
};

export default MobileFullDetails;
