"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import PrimaryButton from "../components/ui/PrimaryButton";
import Input from "../form/Input";
import LocationSelect from "../components/LocationSelect";
import Link from "next/link";
import Image from "next/image";
import ProtectedRoute from "../components/protectedRoute";

const FindPrice = () => {
  const [commodityName, setCommodityName] = useState("");
  const [location, setLocation] = useState("");
  const [market, setMarket] = useState("");
  const [sortRecent, setSortRecent] = useState("recent");
  const [sortPrice, setSortPrice] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const router = useRouter();

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      const timer = setTimeout(() => setErrors({}), 3000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!commodityName.trim())
      newErrors.commodityName = "Commodity name is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFindPrice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const query = new URLSearchParams({
      commodityName,
      location,
      market,
      sortRecent,
      sortPrice,
    }).toString();

    router.push(`/search-result/grid-view?${query}`);
  };

  return (
    <ProtectedRoute>
      <div className="flex flex-col min-h-screen pt-5 px-3 sm:px-4 lg:px-4 mx-auto w-full">
        <Link href="/">
          <div className="flex items-center mb-6 cursor-pointer gap-2">
            <Image
              src="/images/form/arrow-left.svg"
              alt="Back arrow"
              width={24}
              height={24}
            />
            <span>Back</span>
          </div>
        </Link>
        <form className="form" onSubmit={handleFindPrice} noValidate>
          <h2 className="font-bold text-2xl leading-4">Find Price</h2>
          <h3 className="text-[#757575] sm:text-base text-sm">
            Find the price of an item to know how to plan your budget
          </h3>

          <Input
            label="Name of Commodity"
            type="text"
            placeholder="Eg, rice, Airforce 1, sugar"
            description="What item are you looking for?"
            value={commodityName}
            showError={!!errors.commodityName}
            onChange={(e) => setCommodityName(e.target.value)}
            required
          />
          {errors.commodityName && (
            <p className="text-red-500 text-sm mb-1">{errors.commodityName}</p>
          )}

          <LocationSelect value={location} onChange={setLocation} />
          <Input
            label="Market Name"
            type="text"
            placeholder="Wuse Market"
            value={market}
            onChange={(e) => setMarket(e.target.value)}
            rightIcon="/images/form/map-marker-outline.svg"
          />
          {/* Sorting options */}
          <div className="flex flex-col w-full mb-4">
            <label className="text-xs sm:text-xl font-bold text-[#1E1E1E] mb-2">
              Sort By
            </label>
            <div className="flex gap-4">
              {/* Most Recent */}
              <select
                className="border border-gray-300 rounded-md px-3 py-2 w-1/2 text-base text-[#757575]"
                value={sortRecent}
                onChange={(e) => setSortRecent(e.target.value)}
              >
                <option value="recent">Most Recent</option>
                <option value="oldest">Oldest</option>
              </select>

              {/* Price Order */}
              <select
                className="border border-gray-300 rounded-md px-2 py-2 w-1/2 text-base text-[#757575]"
                value={sortPrice}
                onChange={(e) => setSortPrice(e.target.value)}
              >
                <option value="">Sort by Price</option>
                <option value="high">Price (High → Low)</option>
                <option value="low">Price (Low → High)</option>
              </select>
            </div>
          </div>

          <PrimaryButton type="submit" text="Find Price" className="w-full" />
        </form>
      </div>
    </ProtectedRoute>
  );
};

export default FindPrice;
