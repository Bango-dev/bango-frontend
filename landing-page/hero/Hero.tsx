import Button from "../../app/components/ui/Button";
import Image from "next/image";

const Hero = () => {
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
  return (
    <section className="relative  flex flex-col  sm:bg-cover sm:bg-center   items-center pt-5 h-screen ">
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
        <Button
          firstBtn="Submit a Price"
          secondBtn="Find Prices"
          firstHref="/form/step-1"
          secondHref="/find-price"
        />
      </div>
    </section>
  );
};
export default Hero;
