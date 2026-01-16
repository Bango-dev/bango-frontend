"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Commodity } from "../../../lib/types/commodities";
import DisplayIndicator from "../../../components/ui/DisplayIndicator";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import useAveragePrices from "../../../components/utils/useAveragePrice";
import authApi from "../../../utils/api";

const ITEMS_PER_PAGE = 10;

function ListViewContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [results, setResults] = useState<Commodity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const commodityName = searchParams.get("commodityName") || "";
  const location = searchParams.get("location") || "";
  const market = searchParams.get("market") || "";
  const sortRecent = searchParams.get("sortRecent") || "recent";
  const sortPrice = searchParams.get("sortPrice") || "";

  // Helper to build product detail URL with search params
  const getProductDetailUrl = (itemId: string) => {
    const params = new URLSearchParams({
      commodityName,
      location: location || "",
      market: market || "",
      sortRecent,
      sortPrice: sortPrice || "",
      viewType: "list-view",
    });
    return `/search-result/grid-view/${itemId}?${params.toString()}`;
  };

  const parsePrice = (p: unknown) => {
    const cleaned = String(p ?? "").replace(/[^0-9.]/g, "");
    const n = parseFloat(cleaned);
    return isNaN(n) ? 0 : n;
  };

  const normalize = (str: string | undefined | null) =>
    (str || "").trim().toLowerCase().replace(/\s+/g, " ");

  // Always call the hook - the hook handles empty results internally
  const { averagePrices } = useAveragePrices(results, location, market);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        const res = await authApi.get("/search", {
          params: { commodityName },
        });

        console.log(res);
        setResults(res.data?.entity.items || []);
      } catch (error) {
        console.error(error);
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    };

    if (commodityName) {
      fetchData();
    }
  }, [commodityName, location, sortRecent, sortPrice]);

  useEffect(() => {
    if (!isLoading && commodityName && results.length === 0) {
      router.push("/no-result");
    }
  }, [isLoading, results.length, commodityName, router]);

  const totalPages = Math.ceil(results.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedResults = results.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="py-5 px-5">
      <div className="flex items-center justify-between w-full">
        <Link href="/find-price">
          <div className="flex items-center mb-6 cursor-pointer gap-2">
            <Image
              src="/images/form/arrow-left.svg"
              alt="Back arrow"
              width={24}
              height={24}
            />
            <span className="font-bold sm:text-4xl text-2xl flex gap-2">
              Submissions
            </span>
          </div>
        </Link>

        <div className="pointer-events-auto">
          <DisplayIndicator />
        </div>
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

      {/* Table Header */}
      <div className="grid-cols-8 hidden lg:grid">
        <h3>IMG</h3>
        <h3>Name of Seller</h3>
        <h3>Phone number</h3>
        <h3>Location</h3>
        <h3>Price Paid</h3>
        <h3>Market</h3>
        <h3>Quantity</h3>
        <h3>Average Price</h3>
      </div>
      <hr className="hidden lg:grid" />

      {/* Desktop Rows */}
      {paginatedResults.map((item, id) => {
        const avgKey = `${normalize(item.commodityName)}-${normalize(
          item.quantity
        )}`;
        const avgPrice = averagePrices[avgKey];
        return (
          <div key={id} className="grid-cols-8 py-5 hidden lg:grid">
            {item.photoUrl ? (
              <div>
                <Image
                  src={item.photoUrl}
                  alt="Image of a commodity"
                  width={32}
                  height={32}
                />
              </div>
            ) : (
              <span>&nbsp;</span>
            )}
            <p className="submission-value">{item.sellerName}</p>
            <p className="submission-value">{item.sellerPhoneNumber}</p>
            <p className="submission-value">{item.location}</p>
            <p className="submission-value">
              ₦{parsePrice(item.price).toLocaleString()}
            </p>
            <p className="submission-value">{item.market}</p>
            <p className="submission-value">{item.quantity}</p>
            <p className="submission-value">
              {avgPrice ? `₦${avgPrice.toLocaleString()}` : "N/A"}
            </p>
          </div>
        );
      })}

      {/* Mobile Cards */}
      {paginatedResults.map((item, id) => {
        const avgKey = `${normalize(item.commodityName)}-${normalize(
          item.quantity
        )}`;
        const avgPrice = averagePrices[avgKey];
        return (
          <div
            key={id}
            className="lg:shadow-none shadow-md p-5 flex flex-col items-center lg:hidden"
          >
            <div className="flex justify-center items-center lg:hidden gap-5">
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

              <div className="bg-white rounded-lg w-full">
                <h2 className="sm:text-2xl text-base font-bold text-[#1E1E1E]">
                  {item.commodityName}
                </h2>
                <div className="flex-col items-baseline gap-2">
                  <p className="text-4xl text-[#1E1E1E] font-bold">
                    ₦{parsePrice(item.price).toLocaleString()}
                  </p>
                  <p className="text-sm text-[#757575] font-semibold mt-2">
                    Avg: {avgPrice ? `₦${avgPrice.toLocaleString()}` : "N/A"}
                  </p>
                </div>
                <p className="text-xs text-[#757575] font-medium">
                  Submitted by {item.BuyerName} on{" "}
                  {item.createdAt
                    ? new Date(item.createdAt).toLocaleDateString()
                    : "N/A"}
                </p>
                <p className="text-xs text-[#757575] font-medium">
                  {item.location} • {item.market}
                </p>
              </div>
            </div>
            <div className="w-full mt-4">
              <Link href={getProductDetailUrl(item.id)}>
                <button className="btn-primary w-full">View</button>
              </Link>
            </div>
          </div>
        );
      })}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-3 mt-8">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-md ${
              currentPage === 1
                ? "text-gray-400 border-gray-200 cursor-not-allowed"
                : "text-[#4D3594] border-[#4D3594] hover:bg-[#4D3594] hover:text-white"
            }`}
          >
            Previous
          </button>
          <span className="font-medium text-gray-700">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-md ${
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

export default function ListView() {
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
      <ListViewContent />
    </Suspense>
  );
}
