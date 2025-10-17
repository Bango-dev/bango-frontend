import Image from "next/image";
import Button from "../components/ui/Button";

const NoResult = () => {
  return (
    <section className="center h-screen  ">
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
        <h4 className="text-center text-lg text-[#757575] mt-2">
          We couldn’t find any prices for Rice at the moment
        </h4>
      </div>
      <Button
        firstBtn="Back to Home"
        secondBtn="Try a new search"
        className="mt-6"
        firstHref="/"
        secondHref="/coming-soon"
      />
    </section>
  );
};
export default NoResult;
