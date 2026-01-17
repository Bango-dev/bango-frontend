"use client";


import SecondaryButton from "../ui/SecondaryButton";
import Image from "next/image";
import SearchInput from "../ui/SearchInput";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import authApi from "../../utils/api";
import CommodityCard from "../CommodityCard";



const LandingPage = () => {
  const router = useRouter();
  // const METRICS = [
  //   {
  //     metric_title: "Total Bangos",
  //     metric_value: "5000+",
  //   },
  //   {
  //     metric_title: "Products",
  //     metric_value: "847",
  //   },
  //   {
  //     metric_title: "Markets",
  //     metric_value: "156",
  //   },
  // ];

  // const TRENDING_COMMODITIES = [
  //   {
  //     image: "/images/dashboard/groundnut_oil.png",
  //     name: "Ground Oil",
  //     price: "#800",
  //     bangos: "1,247 Bangos",
  //     category: "Households",
  //     quantity: "Per Kg",
  //     date: "Bango'd on 02/12/2025",
  //   },
  //   {
  //     image: "/images/dashboard/egg.png",
  //     name: "Eggs",
  //     price: "#800",
  //     bangos: "1,247 Bangos",
  //     category: "Protein",
  //     quantity: "Per Crate",
  //     date: "Bango'd on 02/12/2025",
  //   },
  //   {
  //     image: "/images/dashboard/yam.png",
  //     name: "Yam",
  //     price: "#1500",
  //     bangos: "1,247 Bangos",
  //     category: "Tuber",
  //     quantity: "Per Pcs",
  //     date: "Bango'd on 02/12/2025",
  //   },
  //   {
  //     image: "/images/dashboard/rice.png",
  //     name: "Rice",
  //     price: "#25000",
  //     bangos: "1,247 Bangos",
  //     category: "Grain",
  //     quantity: "Per bag",
  //     date: "Bango'd on 02/12/2025",
  //   },
  //   {
  //     image: "/images/dashboard/beans.png",
  //     name: "Beans",
  //     price: "#800",
  //     bangos: "1,247 Bangos",
  //     category: "Grain",
  //     quantity: "Per kg",
  //     date: "Bango'd on 02/12/2025",
  //   },
  //   {
  //     image: "/images/dashboard/yam.png",
  //     name: "Yam",
  //     price: "#1500",
  //     bangos: "1,247 Bangos",
  //     category: "Tuber",
  //     quantity: "Per Pcs",
  //     date: "Bango'd on 02/12/2025",
  //   },
  //   {
  //     image: "/images/dashboard/egg.png",
  //     name: "Eggs",
  //     price: "#800",
  //     bangos: "1,247 Bangos",
  //     category: "Protein",
  //     quantity: "Per Crate",
  //     date: "Bango'd on 02/12/2025",
  //   },
  //   {
  //     image: "/images/dashboard/groundnut_oil.png",
  //     name: "Ground Oil",
  //     price: "#800",
  //     bangos: "1,247 Bangos",
  //     category: "Households",
  //     quantity: "Per Kg",
  //     date: "Bango'd on 02/12/2025",
  //   },
  //   {
  //     image: "/images/dashboard/rice.png",
  //     name: "Rice",
  //     price: "#25000",
  //     bangos: "1,247 Bangos",
  //     category: "Grain",
  //     quantity: "Per bag",
  //     date: "Bango'd on 02/12/2025",
  //   },
  // ];

  const [commodities, setCommodities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        setLoading(true);
        const res = await authApi.get("/timeline?page=1&limit=9");
        setCommodities(res?.data?.entity?.items ?? []);
      } catch (err: any) {
        setError(
          err.response?.data?.message || "Unable to load trending prices"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchTrending();
  }, []);


  const handleClick = () => {
    // Navigate to the timeline page
    router.push("/login");
  }
 const handleFocus = () => {
   router.push("/login");
 };
  return (
    <div className="py-10 md:px-20 px-5 flex flex-col gap-4 w-full ">
      <h1 className="font-bold text-3xl">Welcome!</h1>

      <SearchInput
        placeholder="Search for prices, markets...."
        onClick={handleFocus}
      />
      <div className="bg-[#5C32D0] w-full text-white rounded-lg  h-60 p-10 ">
        <h3 className="sm:text-2xl text-lg font-semibold">
          Discover real prices
        </h3>
        <h4 className=" my-6 ">Crowdsourced prices from across Nigeria</h4>
        <SecondaryButton
          text="Explore Timeline"
          onClick={handleClick}
          // iconSrc="/images/on-boarding/google-icon.svg"
          className=" text-[#5C32D0] "
        />
      </div>

      {/* metrics */}
      {/* <div className=" flex md:flex-row flex-col gap-6 justify-between ">
        {METRICS.map((metric, index) => (
          <div className="text-center bg-white form " key={index}>
            <h3 className=" text-4xl text-(--color-primary)">
              {metric.metric_value}
            </h3>
            <h4 className="text-[#757575] text-base">{metric.metric_title}</h4>
          </div>
        ))}
      </div> */}

      <div>
        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            <Image
              src="/images/profile/black-chart.svg"
              alt="chart"
              width={26}
              height={17}
            />
            <h4 className="text-2xl font-semibold">Trending Now</h4>
          </div>
          <Link href="/login">
            <div className="flex items-center gap-2">
              <span>See all</span>
              <Image
                src="/images/dashboard/right-arrow.svg"
                alt="chart"
                width={7}
                height={12}
              />
            </div>
          </Link>
        </div>

        {/* trending commodities */}
        <div className="flex w-full flex-wrap my-5 gap-5 ">
          {loading && (
            <div className="w-full flex justify-center items-center py-10">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-(--color-primary)" />
            </div>
          )}

          {error && <p className="text-red-500">{error}</p>}

          {!loading && !error && commodities.length === 0 && (
            <p>No trending prices available</p>
          )}

          {commodities.map((commodity) => (
            <CommodityCard
              key={commodity.id}
              commodity={commodity}
              onShare={handleClick}
              onView={handleClick}
            />
          ))}
        </div>
      </div>

      {/* <div className="flex justify-between bg-[#DFE0FF] p-5 rounded-2xl ">
        <div>
          <h4 className="font-semibold text-[#4B2CA9] text-2xl ">
            Your Location: Abuja
          </h4>
          <p className="text-[#757575]">See prices near you</p>
        </div>
        <SecondaryButton
          text="Change Location"
          onClick={handleGoogleSignIn}
          iconSrc="/images/on-boarding/google-icon.svg"
        />
      </div> */}
    </div>
  );
};
export default LandingPage;
