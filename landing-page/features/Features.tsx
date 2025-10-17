import Image from "next/image";

const Features = () => {
  return (
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
                  across markets. Adjust filters to narrow results to your area
                  or explore prices beyond your location.
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
                  Discover which sellers or markets consistently offer the best
                  deals. Bango highlights trusted locations with the lowest
                  average prices, so you can shop smarter.
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
  );
};
export default Features;
