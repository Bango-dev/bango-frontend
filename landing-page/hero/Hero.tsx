import Button from "../../app/components/ui/Button";
import Image from "next/image";

const Hero = () => {
  return (
    <section className="relative  flex flex-col  sm:bg-cover sm:bg-center  items-center pt-5 h-screen ">
      {/* Desktop background image */}
      <div className="hidden sm:block absolute inset-0 -z-10">
        <Image
          src="/images/hero/hero-background-image.png"
          alt="Hero Background"
          fill
          priority
          className="object-cover"
        />
      </div>

      {/* Mobile-only image */}
      <div className="sm:hidden mb-2 ">
        <Image
          src="/images/hero/hero-image.png"
          alt="Hero mobile"
          width={358}
          height={209}
          className="mx-auto"
        />
      </div>

      <div className=" relative z-10 flex flex-col items-center sm:mt-10  ">
        <h1 className=" hero-heading font-normal ">Crowdsourced</h1>
        <h1 className="bg-[var(--color-primary)] hero-heading text-white p-5 my-5  rounded-2xl ">
          Commodity
        </h1>
        <h1 className=" hero-heading font-normal ">Price Discovery</h1>
        <h2 className=" xl:text-3xl lg:text-2xl md:text-1xl sm:text-base text-sm text-wrap mx-5 text-[#757575] text-center my-5">
          Real-time commodity prices from real buyers like you. <br /> Save
          money, shop smarter, and help your community find the best deals.
        </h2>
        <Button
          firstBtn="Submit a Price"
          secondBtn="Find Prices"
          firstHref="/form/step-1"
          secondHref="/find-price"
          className=" w-full  "
        />
      </div>
    </section>
  );
};
export default Hero;
