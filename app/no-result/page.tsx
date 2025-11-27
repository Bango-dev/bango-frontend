"use client";

import Image from "next/image";
import PrimaryButton from "../components/ui/PrimaryButton";
import SecondaryButton from "../components/ui/SecondaryButton";
import { useRouter } from "next/navigation";

const NoResult = () => {
  const router = useRouter();

  return (
    <section className="center h-screen">
      <div className="mb-6">
        <Image
          src="/images/no-result/no-result-found.svg"
          alt="An image signifying no result"
          width={592}
          height={269}
        />
      </div>
      <div>
        <h3 className="sub-heading">No results found!</h3>
        <p className="text-center text-lg text-[#757575] mt-2">
          We couldn&apos;t find any prices for Rice at the moment
        </p>
      </div>
      <div className="flex flex-col sm:flex-row gap-4 w-full px-4 justify-center mt-6">
        <PrimaryButton
          text="Back to Home"
          onClick={() => router.push("/")}
          className="sm:w-auto"
        />
        <SecondaryButton
          text="Try a new search"
          onClick={() => router.push("/find-price")}
          className="sm:w-auto"
        />
      </div>
    </section>
  );
};

export default NoResult;
