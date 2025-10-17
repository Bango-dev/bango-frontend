"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import PrimaryButton from "../components/ui/PrimaryButton";
import Input from "../form/Input";
import Image from "next/image";

const FindPrice = () => {
  const [commodityName, setCommodityName] = useState("");
  const [location, setLocation] = useState("");
  const [sortBy, setSortBy] = useState("recent");
  const [error, setError] = useState(false);
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    if (!commodityName.trim()) {
      setError(true);
      return;
    }
    setError(false);

    const query = new URLSearchParams({
      commodityName,
      location,
      sortBy,
    }).toString();
    router.push(`/search-result?${query}`);
  };


  const handleFindPrice = () => {
    router.push("/search-result/grid-view");
  };
  return (
    <div className="flex flex-col min-h-screen pt-5 px-3 sm:px-4 lg:px-4 mx-auto w-full ">
      <form className="form" onSubmit={handleSearch}>
        <h2 className=" font-bold text-2xl leading-4  ">Find Price</h2>
        <h3 className="text-[#757575] sm:text-base text-sm  ">
          Find the price of an item to know how to plan your budget
        </h3>
        {error && (
          <p className="text-red-500 text-sm mb-1">This field is required</p>
        )}
        <Input
          label="Name of Commodity"
          type="text"
          placeholder="Eg, rice, Airforce 1, sugar"
          description="What’s item are you looking for?"
          onChange={(e) => setCommodityName(e.target.value)}
          required
        />

        <Input
          label="Location"
          type="text"
          placeholder="Abuja"
          description="Fliter by Location"
          onChange={(e) => setLocation(e.target.value)}
          rightIcon="/images/form/map-marker-outline.svg"
        />

        <div className="flex flex-col w-full mb-4">
          <label className="text-xl font-bold text-[#1E1E1E] mb-2">
            Sort By
          </label>
          <div className="flex gap-4">
            <select
              className="border border-gray-300 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-[var(--primary-color)] transition w-1/2 text-base text-[#757575]"
              defaultValue="recent"
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="most-recent">Most Recent</option>
            </select>
            <div className="relative w-1/2">
              <select
                className="border border-gray-300 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-[var(--primary-color)] transition w-full text-base text-[#757575] pr-10"
                defaultValue="price-high-low"
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="high">Price (high to low)</option>
                <option value="low">Price (low to high)</option>
              </select>
              <span className="absolute right-4 top-2 flex items-center pointer-events-none">
                <Image
                  src="/images/form/filter-variant.svg"
                  alt="Filter"
                  width={20}
                  height={20}
                />
              </span>
            </div>
          </div>
        </div>

        <PrimaryButton
          onClick={handleFindPrice}
          text="Find Price"
        />
      </form>
    </div>
  );
};
export default FindPrice;
