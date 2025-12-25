"use client";

import Image from "next/image";
import PrimaryButton from "../../components/ui/PrimaryButton";
import SecondaryButton from "../../components/ui/SecondaryButton";
import { useRouter } from "next/navigation";

const ComingSoon = () => {
  const router = useRouter();

  return (
    <section className="center h-screen">
      <div className="mb-6">
        <Image
          src="/images/coming-soon/coming-soon-image.svg"
          alt="An image of a clock"
          width={592}
          height={249}
        />
      </div>
      <div>
        <h3 className="sub-heading">Coming Soon!</h3>
      </div>
      <div className="flex flex-col sm:flex-row gap-4 w-full px-4 justify-center mt-6">
        <PrimaryButton
          text="Back to Home"
          onClick={() => router.push("/")}
          className="sm:w-auto"
        />
        <SecondaryButton
          text="Submit a Price"
          onClick={() => router.push("/form/step-1")}
          className="sm:w-auto"
        />
      </div>
    </section>
  );
};

export default ComingSoon;
