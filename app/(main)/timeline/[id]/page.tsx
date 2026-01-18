// app/(main)/submissions/[id]/page.tsx
"use client";

import { useEffect, useState, useMemo, useRef } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import InfoBox from "../../../components/ui/InfoBox";
import Link from "next/link";
import authApi from "../../../utils/api"; // ✅ Changed from api
import { Commodity } from "../../../lib/types/commodities";
import useAveragePrices from "../../../utils/useAveragePrice";
import { IoShareSocialSharp } from "react-icons/io5";
import PrimaryButton from "../../../components/ui/PrimaryButton";
import toast from "react-hot-toast";

const SubmissionDetails = () => {
  const [pageUrl, setPageUrl] = useState("");
  const { id } = useParams();
  const [product, setProduct] = useState<Commodity | null>(null);
  const [loading, setLoading] = useState(true);
  const [showDialog, setShowDialog] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const linkRef = useRef<HTMLParagraphElement>(null);

  // ✅ Generate short URL
  useEffect(() => {
    if (!id || typeof window === "undefined") return;
    const shortUrl = `${window.location.origin}/s/${id}`;
    setPageUrl(shortUrl);
  }, [id]);

  // ✅ Enhanced share handlers with product info
  const shareHandlers = {
    whatsapp: () => {
      if (!product) return;

      const message = `Check out this price! 🛒

*${product.commodityName}*
💰 ₦${Number(product.price).toLocaleString()}
📍 ${product.market}, ${product.location}
📦 ${product.quantity}

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
      if (!product) return;

      const tweetText = `Check out ${product.commodityName} at ₦${Number(product.price).toLocaleString()} in ${product.location}! 🛒`;

      window.open(
        `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}&url=${encodeURIComponent(pageUrl)}`,
        "_blank",
      );
    },

    email: () => {
      if (!product) return;

      const subject = `Check out this price: ${product.commodityName}`;
      const body = `Hey!

I found this price on Bango:

Product: ${product.commodityName}
Price: ₦${Number(product.price).toLocaleString()}
Location: ${product.market}, ${product.location}
Quantity: ${product.quantity}

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
      icon: "/images/display/whatsapp-logo.svg",
      label: "WhatsApp",
      onClick: shareHandlers.whatsapp,
    },
    {
      icon: "/images/display/facebook-logo.svg",
      label: "Facebook",
      onClick: shareHandlers.facebook,
    },
    {
      icon: "/images/display/x-logo.svg",
      label: "X",
      onClick: shareHandlers.x,
    },
    {
      icon: "/images/display/email-icon.svg",
      label: "Email",
      onClick: shareHandlers.email,
    },
  ];

  const memoizedProductArray = useMemo(
    () => (product ? [product] : []),
    [product],
  );

  const { averagePrices, isLoading: avgLoading } = useAveragePrices(
    memoizedProductArray,
    product?.location || "",
    product?.market || "",
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!id) {
          setError("No submission ID provided");
          return;
        }

        setLoading(true);
        setError(null);

        const res = await authApi.get(`/submissions/${id}`);
        console.log("Submission response:", res);

        const submission = res.data?.entity || res.data?.data || res.data;
        console.log("Submission data:", submission);

        if (!submission) {
          throw new Error("No submission data in response");
        }

        setProduct(submission);
      } catch (err: any) {
        console.error("Fetch error:", err);

        if (err.response?.status === 429) {
          setError("Too many requests. Please wait and try again.");
        } else if (err.response?.status === 401) {
          setError("Please log in to view this submission");
        } else if (err.response?.status === 404) {
          setError("Submission not found");
        } else {
          setError(err.response?.data?.message || "Failed to load submission");
        }

        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

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

  const handleCopyDetails = () => {
    if (!product) return;

    const avgKey = `${normalize(product.commodityName)}-${normalize(
      product.quantity,
    )}`;
    const avgPrice = averagePrices[avgKey]
      ? `₦${averagePrices[avgKey].toLocaleString()}`
      : "No data";

    const detailsText = `
Commodity: ${product.commodityName}
Price: ₦${Number(product.price).toLocaleString()}
Location: ${product.location}
Market: ${product.market}
Quantity: ${product.quantity}
Seller Name: ${product.sellerName || "—"}
Seller Phone: ${product.sellerPhoneNumber || "—"}
Average Price: ${avgPrice}
Submitted by: ${product.BuyerName}
Date: ${new Date(product.createdAt).toLocaleDateString()}
Views: ${product.viewCount}

Link: ${pageUrl}
    `.trim();

    navigator.clipboard
      .writeText(detailsText)
      .then(() => {
        toast.success("Commodity details copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy details:", err);
        toast.error("Failed to copy details");
      });
  };

  const normalize = (val: string) =>
    val.trim().toLowerCase().replace(/\s+/g, " ");

  // ✅ Loading state
  if (loading) {
    return (
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
        <svg
          className="animate-spin h-15 w-15 text-white"
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
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          ></path>
        </svg>
      </div>
    );
  }

  // ✅ Error state
  if (error) {
    return (
      <div className="p-6 text-center">
        <p className="text-xl text-red-600 mb-4">{error}</p>
        <Link href="/timeline" className="text-(--color-primary) underline">
          Back to Timeline
        </Link>
      </div>
    );
  }

  // ✅ No product state
  if (!product) {
    return (
      <div className="p-6 text-center">
        <p className="text-xl text-gray-600 mb-4">Submission not found</p>
        <Link href="/timeline" className="text-(--color-primary) underline">
          Back to Timeline
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col sm:shadow-none shadow-md p-5 w-full">
      <div className="w-full flex justify-between items-center mb-5">
        <Link href="/timeline">
          <div className="flex justify-start items-center cursor-pointer gap-2 w-fit">
            <Image
              src="/images/form/arrow-left.svg"
              alt="Back arrow"
              width={24}
              height={24}
            />
            <span>Back to Timeline</span>
          </div>
        </Link>

        <div className="flex gap-3 items-center">
          <IoShareSocialSharp
            className="h-6 w-6 cursor-pointer hover:text-[#5C32D0] transition-colors"
            onClick={() => setShowDialog(!showDialog)}
            title="Share to social media"
          />
        </div>
      </div>

      {/* Share dialog */}
      {showDialog && (
        <div className="fixed inset-0 flex justify-center items-center bg-black/40 z-50">
          <div className="flex flex-col justify-center items-center form border border-(--color-primary) rounded-md p-6 bg-[#FAFAFE] sm:w-xl w-[90%]">
            <div className="flex items-center justify-center w-full relative">
              <h3 className="text-(--color-primary) sm:text-2xl text-lg font-bold">
                Share this price
              </h3>

              <Image
                src="/images/display/cancel-icon.svg"
                alt="cancel icon"
                width={14}
                height={14}
                className="absolute right-1 cursor-pointer"
                onClick={() => setShowDialog(!showDialog)}
              />
            </div>
            <hr className="w-full text-(--color-primary)" />

            {/* ✅ Product info in share dialog */}
            <div className="my-4 text-center">
              <p className="font-semibold text-lg">{product.commodityName}</p>
              <p className="text-2xl font-bold text-(--color-primary)">
                ₦{Number(product.price).toLocaleString()}
              </p>
              <p className="text-sm text-gray-600">
                {product.market}, {product.location}
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

      <div className="sm:flex items-center justify-center">
        {/* IMAGE */}
        <div className="w-full sm:w-64 md:w-72 shrink-0">
          {product.photoUrl ? (
            <Image
              src={product.photoUrl}
              alt={product.commodityName}
              width={504}
              height={470}
              className="object-contain w-full h-96 md:w-72 rounded-md"
            />
          ) : (
            <div className="w-40 h-40 sm:w-48 sm:h-48 md:w-72 md:h-72 bg-gray-100 rounded-md flex items-center justify-center">
              <span className="md:text-lg sm:text-base text-sm text-gray-400">
                No image
              </span>
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg p-6 space-y-4 w-full lg:w-xl">
          <h2 className="text-2xl font-bold text-[#1E1E1E]">
            {product.commodityName}
          </h2>

          {/* Price */}
          <div className="flex-col items-baseline gap-2 sm:flex hidden">
            <p className="text-base font-semibold text-[#4D3594] p-1.5 bg-[#E2D8FF] rounded-md">
              Price
            </p>
            <p className="text-4xl text-[#1E1E1E] font-bold">
              ₦{Number(product.price).toLocaleString()}
            </p>
          </div>

          {/* Submitted by */}
          <p className="text-base text-[#757575] font-medium">
            Submitted by {product.BuyerName} on{" "}
            {new Date(product.createdAt).toLocaleDateString()}
          </p>

          <div className="items-center justify-between mb-4 flex w-full">
            <div>
              <p className="submission-key">Name of Seller</p>
              <p className="submission-value">{product.sellerName || "—"}</p>
            </div>
            <div>
              <p className="submission-key">Seller's Phone Number</p>
              <p className="submission-value">
                {product.sellerPhoneNumber || "—"}
              </p>
            </div>
          </div>

          <div className="items-center justify-between mb-4 flex">
            <div>
              <p className="submission-key">Location</p>
              <p className="submission-value">{product.location}</p>
            </div>
            <div>
              <p className="submission-key">Price Paid</p>
              <p className="submission-value">
                ₦{Number(product.price).toLocaleString()}
              </p>
            </div>
          </div>

          <div className="items-center justify-between mb-4 flex">
            <div>
              <p className="submission-key">Market</p>
              <p className="submission-value">{product.market}</p>
            </div>
            <div>
              <p className="submission-key">Quantity</p>
              <p className="submission-value">{product.quantity}</p>
            </div>
          </div>

          {/* Average Price */}
          <div className="items-center justify-between mb-4 flex">
            <div>
              <p className="submission-key">Average Price</p>
              {(() => {
                const avgKey = `${normalize(product.commodityName)}-${normalize(
                  product.quantity,
                )}`;

                return (
                  <p className="submission-value">
                    {avgLoading
                      ? "Loading..."
                      : averagePrices[avgKey]
                        ? `₦${averagePrices[avgKey].toLocaleString()}`
                        : "No data"}
                  </p>
                );
              })()}
            </div>
            <div>
              <p className="submission-key">Views</p>
              <p className="submission-value">{product.viewCount || 0}</p>
            </div>
          </div>

          <InfoBox />
        </div>
      </div>
    </div>
  );
};

export default SubmissionDetails;
