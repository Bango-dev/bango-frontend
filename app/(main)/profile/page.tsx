import Image from "next/image";

const Profile = () => {

      const METRICS = [
        {
          icon: "/images/profile/chart.svg",
          metric_title: "Points",
          metric_value: "2,450",
        },
        {
          icon: "/images/profile/box.svg",
          metric_title: "Bangos",
          metric_value: "156",
        },
        {
          icon: "/images/profile/flame.svg",
          metric_title: "Day Streak",
          metric_value: "12",
        },
    ];

    const METRIC_COLORS = [
      "text-[#14AE5C]", // Points
      "text-[#4B2CA9]", // Bangos
      "text-[#6B0F1A]", // Day Streak
    ];


  return (
    <div className="py-10 px-20 flex flex-col gap-10 ">
      <div className="flex items-center gap-5 ">
        <div>
          {" "}
          <Image
            // className="pl-4"
            src="/images/profile/display-pic.png"
            alt="Profile picture"
            width={56}
            height={56}
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-2 ">Rose Doe</h1>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 bg-[#DFE0FF] py-3 px-5 rounded-full ">
              {" "}
              <Image
                // className="pl-4"
                src="/images/profile/tag.svg"
                alt="tag"
                width={16}
                height={21}
              />
              <span className=" text-xs text-(--color-primary) ">
                Price Hunter
              </span>
            </div>
            <h3 className="text-lg text-[#B3B3B3]">Level 3</h3>
          </div>
        </div>
      </div>

      {/* metrics */}
      <div className=" flex md:flex-row flex-col gap-6 justify-between ">
        {METRICS.map((metric, index) => (
          <div className="text-center bg-white form py-10 " key={index}>
            <Image
              className="mx-auto"
              src={metric.icon}
              alt="icon"
              width={20}
              height={20}
            />
            <h3 className={` text-4xl ${METRIC_COLORS[index]} `}>
              {metric.metric_value}
            </h3>
            <h4 className="text-[#757575] text-base">{metric.metric_title}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Profile;
