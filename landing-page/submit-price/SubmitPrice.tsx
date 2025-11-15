"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import PrimaryButton from "../../app/components/ui/PrimaryButton";

const FindPrice = () => {
  const router = useRouter();

  const handleSubmitPrice = () => {
    router.push("/form/step-1");
  };
  return (
    <section className="center h-screen">
      <div className="w-9/12 bg-[#CBCBFA] rounded-2xl md:h-8/12 h-6/12 center relative -z-20 overflow-hidden">
        <Image
          src="/images/submit-price/Ellipse-12.svg"
          alt="background-image"
          width={200}
          height={200}
          className="absolute left-0 md:-top-5 -top-2 -z-10 md:w-[200px] md:h-[200px] w-[100px] h-[100px]"
        />
        <Image
          src="/images/submit-price/Ellipse-14.svg"
          alt="background-image"
          width={276}
          height={276}
          className="absolute -z-10 -bottom-3 md:left-30 left-0 md:w-[200px] md:h-[200px] w-[100px] h-[100px] "
        />
        <Image
          src="/images/submit-price/Layer-1.svg"
          alt="background-image"
          width={400}
          height={400}
          className="absolute -z-10 right-0 top-0 md:w-[300px] md:h-[300px] w-[150px] h-[150px]"
        />
        <Image
          src="/images/submit-price/Ellipse-13.svg"
          alt="background-image"
          width={200}
          height={200}
          className="absolute -z-10 right-0 bottom-0 md:w-[200px] md:h-[200px] w-[100px] h-[100px]"
        />
        <h2 className=" xl:text-5xl md:text-3xl text-xl font-bold">
          Find the Best Price Now!
        </h2>
        <h3 className=" xl:text-2xl  md:text-xl text-base my-5 text-wrap ">
          free, no account needed. Want to contribute?
        </h3>
        <PrimaryButton
          onClick={handleSubmitPrice}
          text="Submit a Price"
          className="w-lg"
        />
      </div>
    </section>
  );
};
export default FindPrice;
