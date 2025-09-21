import Image from "next/image";

const Features = () => {
  return (
    <section className="center h-auto py-10">
      <div>
        <span className=" heading ">Top Features</span>
        <h3 className="sub-heading">What makes us stand out</h3>
        <div className="center">
          <div className="flex lg:flex-row flex-col-reverse xl:gap-5 gap-10 lg:mt-10 lg:mb-20 mt-5 mb-10 text-left ">
            <div className="card-border features-1-card  gap-3 ">
              <div>
                <Image
                  src="/images/features/market-image-3.png"
                  alt="Image of some tomatoes"
                  width={309}
                  height={253}
                />
              </div>
              <div>
                <h4 className="card-heading">
                  Search & filter by <br /> location
                </h4>
                <p className=" card-text">
                  Quickly find the latest commodity <br /> prices near you or
                  compare across <br /> markets. Adjust filters to narrow <br />
                  results to your area or explore <br /> prices beyond your
                  location.
                </p>
              </div>
            </div>
            <div className="card-border features-1-card flex gap-3 ">
              <div>
                <Image
                  src="/images/features/market-image-4.png"
                  alt="Image of a man in a market"
                  width={309}
                  height={253}
                />
              </div>
              <div>
                <h4 className="card-heading">
                  View price history & <br /> trends
                </h4>
                <p className="card-text">
                  See how prices change over time <br /> with simple charts and
                  timelines <br />. Spot patterns, track fluctuations, <br />{" "}
                  and know whether you’re getting a <br /> fair deal today.
                </p>
              </div>
            </div>
          </div>
          <div className="flex xl:flex-row flex-col gap-5 mt-10 mb-20 text-left ">
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
                <h4 className="card-heading">
                  See top sellers with lowest <br /> average prices
                </h4>
                <p className=" card-text">
                  Discover which sellers or markets consistently <br /> offer
                  the best deals. Bango highlights trusted <br /> locations with
                  the lowest average prices, so you <br /> can shop smarter.
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
                <h4 className="card-heading">
                  Bookmark and track <br /> preferred sellers
                </h4>
                <p className="card-text">
                  Save your favorite sellers or markets and return <br /> to
                  them anytime. Stay updated on their latest <br /> prices
                  without searching again.
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
                <h4 className="card-heading">
                  Average price calculations <br /> for fair market value
                </h4>
                <p className="card-text">
                  Bango calculates the average price from <br /> multiple
                  submissions to show you the fair <br /> market value. This
                  makes it easy to see whether <br /> a price is cheap, fair, or
                  overpriced.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Features;
