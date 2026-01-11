"use client";

import Input from "../form/Input";
import SecondaryButton from "../../components/ui/SecondaryButton";
import PrimaryButton from "../../components/ui/PrimaryButton";
import Image from "next/image";
// import Button from "../../components/ui/Button";
import SearchInput from "../../components/ui/SearchInput";
import { useRouter } from "next/navigation";
// import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import authApi from "../../utils/api";
import CommodityCard from "../../components/CommodityCard";


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
const REFERRAL_LINK = "https://bango.app/r/7F3K9Q2PBFCEJDBIJSCBHYSBJC/";

const SHARE_MESSAGE = encodeURIComponent(
  `Hey! Join me on Bango Market Day 👇\n${REFERRAL_LINK}`
);

const SHARE_PRICE = encodeURIComponent(`"Eggs Bango'd today at ₦2500/crate"`);

const sharePriceHandlers = {
  whatsapp: () => {
    window.open(`https://wa.me/?text=${SHARE_PRICE}`, "_blank");
  },

  x: () => {
    window.open(
      `https://twitter.com/messages/compose?text=${SHARE_PRICE}`,
      "_blank"
    );
  },

  telegram: () => {
    const PAGE_URL = encodeURIComponent(window.location.href);
    const SHARE_TEXT = encodeURIComponent(
      `"Eggs Bango'd today at ₦2500/crate"`
    );

    const appUrl = `https://t.me/share/url?url=${PAGE_URL}&text=${SHARE_TEXT}`;
    const webUrl = `https://web.telegram.org/k/#/share?url=${PAGE_URL}&text=${SHARE_TEXT}`;

    // Try opening the app
    window.location.href = appUrl;

    // Fallback to web after 1 second
    setTimeout(() => {
      window.location.href = webUrl;
    }, 1000);
  },
};

const shareHandlers = {
  whatsapp: () => {
    window.open(`https://wa.me/?text=${SHARE_MESSAGE}`, "_blank");
  },

  facebook: () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${REFERRAL_LINK}`,
      "_blank"
    );
  },

  x: () => {
    // Opens DM inbox where user selects recipient
    window.open(
      `https://twitter.com/messages/compose?text=${SHARE_MESSAGE}`,
      "_blank"
    );
  },

  email: () => {
    const subject = encodeURIComponent("Join me on Market Day");
    const body = encodeURIComponent(
      `Hey,\n\nJoin me on Market Day using this link:\n${REFERRAL_LINK}`
    );

    // Gmail app → Gmail web fallback
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
    onClick: shareHandlers.whatsapp,
  },
  {
    icon: "/images/insights/facebook-logo.svg",
    label: "Facebook",
    onClick: shareHandlers.facebook,
  },
  {
    icon: "/images/insights/x-logo.svg",
    label: "X",
    onClick: shareHandlers.x,
  },
  {
    icon: "/images/insights/email-icon.svg",
    label: "Email",
    onClick: shareHandlers.email,
  },
];

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
    router.push("/submit-price");
  };
  //  const handleFocus = () => {
  //    router.push("/search");
  //  };
  return (
    <>
        <div className="py-10 px-20 flex flex-col gap-4 w-full ">
          <h1 className="font-bold text-3xl">Welcome Back!</h1>

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
                  Share your referral link and get points every time someone
                  signs up through you. The more people you bring in, the
                  smarter the market becomes, for everyone.
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
                    className="text-[#B3B3B3] sm:text-base text-[0.55rem]    "
                    ref={linkRef}
                  >
                    https://bango.app/r/7F3K9Q2PBFCEJDBIJSCBHYSBJC/
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
                <h3 className="text-2xl font-semibold">Discover real prices</h3>
                <h4 className=" my-6 ">
                  Crowdsourced prices from across Nigeria
                </h4>
                <SecondaryButton
                  text="Submit Price"
                  onClick={handleClick}
                  // iconSrc="/images/on-boarding/google-icon.svg"
                  className=" text-[#5C32D0] "
                />
              </div>
              {/* categories */}
              <div className="flex justify-between">
                {/* SEARCH MODE */}
                {searchQuery.trim().length > 0 ? (
                  <>
                    <h3 className="text-xl font-semibold mt-6">
                      Search results for “{searchQuery}”
                    </h3>

                    {isSearching && <p>Searching...</p>}

                    {searchError && (
                      <p className="text-red-500">{searchError}</p>
                    )}

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
                          onShare={() => setShowDialog(true)}
                          onView={handleClick}
                        />
                      ))}
                    </div>
                  </>
                ) : (
                  <>
                    {/* NORMAL TIMELINE MODE */}

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
                    <div className="flex justify-start flex-wrap my-5 gap-5">
                      {isLoading && <p>Loading prices...</p>}
                      {error && <p className="text-red-500">{error}</p>}
                      {!isLoading && !error && commodities.length === 0 && (
                        <p>No prices available</p>
                      )}

                      {commodities.map((commodity) => (
                        <CommodityCard
                          key={commodity.id}
                          commodity={commodity}
                          onShare={() => setShowDialog(true)}
                          onView={handleClick}
                        />
                      ))}
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
