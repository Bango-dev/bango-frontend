import Image from "next/image";

const HowToUse = () => {
  return (
    <section className=" relative  center  h-auto py-10">
      <div className="absolute inset-0 lg:flex items-center justify-center -z-10 w-full hidden">
        <Image
          src="/images/how-to-use/arrow.svg"
          alt="An arrow showing the steps"
          width={659}
          height={131}
          className=" max-w-full h-auto"
        />
      </div>
      <span className=" heading">Simple process</span>
      <h3 className="sub-heading">How it works</h3>
      <h4>Done in three(3) easy steps</h4>
      <div className="flex lg:flex-row flex-col xl:gap-46 lg:gap-12 gap-5 mt-5 mb-10 text-left ">
        <div className="card-border card ">
          <div>
            <Image
              src="/images/how-to-use/market-image-8.png"
              alt="Image of some apples"
              width={247}
              height={160}
            />
          </div>
          <div>
            <h4 className="card-heading">Check Prices</h4>
            <p className=" card-text">
              Search for any commodity and <br /> see recent prices in your
              area.
            </p>
          </div>
        </div>
        <div className="card-border card ">
          <div>
            <Image
              src="/images/how-to-use/market-image-1.png"
              alt="Image of a woman in a supermarket"
              width={247}
              height={160}
            />
          </div>
          <div>
            <h4 className="card-heading">Tell us your purchase</h4>
            <p className="card-text">
              Submit prices from your latest <br /> purchase in seconds.
            </p>
          </div>
        </div>
        <div className="card-border card ">
          <div>
            <Image
              src="/images/how-to-use/market-image-9.png"
              alt="Image of some women discussing in a market"
              width={247}
              height={160}
            />
          </div>
          <div>
            <h4 className="card-heading">Shop Smarter</h4>
            <p className="card-text">
              Compare sellers and find the <br /> best deals before you buy.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
export default HowToUse;
