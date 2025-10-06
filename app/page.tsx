import Features from "../components/features/Features";
import SubmitPrice from "../components/submit-price/SubmitPrice";
import Hero from "../components/hero/Hero";
import HowToUse from "../components/how-to-use/HowToUse";
import WhatToExpect from "../components/what-to-expect/WhatToExpect";
import Footer from "../components/footer/Footer";

export default function Home() {
  return (
    <>
      <Hero />
      <HowToUse />
      <WhatToExpect />
      <Features />
      <SubmitPrice />
      <Footer />
    </>
  );
}
