"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState, useMemo } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import InfoBox from "../../../../components/ui/InfoBox";
import Link from "next/link";
import api from "../../../../utils/api";
import { Commodity } from "../../../../lib/types/commodities";
import { IoCopyOutline } from "react-icons/io5";
import useAveragePrices from "../../../../components/utils/useAveragePrice";

const MobileFullDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Commodity>(null);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();
  const memoizedProductArray = useMemo(
    () => (product ? [product] : []),
    [product]
  );

  const { averagePrices, isLoading: avgLoading } = useAveragePrices(
    memoizedProductArray,
    product?.location || "",
    product?.market || ""
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!id) return;

        setLoading(true);

        // Fetch single submission
        const res = await api.get(`/submissions/${id}`);
        const submission = res.data?.data;
        console.log(submission);
        setProduct(submission || null);
      } catch (err) {
        console.error(err);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading)
    return (
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
    );

  if (!product) return <div className="p-6">Submission not found.</div>;

  const handleCopy = async () => {
    const fullUrl = `${window.location.origin}${pathname}`;

    await navigator.clipboard.writeText(fullUrl);
    alert("Link copied!");
  };

  const normalize = (val: string) =>
    val.trim().toLowerCase().replace(/\s+/g, " ");

  return (
    <div className="flex flex-col  sm:shadow-none shadow-md p-5 w-full ">
      <div className=" w-full flex justify-between items-center mb-5 ">
        <Link href="/search-result/grid-view">
          <div className="flex justify-start items-center  cursor-pointer gap-2 w-fit">
            <Image
              src="/images/form/arrow-left.svg"
              alt="Back arrow"
              width={24}
              height={24}
            />
            <span>Back</span>
          </div>
        </Link>

        <IoCopyOutline className="h-6 w-6" onClick={handleCopy} />
      </div>

      <div className="sm:flex items-center justify-center">
        {/* IMAGE (left) - reserve the same width even if image missing */}
        <div className="w-full sm:w-64 md:w-72 shrink-0 ">
          {product.photoUrl ? (
            <Image
              src={product.photoUrl}
              alt={product.commodityName}
              width={504} // intrinsic size — kept for Next/Image optimization
              height={470}
              className="object-contain w-full h-96  md:w-72  rounded-md"
            />
          ) : (
            // placeholder keeps the text aligned to the right
            <div className="w-40 h-40 sm:w-48 sm:h-48 md:w-72 md:h-72 bg-gray-100 rounded-md flex items-center justify-center">
              <span className="md:text-lg sm:text-base text-sm  text-gray-400">
                No image
              </span>
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg p-6 space-y-4 w-full lg:w-2xl">
          <h2 className="text-2xl font-bold text-[#1E1E1E]">
            {product.commodityName}
          </h2>

          {/* Price */}
          <div className="flex-col items-baseline gap-2 sm:flex hidden">
            <p className="text-base font-semibold text-[#4D3594] p-1.5 bg-[#E2D8FF] rounded-md">
              Price
            </p>
            <p className="text-4xl text-[#1E1E1E] font-bold">
              ₦{Number(product.price).toLocaleString()}
            </p>
          </div>

          {/* Dates */}
          <p className="text-base text-[#757575] font-medium">
            Submitted by {product.BuyerName} on{" "}
            {new Date(product.createdAt).toLocaleDateString()}
          </p>

          <div className="items-center justify-between mb-4 flex w-full">
            <div>
              <p className="submission-key">Name of Seller</p>
              <p className="submission-value">{product.sellerName || "—"}</p>
            </div>
            <div>
              <p className="submission-key">Seller’s Phone Number</p>
              <p className="submission-value">
                {product.sellerPhoneNumber || "—"}
              </p>
            </div>
          </div>

          <div className="items-center justify-between mb-4 flex">
            <div>
              <p className="submission-key">Location</p>
              <p className="submission-value">{product.location}</p>
            </div>
            <div>
              <p className="submission-key">Price Paid</p>
              <p className="submission-value">
                ₦{Number(product.price).toLocaleString()}
              </p>
            </div>
          </div>

          <div className="items-center justify-between mb-4 flex">
            <div>
              <p className="submission-key">Market</p>
              <p className="submission-value">{product.market}</p>
            </div>
            <div>
              <p className="submission-key">Quantity</p>
              <p className="submission-value">{product.quantity}</p>
            </div>
          </div>

          {/* Average Price  */}
          <div className="items-center justify-between mb-4 flex">
            <div>
              <p className="submission-key">Average Price</p>
              {(() => {
                const avgKey = `${normalize(product.commodityName)}-${normalize(
                  product.quantity
                )}`;

                return (
                  <p className="submission-value">
                    {avgLoading
                      ? "Loading..."
                      : averagePrices[avgKey]
                      ? `₦${averagePrices[avgKey].toLocaleString()}`
                      : "No data"}
                  </p>
                );
              })()}
            </div>
            <div>
              <p className="submission-key">Views</p>
              <p className="submission-value">{product.viewCount}</p>
            </div>
          </div>

          <InfoBox />
        </div>
      </div>
    </div>
  );
};

export default MobileFullDetails;
