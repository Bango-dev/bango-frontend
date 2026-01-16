"use client";

import Input from "../form/Input";
import SecondaryButton from "../../components/ui/SecondaryButton";
import PrimaryButton from "../../components/ui/PrimaryButton";
import Image from "next/image";
// import Button from "../../components/ui/Button";
import SearchInput from "../../components/ui/SearchInput";
import { useRouter } from "next/navigation";
// import Link from "next/link";
import { useRef, useState, useEffect, useContext } from "react";
import authApi from "../../utils/api";
import CommodityCard from "../../components/CommodityCard";
import { AuthContext } from "../../context/AuthContext";

type Commodity = {
  id?: string;
  photoUrl?: string;
  commodityName?: string;
  price?: string;
  bangos?: string;
  category?: string;
  quantity?: string;
  purchaseDate?: string;
};
// const REFERRAL_LINK = "https://bango.app/r/7F3K9Q2PBFCEJDBIJSCBHYSBJC/";

// const SHARE_MESSAGE = encodeURIComponent(
//   `Hey! Join me on Bango Market Day 👇\n${REFERRAL_LINK}`
// );

// const SHARE_PRICE = encodeURIComponent(`"Eggs Bango'd today at ₦2500/crate"`);

// const sharePriceHandlers = {
//   whatsapp: () => {
//     window.open(`https://wa.me/?text=${SHARE_PRICE}`, "_blank");
//   },

//   x: () => {
//     window.open(
//       `https://twitter.com/messages/compose?text=${SHARE_PRICE}`,
//       "_blank"
//     );
//   },

//   telegram: () => {
//     const PAGE_URL = encodeURIComponent(window.location.href);
//     const SHARE_TEXT = encodeURIComponent(
//       `"Eggs Bango'd today at ₦2500/crate"`
//     );

//     const appUrl = `https://t.me/share/url?url=${PAGE_URL}&text=${SHARE_TEXT}`;
//     const webUrl = `https://web.telegram.org/k/#/share?url=${PAGE_URL}&text=${SHARE_TEXT}`;

//     // Try opening the app
//     window.location.href = appUrl;

//     // Fallback to web after 1 second
//     setTimeout(() => {
//       window.location.href = webUrl;
//     }, 1000);
//   },
// };

const Timeline = () => {
  const CATEGORIES = ["New", "For You"];
  const [activeCategory, setActiveCategory] = useState("New");
  const router = useRouter();
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const linkRef = useRef<HTMLParagraphElement>(null);
  const [commodities, setCommodities] = useState<Commodity[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Commodity[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  const { user } = useContext(AuthContext);
  const [shareCommodityId, setShareCommodityId] = useState<string | null>(null);

  const getCommodityShareLink = (id: string) =>
    `${window.location.origin}/timeline/${id}`;

  const shareHandlers = {
    whatsapp: (id: string) => {
      const link = encodeURIComponent(getCommodityShareLink(id));
      window.open(`https://wa.me/?text=${link}`, "_blank");
    },

    facebook: (id: string) => {
      const link = encodeURIComponent(getCommodityShareLink(id));
      window.open(
        `https://www.facebook.com/sharer/sharer.php?u=${link}`,
        "_blank"
      );
    },

    x: (id: string) => {
      const link = encodeURIComponent(getCommodityShareLink(id));
      window.open(
        `https://twitter.com/messages/compose?text=${link}`,
        "_blank"
      );
    },

    email: (id: string) => {
      const link = getCommodityShareLink(id);
      const subject = encodeURIComponent("Check this price on Bango");
      const body = encodeURIComponent(
        `Hey,\n\nCheck out this commodity price on Bango:\n${link}`
      );

      window.open(
        `https://mail.google.com/mail/?view=cm&fs=1&su=${subject}&body=${body}`,
        "_blank"
      );
    },
  };

  const SOCIALS_ICONS = [
    {
      icon: "/images/insights/whatsapp-logo.svg",
      label: "WhatsApp",
      onClick: () =>
        shareCommodityId && shareHandlers.whatsapp(shareCommodityId),
    },
    {
      icon: "/images/insights/facebook-logo.svg",
      label: "Facebook",
      onClick: () =>
        shareCommodityId && shareHandlers.facebook(shareCommodityId),
    },
    {
      icon: "/images/insights/x-logo.svg",
      label: "X",
      onClick: () => shareCommodityId && shareHandlers.x(shareCommodityId),
    },
    {
      icon: "/images/insights/email-icon.svg",
      label: "Email",
      onClick: () => shareCommodityId && shareHandlers.email(shareCommodityId),
    },
  ];

  // console.log("Timeline user", user)
  useEffect(() => {
    // Reset when search is cleared
    if (searchQuery.trim().length === 0) {
      setSearchResults([]);
      setIsSearching(false);
      setSearchError(null);
      return;
    }

    // Best practice: minimum characters
    if (searchQuery.trim().length < 2) {
      return;
    }

    const timeoutId = setTimeout(async () => {
      try {
        setIsSearching(true);
        setSearchError(null);

        const response = await authApi.get(
          `/search?query=${encodeURIComponent(searchQuery)}`
        );

        setSearchResults(response?.data?.entity?.items ?? []);
      } catch (err: any) {
        console.error("Search error:", err);
        setSearchError(
          err.response?.data?.message || "Unable to search prices"
        );
      } finally {
        setIsSearching(false);
      }
    }, 500); // debounce delay (500ms)

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  useEffect(() => {
    const fetchCommodities = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const endpoint =
          activeCategory === "For You"
            ? "/timeline?page=1&limit=16&tab=FOR_YOU"
            : "/timeline?page=1&limit=16";

        const response = await authApi.get(endpoint);
        console.log(response);
        // Axios puts response body in response.data
        setCommodities(response?.data?.entity?.items);
      } catch (err: any) {
        console.error("Fetch commodities error:", err);
        setError(err.response?.data?.message || "Unable to load prices");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCommodities();
  }, [activeCategory]);

  const handleCopyLink = () => {
    if (linkRef.current) {
      const textToCopy = linkRef.current.textContent || "";
      navigator.clipboard
        .writeText(textToCopy)
        .then(() => {
          alert("Link copied!");
        })
        .catch((err) => {
          console.error("Failed to copy link: ", err);
        });
    }
  };

  // const FILTERS = [
  //   "All",
  //   "Fruits",
  //   "Vegetables",
  //   "Household",
  //   "Proteins",
  //   "Dairy",
  // ];

  // const COMMODITIES = [
  //   {
  //     image: "/images/timeline/meat.png",
  //     name: "Meat",
  //     price: "#800",
  //     bangos: "1,247 Bangos",
  //     category: "Households",
  //     quantity: "Per Kg",
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
  //     image: "/images/dashboard/egg.png",
  //     name: "Eggs",
  //     price: "#800",
  //     bangos: "1,247 Bangos",
  //     category: "Protein",
  //     quantity: "Per Crate",
  //     date: "Bango'd on 02/12/2025",
  //   },
  //   {
  //     image: "/images/timeline/ugu.png",
  //     name: "Milk",
  //     price: "#800",
  //     bangos: "1,247 Bangos",
  //     category: "Protein",
  //     quantity: "Per Mudu",
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
  //     image: "/images/timeline/potato.png",
  //     name: "Potato",
  //     price: "#300",
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
  //     image: "/images/timeline/plantain.png",
  //     name: "Plantain",
  //     price: "#5000",
  //     bangos: "1,247 Bangos",
  //     category: "Grain",
  //     quantity: "Per bunch",
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

  // const getShuffledCommodities = (category: string) => {
  //   const copy = [...COMMODITIES];

  //   switch (category) {
  //     case "Trending":
  //       return copy.reverse();

  //     case "Most Bango'd":
  //       return [...copy.slice(3), ...copy.slice(0, 3)];

  //     case "For You":
  //       return [...copy.slice(5), ...copy.slice(0, 5)];

  //     default:
  //       return copy;
  //   }
  // };

  const handleClick = () => {
    // Navigate to the timeline page
    router.push("/form/step-1");
  };
  const handleView = (item: any) => {
    router.push(`/submissions/${item.id}`);
  };

  //  const handleFocus = () => {
  //    router.push("/search");
  //  };
  return (
    <>
      <div className="py-10 md:px-20 px-5 flex flex-col gap-4 w-full ">
        <h1 className="font-bold sm:text-3xl text-2xl">
          Welcome Back {user?.firstName || "User"}!
        </h1>

        <div>
          <SearchInput
            placeholder="Search for prices, markets...."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* dialog box */}
        {showDialog && (
          <div className=" fixed inset-0 flex justify-center items-center bg-black/40  z-50">
            <div className="flex flex-col  justify-center items-center form border border-(--color-primary)  rounded-md p-6  bg-[#FAFAFE]   sm:w-xl w-[90%]  ">
              <div className="flex items-center justify-center w-full relative ">
                <h3 className=" text-(--color-primary) sm:text-2xl text-lg font-bold ">
                  Invite your friends
                </h3>

                <Image
                  src="/images/insights/cancel-icon.svg"
                  alt="cancel icon"
                  width={14}
                  height={14}
                  className=" absolute right-1 enable-hover-cursor cursor-pointer  "
                  onClick={() => setShowDialog(!showDialog)}
                />
              </div>
              <hr className="w-full text-(--color-primary) " />

              <p className=" text-[#757575]  sm:text-base text-sm text-center">
                Share the link below to invite your friends to Bango
              </p>

              <div className="flex w-full justify-center">
                {SOCIALS_ICONS.map((social, index) => (
                  <div
                    key={index}
                    className=" justify-evenly w-full flex flex-col "
                  >
                    <div className="flex  items-center justify-evenly  my-3 cursor-pointer w-full  ">
                      <div
                        className="relative aspect-square w-[clamp(2.5rem,6vw,5.5rem)]"
                        onClick={social.onClick}
                      >
                        <Image
                          src={social.icon}
                          alt={social.label}
                          fill
                          className="object-contain"
                        />
                      </div>
                    </div>
                    <p className="flex text-xs sm:text-sm md:text-base  items-center justify-evenly  my-3 cursor-pointer w-full">
                      {social.label}
                    </p>
                  </div>
                ))}
              </div>

              <div className="border flex rounded-md items-center p-2 justify-between w-full border-[#757575] bg-[#F5F5F5]">
                <p
                  className="text-[#B3B3B3] sm:text-base text-[0.55rem] truncate   "
                  ref={linkRef}
                >
                  {getCommodityShareLink(shareCommodityId)}
                </p>

                <PrimaryButton
                  text="Copy Link"
                  className="rounded-xl h-8 p-0  w-[20%] sm:text-sm text-[0.55rem]  text-white  "
                  onClick={handleCopyLink}
                />
              </div>
            </div>
          </div>
        )}

        <div className="flex gap-3 w-full ">
          {/* <div className="form h-fit pb-20 w-[20%] ">
            <h3>Filter by</h3>
            {FILTERS.map((filter, index) => (
              <div>
                <div className="flex  " key={index}>
                  <input type="checkbox" name="" id="" />{" "}
                  <p className="ml-3">{filter}</p>{" "}
                </div>
              </div>
            ))}
          </div> */}

          <div className="w-full">
            <div className="bg-[#5C32D0] w-full text-white rounded-lg  h-60 p-10 ">
              <h3 className="sm:text-2xl text-lg font-semibold">
                Discover real prices
              </h3>
              <h4 className=" my-6 ">
                Crowdsourced prices from across Nigeria
              </h4>
              <SecondaryButton
                text="Submit Price"
                onClick={handleClick}
                // iconSrc="/images/on-boarding/google-icon.svg"
                className=" text-[#5C32D0] w "
              />
            </div>
            {/* categories */}
            <div className="flex flex-col justify-between">
              {/* SEARCH MODE */}
              {searchQuery.trim().length > 0 ? (
                <>
                  <h3 className="text-xl font-semibold mt-6">
                    Search results for “{searchQuery}”
                  </h3>

                  {isSearching && <p>Searching...</p>}

                  {searchError && <p className="text-red-500">{searchError}</p>}

                  {!isSearching &&
                    !searchError &&
                    searchResults.length === 0 && (
                      <p className="text-2xl font-semibold mt-20 text-center">
                        No results found
                      </p>
                    )}

                  <div className="flex justify-start flex-wrap my-5 gap-5">
                    {searchResults.map((commodity) => (
                      <CommodityCard
                        key={commodity.id}
                        commodity={commodity}
                        onShare={() => {
                          setShareCommodityId(commodity.id!);
                          setShowDialog(true);
                        }}
                        onView={() => handleView(commodity)}
                      />
                    ))}
                  </div>
                </>
              ) : (
                <>
                  {/* NORMAL TIMELINE MODE */}

                  <div className="flex flex-col w-full">
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

                    {/* timeline commodities */}
                    <div className="flex  w-full justify-start flex-wrap my-5 gap-2">
                      {isLoading && (
                        <div className="w-full flex justify-center items-center py-10">
                          <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-(--color-primary)" />
                        </div>
                      )}

                      {error && <p className="text-red-500">{error}</p>}
                      {!isLoading && !error && commodities.length === 0 && (
                        <p>No prices available</p>
                      )}

                      {commodities.map((commodity) => (
                        <CommodityCard
                          key={commodity.id}
                          commodity={commodity}
                          onShare={() => setShowDialog(true)}
                          onView={() => handleView(commodity)}
                        />
                      ))}
                    </div>
                  </div>
                </>
              )}
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
      </div>
      {/* </div> */}
    </>
  );
};
export default Timeline;
