"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { db, Commodity } from "../../../lib/db";
import Image from "next/image";
import InfoBox from "../../../components/ui/InfoBox";
import Link from "next/link";

const MobileFullDetails = () => {
  const params = useParams();
  const id = params.id;
  const [product, setProduct] = useState<Commodity | null>(null);
  const [averagePrice, setAveragePrice] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  //  Utility to clean and convert price strings to numbers
  const parsePrice = (price: unknown): number => {
    if (price === null || price === undefined) return 0;
    const cleaned = String(price).replace(/[^0-9.]/g, "");
    const num = parseFloat(cleaned);
    return isNaN(num) ? 0 : num;
  };

  //  Normalize strings for case-insensitive comparison
  const normalize = (str: string | undefined | null) =>
    (str || "").trim().toLowerCase().replace(/\s+/g, " ");

  useEffect(() => {
    const fetchProduct = async () => {
      if (id) {
        const result = await db.commodities.get(Number(id));
        setProduct(result || null);

        if (result) {
          const allCommodities = await db.commodities.toArray();

          // Match commodities by name + quantity (case-insensitive)
          const targetName = normalize(result.commodityName);
          const targetQty = normalize(result.quantity);

          const similarCommodities = allCommodities.filter(
            (item) =>
              normalize(item.commodityName) === targetName &&
              normalize(item.quantity) === targetQty
          );

          // Compute average price
          if (similarCommodities.length > 0) {
            const total = similarCommodities.reduce(
              (sum, item) => sum + parsePrice(item.price),
              0
            );
            const avg = Math.round(total / similarCommodities.length);
            setAveragePrice(avg);
          } else {
            setAveragePrice(null);
          }
        }

        setLoading(false);
      } else {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  if (!product) {
    return <div className="p-6">Product not found.</div>;
  }

  return (
    <div className="flex flex-col sm:flex-row sm:shadow-none shadow-md p-5 w-full">
      <Link href="/search-result/grid-view">
        <div className="flex justify-start items-center mb-6 cursor-pointer gap-2 w-fit">
          <Image
            src="/images/form/arrow-left.svg"
            alt="Back arrow"
            width={24}
            height={24}
          />
          <span className="z-10">Back</span>
        </div>
      </Link>

      <div className="sm:flex items-center justify-center">
        <div>
          {product.image && (
            <Image
              src={
                typeof product.image === "string"
                  ? product.image
                  : URL.createObjectURL(product.image)
              }
              alt="Image of a commodity"
              width={504}
              height={470}
              className="rounded-lg object-cover"
            />
          )}
        </div>

        <div className="bg-white rounded-lg p-6 space-y-4 w-full lg:w-2xl">
          <h2 className="text-2xl font-bold text-[#1E1E1E]">
            {product.commodityName}
          </h2>

          <div className="flex-col items-baseline gap-2 sm:flex hidden">
            <p className="text-base font-semibold text-[#4D3594] p-1.5 bg-[#E2D8FF] rounded-md">
              Price
            </p>
            <p className="text-4xl text-[#1E1E1E] font-bold">
              ₦{parsePrice(product.price).toLocaleString()}
            </p>
          </div>

          <p className="text-base text-[#757575] font-medium">
            Submitted: {product.date}
          </p>

          <div className="items-center justify-between mb-4 flex w-full">
            <div>
              <p className="submission-key">Name of Seller</p>
              <p className="submission-value">{product.sellerName}</p>
            </div>
            <div>
              <p className="submission-key">Seller’s Phone number</p>
              <p className="submission-value">{product.phone}</p>
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
                ₦{parsePrice(product.price).toLocaleString()}
              </p>
            </div>
          </div>

          <div className="items-center justify-between mb-4 flex">
            <div>
              <p className="submission-key">Market</p>
              <p className="submission-value">{product.marketName}</p>
            </div>
            <div>
              <p className="submission-key">Quantity</p>
              <p className="submission-value">{product.quantity}</p>
            </div>
          </div>

          {/* Average Price Section (Now Matches Grid/List) */}
          {averagePrice !== null && (
            <div className="items-center justify-between mb-4 flex">
              <div>
                <p className="submission-key">Average Price</p>
                <p className="submission-value">
                  ₦{averagePrice.toLocaleString()}
                </p>
              </div>
            </div>
          )}

          <InfoBox />
        </div>
      </div>
    </div>
  );
};

export default MobileFullDetails;
