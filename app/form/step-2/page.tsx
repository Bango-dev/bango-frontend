import PrimaryButton from "../../../components/ui/PrimaryButton";
import StepIndicator from "../../../components/ui/StepIndicator";
import Input from "../Input";
import Image from "next/image";
import Link from "next/link";

const page = () => {
  return (
    <div className="flex flex-col min-h-screen pt-5 px-3 sm:px-4 lg:px-4 mx-auto w-screen ">
      <div className="relative flex items-center">
        <Link href="/">
          <div className="flex items-center mb-6 cursor-pointer gap-2">
            <Image
              src="/images/form/arrow-left.svg"
              alt="Back arrow"
              width={24}
              height={24}
            />
            <span>Back</span>
          </div>
        </Link>
        {/* Step Indicator*/}
        <div className="step-indicator">
          <div className="pointer-events-auto">
            <StepIndicator />
          </div>
        </div>
      </div>
      <form className="form">
        <h2 className=" font-bold text-2xl leading-4  ">Submit Price</h2>
        <h3 className="text-[#757575] text-base  ">
          Try to answer as best as possible to give others a good idea and price
          range
        </h3>

        <Input
          label="Name of Seller"
          type="text"
          placeholder="Eg, Madam Kemi, John Doe"
          description="This helps other communicate with the seller better."
          required
        />

        <Input
          label="Seller’s Phone No"
          type="text"
          placeholder="08000000000"
          description="Phone Number"
          required
        />

        <PrimaryButton href="/form/review" text="Review Submission" />
      </form>
    </div>
  );
};
export default page;
