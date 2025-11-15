"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import InfoBox from "../../../components/ui/InfoBox";
import Link from "next/link";
import api from "../../../utils/api";
import { Commodity } from "../../../lib/types/commodities";

const MobileFullDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Commodity>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!id) return;

        setLoading(true);

        // Fetch single submission
        const res = await api.get(`/submissions/${id}`);
        const submission = res.data?.data;

        setProduct(submission || null);
      } catch (err) {
        console.error(err);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) return <div className="p-6">Loading...</div>;

  if (!product) return <div className="p-6">Submission not found.</div>;

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
          <span>Back</span>
        </div>
      </Link>

      <div className="sm:flex items-center justify-center">
        <div>
          {/* Photo */}
          {product.photoUrl && (
            <Image
              src={product.photoUrl}
              alt={product.commodityName}
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
            Submitted: {new Date(product.createdAt).toLocaleDateString()}
          </p>

          <div className="items-center justify-between mb-4 flex w-full">
            <div>
              <p className="submission-key">Name of Seller</p>
              <p className="submission-value">{product.sellerName || "—"}</p>
            </div>
            <div>
              <p className="submission-key">Seller’s Phone Number</p>
              <p className="submission-value">{product.phone || "—"}</p>
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

          {/* Average Price (temporarily N/A) */}
          <div className="items-center justify-between mb-4 flex">
            <div>
              <p className="submission-key">Average Price</p>
              <p className="submission-value">N/A</p>
            </div>
          </div>

          <InfoBox />
        </div>
      </div>
    </div>
  );
};

export default MobileFullDetails;
