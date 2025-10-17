"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { db, Commodity } from "../../lib/db";
import DisplayIndicator from "../../components/ui/DisplayIndicator";
import Link from "next/link";
import Image from "next/image";
import InfoBox from "../../components/ui/InfoBox";
import { useRouter } from "next/navigation";
const ITEMS_PER_PAGE = 5;

const GridView = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [results, setResults] = useState<Commodity[]>([]);
  const [averagePrice, setAveragePrice] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const commodityName = searchParams.get("commodityName") || "";
  const location = searchParams.get("location") || "";
  const sortBy = searchParams.get("sortBy") || "recent";

  useEffect(() => {
    const fetchData = async () => {
      let data = await db.commodities.toArray();

      // Filter by commodity name (required)
      data = data.filter((item) =>
        item.commodityName.toLowerCase().includes(commodityName.toLowerCase())
      );

      // Filter by location if provided
      if (location.trim()) {
        data = data.filter((item) =>
          item.location.toLowerCase().includes(location.toLowerCase())
        );
      }

      // Sort results
      if (sortBy === "recent") {
        data = data.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
      } else if (sortBy === "high") {
        data = data.sort((a, b) => Number(b.price) - Number(a.price));
      } else if (sortBy === "low") {
        data = data.sort((a, b) => Number(a.price) - Number(b.price));
      }

      setResults(data);
      setCurrentPage(1); // reset to first page when search changes

      // Calculate average price
      if (data.length > 0) {
        const total = data.reduce((sum, item) => sum + Number(item.price), 0);
        setAveragePrice(Math.round(total / data.length));
      } else {
        setAveragePrice(null);
      }
    };

    fetchData();
  }, [commodityName, location, sortBy]);

  // Pagination logic
  const indexOfLast = currentPage * ITEMS_PER_PAGE;
  const indexOfFirst = indexOfLast - ITEMS_PER_PAGE;
  const currentResults = results.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(results.length / ITEMS_PER_PAGE);

  useEffect(() => {
    if (commodityName && currentResults.length === 0) {
      router.push("/no-result");
    }
  }, [commodityName, currentResults.length, router]);

  return (
    <div className="py-5 px-5 ">
      <div className=" flex items-center justify-between w-full ">
        <Link href="/find-price">
          <div className="flex items-center mb-6 cursor-pointer gap-2">
            <Image
              src="/images/form/arrow-left.svg"
              alt="Back arrow"
              width={24}
              height={24}
            />
            <span className="font-bold sm:text-4xl text-2xl flex gap-2 ">
              Submission <span className="sm:flex hidden">Prices</span>
            </span>
          </div>
        </Link>
        {/* Display Indicator*/}
        <div>
          <div className="pointer-events-auto">
            <DisplayIndicator />
          </div>
        </div>
      </div>
      <>{/* {Desktop only} */}</>
      {currentResults.length === 0
        ? null
        : results.map((item, id) => (
            <div
              key={id}
              className=" sm:shadow-none shadow-md p-5 items-center justify-center mx-auto hidden sm:flex"
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
                    ₦{item.price}
                  </p>
                </div>
                {/* Submission Date */}
                <p className="text-base text-[#757575] font-medium">
                  Submitted:{" "}
                  {item.date ? new Date(item.date).toLocaleDateString() : "N/A"}
                </p>
                <div className="items-center justify-between mb-4 sm:flex hidden">
                  <div>
                    <p className="submission-key">Name of Seller</p>
                    <p className="submission-value">
                      {item.sellerName || "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="submission-key">Seller’s Phone number</p>
                    <p className="submission-value">{item.phone || "N/A"}</p>
                  </div>
                </div>
                <div className="items-center justify-between mb-4 sm:flex hidden">
                  {/* Location */}
                  <div>
                    <p className="submission-key">Location</p>
                    <p className="submission-value">{item.location}</p>
                  </div>
                  {/* Price Paid */}
                  <div>
                    <p className="submission-key">Price Paid</p>
                    <p className="submission-value">{item.price}</p>
                  </div>
                </div>
                <div className="items-center justify-between mb-4 sm:flex hidden">
                  {/* Market */}
                  <div>
                    <p className="submission-key">Market</p>
                    <p className="submission-value">
                      {item.marketName || "N/A"}
                    </p>
                  </div>
                  {/* Quantity */}
                  <div>
                    <p className="submission-key">Quantity</p>
                    <p className="submission-value">{item.quantity}</p>
                  </div>
                </div>
                {/* Average Price */}
                <div className="sm:block hidden">
                  <p className="submission-key">Average Price</p>
                  <p className="submission-value">
                    {averagePrice ? `₦${averagePrice}` : "N/A"}
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
          ))}
      {/* Mobile Only */}
      {results.length === 0 ? (
        <p>No results found for {commodityName}.</p>
      ) : (
        currentResults.map((item, id) => (
          <div
            key={id}
            className=" lg:shadow-none shadow-md p-5  flex flex-col items-center lg:hidden"
          >
            <div className="flex  items-center lg:hidden gap-5">
              {item.image && (
                <div
                  className="w-[137px] h-[92px]
                 sm:w-[504px] sm:h-[470px]"
                >
                  <Image
                    src={item.image}
                    alt="Image of a commodity"
                    width={504}
                    height={470}
                    className="object-cover" // or object-contain, as needed
                    priority // optional, loads image early for performance
                  />
                </div>
              )}
              <div className="bg-white rounded-lg  w-full">
                <h2 className="sm:text-2xl  text-base font-bold text-[#1E1E1E]">
                  {item.commodityName}
                </h2>
                <div className="flex-col items-baseline gap-2 ">
                  <p className="text-4xl text-[#1E1E1E] font-bold">
                    ₦{item.price}
                  </p>
                </div>
                {/* Submission Date */}
                <p className="text-xs text-[#757575] font-medium">
                  Submitted:{" "}
                  {item.date ? new Date(item.date).toLocaleDateString() : "N/A"}
                </p>
              </div>
            </div>
            <div className="w-full mt-4">
              <Link
                href={`/search-result/grid-view/${item.id}`}
                className="w-full  "
              >
                <button className="btn-primary w-full ">View</button>
              </Link>
            </div>
          </div>
        ))
      )}
      ;{/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center space-x-2 mt-6">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => setCurrentPage(index + 1)}
              className={`px-3 py-1 rounded-md border ${
                currentPage === index + 1
                  ? "bg-blue-500 text-white"
                  : "bg-white text-black"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
export default GridView;
