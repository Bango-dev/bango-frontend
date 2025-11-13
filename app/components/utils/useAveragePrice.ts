"use client";

import { useEffect, useState } from "react";
import api from "../../utils/api"; // 👈 your axios instance

// Match backend response structure
export type ApiCommodity = {
  id: string;
  commodityName: string;
  price: number;
  quantity: number;
  unit: string;
  location: string;
  market: string;
  photoUrl?: string;
  purchaseDate?: string;
  createdAt: string;
};

const useAveragePrices = (data: ApiCommodity[], location: string) => {
  const [averagePrices, setAveragePrices] = useState<Record<string, number>>(
    {}
  );
  const [isLoading, setIsLoading] = useState(true);

  const parsePrice = (p: unknown) => {
    const cleaned = String(p ?? "").replace(/[^0-9.]/g, "");
    const n = parseFloat(cleaned);
    return isNaN(n) ? 0 : n;
  };

  const normalize = (value: unknown): string => {
    if (value == null) return "";
    return String(value).trim().toLowerCase().replace(/\s+/g, " ");
  };

  useEffect(() => {
    const calculateAverages = async () => {
      try {
        setIsLoading(true);

        if (!data.length) {
          setAveragePrices({});
          setIsLoading(false);
          return;
        }

        // ✅ Fetch all data from backend instead of local DB
        const res = await api.get("/search", {
          params: {
            sortBy: "recent",
            limit: 1000, // you can adjust this to cover enough samples
          },
        });

        const allCommodities: ApiCommodity[] = res.data?.data?.data || [];
        const averages: Record<string, number> = {};

        data.forEach((item) => {
          const nameKey = normalize(item.commodityName);
          const qtyKey = normalize(item.quantity);
          const key = `${nameKey}-${qtyKey}`;

          if (!averages[key]) {
            // Find all similar commodities
            const similarItems = allCommodities.filter((c) => {
              const sameName = normalize(c.commodityName) === nameKey;
              const sameQty = normalize(c.quantity) === qtyKey;

              if (location.trim()) {
                const sameLoc =
                  normalize(c.location) === normalize(item.location);
                return sameName && sameQty && sameLoc;
              }
              return sameName && sameQty;
            });

            if (similarItems.length > 0) {
              const total = similarItems.reduce(
                (sum, c) => sum + parsePrice(c.price),
                0
              );
              const avg = Math.round(total / similarItems.length);
              averages[key] = avg;
            }
          }
        });

        setAveragePrices(averages);
      } catch (error) {
        console.error("Error fetching or calculating averages:", error);
      } finally {
        setIsLoading(false);
      }
    };

    calculateAverages();
  }, [data, location]);

  return { averagePrices, isLoading };
};

export default useAveragePrices;
