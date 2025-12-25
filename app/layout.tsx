import type { Metadata } from "next";

import "./globals.css";
// import Navbar from "./components/navbar/Navbar";
import { FormProvider } from "../app/context/FormContext";
import { Figtree, Poppins, Lexend } from "next/font/google";
import { AuthProvider } from "./context/AuthContext";

const lexend = Lexend({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-lexend",
});

const figtree = Figtree({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-figtree",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-poppins",
});

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
    <html
      lang="en"
      className={`${poppins.variable} ${figtree.variable} ${lexend.variable} `}
    >
      <body>
        <AuthProvider>
          <FormProvider>
            {children}
          </FormProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
