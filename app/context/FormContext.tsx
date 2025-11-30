"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import {  Commodity } from "../lib/db";

type ContextType = {
  data: Commodity;
  update: (fields: Partial<Commodity>) => void;
  clear: () => void;
};

const defaultData: Commodity = {
  commodityName: "",
  price: "",
  quantity: "",
  location: "",
  market: "",
  date: "",
  sellerName: "",
  sellerPhoneNumber: "",
  image: "",
};

const FormContext = createContext<ContextType | undefined>(undefined);

export function FormProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<Commodity>(defaultData);

  useEffect(() => {
    const saved = localStorage.getItem("formData");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setData(parsed);
      } catch (e) {
        console.error("Error parsing saved form data:", e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("formData", JSON.stringify(data));
  }, [data]);

  const update = (fields: Partial<Commodity>) => {
    setData((prev) => ({ ...prev, ...fields }));
  };

  const clear = () => {
    setData(defaultData);
    localStorage.removeItem("formData");
  };

  return (
    <FormContext.Provider value={{ data, update, clear }}>
      {children}
    </FormContext.Provider>
  );
}

export function useFormData() {
  const context = useContext(FormContext);
  if (!context) throw new Error("useFormData must be used inside FormProvider");
  return context;
}
