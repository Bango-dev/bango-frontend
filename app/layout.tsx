import type { Metadata } from "next";

import "./globals.css";
import Navbar from "../landing-page/navbar/Navbar";
import { FormProvider } from "../app/context/FormContext";

export const metadata: Metadata = {
  title: "Bango",
  description: "Crowdsourced Commodity Price Discovery",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <FormProvider>
          <Navbar />
          {children}
        </FormProvider>
      </body>
    </html>
  );
}
