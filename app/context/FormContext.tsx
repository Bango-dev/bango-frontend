"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

type CommodityData = {
  commodityName?: string;
  price?: string;
  quantity?: string;
  location?: string;
  marketName?: string;
  image?: File | null;
  date?: string;
};

type SellerData = {
  sellerName?: string;
  phone?: string;
};

type FormDataState = CommodityData & SellerData;

type FormContextType = {
  data: Partial<FormDataState>;
  setData: (values: Partial<FormDataState>) => void;
  clear: () => void;
};

const FormContext = createContext<FormContextType | undefined>(undefined);

export const FormProvider = ({ children }: { children: ReactNode }) => {
  const [data, setDataState] = useState<Partial<FormDataState>>({});

  const setData = (values: Partial<FormDataState>) =>
    setDataState((prev) => ({ ...prev, ...values }));

  const clear = () => setDataState({});

  return (
    <FormContext.Provider value={{ data, setData, clear }}>
      {children}
    </FormContext.Provider>
  );
};

export const useFormData = () => {
  const ctx = useContext(FormContext);
  if (!ctx) throw new Error("useFormData must be used inside FormProvider");
  return ctx;
};
