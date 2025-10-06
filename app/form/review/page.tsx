import Image from "next/image";
import Link from "next/link";
import Input from "../Input";
import PrimaryButton from "../../../components/ui/PrimaryButton";

const page = () => {
  return (
    <div className="p-6  flex  flex-col w-full">
      <div className="flex items-center mb-6 cursor-pointer gap-2">
        <span>
          <Link href="/form/step-2">
            <div className="flex items-center mb-6 cursor-pointer gap-2">
              <Image
                src="/images/form/arrow-left.svg"
                alt="Back arrow"
                width={24}
                height={24}
              />
              <span className="font-bold text-4xl ">Review Submission</span>
            </div>
          </Link>
        </span>
      </div>

      <div className="flex md:flex-row flex-col items-center justify-center mx-auto ">
        <div>
          <Image
            src="/images/form/review-image.png"
            alt="Image of a commodity"
            width={504}
            height={470}
          />
        </div>
        <form className="form border border-none shadow-none md:w-2xl w-full ">
          <div className="flex gap-4 mb-4">
            <Input
              label="Name of Seller"
              type="text"
              value="Eg, Madam Kemi, John Doe"
              className="w-1/2"
              labelClassName="text-base text-[#1E1E1E] font-normal"
              readOnly
            />
            <Input
              label="Seller’s Phone No"
              type="text"
              value="08000000000"
              className="w-1/2"
              labelClassName="text-base text-[#1E1E1E] font-normal"
              readOnly
            />
          </div>
          <div className="flex gap-4 mb-4">
            <Input
              label="Name of Commodity"
              type="text"
              value="Eg, rice, Airforce 1, sugar"
              className="w-1/2"
              labelClassName="text-base text-[#1E1E1E] font-normal"
              readOnly
            />
            <Input
              label="Price Paid (NGN)"
              type="number"
              value="60000"
              className="w-1/2"
              labelClassName="text-base text-[#1E1E1E] font-normal"
              readOnly
            />
          </div>
          <div className="flex gap-4 mb-4">
            <Input
              label="Location"
              type="text"
              value="Abuja"
              className="w-1/2"
              rightIcon="/images/form/map-marker-outline.svg"
              labelClassName="text-base text-[#1E1E1E] font-normal"
              readOnly
            />
            <Input
              label="Quantity"
              type="number"
              value="1"
              className="w-1/2"
              labelClassName="text-base text-[#1E1E1E] font-normal"
              readOnly
            />
          </div>
          <Input
            label="Market Name"
            type="text"
            value="Wuse Market"
            rightIcon="/images/form/map-marker-outline.svg"
            className="w-full "
            labelClassName="text-base text-[#1E1E1E] font-normal"
            readOnly
          />
          <p className="text-lg text-[#757575]">Submitted: 20/08/2025</p>
          <PrimaryButton href="/coming-soon" text="Submit" />
        </form>
      </div>
    </div>
  );
};
export default page;
