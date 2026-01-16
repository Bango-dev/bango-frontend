"use client";

// import { usePathname } from "next/navigation";
import { useEffect, useState, useMemo, useRef } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import InfoBox from "../../../../components/ui/InfoBox";
import Link from "next/link";
import api from "../../../../utils/api";
import { Commodity } from "../../../../lib/types/commodities";
// import { IoCopyOutline } from "react-icons/io5";
import useAveragePrices from "../../../../components/utils/useAveragePrice";
import { IoShareSocialSharp } from "react-icons/io5";
import PrimaryButton from "../../../../components/ui/PrimaryButton";

const MobileFullDetails = () => {
  const [pageUrl, setPageUrl] = useState("");
  const { id } = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [product, setProduct] = useState<Commodity>(null);
  const [loading, setIsLoading] = useState(true);
  const [showDialog, setShowDialog] = useState(false);
  const linkRef = useRef<HTMLParagraphElement>(null);

  // Build back URL based on search params
  const getBackUrl = () => {
    const queryString = searchParams.toString();
    const querySuffix = queryString ? `?${queryString}` : "";
    // Default to list-view, or use grid-view if specified in params
    const viewType = searchParams.get("viewType") || "list-view";
    return `/search-result/${viewType}${querySuffix}`;
  };

  const SHARE_MESSAGE = encodeURIComponent(
    `Hey! Check out this price on Bango 👇\n${pageUrl}`
  );

  const shareHandlers = {
    whatsapp: () => {
      window.open(`https://wa.me/?text=${SHARE_MESSAGE}`, "_blank");
    },

    facebook: () => {
      window.open(
        `https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`,
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
      const subject = encodeURIComponent(
        "Check prices of commodities on Bango"
      );
      const body = encodeURIComponent(
        `Hey! Check out this price on Bango, \n${pageUrl}`
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

  useEffect(() => {
    if (!id || typeof window === "undefined") return;

    const shortUrl = `${window.location.origin}/p/${id}`;
    setPageUrl(shortUrl);
  }, [id]);

  const memoizedProductArray = useMemo(
    () => (product ? [product] : []),
    [product]
  );

  const { averagePrices, isLoading: avgLoading } = useAveragePrices(
    memoizedProductArray,
    product?.location || "",
    product?.market || ""
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!id) return;

        setIsLoading(true);

        // Fetch single submission
        const res = await api.get(`/submissions/${id}`);
        const submission = res.data?.entity;
        console.log(submission);
        setProduct(submission || null);
      } catch (err) {
        console.error(err);
        setProduct(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading)
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

  if (!product) return <div className="p-6">Submission not found.</div>;

  // const handleCopy = async () => {
  //   const fullUrl = `${window.location.origin}${pathname}`;

  //   await navigator.clipboard.writeText(fullUrl);
  //   alert("Link copied!");
  // };

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

  const normalize = (val: string) =>
    val.trim().toLowerCase().replace(/\s+/g, " ");

  return (
    <div className="flex flex-col  sm:shadow-none shadow-md p-5 w-full ">
      <div className=" w-full flex justify-between items-center mb-5 ">
        <Link href={getBackUrl()}>
          <div className="flex justify-start items-center  cursor-pointer gap-2 w-fit">
            <Image
              src="/images/form/arrow-left.svg"
              alt="Back arrow"
              width={24}
              height={24}
            />
            <span>Back</span>
          </div>
        </Link>

        {/* <IoCopyOutline className="h-6 w-6" onClick={handleCopy} /> */}
        <IoShareSocialSharp
          className="h-6 w-6"
          onClick={() => setShowDialog(!showDialog)}
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
                src="/images/display/cancel-icon.svg"
                alt="cancel icon"
                width={14}
                height={14}
                className=" absolute right-1 enable-hover-cursor cursor-pointer  "
                onClick={() => setShowDialog(!showDialog)}
              />
            </div>
            <hr className="w-full text-(--color-primary) " />

            <div className="flex w-full justify-center">
              {SOCIALS_ICONS.map((social, index) => (
                <div
                  key={index}
                  className=" justify-evenly mx-2  w-full flex flex-col "
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
                  <p className="flex text-xs sm:text-sm md:text-base items-center justify-evenly  my-3 cursor-pointer w-full">
                    {social.label}
                  </p>
                </div>
              ))}
            </div>

            <div className="border flex rounded-md items-center p-2 justify-between w-full border-[#757575] bg-[#F5F5F5]">
              <p
                className="text-[#B3B3B3] sm:text-base text-[0.55rem]"
                ref={linkRef}
              >
                {pageUrl}
              </p>

              <PrimaryButton
                text="Copy Link"
                className="rounded-xl h-12 p-0  w-[30%] sm:text-sm text-[0.55rem]  text-white  "
                onClick={handleCopyLink}
              />
            </div>
          </div>
        </div>
      )}

      <div className="sm:flex items-center justify-center  ">
        {/* IMAGE (left) - reserve the same width even if image missing */}
        <div className="w-full sm:w-64 md:w-72 shrink-0 ">
          {product.photoUrl ? (
            <Image
              src={product.photoUrl}
              alt={product.commodityName}
              width={504} // intrinsic size — kept for Next/Image optimization
              height={470}
              className="object-contain w-full h-96  md:w-72  rounded-md"
            />
          ) : (
            // placeholder keeps the text aligned to the right
            <div className="w-40 h-40 sm:w-48 sm:h-48 md:w-72 md:h-72 bg-gray-100 rounded-md flex items-center justify-center">
              <span className="md:text-lg sm:text-base text-sm  text-gray-400">
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

          {/* Dates */}
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
              <p className="submission-key">Seller’s Phone Number</p>
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

          {/* Average Price  */}
          <div className="items-center justify-between mb-4 flex">
            <div>
              <p className="submission-key">Average Price</p>
              {(() => {
                const avgKey = `${normalize(product.commodityName)}-${normalize(
                  product.quantity
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
              <p className="submission-value">{product.viewCount}</p>
            </div>
          </div>

          <InfoBox />
        </div>
      </div>
    </div>
  );
};

export default MobileFullDetails;
