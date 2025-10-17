import Image from "next/image";

const WhatToExpect = () => {
  return (
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
                Prices are crowdsourced, so you see what people  are
                really paying.
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
                Find or share a price in under 20 seconds, straight
                forward and direct.
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
                Search for any commodity and see  recent prices in your
                area.
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
                Your submissions help everyone save  money, while you get
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
  );
};
export default WhatToExpect;
