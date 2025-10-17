import Image from "next/image";
import Button from "../components/ui/Button";

const Confirmation = () => {
  return (
    <section className="center h-screen  ">
      <div className="mb-6">
        <Image
          src="/images/confirmation/confirmation-illustration.svg"
          alt="An image of a clock"
          width={474}
          height={288.84}
        />
      </div>
      <div>
        <h3 className="sub-heading">Awesome!</h3>
        <h4 className="text-center sm:text-lg text-base text-[#757575] mt-2">
          Thanks for sharing! Your data helps others plan and save.
        </h4>
      </div>
      <Button
        firstBtn="Back to Home"
        secondBtn="Submit a New Price"
        className="mt-6"
        firstHref="/"
        secondHref="/form/step-1"
      />
    </section>
  );
};
export default Confirmation;
