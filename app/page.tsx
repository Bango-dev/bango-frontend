import Features from "../landing-page/features/Features";
import SubmitPrice from "../landing-page/submit-price/SubmitPrice";
import Hero from "../landing-page/hero/Hero";
import HowToUse from "../landing-page/how-to-use/HowToUse";
import WhatToExpect from "../landing-page/what-to-expect/WhatToExpect";
import Footer from "../landing-page/footer/Footer";

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
