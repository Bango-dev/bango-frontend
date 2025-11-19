"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { db, Commodity } from "../lib/db";

type ContextType = {
  data: Commodity;
  update: (fields: Partial<Commodity>) => void;
  clear: () => void;
  saveToDB: () => Promise<void>;
};

const defaultData: Commodity = {
  commodityName: "",
  price: "",
  quantity: "",
  location: "",
  marketName: "",
  date: "",
  sellerName: "",
  phone: "",
  image: "",
};

const FormContext = createContext<ContextType | undefined>(undefined);

export function FormProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<Commodity>(defaultData);

  // 1. Load saved data (including image) from localStorage on mount
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

  //  2. Automatically save form data (including image Base64) to localStorage
  useEffect(() => {
    localStorage.setItem("formData", JSON.stringify(data));
  }, [data]);

  //  3. Update specific fields
  const update = (fields: Partial<Commodity>) => {
    setData((prev) => ({ ...prev, ...fields }));
  };

  //  4. Clear both state and localStorage
  const clear = () => {
    setData(defaultData);
    localStorage.removeItem("formData");
  };

  //  5. Save data into Dexie and clear after saving
  // const saveToDB = async () => {
  //   try {
  //     clear();
  //     console.log("Form data saved to Dexie successfully!");
  //   } catch (error) {
  //     console.error("Error saving to Dexie:", error);
  //   }
  // };

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
