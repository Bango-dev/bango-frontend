import PrimaryButton from "../../components/ui/PrimaryButton";
import Input from "../form/Input";
import Image from "next/image";

const page = () => {
  return (
    <div className="flex flex-col min-h-screen pt-5 px-3 sm:px-4 lg:px-4 mx-auto w-full ">
      <form className="form">
        <h2 className=" font-bold text-2xl leading-4  ">Find Price</h2>
        <h3 className="text-[#757575] text-base  ">
          Find the price of an item to know how to plan your budget
        </h3>

        <Input
          label="Name of Commodity"
          type="text"
          placeholder="Eg, rice, Airforce 1, sugar"
          description="What’s item are you looking for?"
          required
        />

        <Input
          label="Location"
          type="text"
          placeholder="Abuja"
          description="Fliter by Location"
          rightIcon="/images/form/map-marker-outline.svg"
        />

        <div className="flex flex-col w-full mb-4">
          <label className="text-xl font-bold text-[#1E1E1E] mb-2">
            Sort By
          </label>
          <div className="flex gap-4">
            <select
              className="border border-gray-300 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-[var(--primary-color)] transition w-1/2 text-base text-[#757575]"
              defaultValue="most-recent"
            >
              <option value="most-recent">Most Recent</option>
              <option value="oldest">Oldest</option>
            </select>
            <div className="relative w-1/2">
              <select
                className="border border-gray-300 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-[var(--primary-color)] transition w-full text-base text-[#757575] pr-10"
                defaultValue="price-high-low"
              >
                <option value="price-high-low">Price (high to low)</option>
                <option value="price-low-high">Price (low to high)</option>
              </select>
              <span className="absolute right-4 top-2 flex items-center pointer-events-none">
                <Image
                  src="/images/form/filter-variant.svg"
                  alt="Filter"
                  width={20}
                  height={20}
                />
              </span>
            </div>
          </div>
        </div>

        <PrimaryButton href="/coming-soon" text="Review Submission" />
      </form>
    </div>
  );
};
export default page;
