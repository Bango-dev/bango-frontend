"use client";
import Input from "../form/Input";
import SecondaryButton from "../../components/ui/SecondaryButton";
import PrimaryButton from "../../components/ui/PrimaryButton";
import Image from "next/image";
import { useState } from "react";

const TRENDING_SEARCHES = [
    "Rice","Yam","Beans","Groundnut Oil","Vegetables","Fruits"
]

const CATEGORIES = [
    {
        category: "Grain",
        products: "2 products"
    },
    {
        category: "Grain",
        products: "2 products"
    },
    {
        category: "Grain",
        products: "2 products"
    },
    {
        category: "Grain",
        products: "2 products"
    },
    {
        category: "Grain",
        products: "2 products"
    },
    {
        category: "Grain",
        products: "2 products"
    },
    {
        category: "Grain",
        products: "2 products"
    },
    {
        category: "Grain",
        products: "2 products"
    },
]

const POPULAR_MARKETS = [
  {
    market: "Mile 12 Market",
    location: "Lagos",
  },
  {
    market: "Garki Market",
    location: "Abuja",
  },
  {
    market: "Sabon Gari",
    location: "Kano",
  },
  {
    market: "New Market",
    location: "Onitsha",
  },
  {
    market: "Central Market",
    location: "Kaduna",
  },
]

const bgColors = [
  "bg-[#12B89A]",
  "bg-[#F78511]",
  "bg-[#4A77F4]",
  "bg-[#F0447C]",
  "bg-[#9759F6]",
  "bg-[#0BABE1]",
  "bg-[#54D071]",
];

const RECENT_ACTVIVTY = [
  {
    commodity: "Tomato",
    price: "#350",
    time: "2 mins ago"
  },
  {
    commodity: "Rice",
    price: "#1200",
    time: "1 hours ago"
  },
  {
    commodity: "Onions",
    price: "#350",
    time: "3 hours ago"
  },
]

const TRENDING_COMMODITIES = [
  {
    image: "/images/dashboard/groundnut_oil.png",
    name: "Ground Oil",
    price: "#800",
    bangos: "1,247 Bangos",
    category: "Households",
    quantity: "Per Kg",
    date: "Bango'd on 02/12/2025",
  },
  {
    image: "/images/dashboard/egg.png",
    name: "Eggs",
    price: "#800",
    bangos: "1,247 Bangos",
    category: "Protein",
    quantity: "Per Crate",
    date: "Bango'd on 02/12/2025",
  },
  {
    image: "/images/dashboard/yam.png",
    name: "Yam",
    price: "#1500",
    bangos: "1,247 Bangos",
    category: "Tuber",
    quantity: "Per Pcs",
    date: "Bango'd on 02/12/2025",
  },
  {
    image: "/images/dashboard/rice.png",
    name: "Rice",
    price: "#25000",
    bangos: "1,247 Bangos",
    category: "Grain",
    quantity: "Per bag",
    date: "Bango'd on 02/12/2025",
  },
  {
    image: "/images/dashboard/beans.png",
    name: "Beans",
    price: "#800",
    bangos: "1,247 Bangos",
    category: "Grain",
    quantity: "Per kg",
    date: "Bango'd on 02/12/2025",
  },
  {
    image: "/images/dashboard/yam.png",
    name: "Yam",
    price: "#1500",
    bangos: "1,247 Bangos",
    category: "Tuber",
    quantity: "Per Pcs",
    date: "Bango'd on 02/12/2025",
  },
  {
    image: "/images/dashboard/egg.png",
    name: "Eggs",
    price: "#800",
    bangos: "1,247 Bangos",
    category: "Protein",
    quantity: "Per Crate",
    date: "Bango'd on 02/12/2025",
  },
  {
    image: "/images/dashboard/groundnut_oil.png",
    name: "Ground Oil",
    price: "#800",
    bangos: "1,247 Bangos",
    category: "Households",
    quantity: "Per Kg",
    date: "Bango'd on 02/12/2025",
  },
  {
    image: "/images/dashboard/rice.png",
    name: "Rice",
    price: "#25000",
    bangos: "1,247 Bangos",
    category: "Grain",
    quantity: "Per bag",
    date: "Bango'd on 02/12/2025",
  },
];


const Search = () => {
    const [query, setQuery] = useState("");

    const filteredResults = TRENDING_COMMODITIES.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );

    const showResults = query.trim().length > 0;
  return (
    <div className="py-10 px-20 flex flex-col gap-10 w-full">
      <h1 className="font-bold text-3xl">Search & Discovery</h1>
      {/* SEARCH INPUT */}
      <Input
        type="text"
        placeholder="Search for prices, markets..."
        leftIcon="/images/timeline/search-icon.svg"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        inputClassName="w-full pl-10 rounded-full"
      />

      {/*  SEARCH RESULTS */}
      {showResults ? (
        <>
          <h2 className="font-semibold text-2xl">
            Search results for "{query}"
          </h2>

          {filteredResults.length === 0 ? (
            <p className="text-[#757575]">No results found.</p>
          ) : (
            <div className="flex w-full flex-wrap gap-5">
              {filteredResults.map((commodity, index) => (
                <div className="form w-md rounded-4xl p-0" key={index}>
                  <Image
                    src={commodity.image}
                    alt={commodity.name}
                    width={400}
                    height={146}
                    className="w-full"
                  />

                  <div className="flex flex-col gap-2 px-6 pb-6">
                    <div className="flex justify-between font-semibold">
                      <p className="text-lg">{commodity.name}</p>
                      <p className="text-(--color-primary) text-2xl">
                        {commodity.price}
                      </p>
                    </div>

                    <div className="flex justify-between text-[#757575]">
                      <p>{commodity.category}</p>
                      <p>{commodity.quantity}</p>
                    </div>

                    <p className="text-[#757575]">{commodity.date}</p>

                    <div className="flex gap-3">
                      <SecondaryButton text="Insights" className="w-full" />
                      <PrimaryButton
                        text="Bango this item"
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      ) : (
        <>
          {/* Trending Searches */}
          <div>
            <h2 className="font-semibold text-2xl mb-2 ">Trending Searches</h2>
            <div className="flex flex-wrap gap-2">
              {TRENDING_SEARCHES.map((item, index) => (
                <div
                  key={index}
                  onClick={() => setQuery(item)}
                  className="bg-[#CFF7D3] px-4 py-2 rounded-full cursor-pointer text-[#02542D] "
                >
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Browse categories */}
          <div>
            <h2 className="font-semibold text-2xl mb-2 ">Browse Categories</h2>
            {/* <div> */}
            <div className="flex w-full gap-2 flex-wrap   ">
              {CATEGORIES.map((item, index) => (
                <div
                  key={index}
                  className={`flex flex-col  w-[48%] p-5 h-24 rounded-lg ${bgColors[index]}   py-4 cursor-pointer `}
                >
                  <span className="font-bold text-white">{item.category}</span>
                  <span className="text-sm text-white">{item.products}</span>
                </div>
              ))}
            </div>
            {/* </div> */}
          </div>

          {/* popular markets */}
          <div>
            <h2 className=" text-2xl font-semibold">Popular Markets</h2>
            <div>
              {POPULAR_MARKETS.map((item, index) => (
                <div
                  key={index}
                  className="flex gap-2 items-center border-b border-[#B3B3B3] py-4"
                >
                  <div className=" h-8 w-8 rounded-full bg-[#DFE0FF] flex items-center justify-center ">
                    <span className="text-(--color-primary)">{index + 1}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-2xl ">{item.market}</p>
                    <p className="text-[#757575]">{item.location}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* recent activity */}
          <div>
            <h2 className=" text-2xl font-semibold">Recent Activity</h2>
            <div>
              {RECENT_ACTVIVTY.map((item, index) => (
                <div key={index} className="flex gap-2 items-center  py-4">
                  <div>
                    <div className="flex items-center">
                      <p className="font-semibold text-2xl ">
                        {item.commodity} Bango'd at{" "}
                        <span className="text-lg text-[#009951]">
                          {item.price}
                        </span>
                      </p>
                    </div>
                    <p className="text-[#757575] text-sm">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-between bg-[#DFE0FF] p-5 rounded-2xl ">
            <div>
              <h4 className="font-semibold text-[#4B2CA9] text-2xl ">
                Your Location: Abuja
              </h4>
              <p className="text-[#757575]">See prices near you</p>
            </div>
            <SecondaryButton
              text="Change Location"
              // onClick={handleGoogleSignIn}
              // iconSrc="/images/on-boarding/google-icon.svg"
            />
          </div>
        </>
      )}
    </div>
  );
}
export default Search