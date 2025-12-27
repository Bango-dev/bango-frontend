import Input from "../form/Input";
import SecondaryButton from "../../components/ui/SecondaryButton";
import PrimaryButton from "../../components/ui/PrimaryButton";
import Image from "next/image";
import Button from "../../components/ui/Button";

const Dashboard = () => {

  const METRICS = [
    {
      metric_title: "Total Bangos",
      metric_value: "5000+",
    },
    {
      metric_title: "Products",
      metric_value: "847",
    },
    {
      metric_title: "Markets",
      metric_value: "156",
    },
  ];

  const TRENDING_COMMODITIES = [
    {
      image: "/images/dashboard/groundnut_oil.png",
      name: "Ground Oil",
      price: "#800",
      bangos: "1,247 Bangos",
      category: "Households",
      quantity: "Per Kg",
      date: "Bango'd on 02/12/2025",
    },
    {
      image: "/images/dashboard/egg.png",
      name: "Eggs",
      price: "#800",
      bangos: "1,247 Bangos",
      category: "Protein",
      quantity: "Per Crate",
      date: "Bango'd on 02/12/2025",
    },
    {
      image: "/images/dashboard/yam.png",
      name: "Yam",
      price: "#1500",
      bangos: "1,247 Bangos",
      category: "Tuber",
      quantity: "Per Pcs",
      date: "Bango'd on 02/12/2025",
    },
    {
      image: "/images/dashboard/rice.png",
      name: "Rice",
      price: "#25000",
      bangos: "1,247 Bangos",
      category: "Grain",
      quantity: "Per bag",
      date: "Bango'd on 02/12/2025",
    },
    {
      image: "/images/dashboard/beans.png",
      name: "Beans",
      price: "#800",
      bangos: "1,247 Bangos",
      category: "Grain",
      quantity: "Per kg",
      date: "Bango'd on 02/12/2025",
    },
    {
      image: "/images/dashboard/yam.png",
      name: "Yam",
      price: "#1500",
      bangos: "1,247 Bangos",
      category: "Tuber",
      quantity: "Per Pcs",
      date: "Bango'd on 02/12/2025",
    },
    {
      image: "/images/dashboard/egg.png",
      name: "Eggs",
      price: "#800",
      bangos: "1,247 Bangos",
      category: "Protein",
      quantity: "Per Crate",
      date: "Bango'd on 02/12/2025",
    },
    {
      image: "/images/dashboard/groundnut_oil.png",
      name: "Ground Oil",
      price: "#800",
      bangos: "1,247 Bangos",
      category: "Households",
      quantity: "Per Kg",
      date: "Bango'd on 02/12/2025",
    },
    {
      image: "/images/dashboard/rice.png",
      name: "Rice",
      price: "#25000",
      bangos: "1,247 Bangos",
      category: "Grain",
      quantity: "Per bag",
      date: "Bango'd on 02/12/2025",
    },
  ];

  return (
    <div className="py-10 px-20 flex flex-col gap-4 w-full ">
      <h1 className="font-bold text-3xl">Welcome Back, Rose!</h1>
      <Input
        type="text"
        placeholder="Search for prices, markets...."
        // name="password"
        // value={formData.password}
        // onChange={handleChange}
        className="w-full"
      />
      <div className="bg-[#5C32D0] w-full text-white rounded-lg  h-60 p-10 ">
        <h3 className="text-2xl font-semibold">Discover real prices</h3>
        <h4 className=" my-6 ">Crowdsourced prices from across Nigeria</h4>
        <SecondaryButton
          text="Explore Timeline"
          // onClick={handleGoogleSignIn}
          // iconSrc="/images/on-boarding/google-icon.svg"
          className=" text-[#5C32D0] "
        />
      </div>

      {/* metrics */}
      <div className=" flex md:flex-row flex-col gap-6 justify-between ">
        {METRICS.map((metric, index) => (
          <div className="text-center bg-white form " key={index}>
            <h3 className=" text-4xl text-(--color-primary)">
              {metric.metric_value}
            </h3>
            <h4 className="text-[#757575] text-base">{metric.metric_title}</h4>
          </div>
        ))}
      </div>

      <div>
        <div className="flex justify-between">
          <h4 className="text-2xl font-semibold">Trending Now</h4>
          <span>See all</span>
        </div>

        {/* trending commodities */}
        <div className="flex w-full flex-wrap my-5 gap-5 ">
          {TRENDING_COMMODITIES.map((commodity, index) => (
            <div className="form w-md  rounded-4xl p-0 " key={index}>
              <div>
                <Image
                  src={commodity.image}
                  alt={commodity.name}
                  width={400}
                  height={146}
                  className="w-full "
                />
                {/* <div>
                  <p>Trending Now</p>
                </div>
                <div>
                  <p>{commodity.bangos}</p>
                </div> */}
              </div>
              <div className="flex flex-col gap-2 px-6 pb-6 w-full">
                <div className="flex items-center justify-between font-semibold ">
                  <p className="text-[#1E1E1E] text-lg  ">{commodity.name}</p>
                  <p className="text-(--color-primary) text-2xl  ">
                    {commodity.price}
                  </p>
                </div>
                <div className="flex items-center justify-between text-[#757575] ">
                  <p>{commodity.category}</p>
                  <p>{commodity.quantity}</p>
                </div>
                <p className="text-[#757575]">{commodity.date}</p>
                <div className="w-full flex gap-3 ">
                  <SecondaryButton
                    text="Insights"
                    // onClick={handleGoogleSignIn}
                    // iconSrc="/images/on-boarding/google-icon.svg"
                    className=" text-[#5C32D0] w-full "
                  />
                  <PrimaryButton
                    text="Bango this item"
                    // type="submit"
                    // loading={loading}
                    // loadingText="Signing In..."
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-between bg-[#DFE0FF] p-5 rounded-2xl ">
        <div>
          <h4 className="font-semibold text-[#4B2CA9] text-2xl ">Your Location: Abuja</h4>
          <p className="text-[#757575]">See prices near you</p>
        </div>
        <SecondaryButton
          text="Change Location"
          // onClick={handleGoogleSignIn}
          // iconSrc="/images/on-boarding/google-icon.svg"
        />
      </div>
    </div>
  );
}
export default Dashboard