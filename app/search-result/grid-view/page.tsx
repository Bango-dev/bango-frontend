"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { db, Commodity } from "../../lib/db";
import DisplayIndicator from "../../components/ui/DisplayIndicator";
import Link from "next/link";
import Image from "next/image";
import InfoBox from "../../components/ui/InfoBox";
import { useRouter } from "next/navigation";

const GridView = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [results, setResults] = useState<Commodity[]>([]);
  const [averagePrices, setAveragePrices] = useState<Record<string, number>>(
    {}
  );
  const [isLoading, setIsLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 5;

  const commodityName = searchParams.get("commodityName") || "";
  const location = searchParams.get("location") || "";
  const sortRecent = searchParams.get("sortRecent") || "recent";
  const sortPrice = searchParams.get("sortPrice") || "";

  // Helper: convert a price string (with commas/currency etc) to a number
  const parsePrice = (p: unknown) => {
    // coerce to string, remove anything except digits & dot, parseFloat, fallback 0
    const cleaned = String(p ?? "").replace(/[^0-9.]/g, "");
    const n = parseFloat(cleaned);
    return isNaN(n) ? 0 : n;
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      let data = await db.commodities.toArray();

      // 🔹 Filter by commodity name (broad match)
      data = data.filter((item) =>
        item.commodityName.toLowerCase().includes(commodityName.toLowerCase())
      );

      // 🔹 Filter by location (if provided)
      if (location.trim()) {
        data = data.filter((item) =>
          item.location.toLowerCase().includes(location.toLowerCase())
        );
      }

      // 🔹 Sort by recency
      if (sortRecent === "recent") {
        data.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
      } else if (sortRecent === "oldest") {
        data.sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        );
      }

      // 🔹 Sort by price (use parsePrice)
      if (sortPrice === "high") {
        // highest price first
        data.sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
      } else if (sortPrice === "low") {
        // lowest price first
        data.sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
      }

      setResults(data);

      // 🟣 Compute average price per unique (commodityName + quantity)
      const allCommodities = await db.commodities.toArray();
      const averages: Record<string, number> = {};

      data.forEach((item) => {
        const key = `${item.commodityName.trim().toLowerCase()}-${item.quantity
          ?.trim()
          .toLowerCase()}`;

        if (!averages[key]) {
          const similarItems = allCommodities.filter(
            (c) =>
              c.commodityName.trim().toLowerCase() ===
                item.commodityName.trim().toLowerCase() &&
              (c.quantity?.trim().toLowerCase() || "") ===
                (item.quantity?.trim().toLowerCase() || "")
          );

          if (similarItems.length > 0) {
            const total = similarItems.reduce((sum, c) => {
              // ✅ Safely convert any formatted price to number
              const priceNum = parsePrice(c.price);
              return sum + priceNum;
            }, 0);

            averages[key] = Math.round(total / similarItems.length);
          }
        }
      });

      setAveragePrices(averages);
      setIsLoading(false);
    };

    fetchData();
  }, [commodityName, location, sortRecent, sortPrice]);

  // Redirect to "no result" if nothing found
  useEffect(() => {
    if (!isLoading && commodityName && results.length === 0) {
      router.push("/no-result");
    }
  }, [isLoading, results.length, commodityName, router]);

  // Pagination logic
  const totalPages = Math.ceil(results.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = results.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((p) => p + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((p) => p - 1);
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

      {/* 💻 Desktop View */}
      {currentItems.map((item, id) => {
        const avgKey = `${item.commodityName
          .trim()
          .toLowerCase()}-${item.quantity?.trim().toLowerCase()}`;
        const avgPrice = averagePrices[avgKey];

        return (
          <div
            key={id}
            className="sm:shadow-none shadow-md p-5 items-center justify-center mx-auto hidden sm:flex"
          >
            {item.image && (
              <div>
                <Image
                  src={item.image}
                  alt="Image of a commodity"
                  width={504}
                  height={470}
                />
              </div>
            )}
            <div className="bg-white rounded-lg p-6 space-y-4 w-xl">
              <h2 className="text-2xl font-bold text-[#1E1E1E]">
                {item.commodityName}
              </h2>

              <div className="flex-col items-baseline gap-2 sm:flex hidden">
                <p className="text-base font-semibold text-[#4D3594] p-1.5 bg-[#E2D8FF] rounded-md">
                  Price
                </p>
                <p className="text-4xl text-[#1E1E1E] font-bold">
                  ₦{parsePrice(item.price).toLocaleString()}
                </p>
              </div>

              <p className="text-base text-[#757575] font-medium">
                Submitted:{" "}
                {item.date ? new Date(item.date).toLocaleDateString() : "N/A"}
              </p>

              <div className="items-center justify-between mb-4 sm:flex hidden">
                <div>
                  <p className="submission-key">Name of Seller</p>
                  <p className="submission-value">{item.sellerName || "N/A"}</p>
                </div>
                <div>
                  <p className="submission-key">Seller’s Phone number</p>
                  <p className="submission-value">{item.phone || "N/A"}</p>
                </div>
              </div>

              <div className="items-center justify-between mb-4 sm:flex hidden">
                <div>
                  <p className="submission-key">Location</p>
                  <p className="submission-value">{item.location}</p>
                </div>
                <div>
                  <p className="submission-key">Price Paid</p>
                  <p className="submission-value">
                    ₦{parsePrice(item.price).toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="items-center justify-between mb-4 sm:flex hidden">
                <div>
                  <p className="submission-key">Market</p>
                  <p className="submission-value">{item.marketName || "N/A"}</p>
                </div>
                <div>
                  <p className="submission-key">Quantity</p>
                  <p className="submission-value">{item.quantity}</p>
                </div>
              </div>

              {/* 🟣 Average Price per commodity (name + quantity match) */}
              <div className="sm:block hidden">
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

      {/* 📱 Mobile View */}
      {currentItems.map((item, id) => {
        const avgKey = `${item.commodityName
          .trim()
          .toLowerCase()}-${item.quantity?.trim().toLowerCase()}`;
        const avgPrice = averagePrices[avgKey];

        return (
          <div
            key={id}
            className="lg:shadow-none shadow-md p-5 flex flex-col items-center sm:hidden"
          >
            <div className="flex items-center lg:hidden gap-5">
              {item.image && (
                <div className="">
                  <Image
                    src={item.image}
                    alt="Image of a commodity"
                    width={504}
                    height={470}
                    className="object-cover"
                    priority
                  />
                </div>
              )}
              <div className="bg-white rounded-lg w-full">
                <h2 className="sm:text-2xl text-base font-bold text-[#1E1E1E]">
                  {item.commodityName}
                </h2>
                <div className="flex-col items-baseline gap-2">
                  <p className="text-4xl text-[#1E1E1E] font-bold">
                    ₦{parsePrice(item.price).toLocaleString()}
                  </p>
                  {/* 🟣 Show average on mobile too */}
                  <p className="text-sm text-[#757575] font-medium">
                    Avg: {avgPrice ? `₦${avgPrice.toLocaleString()}` : "N/A"}
                  </p>
                </div>
                <p className="text-xs text-[#757575] font-medium">
                  Submitted:{" "}
                  {item.date ? new Date(item.date).toLocaleDateString() : "N/A"}
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
      {results.length > ITEMS_PER_PAGE && (
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
};

export default GridView;
