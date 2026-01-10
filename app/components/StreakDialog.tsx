"use client";

import React from "react";
import Image from "next/image";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const STREAK_COUNT = 4; // example: Mon–Thu

const MILESTONES = [
  { days: 3, label: "3-Day Streak Reward", bonus: "+25 bonus points" },
  { days: 14, label: "14-Day Streak Reward", bonus: "Streak Master Badge" },
  {
    days: 30,
    label: "30-Day Streak Reward",
    bonus: "+500 bonus points + Rare Badge",
  },
];

const StreakDialog: React.FC<Props> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const progressPercent = Math.min((STREAK_COUNT / 7) * 100, 100);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      {/* Modal container */}
      <div className="bg-white rounded-xl w-full max-w-205 max-h-[90vh] flex flex-col shadow-lg">
        {/* ================= HEADER ================= */}

        <div className="flex flex-col items-center gap-4 px-6 py-4 w-205 linear-dialog rounded-t-xl h-85.75">
          <div className="flex items-center bg-transparent justify-end px-6 py-4 w-full">
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-xl"
            >
              ✕
            </button>
          </div>
          <Image
            src="/images/profile/streaks-icon.svg"
            alt="Profile picture"
            width={100}
            height={95}
          />
          <h2 className="text-3xl font-semibold">{STREAK_COUNT} Day Streak!</h2>
          <p className="text-[#2C2C2C] text-lg">
            Keep it going to earn bonus rewards
          </p>
        </div>

        {/* ================= SCROLLABLE CONTENT ================= */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-10">
          {/* ---------- Weekly Streak ---------- */}
          <section>
            <div className="flex items-center mb-4 gap-2">
              <Image
                src="/images/profile/calender-icon.svg"
                alt="Profile picture"
                width={18}
                height={20}
              />
              <h3 className="text-lg font-semibold ">Weekly Streak</h3>
            </div>

            <div className="grid grid-cols-7 gap-4 text-center">
              {DAYS.map((day, index) => {
                const active = index < STREAK_COUNT;

                return (
                  <div key={day} className="flex flex-col items-center gap-2">
                    <div
                      className={`w-[96] h-[96] rounded-full flex items-center justify-center transition
                        ${active ? "bg-[#14AE5C]" : "bg-[#F1F1F1]"}`}
                    >
                      {active ? (
                        <Image
                          src="/images/profile/white-check.svg"
                          alt="checkmark"
                          width={35}
                          height={26}
                        />
                      ) : (
                        <Image
                          src="/images/profile/circle.svg"
                          alt="circle"
                          width={24}
                          height={24}
                        />
                      )}
                    </div>
                    <span className="text-sm text-gray-600">{day}</span>
                  </div>
                );
              })}
            </div>
          </section>

          {/* ---------- Next Reward ---------- */}
          <section className="linear-reward p-6 rounded-md  ">
            <div className="flex  items-center gap-3">
              <div>
                <Image
                  src="/images/profile/trophy-icon.svg"
                  alt="circle"
                  width={48}
                  height={48}
                />
              </div>
              <div>
                <h3 className="text-lg font-semibold ">Next Reward</h3>
                <p className="text-sm text-gray-600 ">
                  {STREAK_COUNT} / 7 days completed
                </p>
              </div>
            </div>

            <div className="w-full h-3 mt-5 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full linear-level transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </section>

          {/* ---------- Milestones ---------- */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="/images/profile/gift-icon.svg"
                alt="reward gift"
                width={22}
                height={20}
              />
              <h3 className="text-lg font-semibold ">Streak Milestones</h3>
            </div>
            <div className="space-y-4">
              {MILESTONES.map((milestone) => {
                const achieved = STREAK_COUNT >= milestone.days;

                return (
                  <div
                    key={milestone.days}
                    className={`flex items-center justify-between p-4 rounded-lg transition
                      ${achieved ? "bg-green-100" : "bg-gray-100"}`}
                  >
                    <div className="flex items-center gap-3" >
                      <div>
                        <Image
                          src="/images/profile/target.png"
                          alt="reward gift"
                          width={32}
                          height={26}
                        />
                      </div>
                      <div>
                        <p className="font-semibold text-[#14AE5C] text-lg">
                          {milestone.label}
                        </p>
                        <p className="text-[#757575]  ">{milestone.bonus}</p>
                      </div>
                    </div>

                    {achieved && (
                      <span className="text-green-600 font-bold text-lg">
                        ✓
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default StreakDialog;
