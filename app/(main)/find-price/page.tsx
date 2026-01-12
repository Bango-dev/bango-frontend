"use client";

import SuggestionInput from "../../components/ui/SuggestionInput";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import PrimaryButton from "../../components/ui/PrimaryButton";
// import Input from "../form/Input";
import LocationSelect from "../../components/LocationSelect";
import Link from "next/link";
import Image from "next/image";
import { AuthContext } from "../../context/AuthContext";
import {useContext} from "react"

const FindPrice = () => {
  const [commodityName, setCommodityName] = useState("");
  const [location, setLocation] = useState("");
  const [market, setMarket] = useState("");
  const [sortRecent, setSortRecent] = useState("recent");
  const [sortPrice, setSortPrice] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [loading, setLoading] = useState(false);
  const router = useRouter();
    const { user } = useContext(AuthContext);


    useEffect(() => {
      if (!loading && !user) {
        router.replace("/login");
      }
    }, [user, loading]);

    if (loading) return null;
    if (!user) return null;

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
    setLoading(true);

    const isValid = validate();

    if (!isValid) {
      setLoading(false);
      return;
    }

    const query = new URLSearchParams({
      commodityName,
      location,
      market,
      sortRecent,
      sortPrice,
    }).toString();

    // Allow the overlay to show briefly before navigation
    setTimeout(() => {
      router.push(`/search-result/grid-view?${query}`);
    }, 600);
  };

  return (
      <div className="flex flex-col min-h-screen pt-5 px-3 sm:px-4 lg:px-4 mx-auto w-full">
        <Link href="/" className="w-fit" >
          <div className="flex items-center  w-fit mb-6 cursor-pointer gap-2">
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

          <SuggestionInput
            label="Name of Commodity"
            type="text"
            placeholder="Eg, rice, Airforce 1, sugar"
            value={commodityName}
            onChange={setCommodityName}
            field="commodityName"
            showError={!!errors.commodityName}
            required
          />
          {errors.commodityName && (
            <p className="text-red-500 text-sm">{errors.commodityName}</p>
          )}

          <LocationSelect value={location} onChange={setLocation} />
          <SuggestionInput
            label="Market Name"
            type="text"
            placeholder="Wuse Market"
            value={market}
            field="market"
            onChange={setMarket}
            showError={!!errors.marketName}
          />
          {errors.market && (
            <p className="text-red-500 text-sm">{errors.market}</p>
          )}
          {/* Sorting options */}
          {/* <div className="flex flex-col w-full mb-4">
            <label className="text-xs sm:text-xl font-bold text-[#1E1E1E] mb-2">
              Sort By
            </label>
            <div className="flex gap-4">
              Most Recent
              <select
                className="border border-gray-300 rounded-md px-3 py-2 w-1/2 text-base text-[#757575]"
                value={sortRecent}
                onChange={(e) => setSortRecent(e.target.value)}
              >
                <option value="recent">Most Recent</option>
                <option value="oldest">Oldest</option>
              </select>

              Price Order
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
          </div> */}

          {/* Submit button with loading state */}
          <PrimaryButton
            text={
              loading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Finding Price...
                </>
              ) : (
                "Find Price"
              )
            }
            type="submit"
            className="w-full"
            disabled={loading} // disable while loading or editing
            // icon={loading ? "/images/spinner.svg" : undefined} // optional spinner icon
          />
        </form>
      </div>
  );
};

export default FindPrice;
