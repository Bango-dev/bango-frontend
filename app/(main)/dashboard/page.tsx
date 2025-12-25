import Input from "../form/Input";
import SecondaryButton from "../../components/ui/SecondaryButton";
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
    <div className="py-10 px-20 flex flex-col gap-4 ">
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
          <h4>Trending Now</h4>
          <span>See all</span>
        </div>

        {/* trending commodities */}
        <div>
          {TRENDING_COMMODITIES.map((commodity, index) => (
            <div className="form p-0 " key={index}>
              <div>
                <Image
                  src={commodity.image}
                  alt={commodity.name}
                  width={400}
                  height={146}
                  className="w-full "
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
  );
}
export default Dashboard