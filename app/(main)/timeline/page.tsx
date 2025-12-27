"use client"

import Input from "../form/Input";
import SecondaryButton from "../../components/ui/SecondaryButton";
import PrimaryButton from "../../components/ui/PrimaryButton";
import Image from "next/image";
// import Button from "../../components/ui/Button";
import { useState } from "react";

const Timeline = () => {
  const CATEGORIES = ["New", "Trending", "Most Bango'd", "For You"];
  const [activeCategory, setActiveCategory] = useState("New");

  const FILTERS = [
    "All",
    "Fruits",
    "Vegetables",
    "Household",
    "Proteins",
    "Dairy",
  ];

  const COMMODITIES = [
    {
      image: "/images/timeline/meat.png",
      name: "Meat",
      price: "#800",
      bangos: "1,247 Bangos",
      category: "Households",
      quantity: "Per Kg",
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
      image: "/images/dashboard/egg.png",
      name: "Eggs",
      price: "#800",
      bangos: "1,247 Bangos",
      category: "Protein",
      quantity: "Per Crate",
      date: "Bango'd on 02/12/2025",
    },
    {
      image: "/images/timeline/ugu.png",
      name: "Milk",
      price: "#800",
      bangos: "1,247 Bangos",
      category: "Protein",
      quantity: "Per Mudu",
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
      image: "/images/timeline/potato.png",
      name: "Potato",
      price: "#300",
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
      image: "/images/timeline/plantain.png",
      name: "Plantain",
      price: "#5000",
      bangos: "1,247 Bangos",
      category: "Grain",
      quantity: "Per bunch",
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

  const getShuffledCommodities = (category: string) => {
    const copy = [...COMMODITIES];

    switch (category) {
      case "Trending":
        return copy.reverse();

      case "Most Bango'd":
        return [...copy.slice(3), ...copy.slice(0, 3)];

      case "For You":
        return [...copy.slice(5), ...copy.slice(0, 5)];

      default: // "New"
        return copy;
    }
  };

  return (
    <>
      <div className="py-10 px-20 flex flex-col gap-4 w-full ">
        <h1 className="font-bold text-3xl">Welcome Back, Rose!</h1>
        <Input
          type="text"
          placeholder="Search for prices, markets...."
          // name="password"
          // value={formData.password}
          // onChange={handleChange}
          className="w-full"
        />
        <div className="flex gap-3 w-full ">
          <div className="form h-fit pb-20 w-[20%] ">
            <h3>Filter by</h3>
            {FILTERS.map((filter, index) => (
              <div>
                <div className="flex  " key={index}>
                  <input type="checkbox" name="" id="" /> <p className="ml-3" >{filter}</p>{" "}
                </div>
              </div>
            ))}
          </div>

          <div className="w-[80%]" >
            <div className="bg-[#5C32D0] w-full text-white rounded-lg  h-60 p-10 ">
              <h3 className="text-2xl font-semibold">Discover real prices</h3>
              <h4 className=" my-6 ">
                Crowdsourced prices from across Nigeria
              </h4>
              <SecondaryButton
                text="Explore Timeline"
                // onClick={handleGoogleSignIn}
                // iconSrc="/images/on-boarding/google-icon.svg"
                className=" text-[#5C32D0] "
              />
            </div>
            {/* categories */}
            <div className="flex justify-between">
              {CATEGORIES.map((category, index) => {
                const isActive = activeCategory === category;

                return (
                  <div
                    key={index}
                    onClick={() => setActiveCategory(category)}
                    className={`text-center bg-white flex px-4 py-2 cursor-pointer rounded-lg border-b-2 transition
          ${
            isActive
              ? "border-[#1E1E1E] font-semibold"
              : "border-transparent hover:border-gray-300"
          }`}
                  >
                    <h3>{category}</h3>
                  </div>
                );
              })}
            </div>

            <div>
              {/* <div className="flex justify-between">
                <h4 className="text-2xl font-semibold">Trending Now</h4>
                <span>See all</span>
              </div> */}

              {/* trending commodities */}
              <div className="flex  justify-start flex-wrap my-5 gap-5 ">
                {getShuffledCommodities(activeCategory).map(
                  (commodity, index) => (
                    <div className="form w-lg  rounded-4xl p-0 mx-0 " key={index}>
                      <div>
                        <Image
                          src={commodity.image}
                          alt={commodity.name}
                          width={400}
                          height={146}
                          className="w-full "
                        />
                        {/* <div>
                  <p>Trending Now</p>
                </div>
                <div>
                  <p>{commodity.bangos}</p>
                </div> */}
                      </div>
                      <div className="flex flex-col gap-2 px-6 pb-6 w-full">
                        <div className="flex items-center justify-between font-semibold ">
                          <p className="text-[#1E1E1E] text-lg  ">
                            {commodity.name}
                          </p>
                          <p className="text-(--color-primary) text-2xl  ">
                            {commodity.price}
                          </p>
                        </div>
                        <div className="flex items-center justify-between text-[#757575] ">
                          <p>{commodity.category}</p>
                          <p>{commodity.quantity}</p>
                        </div>
                        <p className="text-[#757575]">{commodity.date}</p>
                        <div className="w-full flex gap-3 ">
                          <SecondaryButton
                            text="Insights"
                            // onClick={handleGoogleSignIn}
                            // iconSrc="/images/on-boarding/google-icon.svg"
                            className=" text-[#5C32D0] w-full "
                          />
                          <PrimaryButton
                            text="Bango this item"
                            // type="submit"
                            // loading={loading}
                            // loadingText="Signing In..."
                            className="w-full"
                          />
                        </div>
                      </div>
                    </div>
                  )
                )}
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
          </div>
        </div>
      </div>
    </>
  );
};
export default Timeline;
