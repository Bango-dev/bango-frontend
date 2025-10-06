import PrimaryButton from "../../../components/ui/PrimaryButton";
import StepIndicator from "../../../components/ui/StepIndicator";
import Input from "../Input";
import Image from "next/image";
import Link from "next/link";

const page = () => {
  return (
    <div className="flex flex-col min-h-screen pt-5 px-3 sm:px-4 lg:px-4 mx-auto w-full ">
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
          label="Name of Commodity"
          type="text"
          placeholder="Eg, rice, Airforce 1, sugar"
          description="What’s the name of the item you bought?"
          required
        />

        <Input
          label="Price Paid (NGN)"
          type="number"
          placeholder="Enter price"
          description="How much did you pay the seller?"
          required
        />

        <Input
          label="Quantity"
          type="number"
          placeholder="1 mudu, 1 Kg, I pair, 1 Pack"
          description="Specify the exact way it was bought."
          required
        />

        <Input
          label="Location"
          type="text"
          placeholder="Abuja"
          description="You can select the Location using the icon."
          rightIcon="/images/form/map-marker-outline.svg"
          required
        />

        <Input
          label="Market Name"
          type="text"
          placeholder="Wuse Market"
          rightIcon="/images/form/map-marker-outline.svg"
          required
        />

        <Input label="Image" type="file" accept="image/*" required />

        <Input label="Date" type="date" required />

        <PrimaryButton href="/form/step-2" text="Next" />
      </form>
    </div>
  );
};
export default page;
