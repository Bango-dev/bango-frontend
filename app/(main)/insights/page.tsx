"use client";

import Image from "next/image";
import Link from "next/link";
import { IoShareSocialSharp } from "react-icons/io5";
import PrimaryButton from "../../components/ui/PrimaryButton";
import SecondaryButton from "../../components/ui/SecondaryButton";
import { useRef, useState } from "react";

const RECENT_SUBMISSIONS = [
  {
    profile_image: "/images/profile/doe.png",
    user_name: "Chioma A.",
    time: "2 mins ago",
    market: "Mile 12 Market",
    price: "#2500",
  },
  {
    profile_image: "/images/profile/emeka.png",
    user_name: "Chioma A.",
    time: "2 mins ago",
    market: "Mile 12 Market",
    price: "#2500",
  },
  {
    profile_image: "/images/profile/fatima.png",
    user_name: "Chioma A.",
    time: "2 mins ago",
    market: "Mile 12 Market",
    price: "#2500",
  },
];

const LOWEST_MARKET_PRICES = [
  {
    market: "Mile 12 Market",
    location: "Lagos",
  },
  {
    market: "Garki Market",
    location: "Abuja",
  },
  {
    market: "Sabon Gari",
    location: "Kano",
  },
];

const REFERRAL_LINK = "https://bango.app/r/7F3K9Q2PBFCEJDBIJSCBHYSBJC/";

const SHARE_MESSAGE = encodeURIComponent(
  `Hey! Join me on Bango Market Day 👇\n${REFERRAL_LINK}`
);

const SHARE_PRICE = encodeURIComponent(`"Eggs Bango'd today at ₦2500/crate"`);

const sharePriceHandlers = {
  whatsapp: () => {
    window.open(`https://wa.me/?text=${SHARE_PRICE}`, "_blank");
  },

  x: () => {
    window.open(
      `https://twitter.com/messages/compose?text=${SHARE_PRICE}`,
      "_blank"
    );
  },

    telegram: () => {
        const PAGE_URL = encodeURIComponent(window.location.href);
        const SHARE_TEXT = encodeURIComponent(
          `"Eggs Bango'd today at ₦2500/crate"`
        );

      const appUrl = `https://t.me/share/url?url=${PAGE_URL}&text=${SHARE_TEXT}`;
      const webUrl = `https://web.telegram.org/k/#/share?url=${PAGE_URL}&text=${SHARE_TEXT}`;

      // Try opening the app
      window.location.href = appUrl;

      // Fallback to web after 1 second
      setTimeout(() => {
        window.location.href = webUrl;
      }, 1000);
  },
};


const shareHandlers = {
  whatsapp: () => {
    window.open(`https://wa.me/?text=${SHARE_MESSAGE}`, "_blank");
  },

  facebook: () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${REFERRAL_LINK}`,
      "_blank"
    );
  },

  x: () => {
    // Opens DM inbox where user selects recipient
    window.open(
      `https://twitter.com/messages/compose?text=${SHARE_MESSAGE}`,
      "_blank"
    );
  },

  email: () => {
    const subject = encodeURIComponent("Join me on Market Day");
    const body = encodeURIComponent(
      `Hey,\n\nJoin me on Market Day using this link:\n${REFERRAL_LINK}`
    );

    // Gmail app → Gmail web fallback
    window.open(
      `https://mail.google.com/mail/?view=cm&fs=1&su=${subject}&body=${body}`,
      "_blank"
    );
  },
};

const SOCIALS_ICONS = [
  {
    icon: "/images/insights/whatsapp-logo.svg",
    label: "WhatsApp",
    onClick: shareHandlers.whatsapp,
  },
  {
    icon: "/images/insights/facebook-logo.svg",
    label: "Facebook",
    onClick: shareHandlers.facebook,
  },
  {
    icon: "/images/insights/x-logo.svg",
    label: "X",
    onClick: shareHandlers.x,
  },
  {
    icon: "/images/insights/email-icon.svg",
    label: "Email",
    onClick: shareHandlers.email,
  },
];

const Insights = () => {
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const linkRef = useRef<HTMLParagraphElement>(null);

  const handleCopyLink = () => {
    if (linkRef.current) {
      const textToCopy = linkRef.current.textContent || "";
      navigator.clipboard
        .writeText(textToCopy)
        .then(() => {
          alert("Link copied!");
        })
        .catch((err) => {
          console.error("Failed to copy link: ", err);
        });
    }
  };

  return (
    <div className="py-10 px-20">
      <div className=" w-full flex justify-between items-center mb-5 ">
        <Link href="/search-result/grid-view">
          <div className="flex justify-start items-center  cursor-pointer gap-2 w-fit">
            <Image
              src="/images/form/arrow-left.svg"
              alt="Back arrow"
              width={24}
              height={24}
            />
            <span>Back</span>
          </div>
        </Link>

        <IoShareSocialSharp
          className="h-6 w-6"
          onClick={() => setShowDialog(!showDialog)}
          //   onClick={() => setShowDialog(!showDialog)}
        />
      </div>

      {/* dialog box */}
      {showDialog && (
        <div className=" fixed inset-0 flex justify-center items-center bg-black/40  z-50">
          <div className="flex flex-col  justify-center items-center form border border-(--color-primary)  rounded-md p-6  bg-[#FAFAFE]   sm:w-xl w-[90%]  ">
            <div className="flex items-center justify-center w-full relative ">
              <h3 className=" text-(--color-primary) sm:text-2xl text-lg font-bold ">
                Invite your friends
              </h3>

              <Image
                src="/images/insights/cancel-icon.svg"
                alt="cancel icon"
                width={14}
                height={14}
                className=" absolute right-1 enable-hover-cursor cursor-pointer  "
                onClick={() => setShowDialog(!showDialog)}
              />
            </div>
            <hr className="w-full text-(--color-primary) " />

            <p className=" text-[#757575]  sm:text-base text-sm text-center">
              Share your referral link and get points every time someone signs
              up through you. The more people you bring in, the smarter the
              market becomes, for everyone.
            </p>

            <div className="flex w-full justify-center">
              {SOCIALS_ICONS.map((social, index) => (
                <div
                  key={index}
                  className=" justify-evenly w-full flex flex-col "
                >
                  <div className="flex  items-center justify-evenly  my-3 cursor-pointer w-full  ">
                    <div
                      className="relative aspect-square w-[clamp(2.5rem,6vw,5.5rem)]"
                      onClick={social.onClick}
                    >
                      <Image
                        src={social.icon}
                        alt={social.label}
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                  <p className="flex text-xs sm:text-sm md:text-base  items-center justify-evenly  my-3 cursor-pointer w-full">
                    {social.label}
                  </p>
                </div>
              ))}
            </div>

            <div className="border flex rounded-md items-center p-2 justify-between w-full border-[#757575] bg-[#F5F5F5]">
              <p
                className="text-[#B3B3B3] sm:text-base text-[0.55rem]    "
                ref={linkRef}
              >
                https://bango.app/r/7F3K9Q2PBFCEJDBIJSCBHYSBJC/
              </p>

              <PrimaryButton
                text="Copy Link"
                className="rounded-xl h-8 p-0  w-[20%] sm:text-sm text-[0.55rem]  text-white  "
                onClick={handleCopyLink}
              />
            </div>
          </div>
        </div>
      )}

      <div className="form w-full ">
        <div className="flex justify-between  ">
          <div>
            <span className=" text-[#757575] text-sm ">Sweetener</span>
            <h3 className="text-2xl font-semibold">Sugar</h3>
          </div>
          <div>
            <p className=" text-(--color-primary) font-semibold text-2xl ">
              #2500
            </p>
            <span className=" text-[#757575] text-sm ">Per Kg</span>
          </div>
        </div>
        <div className="flex  mt-5 items-center gap-2 text-[#767676] text-xs ">
          <Image
            src="/images/profile/black-chart.svg"
            alt="chart"
            width={16}
            height={21}
          />
          <p>2,156 Bangos</p>
          <p>Updated 15 mins ago</p>
        </div>
        <div className="flex gap-3">
          <PrimaryButton text="Bango this item" className="w-60" />
          <SecondaryButton
            text="Share"
            className="w-60 text-(--color-primary)"
            iconSrc="images/insights/share-icon.svg"
            iconClassName="w-5 h-5"
            onClick={() => setShowDialog(!showDialog)}
          />
        </div>
      </div>

      <div className="form w-full mt-10 ">
        <div className="flex items-center gap-2 ">
          <Image
            src="/images/profile/black-chart.svg"
            alt="chart"
            width={28}
            height={17}
          />
          <h3 className="text-2xl font-semibold ">Price History (7 Days)</h3>
        </div>
        <div>
          <Image
            src="/images/insights/price-history.png"
            alt="chart"
            width={1192}
            height={293}
            className="w-full"
          />
        </div>
      </div>

      <div className="mt-10">
        <h3 className="text-2xl font-semibold">Recent Submissions</h3>
        <div>
          {RECENT_SUBMISSIONS.map((submission, index) => (
            <div
              key={index}
              className="flex items-center justify-between  py-4"
            >
              <div className="flex items-center gap-3">
                <Image
                  src={submission.profile_image}
                  alt="profile"
                  width={40}
                  height={40}
                />
                <div>
                  <p className="font-semibold">{submission.user_name}</p>
                  <div className="flex items-center gap-3 ">
                    <div className="flex items-center gap-1">
                      {" "}
                      <Image
                        src="/images/profile/location-icon.svg"
                        alt="location"
                        width={9}
                        height={13}
                        // className="w-full"
                      />
                      <span className="text-[#757575] text-sm">
                        {submission.market}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Image
                        src="/images/insights/clock.svg"
                        alt="clock"
                        width={13}
                        height={13}
                        // className="w-full"
                      />
                      <p className="text-[#757575] text-sm">
                        {submission.time}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-(--color-primary) font-bold text-lg">
                  {submission.price}
                </span>
              </div>
            </div>
          ))}
          {/* } */}
        </div>
      </div>

      {/* lowest market prices */}
      <div className="mt-10">
        <h2 className=" text-2xl font-semibold">Popular Markets</h2>
        <div>
          {LOWEST_MARKET_PRICES.map((item, index) => (
            <div
              key={index}
              className="flex gap-2 items-center border-b border-[#B3B3B3] py-4"
            >
              <div className=" h-8 w-8 rounded-full bg-[#DFE0FF] flex items-center justify-center ">
                <span className="text-(--color-primary)">{index + 1}</span>
              </div>
              <div>
                <p className="font-semibold text-2xl ">{item.market}</p>
                <p className="text-[#757575]">{item.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className=" bg-(--color-primary) rounded-md p-6 mt-10 h-48 flex flex-col justify-center gap-4">
        <h3 className="text-[#EDEFFF] font-semibold text-2xl">
          Share this price
        </h3>
        <p className="text-[#B3B3B3] text-lg ">
          "Eggs Bango'd today at ₦2500/crate"
        </p>
        <div className="flex items-center gap-3">
          <SecondaryButton
            text="Whatsapp"
            className="w-60 text-(--color-primary)"
            iconSrc="images/insights/whatsapp-icon.svg"
            iconClassName="w-5 h-5"
            onClick={sharePriceHandlers.whatsapp}
          />
          <SecondaryButton
            text="Telegram"
            className="w-60 text-(--color-primary)"
            onClick={sharePriceHandlers.telegram}
          />
          <SecondaryButton
            text="X"
            className="w-60 text-(--color-primary)"
            // iconSrc="images/insights/share-icon.svg"
            iconClassName="w-5 h-5"
            onClick={sharePriceHandlers.x}
          />
        </div>
      </div>
    </div>
  );
};
export default Insights;
