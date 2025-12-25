"use client";

import { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import api from "../../../utils/api";
import DisplayIndicator from "../../../components/ui/DisplayIndicator";
import Link from "next/link";
import Image from "next/image";
import InfoBox from "../../../components/ui/InfoBox";
import useAveragePrices from "../../../components/utils/useAveragePrice";
import { Commodity } from "../../../lib/types/commodities";

function GridViewContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [results, setResults] = useState<Commodity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 5;

  const commodityName = searchParams.get("commodityName") || "";
  const location = searchParams.get("location") || "";
  const market = searchParams.get("market") || "";
  const sortRecent = searchParams.get("sortRecent") || "recent";
  const sortPrice = searchParams.get("sortPrice") || "";

  const parsePrice = (p: unknown) => {
    const cleaned = String(p ?? "").replace(/[^0-9.]/g, "");
    const n = parseFloat(cleaned);
    return isNaN(n) ? 0 : n;
  };

  const normalize = (str: string | undefined | null) =>
    (str || "").trim().toLowerCase().replace(/\s+/g, " ");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        const res = await api.get("/search", {
          params: { commodityName },
        });

        console.log(res.data?.data?.data);
        setResults(res.data?.data?.data || []);
      } catch (error) {
        console.error(error);
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [commodityName, location, market, sortRecent, sortPrice]);

  const { averagePrices } = useAveragePrices(results, location, market);

  useEffect(() => {
    if (!isLoading && commodityName && results.length === 0) {
      router.push("/no-result");
    }
  }, [isLoading, results.length, commodityName, router]);

  const totalPages = Math.ceil(results.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = results.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleNext = () =>
    currentPage < totalPages && setCurrentPage((p) => p + 1);
  const handlePrev = () => currentPage > 1 && setCurrentPage((p) => p - 1);



  return (
    <div className="py-5 px-5">
      {/* Header */}
      <div className="flex items-center justify-between w-full mb-6">
        <Link href="/find-price">
          <div className="flex items-center cursor-pointer gap-2">
            <Image
              src="/images/form/arrow-left.svg"
              alt="Back"
              width={24}
              height={24}
            />
            <span className="font-bold sm:text-4xl text-2xl flex gap-2">
              Submissions
            </span>
          </div>
        </Link>
        <DisplayIndicator />
      </div>

      {isLoading && (
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

      {/* Desktop View */}
      {currentItems.map((item) => {
        const avgKey = `${normalize(item.commodityName)}-${item.quantity}`;
        const avgPrice = averagePrices[avgKey];

        return (
          <div
            key={item.id}
            className="sm:shadow-none shadow-md p-5 items-center justify-center  mx-auto hidden sm:flex"
          >
            {/* IMAGE (left) - reserve the same width even if image missing */}
            <div className="w-40 sm:w-48 md:w-72 shrink-0 mr-6">
              {item.photoUrl ? (
                <Image
                  src={item.photoUrl}
                  alt={item.commodityName}
                  width={504} // intrinsic size — kept for Next/Image optimization
                  height={470}
                  className="object-contain w-full h-auto rounded-md"
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

            <div className="bg-white rounded-lg p-6 space-y-4 w-xl">
              <h2 className="text-2xl font-bold text-[#1E1E1E]">
                {item.commodityName}
              </h2>

              <div className="flex-col items-baseline gap-2 sm:flex hidden">
                <p className="text-base font-semibold text-[#4D3594] p-1.5 bg-[#E2D8FF] rounded-md">
                  Price
                </p>
                <p className="text-4xl font-bold text-[#1E1E1E]">
                  ₦{parsePrice(item.price).toLocaleString()}
                </p>
              </div>

              <p className="text-base text-[#757575] font-medium">
                Submitted by {item.BuyerName} on{" "}
                {new Date(item.createdAt).toLocaleDateString()}
              </p>

              <div className=" items-center justify-between mb-4 sm:flex hidden">
                <div>
                  <p className="submission-key">Name of Seller</p>
                  <p className="submission-value">{item.sellerName || "N/A"}</p>
                </div>
                <div>
                  <p className="submission-key">Seller&apos;s Phone number</p>
                  <p className="submission-value">
                    {item.sellerPhoneNumber || "N/A"}
                  </p>
                </div>
              </div>

              <div className=" items-center justify-between mb-4 sm:flex hidden">
                <div>
                  <p className="submission-key">Location</p>
                  <p className="submission-value">{item.location || "N/A"}</p>
                </div>
                <div>
                  <p className="submission-key">Price Paid</p>
                  <p className="submission-value">
                    ₦{parsePrice(item.price).toLocaleString()}
                  </p>
                </div>
              </div>

              <div className=" items-center justify-between mb-4 sm:flex hidden">
                <div>
                  <p className="submission-key">Market</p>
                  <p className="submission-value">{item.market}</p>
                </div>
                <div>
                  <p className="submission-key">Quantity</p>
                  <p className="submission-value">
                    {item.quantity} {item.unit}
                  </p>
                </div>
              </div>
              <div>
                <p className="submission-key">Average Price</p>
                <p className="submission-value">
                  {avgPrice ? `₦${avgPrice.toLocaleString()}` : "N/A"}
                </p>
              </div>

              <InfoBox className="sm:block hidden" />

              <div className="w-full mt-4 flex sm:hidden">
                <Link
                  href={`/search-result/grid-view/${item.id}`}
                  className="w-full"
                >
                  <button className="btn-primary w-full">View</button>
                </Link>
              </div>
            </div>
          </div>
        );
      })}

      {/* Mobile View */}
      {currentItems.map((item) => {
        const avgKey = `${normalize(item.commodityName)}-${item.quantity}`;
        const avgPrice = averagePrices[avgKey];

        return (
          <div
            key={item.id}
            className="lg:shadow-none shadow-md p-5 flex flex-col items-center sm:hidden"
          >
            <div className="flex items-center lg:hidden gap-5">
              <div className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48">
                {item.photoUrl ? (
                  <Image
                    src={item.photoUrl}
                    alt={item.commodityName}
                    fill
                    className="object-contain rounded-md"
                    priority
                  />
                ) : (
                  // placeholder keeps the text aligned to the right
                  <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 bg-gray-100 rounded-md flex items-center justify-center">
                    <span className=" sm:text-base text-sm  text-gray-400">
                      No image
                    </span>
                  </div>
                )}
              </div>
              <div className="bg-white rounded-lg w-full p-3">
                <h2 className="sm:text-2xl text-base font-bold text-[#1E1E1E]">
                  {item.commodityName}
                </h2>
                <div className="flex-col items-baseline gap-2">
                  <p className="text-4xl font-bold text-[#1E1E1E]">
                    ₦{parsePrice(item.price).toLocaleString()}
                  </p>
                  <p className="text-sm text-[#757575] font-medium">
                    Avg: {avgPrice ? `₦${avgPrice.toLocaleString()}` : "N/A"}
                  </p>
                </div>
                <p className="text-xs text-[#757575] font-medium">
                  Submitted by {item.BuyerName} on{" "}
                  {new Date(item.createdAt).toLocaleDateString()}
                </p>
                <p className="text-xs text-[#757575] font-medium">
                  {item.location} • {item.market}
                </p>
              </div>
            </div>
            <div className="w-full mt-4">
              <Link
                href={`/search-result/grid-view/${item.id}`}
                className="w-full"
              >
                <button className="btn-primary w-full">View</button>
              </Link>
            </div>
          </div>
        );
      })}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-8 gap-4">
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-md font-medium border ${
              currentPage === 1
                ? "text-gray-400 border-gray-200 cursor-not-allowed"
                : "text-[#4D3594] border-[#4D3594] hover:bg-[#4D3594] hover:text-white"
            }`}
          >
            Previous
          </button>
          <span className="text-[#757575] font-medium">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-md font-medium border ${
              currentPage === totalPages
                ? "text-gray-400 border-gray-200 cursor-not-allowed"
                : "text-[#4D3594] border-[#4D3594] hover:bg-[#4D3594] hover:text-white"
            }`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default function GridView() {
  return (
    <Suspense
      fallback={
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
      }
    >
      <GridViewContent />
    </Suspense>
  );
}
