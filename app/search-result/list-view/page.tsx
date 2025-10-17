"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { db, Commodity } from "../../lib/db";
import DisplayIndicator from "../../components/ui/DisplayIndicator";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

const ListView = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [results, setResults] = useState<Commodity[]>([]);
  const [averagePrice, setAveragePrice] = useState<number | null>(null);

  // get filters from URL
  const commodityName = searchParams.get("commodityName") || "";
  const location = searchParams.get("location") || "";
  const sortBy = searchParams.get("sortBy") || "recent";
  // sortBy can be: "recent" | "high" | "low"

  useEffect(() => {
    const fetchData = async () => {
      let data = await db.commodities.toArray();

      // filter by commodityName
      if (commodityName.trim()) {
        data = data.filter((item) =>
          item.commodityName.toLowerCase().includes(commodityName.toLowerCase())
        );
      }

      // filter by location
      if (location.trim()) {
        data = data.filter((item) =>
          item.location.toLowerCase().includes(location.toLowerCase())
        );
      }

      // sort results
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

      // average price
      if (data.length > 0) {
        const total = data.reduce((sum, item) => sum + Number(item.price), 0);
        setAveragePrice(Math.round(total / data.length));
      } else {
        setAveragePrice(null);
      }
    };

    fetchData();
  }, [commodityName, location, sortBy]);

  useEffect(() => {
    if (commodityName && results.length === 0) {
      router.push("/no-result");
    }
  }, [commodityName, results.length, router]);

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

      <div className="grid-cols-8 hidden lg:grid">
        <h3>IMG</h3>
        <h3>Name of Seller</h3>
        <h3>Phone number</h3>
        <h3>Location</h3>
        <h3>Price Paid </h3>
        <h3>Market</h3>
        <h3>Quantity</h3>
        <h3>Average Price</h3>
      </div>
      <hr className="hidden lg:grid" />

      {/* Desktop Only */}
      {results.length === 0 ? (
        <p>No results found for {commodityName}.</p>
      ) : (
        results.map((item, id) => (
          <div key={id} className="grid-cols-8  py-5 hidden lg:grid">
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

            <p className="submission-value">{item.price}</p>

            <p className="submission-value">{item.marketName}</p>

            <p className="submission-value">{item.quantity}</p>

            <p className="submission-value">
              {averagePrice ? `₦${averagePrice}` : "N/A"}
            </p>
          </div>
        ))
      )}

      {/* Mobile Only */}
      {results.length === 0 ? (
        <p>No results found for {commodityName}.</p>
      ) : (
        results.map((item, id) => (
          <div
            key={id}
            className=" lg:shadow-none shadow-md p-5  flex flex-col items-center lg:hidden"
          >
            <div className="flex  items-center lg:hidden gap-5">
              <div
                className="w-[137px] h-[92px]
                 sm:w-[504px] sm:h-[470px]"
              >
                {item.image && (
                  <Image
                    src={item.image}
                    alt="Image of a commodity"
                    width={504}
                    height={470}
                    className="object-cover" // or object-contain, as needed
                    priority // optional, loads image early for performance
                  />
                )}
              </div>

              <div className="bg-white rounded-lg  w-full">
                <h2 className="sm:text-2xl  text-base font-bold text-[#1E1E1E]">
                  {item.commodityName}
                </h2>
                <div className="flex-col items-baseline gap-2 ">
                  <p className="text-4xl text-[#1E1E1E] font-bold">
                    {item.price}
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
    </div>
  );
};
export default ListView;
