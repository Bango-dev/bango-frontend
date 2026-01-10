"use client";
import { useState } from "react";
import Image from "next/image";
import SecondaryButton from "../../components/ui/SecondaryButton";
import Input from "../form/Input";
import Toggle from "../../components/ui/Toggle";
import StreakDialog from "../../components/StreakDialog";

const Profile = () => {
   const [open, setOpen] = useState(false);
  const CATEGORIES = ["Activities", "Leader Board", "Badges", "Settings"];
  const DISTANCE = ["2km", "5km", "10km", "custom"];
  const TOP_CATEGORIES = ["Vegetables", "Grains", "Fruits", "Dairy"];
  const [activeCategory, setActiveCategory] = useState("Activities");
  const [activeDistance, setActiveDistance] = useState("5km");
  const [openSections, setOpenSections] = useState({
    profile: true,
    password: true,
    location: true,
    notifications: true,
  });

  const toggleSection = (key: keyof typeof openSections) => {
    setOpenSections((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const Arrow = ({ open }: { open: boolean }) => (
    <Image
      src="/images/profile/arrow-down.svg"
      alt="toggle"
      width={7}
      height={12}
      className={`transition-transform duration-300 ${
        open ? "rotate-180" : "rotate-0"
      }`}
    />
  );


  const BANGO_USERS = [
    {
      image: "/images/profile/nolanda.png",
      name: "Doe Nolanda",
      level: "Diamond Hunter",
      streak: "45",
      bangos: "400",
      pts: "15,420 pts",
      icon: "/images/profile/bango-crown.svg",
    },
    {
      image: "/images/profile/emeka.png",
      name: "Emeka Chkwuka",
      level: "Gold Spotter",
      streak: "32",
      bangos: "298",
      pts: "12,850 pts",
      icon: "/images/profile/diamond.svg",
    },
    {
      image: "/images/profile/john.png",
      name: "John solo",
      level: "Silver Scout",
      streak: "28",
      bangos: "276",
      pts: "11,200 pts",
      icon: "/images/profile/bronze-medal.svg",
    },
    {
      image: "/images/profile/doe.png",
      name: "Rose Yohanna",
      level: "Price hunter",
      streak: "12",
      bangos: "189",
      pts: "8,450 pts",
      position: 4,
      isCurrentUser: true,
    },
    {
      image: "/images/profile/fatima.png",
      name: "Fatima Ibrahim",
      level: "Bronze Hunter",
      streak: "10",
      bangos: "156",
      pts: "7,200 pts",
      position: 5,
    },
    {
      image: "/images/profile/lindi.png",
      name: "Lindi Woman",
      level: "Bronze Hunter",
      streak: "8",
      bangos: "134",
      pts: "6,100 pts",
      position: 6,
    },
    {
      image: "/images/profile/woban.png",
      name: "Woban Cynthia",
      level: "Rising Star",
      streak: "8",
      bangos: "134",
      pts: "15,420 pts",
      position: 7,
    },
    {
      image: "/images/profile/oluwaseun.png",
      name: "Oluwaseun Balogun",
      level: "Price Pioneer",
      streak: "6",
      bangos: "134",
      pts: "15,420 pts",
      position: 8,
    },
    {
      image: "/images/profile/caleb.png",
      name: "Caleb Moses",
      level: "Price Pioneer",
      streak: "5",
      bangos: "134",
      pts: "15,420 pts",
      position: 9,
    },
    {
      image: "/images/profile/ngozi.png",
      name: "Ngozi Eze",
      level: "Price Pioneer",
      streak: "5",
      bangos: "134",
      pts: "15,420 pts",
      position: 10,
    },
  ];

  const RECENT_BANGOS = [
    {
      image: "/images/profile/tomatoes.png",
      title: "Tomatoes",
      price: 350,
      category: "Vegetables",
      points: "+15pts",
    },
    {
      image: "/images/profile/tomatoes.png",
      title: "Tomatoes",
      price: 350,
      category: "Vegetables",
      points: "+15pts",
    },
    {
      image: "/images/profile/tomatoes.png",
      title: "Tomatoes",
      price: 350,
      category: "Vegetables",
      points: "+15pts",
    },
    {
      image: "/images/profile/tomatoes.png",
      title: "Tomatoes",
      price: 350,
      category: "Vegetables",
      points: "+15pts",
    },
    {
      image: "/images/profile/tomatoes.png",
      title: "Tomatoes",
      price: 350,
      category: "Vegetables",
      points: "+15pts",
    },
    {
      image: "/images/profile/tomatoes.png",
      title: "Tomatoes",
      price: 350,
      category: "Vegetables",
      points: "+15pts",
    },
    {
      image: "/images/profile/tomatoes.png",
      title: "Tomatoes",
      price: 350,
      category: "Vegetables",
      points: "+15pts",
    },
  ];

  const RECENT_ACTIVITIES = [
    {
      title: "Bango'd Tomatoes",
      time: "2 minutes",
      points: "+15pts",
    },
    {
      title: "Streak Bonus (Day 12)",
      time: "1 hours",
      points: "+50pts",
    },
    {
      title: "Bango'd Rice",
      time: "3 hours",
      points: "+15pts",
    },
    {
      title: "Bango'd Rice",
      time: "3 hours",
      points: "+15pts",
    },
  ];

  const GENERAL_NOTIFICATION = [
    {
      icon: "/images/profile/bell-icon.svg",
      title: "Activity Notifications",
    },
    {
      icon: "/images/profile/bell-icon.svg",
      title: "Push Notifications",
    },
    {
      icon: "/images/profile/reward-icon.svg",
      title: "Rewards Notifications",
    },
    {
      icon: "/images/profile/envelop-icon.svg",
      title: "Email Notifications",
    },
  ];

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

  const ACHIEVEMENTS = [
    {
      icon: "/images/profile/hit-target.png",
      title: "First Bango",
      task: "Submit your first price",
      earned: true,
    },
    {
      icon: "/images/profile/magnifier.png",
      title: "Price Scout",
      task: "Submit 10 prices",
      earned: true,
    },
    {
      icon: "/images/profile/building.png",
      title: "Market Maven",
      task: "Submit 50 prices",
      earned: true,
    },
    {
      icon: "/images/profile/arrow.png",
      title: "Price Hunter",
      task: "Submit 100 prices",
      earned: true,
    },
    {
      icon: "/images/profile/trophy.png",
      title: "Data Champion",
      task: "Submit 500 prices",
      earned: false,
    },
    {
      icon: "/images/profile/crown.png",
      title: "Bango Legend",
      task: "Submit 1000 prices",
      earned: false,
    },
    {
      icon: "/images/profile/trophy.png",
      title: "Weekly Warrior",
      task: "Submit 10 bangos in a week",
      earned: false,
    },
    {
      icon: "/images/profile/crown.png",
      title: "Pioneer",
      task: "Be the first to submit a new Bango",
      earned: false,
    },
    {
      icon: "/images/profile/crown.png",
      title: "Streak Master",
      task: "Have a 14 day streak",
      earned: false,
    },
  ];

  const METRIC_COLORS = [
    "text-[#14AE5C]", // Points
    "text-[#4B2CA9]", // Bangos
    "text-[#6B0F1A]", // Day Streak
  ];



  const PROFILE = [
    {
      label: "Name",
      placeholder: "Rose Doe",
    },
    {
      label: "Email",
      placeholder: "rose@bango.ng",
    },
    {
      label: "Phone Number",
      placeholder: "07000000000",
    },
    {
      label: "Username",
      placeholder: "Rose",
    },
  ];

  const PASSWORD = [
    {
      label: "Input new Password",
      placeholder: "XXXXXXXXX",
    },
    {
      label: "Re-enter Password",
      placeholder: "XXXXXXXXX",
    },
  ];

  const getRowBg = (icon: string, isCurrentUser?: boolean) => {
    if (isCurrentUser) return "bg-[#EDEFFF]";
    if (icon === "/images/profile/bango-crown.svg") return "bg-[#FFF4CC]";
    if (icon === "/images/profile/diamond.svg") return "bg-[#E6ECF5]";
    if (icon === "/images/profile/bronze-medal.svg") return "bg-[#FBEAE5]";
    return "bg-white";
  };

  const getLevelBg = (icon: string, isCurrentUser?: boolean) => {
    if (isCurrentUser) return "bg-[#DFE0FF] text-[#4B2CA9]";
    if (icon === "/images/profile/bango-crown.svg") return "bg-[#FFE08A] text-[#7A5A00]";
    if (icon === "/images/profile/diamond.svg") return "bg-[#D6DEEA] text-[#2F3A4A]";
    if (icon === "/images/profile/bronze-medal.svg") return "bg-[#F4C7B8] text-[#7A2E1D]";
    return "bg-[#FFF9E7] text-[#BF6A02]";
  };

  const getNameColor = (isCurrentUser?: boolean) =>
    isCurrentUser ? "text-[#4B2CA9] font-semibold" : "text-[#303030]";

         const STREAK_REWARD_THRESHOLD = 7;

         const dayStreak = Number(
           METRICS.find((m) => m.metric_title === "Day Streak")?.metric_value ??
             0
         );

  return (
    <div className="py-10 px-20 flex flex-col gap-10 ">
      <div className="flex items-center gap-5 ">
        <div>
          {" "}
          <Image
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

      {/* dialog */}
      <StreakDialog isOpen={open} onClose={() => setOpen(false)} />

      <div className=" flex md:flex-row flex-col gap-6  justify-between ">
        {METRICS.map((metric, index) => (
          <div
            key={index}
            className="text-center bg-white form py-5 flex flex-col items-center gap-2"
          >
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

            {/*  Claim reward button only for Day Streak */}
            {metric.metric_title === "Day Streak" &&
              dayStreak >= STREAK_REWARD_THRESHOLD && (
                <button
                  className="mt-3 px-4 py-2 text-sm font-semibold rounded-full
                       bg-[#FFDADF] text-[#6B0F1A] border border-[#6B0F1A] hover:bg-[#ffdadfde]
                       transition"
                  onClick={() => setOpen(true)}
                >
                  Claim Reward
                </button>
              )}
          </div>
        ))}
      </div>

      {/* categories */}
      <div className="flex justify-between">
        {CATEGORIES.map((category, index) => {
          const isActive = activeCategory === category;

          return (
            <div
              key={index}
              onClick={() => setActiveCategory(category)}
              className={`text-center bg-white flex px-4 py-2 cursor-pointer rounded-lg border-b-2 transition
          ${
            isActive
              ? "border-[#1E1E1E] font-semibold"
              : "border-transparent hover:border-gray-300"
          }`}
            >
              <h3>{category}</h3>
            </div>
          );
        })}
      </div>

      {activeCategory === "Activities" && (
        <>
          {/* Top Categories */}
          <div className="flex gap-2">
            <Image
              src="/images/profile/black-chart.svg"
              alt="chart"
              width={16}
              height={21}
            />
            <h4 className="text-2xl font-semibold">Top Categories</h4>
          </div>
          <div className="flex gap-2">
            {TOP_CATEGORIES.map((category, index) => {
              return (
                <div
                  key={index}
                  className={`text-center text-[#02542D] flex px-4 py-2 cursor-pointer rounded-full bg-[#CFF7D3] transition
        `}
                >
                  <h3>{category}</h3>
                </div>
              );
            })}
          </div>

          <div className="flex w-full  ">
            {/* recent bangos */}
            <div className="form m-0 w-lg ">
              <div className="flex gap-4 ">
                <Image
                  src="/images/profile/box.svg"
                  alt="chart"
                  width={24}
                  height={26}
                />
                <h4 className="text-2xl font-semibold">Recent Bangos</h4>
              </div>

              {/* recent bangos */}
              <div className=" flex flex-col gap-6  ">
                {RECENT_BANGOS.map((bango, index) => (
                  <div className=" flex justify-between  bg-white" key={index}>
                    <div className="flex items-center gap-2">
                      <Image
                        src={bango.image}
                        alt="commodity"
                        width={48}
                        height={48}
                      />
                      <div>
                        {" "}
                        <h3 className={` text-2xl  `}>{bango.title}</h3>
                        <h4 className="text-[#757575] text-base">
                          {bango.category}
                        </h4>
                      </div>
                    </div>
                    <div>
                      <h3 className={` text-2xl  `}>{bango.price}</h3>
                      <h4 className="text-[#757575] text-base">
                        {bango.points}
                      </h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* total points */}
            <div className="form w-[60%] ">
              <div className="flex items-center justify-between ">
                <h4 className="text-2xl font-semibold">Total Points</h4>
                <p className="text-[#757575]">Next milestone: 3000</p>
              </div>
              <p className=" font-bold text-4xl text-(--color-primary) ">
                2,450 <span className="text-[#757575] text-2xl">pts</span>{" "}
              </p>

              <div className="bg-[#E6E6E6] rounded-full h-6 w-full -z-10 ">
                <div className="bg-(--color-primary) w-[50%] h-full rounded-full z-10"></div>
              </div>

              <p className="text-[#757575]">
                550 points to
                <span className=" text-(--color-primary) font-bold pl-2">
                  Data Champion
                </span>{" "}
                badge
              </p>

              <div className="form w-full h-[65%] ">
                <div className="flex gap-2">
                  <Image
                    src="/images/profile/black-chart.svg"
                    alt="chart"
                    width={26}
                    height={17}
                  />
                  <h4 className="text-2xl font-semibold">Point Growth</h4>
                </div>
                <div className=" w-full h-[80%] bg-[#EDEFFF] form  ">
                  <Image
                    className="w-full"
                    src="/images/profile/trend.svg"
                    alt="chart"
                    width={100}
                    height={1}
                  />
                  <div className="flex justify-around ">
                    <p className="text-[#757575]">Week 2</p>
                    <p className="text-[#757575]">Week 3</p>
                    <p className="text-[#757575]">Week 4</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full flex ">
            <div className="form m-0">
              <h2 className="font-semibold text-2xl">How you Earned</h2>

              {/* price submissions */}
              <div className="flex gap-4">
                <Image
                  src="/images/profile/target.svg"
                  alt="chart"
                  width={50}
                  height={50}
                />
                <div className="w-full">
                  <div className="flex justify-between mb-3">
                    <p>Price submissions</p>
                    <span>1,560</span>
                  </div>
                  <div className="bg-[#E6E6E6] rounded-full h-3 w-full -z-10 ">
                    <div className="bg-[#009951] w-[50%] h-full rounded-full z-10"></div>
                  </div>
                </div>
              </div>
              {/* streak bonuses */}
              <div className="flex gap-4">
                <Image
                  src="/images/profile/hot.svg"
                  alt="chart"
                  width={50}
                  height={50}
                />
                <div className="w-full">
                  <div className="flex justify-between mb-3">
                    <p>Streak Bonuses</p>
                    <span>1,560</span>
                  </div>
                  <div className="bg-[#E6E6E6] rounded-full h-3 w-full -z-10 ">
                    <div className="bg-[#6B0F1A] w-[50%] h-full rounded-full z-10"></div>
                  </div>
                </div>
              </div>

              {/* referrals */}
              <div className="flex gap-4">
                <Image
                  src="/images/profile/gift.svg"
                  alt="chart"
                  width={50}
                  height={50}
                />
                <div className="w-full">
                  <div className="flex justify-between mb-3">
                    <p>Referrals</p>
                    <span>1,560</span>
                  </div>
                  <div className="bg-[#E6E6E6] rounded-full h-3 w-full -z-10 ">
                    <div className="bg-[#BF6A02] w-[50%] h-full rounded-full z-10"></div>
                  </div>
                </div>
              </div>

              {/* early bonus */}
              <div className="flex gap-4">
                <Image
                  src="/images/profile/star.svg"
                  alt="chart"
                  width={50}
                  height={50}
                />
                <div className="w-full">
                  <div className="flex justify-between mb-3">
                    <p>Early Bird Bonus</p>
                    <span>1,560</span>
                  </div>
                  <div className="bg-[#E6E6E6] rounded-full h-3 w-full -z-10 ">
                    <div className="bg-[#BF6A02] w-[50%] h-full rounded-full z-10"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* recent activities */}
            <div className=" flex flex-col  form  ">
              <h2 className="font-semibold text-2xl">Recent Activity</h2>
              {RECENT_ACTIVITIES.map((bango, index) => (
                <div className=" flex justify-between  bg-white" key={index}>
                  <div className="flex items-center gap-2">
                    <div>
                      {" "}
                      <h3 className={` text-lg text-[#303030] font-semibold  `}>
                        {bango.title}
                      </h3>
                      <h4 className="text-[#757575] text-sm">{bango.time}</h4>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-[#757575] font-bold text-base">
                      {bango.points}
                    </h4>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {activeCategory === "Badges" && (
        <>
          {/* achievements */}
          <div className=" flex md:flex-row flex-wrap flex-col gap-4 ">
            {ACHIEVEMENTS.map((achievement, index) => (
              <div className="text-center bg-white form w-md " key={index}>
                <Image
                  className="mx-auto"
                  src={achievement.icon}
                  alt="icon"
                  width={48}
                  height={40}
                />
                <h3
                  className={` text-2xl font-semibold ${
                    achievement.earned ? "text-black" : "text-[#B3B3B3]"
                  }`}
                >
                  {achievement.title}
                </h3>
                <h4 className="text-[#757575] text-base">{achievement.task}</h4>
                <div
                  className={`w-fit mx-auto py-1 px-3 rounded-full ${
                    achievement.earned ? "bg-[#CFF7D3]" : "bg-[#D9D9D9]"
                  }  text-xs bg-[#CFF7D3]`}
                >
                  <p>Unlocked</p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {activeCategory === "Settings" && (
        <>
          {/* settings */}
          <div className="   form   ">
            <div
              className="flex items-center w-full justify-between cursor-pointer"
              onClick={() => toggleSection("profile")}
            >
              <h2 className="text-[#5A5A5A] text-2xl font-semibold">
                Profile Information
              </h2>
              <Arrow open={openSections.profile} />
            </div>

            <div
              className={`overflow-hidden transition-all duration-300 ${
                openSections.profile
                  ? "max-h-[1000px] opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >
              <div className="flex flex-wrap">
                {PROFILE.map((profile, index) => (
                  <div key={index} className="w-[48%] my-3 mx-auto">
                    <Input
                      label={profile.label}
                      placeholder={profile.placeholder}
                      type="text"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div
              className="flex items-center w-full justify-between cursor-pointer"
              onClick={() => toggleSection("password")}
            >
              <h3 className="text-[#5A5A5A] text-2xl font-semibold">
                Password
              </h3>
              <Arrow open={openSections.password} />
            </div>

            <div
              className={`overflow-hidden transition-all duration-300 ${
                openSections.password
                  ? "max-h-[600px] opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >
              <h4 className="text-lg text-[#009951] font-semibold">
                Change Password
              </h4>

              <div className="flex flex-wrap">
                {PASSWORD.map((password, index) => (
                  <div key={index} className="w-[48%] my-3 mx-auto">
                    <Input
                      label={password.label}
                      placeholder={password.placeholder}
                      type="text"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* location & region */}
            <div className="flex flex-col gap-3">
              <div
                className="flex items-center justify-between cursor-pointer"
                onClick={() => toggleSection("location")}
              >
                <h3 className="text-[#5A5A5A] text-2xl font-semibold">
                  Location & Region
                </h3>
                <Arrow open={openSections.location} />
              </div>

              <div
                className={`overflow-hidden flex flex-col gap-3 transition-all duration-300 ${
                  openSections.location
                    ? "max-h-[800px] opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="flex justify-between">
                  <div className="flex gap-4">
                    <Image
                      src="/images/profile/location-icon.svg"
                      alt="location"
                      width={14}
                      height={20}
                    />
                    <p className="font-semibold text-[#5A5A5A] ">
                      Primary Location
                    </p>
                  </div>
                  <div className="flex gap-2 ">
                    <p className="font-semibold text-[#5A5A5A] ">
                      Abuja, Nigeria
                    </p>{" "}
                    <Image
                      src="/images/profile/pencil.svg"
                      alt="location"
                      width={20}
                      height={20}
                    />
                  </div>
                </div>

                {/* auto detect location */}
                <div className="flex justify-between">
                  <div className="flex gap-2 ">
                    <Image
                      src="/images/profile/house.svg"
                      alt="location"
                      width={20}
                      height={20}
                    />
                    <p className="font-semibold text-[#5A5A5A] ">
                      Auto-detect Location
                    </p>
                  </div>
                  <div>
                    <Toggle />
                  </div>
                </div>
                {/* Nearby Distance */}
                <div className="flex  justify-between">
                  <div className="flex gap-2">
                    <Image
                      src="/images/profile/ruler.svg"
                      alt="location"
                      width={21}
                      height={21}
                    />
                    <p className="font-semibold text-[#5A5A5A] ">
                      Nearby Price Distance
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-[#5A5A5A] ">5km</p>
                  </div>
                </div>
                <hr className="text-[#B3B3B3]" />
                <p className="text-sm">Select distance for "Nearby Prices"</p>
                {/* categories */}
                <div className="flex gap-3">
                  {DISTANCE.map((distance, index) => {
                    const isActive = activeDistance === distance;

                    return (
                      <div
                        key={index}
                        onClick={() => setActiveDistance(distance)}
                        className={`text-center text-white flex px-4 py-2 cursor-pointer rounded-full transition
          ${
            isActive
              ? "bg-[#009951] text-white"
              : "bg-[#E6E6E6]  hover:bg-[#009951] hover:text-white "
          }`}
                      >
                        <h3
                          className={`  text-xs   ${
                            isActive
                              ? " text-white"
                              : " text-[#757575] hover:text-white "
                          } `}
                        >
                          {distance}
                        </h3>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div
                className="flex  items-center justify-between cursor-pointer"
                onClick={() => toggleSection("notifications")}
              >
                <h3 className="text-[#5A5A5A] text-2xl font-semibold">
                  General Notifications
                </h3>
                <Arrow open={openSections.notifications} />
              </div>

              <div
                className={`overflow-hidden  transition-all duration-300 ${
                  openSections.notifications
                    ? "max-h-[500px] opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                {GENERAL_NOTIFICATION.map((notification, index) => (
                  <div
                    key={index}
                    className="flex justify-between mt-3 items-center"
                  >
                    <div className="flex gap-2">
                      <Image
                        src={notification.icon}
                        alt={notification.title}
                        width={20}
                        height={20}
                      />
                      <p className="font-semibold text-[#5A5A5A]">
                        {notification.title}
                      </p>
                    </div>
                    <Toggle />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      {activeCategory === "Leader Board" && (
        <>
          {/* Leader Board */}
          <div className=" flex flex-col  ">
            {/* top members */}
            <div className="flex flex-col gap-3 items-center justify-center">
              <Image
                src="/images/profile/bango-trophy.svg"
                alt="location"
                width={100}
                height={100}
              />
              <h3 className=" text-3xl ">Bango Champions</h3>
              <p className=" text-lg text-[#B3B3B3] font-semibold ">
                Top price hunters this month
              </p>
              <div className="flex gap-5 items-end justify-evenly">
                <div className="flex flex-col justify-center gap-1 items-center ">
                  <Image
                    src="/images/profile/emeka.png"
                    alt="location"
                    width={100}
                    height={100}
                  />
                  <p className="text-xs">Emeka</p>
                  <p className="font-bold text-(--color-primary)">298</p>
                  <div className="rounded-t-2xl w-44 h-40 silver flex  justify-center items-center ">
                    <p className="text-3xl">2</p>
                  </div>
                </div>
                <div className="flex flex-col justify-center  items-center ">
                  <Image
                    src="/images/profile/bango-crown.svg"
                    alt="location"
                    width={18}
                    height={16}
                  />
                  <Image
                    src="/images/profile/doe.png"
                    alt="location"
                    width={100}
                    height={100}
                  />
                  <p className="text-xs">Doe</p>
                  <p className="font-bold text-(--color-primary)">400</p>
                  <div className="rounded-t-2xl w-44 h-60 bg-[#E8B931] flex  justify-center items-center ">
                    <p className="text-3xl text-white ">1</p>
                  </div>
                </div>
                <div className="flex flex-col justify-center gap-1 items-center ">
                  <Image
                    src="/images/profile/john.png"
                    alt="location"
                    width={100}
                    height={100}
                  />
                  <p className="text-xs">John</p>
                  <p className="font-bold text-(--color-primary)">275</p>
                  <div className="rounded-t-2xl w-44 h-30 bronze flex  justify-center items-center ">
                    <p className="text-3xl text-white">3</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-between mb-4 ">
              <p className="text-2xl font-bold text-[#757575]">Rank</p>
              <p className="text-2xl font-bold text-[#757575]">Bangos</p>
            </div>
            {BANGO_USERS.map((user, index) => (
              <div
                key={index}
                className={`flex justify-between border-b  border-[#B2B2B2] px-3 py-2 rounded-md
      ${getRowBg(user.icon, user.isCurrentUser)}`}
              >
                <div className="flex items-center gap-2 ">
                  {/* Position */}
                  <div className="w-8 flex justify-center">
                    {user.icon ? (
                      <Image
                        src={user.icon}
                        alt={`Position ${user.position}`}
                        width={12}
                        height={10}
                      />
                    ) : (
                      <span className="font-semibold text-gray-600">
                        {user.position}
                      </span>
                    )}
                  </div>
                  <div>
                    <Image
                      src={user.image}
                      alt={` ${user.name}`}
                      width={32}
                      height={32}
                    />
                  </div>
                  <div>
                    <p className={getNameColor(user.isCurrentUser)}>
                      {user.name}
                      {user.isCurrentUser && (
                        <span className="ml-1 text-xs">(You)</span>
                      )}
                    </p>

                    <div className="flex items-center gap-2">
                      <div
                        className={`rounded-full px-2 py-1 text-xs
    ${getLevelBg(user.icon, user.isCurrentUser)}`}
                      >
                        {user.level}
                      </div>{" "}
                      <div className="flex gap-1">
                        <Image
                          src="/images/profile/streak.svg"
                          alt="location"
                          width={9}
                          height={12}
                        />
                        <span className=" text-[#FF6376] text-xs ">
                          {user.streak}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <p className="text-right font-semibold ">{user.bangos}</p>
                  <p className=" text-[#757575] ">{user.pts}</p>
                </div>
              </div>
            ))}
            <h3 className="text-lg text-[#757575] text-center mt-4 ">
              See All
            </h3>

            <div className="bg-[#5C32D0] w-full text-white rounded-2xl text-center  h-60 p-10 ">
              <h3 className="text-2xl font-semibold">Weekly Challenge</h3>
              <h4 className=" my-6 ">
                Submit 10 Bangos to unlock the "Week Warrior" badge!
              </h4>
              <div className=" h-3 rounded-full w-full bg-[#B3B3B3] ">
                <div className=" h-full w-[60%] rounded-full bg-white "></div>
              </div>
              <p className="mt-4">6/10 completed</p>
            </div>
          </div>
        </>
      )}

      <div className="flex justify-between bg-[#DFE0FF] p-5 rounded-2xl ">
        <div>
          <h4 className="font-semibold text-[#4B2CA9] text-2xl ">
            Your Location: Abuja
          </h4>
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
};
export default Profile;
