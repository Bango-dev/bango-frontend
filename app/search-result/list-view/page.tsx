"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Commodity } from "../../lib/types/commodities";
import DisplayIndicator from "../../components/ui/DisplayIndicator";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import useAveragePrices from "../../components/utils/useAveragePrice";
import api from "../../utils/api";

const ITEMS_PER_PAGE = 10;

function ListViewContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [results, setResults] = useState<Commodity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const commodityName = searchParams.get("commodityName") || "";
  const location = searchParams.get("location") || "";
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

        console.log(res.data);
        setResults(res.data?.data?.data || []);
      } catch (error) {
        console.error(error);
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [commodityName, location, sortRecent, sortPrice]);

  const { averagePrices } = useAveragePrices(results, location);

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
              Submission <span className="sm:flex hidden">Prices</span>
            </span>
          </div>
        </Link>

        <div className="pointer-events-auto">
          <DisplayIndicator />
        </div>
      </div>

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
            <p className="submission-value">{item.phone}</p>
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
              <div>
                {item.photoUrl && (
                  <Image
                    src={item.photoUrl}
                    alt="Image of a commodity"
                    width={504}
                    height={470}
                    className="object-cover"
                    priority
                  />
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
                  Submitted:{" "}
                  {item.createdAt
                    ? new Date(item.createdAt).toLocaleDateString()
                    : "N/A"}
                </p>
              </div>
            </div>
            <div className="w-full mt-4">
              <Link href={`/search-result/grid-view/${item.id}`}>
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
    <Suspense fallback={<div className="p-5 text-center">Loading...</div>}>
      <ListViewContent />
    </Suspense>
  );
}
