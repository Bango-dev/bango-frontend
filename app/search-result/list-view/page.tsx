import DisplayIndicator from "../../../components/ui/DisplayIndicator";
import Link from "next/link";
import Image from "next/image";
import { searchResults } from "../searchResults";

const page = () => {
  return (
    <div className="py-5 px-5 ">
      <div className=" flex items-center justify-between w-full ">
        <Link href="/find-price">
          <div className="flex items-center mb-6 cursor-pointer gap-2">
            <Image
              src="/images/form/arrow-left.svg"
              alt="Back arrow"
              width={24}
              height={24}
            />
            <span className="font-bold sm:text-4xl text-2xl flex gap-2 ">
              Submission <span className="sm:flex hidden">Prices</span>
            </span>
          </div>
        </Link>
        {/* Display Indicator*/}
        <div>
          <div className="pointer-events-auto">
            <DisplayIndicator />
          </div>
        </div>
      </div>

      <div className="grid-cols-8 hidden lg:grid">
        <h3>IMG</h3>
        <h3>Name of Seller</h3>
        <h3>Phone number</h3>
        <h3>Location</h3>
        <h3>Price Paid </h3>
        <h3>Market</h3>
        <h3>Quantity</h3>
        <h3>Average Price</h3>
      </div>
      <hr className="hidden lg:grid" />

      {/* Desktop Only */}
      {searchResults.map((item, id) => (
        <div key={id} className="grid-cols-8  py-5 hidden lg:grid">
          <div>
            <Image
              src={item.image}
              alt="Image of a commodity"
              width={32}
              height={32}
            />
          </div>

          <p className="submission-value">{item.seller}</p>

          <p className="submission-value">{item.phone}</p>

          <p className="submission-value">{item.location}</p>

          <p className="submission-value">{item.price}</p>

          <p className="submission-value">{item.market}</p>

          <p className="submission-value">{item.quantity}</p>

          <p className="submission-value">{item.averagePrice}</p>
        </div>
      ))}

      {/* Mobile Only */}
      {searchResults.map((item, id) => (
        <div
          key={id}
          className=" lg:shadow-none shadow-md p-5  flex flex-col items-center lg:hidden"
        >
          <div className="flex  items-center lg:hidden gap-5">
            <div
              className="w-[137px] h-[92px]
                 sm:w-[504px] sm:h-[470px]"
            >
              <Image
                src={item.image}
                alt="Image of a commodity"
                width={504}
                height={470}
                className="object-cover" // or object-contain, as needed
                priority // optional, loads image early for performance
              />
            </div>
            <div className="bg-white rounded-lg  w-full">
              <h2 className="sm:text-2xl  text-base font-bold text-[#1E1E1E]">
                {item.title}
              </h2>
              <div className="flex-col items-baseline gap-2 ">
                <p className="text-4xl text-[#1E1E1E] font-bold">
                  {item.price}
                </p>
              </div>
              {/* Submission Date */}
              <p className="text-xs text-[#757575] font-medium">
                Submitted: {item.submitted}
              </p>
            </div>
          </div>
          <div className="w-full mt-4">
            <Link
              href={`/search-result/grid-view/${item.id}`}
              className="w-full  "
            >
              <button className="btn-primary w-full ">View</button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};
export default page;
