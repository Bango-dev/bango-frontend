"use client";

import { useEffect, useState } from "react";
import { db, Commodity } from "../../lib/db";

const useAveragePrices = (data: Commodity[], location: string) => {
  const [averagePrices, setAveragePrices] = useState<Record<string, number>>(
    {}
  );
  const [isLoading, setIsLoading] = useState(true);

  const parsePrice = (p: unknown) => {
    const cleaned = String(p ?? "").replace(/[^0-9.]/g, "");
    const n = parseFloat(cleaned);
    return isNaN(n) ? 0 : n;
  };

  const normalize = (str: string | undefined | null) =>
    (str || "").trim().toLowerCase().replace(/\s+/g, " ");

  useEffect(() => {
    const calculateAverages = async () => {
      if (!data.length) {
        setAveragePrices({});
        setIsLoading(false);
        return;
      }

      const allCommodities = await db.commodities.toArray();
      const averages: Record<string, number> = {};

      data.forEach((item) => {
        const nameKey = normalize(item.commodityName);
        const qtyKey = normalize(item.quantity);
        const key = `${nameKey}-${qtyKey}`;

        if (!averages[key]) {
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
      setIsLoading(false);
    };

    calculateAverages();
  }, [data, location]);

  return { averagePrices, isLoading };
};

export default useAveragePrices;
