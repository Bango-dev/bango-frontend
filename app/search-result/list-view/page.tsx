"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { db, Commodity } from "../../lib/db";
import DisplayIndicator from "../../components/ui/DisplayIndicator";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

const ITEMS_PER_PAGE = 10; // number of items per page

const ListView = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [results, setResults] = useState<Commodity[]>([]);
  const [averagePrices, setAveragePrices] = useState<Record<string, number>>(
    {}
  );
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const commodityName = searchParams.get("commodityName") || "";
  const location = searchParams.get("location") || "";
  const sortRecent = searchParams.get("sortRecent") || "recent";
  const sortPrice = searchParams.get("sortPrice") || "";

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      let data = await db.commodities.toArray();

      // Filter by commodity name
      data = data.filter((item) =>
        item.commodityName.toLowerCase().includes(commodityName.toLowerCase())
      );

      // Filter by location
      if (location.trim()) {
        data = data.filter((item) =>
          item.location.toLowerCase().includes(location.toLowerCase())
        );
      }

      // Sort by recency
      if (sortRecent === "recent") {
        data.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
      } else if (sortRecent === "oldest") {
        data.sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        );
      }

      // Sort by price
      if (sortPrice === "high") {
        data.sort((a, b) => Number(b.price) - Number(a.price));
      } else if (sortPrice === "low") {
        data.sort((a, b) => Number(a.price) - Number(b.price));
      }

      setResults(data);

      // ✅ Calculate average price per commodity name
      const grouped: Record<string, number[]> = {};
      data.forEach((item) => {
        if (!grouped[item.commodityName]) grouped[item.commodityName] = [];
        grouped[item.commodityName].push(Number(item.price));
      });

      const avgPrices: Record<string, number> = {};
      for (const [name, prices] of Object.entries(grouped)) {
        const total = prices.reduce((sum, p) => sum + p, 0);
        avgPrices[name] = Math.round(total / prices.length);
      }

      setAveragePrices(avgPrices);

      setIsLoading(false);
    };

    fetchData();
  }, [commodityName, location, sortRecent, sortPrice]);

  // Redirect if no results
  useEffect(() => {
    if (!isLoading && commodityName && results.length === 0) {
      router.push("/no-result");
    }
  }, [isLoading, results.length, commodityName, router]);

  // Pagination logic
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

      {/* Table Header for Desktop */}
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
      {paginatedResults.map((item, id) => (
        <div key={id} className="grid-cols-8 py-5 hidden lg:grid">
          {item.image ? (
            <div>
              <Image
                src={item.image}
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
            ₦{Number(item.price).toLocaleString()}
          </p>
          <p className="submission-value">{item.marketName}</p>
          <p className="submission-value">{item.quantity}</p>
          <p className="submission-value">
            {averagePrices[item.commodityName]
              ? `₦${averagePrices[item.commodityName].toLocaleString()}`
              : "N/A"}
          </p>
        </div>
      ))}

      {/* Mobile Cards */}
      {paginatedResults.map((item, id) => (
        <div
          key={id}
          className="lg:shadow-none shadow-md p-5 flex flex-col items-center lg:hidden"
        >
          <div className="flex justify-center items-center lg:hidden gap-5">
            <div>
              {item.image && (
                <Image
                  src={item.image}
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
                  ₦{Number(item.price).toLocaleString()}
                </p>
              </div>
              <p className="text-xs text-[#757575] font-medium">
                Submitted:{" "}
                {item.date ? new Date(item.date).toLocaleDateString() : "N/A"}
              </p>

              {/* ✅ Show average price below */}
              {averagePrices[item.commodityName] && (
                <p className="text-sm text-[#4D3594] font-semibold mt-2">
                  Avg: ₦{averagePrices[item.commodityName].toLocaleString()}
                </p>
              )}
            </div>
          </div>
          <div className="w-full mt-4">
            <Link href={`/search-result/grid-view/${item.id}`}>
              <button className="btn-primary w-full">View</button>
            </Link>
          </div>
        </div>
      ))}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-3 mt-8">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-md ${
              currentPage === 1
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-[#1E1E1E] text-white"
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
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-[#1E1E1E] text-white"
            }`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default ListView;
