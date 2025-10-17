"use client";

import { useRouter } from "next/navigation";
import PrimaryButton from "../../app/components/ui/PrimaryButton";

const FindPrice = () => {
  const router = useRouter();

  const handleSubmitPrice = () => {
    router.push("/form/step-1");
  };
  return (
    <section className="center h-screen">
      <div className="w-9/12 bg-[#CBCBFA] rounded-2xl md:h-6/12 h-4/12 center">
        <h2 className=" xl:text-5xl md:text-3xl text-xl font-bold">
          Find the Best Price Now!
        </h2>
        <h3 className=" xl:text-2xl  md:text-xl text-base my-5 text-wrap ">
          free, no account needed. Want to contribute?
        </h3>
        <PrimaryButton
          onClick={handleSubmitPrice}
          text="Submit a Price"
          className="w-fit"
        />
      </div>
    </section>
  );
};
export default FindPrice;
