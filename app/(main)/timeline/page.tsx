import Input from "../form/Input";
import SecondaryButton from "../../components/ui/SecondaryButton";
import Image from "next/image";
import Button from "../../components/ui/Button";

const Timeline = () => {
  const CATEGORIES = ["New", "Trending", "Most Bango'd", "For You"];

  const FILTERS = [
    "All",
    "Fruits",
    "Vegetables",
    "Household",
    "Proteins",
    "Dairy",
  ];

  const COMMODITIES = [
    {
      image: "/images/dashboard/groundnut_oil.jpg",
      name: "Ground Oil",
      price: "#800",
      bangos: "1,247 Bangos",
      category: "Households",
      quantity: "Per Kg",
      date: "Bango&apos;d on 02/12/2025",
    },
    {
      image: "/images/dashboard/eggs.jpg",
      name: "Eggs",
      price: "#800",
      bangos: "1,247 Bangos",
      category: "Protein",
      quantity: "Per Crate",
      date: "Bango&apos;d on 02/12/2025",
    },
    {
      image: "/images/dashboard/yam.jpg",
      name: "Yam",
      price: "#1500",
      bangos: "1,247 Bangos",
      category: "Tuber",
      quantity: "Per Pcs",
      date: "Bango&apos;d on 02/12/2025",
    },
    {
      image: "/images/dashboard/rice.jpg",
      name: "Rice",
      price: "#25000",
      bangos: "1,247 Bangos",
      category: "Grain",
      quantity: "Per bag",
      date: "Bango&apos;d on 02/12/2025",
    },
    {
      image: "/images/dashboard/beans.png",
      name: "Beans",
      price: "#800",
      bangos: "1,247 Bangos",
      category: "Grain",
      quantity: "Per kg",
      date: "Bango&apos;d on 02/12/2025",
    },
    {
      image: "/images/dashboard/yam.jpg",
      name: "Yam",
      price: "#1500",
      bangos: "1,247 Bangos",
      category: "Tuber",
      quantity: "Per Pcs",
      date: "Bango&apos;d on 02/12/2025",
    },
    {
      image: "/images/dashboard/eggs.jpg",
      name: "Eggs",
      price: "#800",
      bangos: "1,247 Bangos",
      category: "Protein",
      quantity: "Per Crate",
      date: "Bango&apos;d on 02/12/2025",
    },
    {
      image: "/images/dashboard/groundnut_oil.jpg",
      name: "Ground Oil",
      price: "#800",
      bangos: "1,247 Bangos",
      category: "Households",
      quantity: "Per Kg",
      date: "Bango&apos;d on 02/12/2025",
    },
    {
      image: "/images/dashboard/rice.jpg",
      name: "Rice",
      price: "#25000",
      bangos: "1,247 Bangos",
      category: "Grain",
      quantity: "Per bag",
      date: "Bango&apos;d on 02/12/2025",
    },
  ];

  return (
    <div>
      <h1>Welcome Back, Rose!</h1>
      <Input
        type="text"
        placeholder="Search for prices, markets...."
        // name="password"
        // value={formData.password}
        // onChange={handleChange}
        className="w-full"
      />
      <div>
        <div className="form">
          {FILTERS.map((filter, index) => (
              <div>
                  <h3>Filter by</h3>
              <div className="flex" key={index}>
                <input type="checkbox" name="" id="" /> <p>{filter}</p>{" "}
              </div>
            </div>
          ))}
        </div>
        <div>
          <div className="bg-(--color-primary) w-full text-white rounded-md h-10 ">
            <h3>Discover real prices</h3>
            <h4>Crowdsourced prices from across Nigeria</h4>
            <SecondaryButton
              text="Explore Timeline"
              // onClick={handleGoogleSignIn}
              // iconSrc="/images/on-boarding/google-icon.svg"
            />
          </div>

          {/* categories */}
          <div className=" flex  justify-between ">
            {CATEGORIES.map((category, index) => (
              <div className="text-center bg-white flex " key={index}>
                <h3>{category}</h3>
              </div>
            ))}
          </div>

          <div>
            {/* commodities */}
            <div>
              {COMMODITIES.map((commodity, index) => (
                <div className="form" key={index}>
                  <div>
                    <Image
                      src={commodity.image}
                      alt={commodity.name}
                      width={400}
                      height={146}
                    />
                    <div>
                      <p>Trending Now</p>
                    </div>
                    <div>
                      <p>{commodity.bangos}</p>
                    </div>
                  </div>
                  <div>
                    <p>{commodity.name}</p>
                    <p>{commodity.price}</p>
                  </div>
                  <div>
                    <p>{commodity.category}</p>
                    <p>{commodity.quantity}</p>
                  </div>
                  <p>{commodity.date}</p>
                  <Button
                    firstBtn="Insights"
                    secondBtn="Bango this item"
                    firstHref="*"
                    secondHref="*"
                    className=" md:flex "
                  />
                </div>
              ))}
            </div>
          </div>
          <div>
            <div>
              <h4>Your Location: Abuja</h4>
              <p>See prices near you</p>
            </div>
            <SecondaryButton
              text="Change Location"
              // onClick={handleGoogleSignIn}
              // iconSrc="/images/on-boarding/google-icon.svg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Timeline;
