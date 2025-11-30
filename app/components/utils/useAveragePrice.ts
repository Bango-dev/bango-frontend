"use client";

import { useEffect, useState } from "react";
import api from "../../utils/api";
import { Commodity } from "../../lib/types/commodities";

const useAveragePrices = (
  data: Commodity[],
  location: string,
  market: string
) => {
  const [averagePrices, setAveragePrices] = useState<Record<string, number>>(
    {}
  );
  const [isLoading, setIsLoading] = useState(true);

  const normalize = (value: unknown): string =>
    String(value ?? "")
      .trim()
      .toLowerCase()
      .replace(/\s+/g, " ");

  const parsePrice = (p: unknown) => {
    const cleaned = String(p ?? "").replace(/[^0-9.]/g, "");
    const n = parseFloat(cleaned);
    return isNaN(n) ? 0 : n;
  };

  useEffect(() => {
    const calculate = async () => {
      try {
        setIsLoading(true);

        if (data.length === 0) {
          setAveragePrices({});
          setIsLoading(false);
          return;
        }

        const res = await api.get("/search", {
          params: { sortBy: "recent", limit: 1000 },
        });

        const all: Commodity[] = res.data?.data?.data || [];
        const averages: Record<string, number> = {};

        data.forEach((item) => {
          const name = normalize(item.commodityName);
          const qty = normalize(item.quantity);
          const key = `${name}-${qty}`;

          if (averages[key]) return;

          const filtered = all.filter((c) => {
            const matchName = normalize(c.commodityName) === name;
            const matchQty = normalize(c.quantity) === qty;

            if (!matchName || !matchQty) return false;

            if (location) {
              return normalize(c.location) === normalize(location);
            }
            if (market) {
              return normalize(c.market) === normalize(market);
            }

            return true;
          });

          if (filtered.length > 0) {
            const total = filtered.reduce(
              (sum, c) => sum + parsePrice(c.price),
              0
            );
            averages[key] = Math.round(total / filtered.length);
          }
        });

        setAveragePrices(averages);
      } catch (err) {
        console.error("Error calculating averages:", err);
      } finally {
        setIsLoading(false);
      }
    };

    calculate();
  }, [data, location, market]);

  return { averagePrices, isLoading };
};

export default useAveragePrices;
