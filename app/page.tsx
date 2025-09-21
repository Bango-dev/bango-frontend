import Features from "../components/features/Features";
import FindPrice from "../components/find-price/FindPrice";
import Footer from "../components/footer/Footer";
import Hero from "../components/hero/Hero";
import HowToUse from "../components/how-to-use/HowToUse";
import WhatToExpect from "../components/what-to-expect/WhatToExpect";

export default function Home() {
  return (
    <>
      <Hero />
      <HowToUse />
      <WhatToExpect />
      <Features />
      <FindPrice />
    </>
  );
}
