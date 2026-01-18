"use client";

import Input from "../form/Input";
import SecondaryButton from "../../components/ui/SecondaryButton";
import PrimaryButton from "../../components/ui/PrimaryButton";
import Image from "next/image";
import SearchInput from "../../components/ui/SearchInput";
import { useRouter } from "next/navigation";
import { useRef, useState, useEffect, useContext } from "react";
import authApi from "../../utils/api";
import CommodityCard from "../../components/CommodityCard";
import { AuthContext } from "../../context/AuthContext";
import toast from "react-hot-toast";

type Commodity = {
  id?: string;
  photoUrl?: string;
  commodityName?: string;
  price?: string;
  bangos?: string;
  category?: string;
  quantity?: string;
  purchaseDate?: string;
  market?: string;
  location?: string;
};

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
  const [selectedCommodity, setSelectedCommodity] = useState<Commodity | null>(
    null,
  );
  const [pageUrl, setPageUrl] = useState("");

  const getCommodityShareLink = (id: string) =>
    `${window.location.origin}/timeline/${id}`;

  useEffect(() => {
    if (!selectedCommodity?.id || typeof window === "undefined") return;
    const shortUrl = `${window.location.origin}/s/${selectedCommodity.id}`;
    setPageUrl(shortUrl);
  }, [selectedCommodity?.id]);

  const shareHandlers = {
    whatsapp: () => {
      if (!selectedCommodity) return;

      const message = `Check out this price! 🛒

*${selectedCommodity.commodityName}*
💰 ₦${Number(selectedCommodity.price).toLocaleString()}
📍 ${selectedCommodity.market}, ${selectedCommodity.location}
📦 ${selectedCommodity.quantity}

${pageUrl}`;

      window.open(
        `https://wa.me/?text=${encodeURIComponent(message)}`,
        "_blank",
      );
    },

    facebook: () => {
      window.open(
        `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`,
        "_blank",
      );
    },

    x: () => {
      if (!selectedCommodity) return;

      const tweetText = `Check out ${selectedCommodity.commodityName} at ₦${Number(selectedCommodity.price).toLocaleString()} in ${selectedCommodity.location}! 🛒`;

      window.open(
        `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}&url=${encodeURIComponent(pageUrl)}`,
        "_blank",
      );
    },

    email: () => {
      if (!selectedCommodity) return;

      const subject = `Check out this price: ${selectedCommodity.commodityName}`;
      const body = `Hey!

I found this price on Bango:

Product: ${selectedCommodity.commodityName}
Price: ₦${Number(selectedCommodity.price).toLocaleString()}
Location: ${selectedCommodity.market}, ${selectedCommodity.location}
Quantity: ${selectedCommodity.quantity}

View details: ${pageUrl}

Shared via Bango - Crowdsourced prices from across Nigeria`;

      window.open(
        `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,
        "_blank",
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

  useEffect(() => {
    if (searchQuery.trim().length === 0) {
      setSearchResults([]);
      setIsSearching(false);
      setSearchError(null);
      return;
    }

    if (searchQuery.trim().length < 2) {
      return;
    }

    const timeoutId = setTimeout(async () => {
      try {
        setIsSearching(true);
        setSearchError(null);

        const response = await authApi.get(
          `/search?query=${encodeURIComponent(searchQuery)}`,
        );

        setSearchResults(response?.data?.entity?.items ?? []);
      } catch (err: any) {
        console.error("Search error:", err);
        setSearchError(
          err.response?.data?.message || "Unable to search prices",
        );
      } finally {
        setIsSearching(false);
      }
    }, 500);

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
    navigator.clipboard
      .writeText(pageUrl)
      .then(() => {
        toast.success("Link copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy link:", err);
        toast.error("Failed to copy link");
      });
  };

  const handleOpenShare = (commodity: Commodity) => {
    setSelectedCommodity(commodity);
    setShowDialog(true);
  };

  const handleCloseShare = () => {
    setShowDialog(false);
    setSelectedCommodity(null);
  };

  const handleClick = () => {
    router.push("/form/step-1");
  };

  const handleView = (commodity: Commodity) => {
    router.push(`timeline/${commodity.id}`);
  };

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

        {/* Share Dialog */}
        {showDialog && selectedCommodity && (
          <div className="fixed inset-0 flex justify-center items-center bg-black/40 z-50">
            <div className="flex flex-col justify-center items-center form border border-(--color-primary) rounded-md p-6 bg-[#FAFAFE] sm:w-xl w-[90%]">
              <div className="flex items-center justify-center w-full relative">
                <h3 className="text-(--color-primary) sm:text-2xl text-lg font-bold">
                  Share this price
                </h3>

                <Image
                  src="/images/insights/cancel-icon.svg"
                  alt="cancel icon"
                  width={14}
                  height={14}
                  className="absolute right-1 cursor-pointer hover:opacity-70"
                  onClick={handleCloseShare}
                />
              </div>
              <hr className="w-full text-(--color-primary)" />

              {/* Product Info in Share Dialog */}
              <div className="my-4 text-center">
                <p className="font-semibold text-lg">
                  {selectedCommodity.commodityName}
                </p>
                <p className="text-2xl font-bold text-(--color-primary)">
                  ₦{Number(selectedCommodity.price).toLocaleString()}
                </p>
                <p className="text-sm text-gray-600">
                  {selectedCommodity.market}, {selectedCommodity.location}
                </p>
              </div>

              <div className="flex w-full justify-center">
                {SOCIALS_ICONS.map((social, index) => (
                  <div
                    key={index}
                    className="justify-evenly mx-2 w-full flex flex-col"
                  >
                    <div className="flex items-center justify-evenly my-3 cursor-pointer w-full">
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
                    <p className="flex text-xs sm:text-sm md:text-base items-center justify-evenly my-3 cursor-pointer w-full">
                      {social.label}
                    </p>
                  </div>
                ))}
              </div>

              <div className="border flex rounded-md items-center p-2 justify-between w-full border-[#757575] bg-[#F5F5F5]">
                <p
                  className="text-[#B3B3B3] sm:text-base text-xs flex-1 truncate px-2"
                  ref={linkRef}
                >
                  {pageUrl}
                </p>

                <PrimaryButton
                  text="Copy"
                  className="rounded-xl h-10 px-4 sm:text-sm text-xs text-white"
                  onClick={handleCopyLink}
                />
              </div>
            </div>
          </div>
        )}

        <div className="flex gap-3 w-full">
          <div className="w-full">
            <div className="bg-[#5C32D0] w-full text-white rounded-lg h-60 p-10">
              <h3 className="sm:text-2xl text-lg font-semibold">
                Discover real prices
              </h3>
              <h4 className="my-6">Crowdsourced prices from across Nigeria</h4>
              <SecondaryButton
                text="Submit Price"
                onClick={handleClick}
                className="text-[#5C32D0] w"
              />
            </div>

            <div className="flex flex-col justify-between">
              {/* SEARCH MODE */}
              {searchQuery.trim().length > 0 ? (
                <>
                  <h3 className="text-xl font-semibold mt-6">
                    Search results for "{searchQuery}"
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
                        onShare={() => handleOpenShare(commodity)}
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
                    <div className="flex w-full justify-start flex-wrap my-5 gap-2">
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
                          onShare={() => handleOpenShare(commodity)}
                          onView={() => handleView(commodity)}
                        />
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Timeline;
