"use client";

import Image from "next/image";
import Button from "../../components/ui/Button";
import { useRouter } from "next/navigation";
import PrimaryButton from "../../components/ui/PrimaryButton";
import SecondaryButton from "../../components/ui/SecondaryButton";
import Footer from "../footer/Footer";

const AboutUs = () => {
  // hero section
  // Array of background images
  const bgImages = [
    "/images/hero/bg1.png",
    "/images/hero/bg2.png",
    "/images/hero/bg3.png",
    "/images/hero/bg4.png",
    "/images/hero/bg5.png",
    "/images/hero/bg6.png",
    "/images/hero/bg7.png",
    "/images/hero/bg8.png",
    "/images/hero/bg9.png",
  ];

  // Predefined random positions (or you can generate dynamically)
  const positions = [
    { top: "10%", left: "5%" },
    { top: "70%", right: "10%" },
    { top: "75%", left: "5%" },
    { top: "0", left: "15%" },
    { bottom: "20%", right: "5%" },
    { top: "0", left: "50%" },
    { top: "0", right: "20%" },
    { top: "50%", left: "5%" },
    { top: "50%", right: "0" },
  ];

  // submit price section
  const router = useRouter();

  const handleSubmitPrice = () => {
    router.push("/form/step-1");
  };

  const handleFindPrices = () => {
    router.push("/find-price");
  };

  return (
    <div className="max-w-full overflow-x-hidden">
      {/* Hero Section */}
      <section
        className="
    relative flex flex-col items-center
    pt-8 pb-20
    min-h-fit
    md:min-h-[50vh]
    lg:min-h-screen
  "
      >
        {/* Desktop background image */}

        {/* Random decorative background images */}
        {bgImages.map((src, index) => (
          <div
            key={index}
            className={`absolute animate-fade-sequence -z-10 hidden sm:block img-${index}  `}
            style={{
              top: positions[index].top,
              left: positions[index].left,
              right: positions[index].right,
            }}
          >
            <Image src={src} alt={`bg-${index}`} width={68} height={68} />
          </div>
        ))}

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

        <div className=" relative z-10 flex flex-col items-center sm:mt-30 ">
          <div className="flex relative sm:flex-row flex-col items-center justify-center gap-4 sm:mt-0 mt-2">
            <h1 className=" hero-heading ">Crowdsourced</h1>
            <div className=" absolute sm:left-6/12 left-0 sm:top-auto top-14  -z-10">
              <Image
                src="/images/hero/hero-bg-img.svg"
                alt="Hero Background"
                width={496}
                height={96}
                className="object-contain"
              />
            </div>
            <h1 className=" hero-heading   ">Commodity</h1>
          </div>
          <h1 className=" hero-heading mt-4 ">Price Discovery</h1>
          <h2 className=" xl:text-3xl lg:text-2xl md:text-1xl sm:text-base text-sm text-wrap mx-5 text-[#757575] text-center my-5">
            Real-time commodity prices from real buyers like you. <br /> Save
            money, shop smarter, and help your community find the best deals.
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 w-full px-4 justify-center">
            <PrimaryButton
              text="Submit a Price"
              onClick={handleSubmitPrice}
              className="sm:w-auto"
            />
            <SecondaryButton
              text="Find Prices"
              onClick={handleFindPrices}
              className="sm:w-auto"
            />
          </div>
        </div>
      </section>

      {/* How to use section */}
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

      {/* What to expect section */}

      <section className="center bg-[#F1ECFF] h-auto py-10">
        <span className=" heading ">Why use Bango</span>
        <h3 className="sub-heading">Here’s what to expect</h3>
        <div className="flex  lg:flex-row flex-col-reverse xl:gap-30 gap-10 mt-10 md:mb-20 justify-center ">
          <div className=" m-5">
            <div className="exp-list">
              <div className="icon-background">
                <Image
                  src="/images/what-to-expect/search-icon.svg"
                  alt="search icon"
                  width={22}
                  height={18}
                />
              </div>
              <div>
                <h4 className="card-heading">Transparent</h4>
                <p className=" desc">
                  Prices are crowdsourced, so you see what people are really
                  paying.
                </p>
              </div>
            </div>

            <div className="exp-list">
              <div className="icon-background">
                <Image
                  src="/images/what-to-expect/horse-icon.svg"
                  alt="horse icon"
                  width={22}
                  height={18}
                />
              </div>
              <div>
                <h4 className="card-heading">Fast</h4>
                <p className=" desc">
                  Find or share a price in under 20 seconds, straight forward
                  and direct.
                </p>
              </div>
            </div>

            <div className="exp-list">
              <div className="icon-background">
                <Image
                  src="/images/what-to-expect/chart-timeline.svg"
                  alt="price trend icon"
                  width={22}
                  height={18}
                />
              </div>
              <div>
                <h4 className="card-heading">Local & Real</h4>
                <p className=" desc">
                  Search for any commodity and see recent prices in your area.
                </p>
              </div>
            </div>

            <div className="exp-list">
              <div className="icon-background">
                <Image
                  src="/images/what-to-expect/handshake-icon.svg"
                  alt="hand shake icon"
                  width={22}
                  height={18}
                />
              </div>
              <div>
                <h4 className="card-heading">Helpful to all</h4>
                <p className=" desc">
                  Your submissions help everyone save money, while you get
                  helped too.
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <Image
              src="/images/what-to-expect/market-image-2.png"
              alt="A market image showing some people buying and selling"
              width={600}
              height={600}
              sizes="(max-width: 640px) 300px, 500px (max-width: 1284px)  600px"
              className="w-[300px] sm:w-[500px] xl:w-[600px] h-auto"
            />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="center h-auto py-10">
        <div>
          <span className=" heading ">Top Features</span>
          <h3 className="sub-heading">What makes us stand out</h3>
          <div className="center">
            <div className="flex lg:flex-row flex-col-reverse  text-left ">
              <div className="card-border features-1-card  gap-3 ">
                {/* <div> */}
                <Image
                  src="/images/features/market-image-3.png"
                  alt="Image of some tomatoes"
                  width={309}
                  height={253}
                  className="flex-shrink-0"
                />
                {/* </div> */}
                <div>
                  <h4 className="card-heading md:text-2xl text-sm">
                    Search & filter by location
                  </h4>
                  <p className=" card-text">
                    Quickly find the latest commodity prices near you or compare
                    across markets. Adjust filters to narrow results to your
                    area or explore prices beyond your location.
                  </p>
                </div>
              </div>
              <div className="card-border features-1-card flex gap-3 ">
                {/* <div> */}
                <Image
                  src="/images/features/market-image-4.png"
                  alt="Image of a man in a market"
                  width={309}
                  height={253}
                  className="flex-shrink-0"
                />
                {/* </div> */}
                <div>
                  <h4 className="card-heading md:text-2xl text-sm">
                    View price history & trends
                  </h4>
                  <p className="card-text">
                    See how prices change over time with simple charts and
                    timelines . Spot patterns, track fluctuations, and know
                    whether you’re getting a fair deal today.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex xl:flex-row flex-col md:gap-5 gap-0  text-left ">
              <div className="card-border features-2-card ">
                <div>
                  <Image
                    src="/images/features/market-image-5.png"
                    alt="Image of some women in the market"
                    width={368}
                    height={141}
                  />
                </div>
                <div>
                  <h4 className="card-heading md:text-2xl text-sm">
                    See top sellers with lowest average prices
                  </h4>
                  <p className=" card-text">
                    Discover which sellers or markets consistently offer the
                    best deals. Bango highlights trusted locations with the
                    lowest average prices, so you can shop smarter.
                  </p>
                </div>
              </div>
              <div className="card-border features-2-card ">
                <div>
                  <Image
                    src="/images/features/market-image-6.png"
                    alt="Image of a market"
                    width={368}
                    height={141}
                  />
                </div>
                <div>
                  <h4 className="card-heading md:text-2xl text-sm">
                    Bookmark and track preferred sellers
                  </h4>
                  <p className="card-text">
                    Save your favorite sellers or markets and to them anytime.
                    Stay updated on their prices without searching again.
                  </p>
                </div>
              </div>
              <div className="card-border features-2-card ">
                <div>
                  <Image
                    src="/images/features/market-image-7.png"
                    alt="Image of a lady in a market folding wrappers"
                    width={368}
                    height={141}
                  />
                </div>
                <div>
                  <h4 className="card-heading md:text-2xl text-sm">
                    Average price calculations for fair market value
                  </h4>
                  <p className="card-text">
                    Bango calculates the average price from multiple submissions
                    to show you the fair market value. This makes it easy to see
                    whether a price is cheap, fair, or overpriced.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* submit price section */}
      <section className="center  h-auto my-20 ">
        <div className="sm:w-9/12 bg-[#CBCBFA] w-[90%] rounded-2xl md:py-40 py-20  center relative -z-20 overflow-hidden">
          <Image
            src="/images/submit-price/Ellipse-12.svg"
            alt="background-image"
            width={200}
            height={200}
            className="absolute left-0 md:-top-5 -top-2 -z-10 md:w-[200px] md:h-[200px] w-[100px] h-[100px]"
          />
          <Image
            src="/images/submit-price/Ellipse-14.svg"
            alt="background-image"
            width={276}
            height={276}
            className="absolute -z-10 -bottom-3 md:left-30 left-0 md:w-[200px] md:h-[200px] w-[100px] h-[100px] "
          />
          <Image
            src="/images/submit-price/Layer-1.svg"
            alt="background-image"
            width={400}
            height={400}
            className="absolute -z-10 right-0 top-0 md:w-[300px] md:h-[300px] w-[150px] h-[150px]"
          />
          <Image
            src="/images/submit-price/Ellipse-13.svg"
            alt="background-image"
            width={200}
            height={200}
            className="absolute -z-10 right-0 bottom-0 md:w-[200px] md:h-[200px] w-[100px] h-[100px]"
          />
          <h2 className=" xl:text-5xl md:text-3xl text-xl font-bold">
            Find the Best Price Now!
          </h2>
          <h3 className=" xl:text-2xl  md:text-xl text-base my-5 text-wrap ">
            free, no account needed. Want to contribute?
          </h3>
          <PrimaryButton
            onClick={handleSubmitPrice}
            text="Submit a Price"
            className="w-36 h-12 text-xs md:w-48 md:h-14 md:text-sm"
          />
        </div>
      </section>
      <Footer />
    </div>
  );
};
export default AboutUs;
