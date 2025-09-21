import Button from "../ui/Button";
import Image from "next/image";

const Hero = () => {
  return (
    <section className=" flex flex-col sm:bg-[url('/images/hero/hero-background-image.png')] sm:bg-cover sm:bg-center  items-center justify-center h-screen ">
      {/* Mobile-only image */}
      <div className="sm:hidden mb-6">
        <Image
          src="/images/hero/hero-image.png"
          alt="Hero mobile"
          width={358}
          height={209}
          className="mx-auto"
        />
      </div>

      <div className="flex flex-col items-center justify-center ">
        <h1 className=" hero-heading font-normal ">Crowdsourced</h1>
        <h1 className="bg-[var(--color-primary)] hero-heading text-background p-5 my-5  rounded-2xl ">
          Commodity
        </h1>
        <h1 className=" hero-heading font-normal ">Price Discovery</h1>
        <h2 className=" xl:text-3xl lg:text-2xl md:text-1xl sm:text-base text-sm text-wrap  text-[#757575] text-center my-5">
          Real-time commodity prices from real buyers like you. <br /> Save
          money, shop smarter, and help your community find the best deals.
        </h2>
        <Button firstBtn="Submit a Price" secondBtn="Find Prices" />
      </div>
    </section>
  );
};
export default Hero;
