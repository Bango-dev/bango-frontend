"use client";
import Image from "next/image";
import PrimaryButton from "../../components/ui/PrimaryButton";
import SecondaryButton from "../../components/ui/SecondaryButton";
import { useRouter } from "next/navigation";

const Confirmation = () => {
  const router = useRouter();

  return (
    <section className="center h-screen">
      <div className="mb-6">
        <Image
          src="/images/confirmation/confirmation-illustration.svg"
          alt="An image of a clock"
          width={474}
          height={288.84}
        />
      </div>
      <div>
        <h3 className="sub-heading">Awesome! You Just Bango&apos;d!</h3>
        <h4 className="text-center sm:text-lg text-base text-[#757575] mt-2 py-4">
          Thanks for sharing! Your data helps others plan and save.
        </h4>
      </div>
      <div className="flex flex-col sm:flex-row gap-4 w-full px-4 justify-center">
        <PrimaryButton
          text="Back to Home"
          onClick={() => router.push("/")}
          className="sm:w-auto"
        />
        <SecondaryButton
          text="Submit a New Price"
          onClick={() => router.push("/form/step-1")}
          className="sm:w-auto"
        />
      </div>
    </section>
  );
};

export default Confirmation;
