"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { MdGridOn } from "react-icons/md";
import { FaList, FaFilter } from "react-icons/fa";
import Link from "next/link";

const DisplayIndicator = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const queryString = searchParams.toString();
  const querySuffix = queryString ? `?${queryString}` : "";

  return (
    <div>
      {/* Toggle Buttons */}
      <div className="flex gap-2 mb-4">
        {/* Filter Button */}
        <button className="p-2 rounded-md border transition flex items-center justify-center bg-white text-gray-600 hover:bg-gray-100">
          <FaFilter className="w-5 h-5" />
          <span className="ml-2 hidden sm:inline">Filter</span>
        </button>

        {/* Grid View */}
        <Link href={`/search-result/grid-view${querySuffix}`}>
          <button
            className={`p-2 rounded-md border transition flex items-center justify-center
              ${
                pathname.includes("grid-view")
                  ? "bg-gray-200"
                  : "bg-white text-gray-600"
              }`}
          >
            <MdGridOn className="w-5 h-5" />
          </button>
        </Link>

        {/* List View */}
        <Link href={`/search-result/list-view${querySuffix}`}>
          <button
            className={`p-2 rounded-md border transition flex items-center justify-center
              ${
                pathname.includes("list-view")
                  ? "bg-gray-200"
                  : "bg-white text-gray-600"
              }`}
          >
            <FaList className="w-5 h-5" />
          </button>
        </Link>
      </div>
    </div>
  );
};

export default DisplayIndicator;
