"use client";

import React, { useState } from "react";
import Image from "next/image";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

type Notification = {
  id: number;
  title: string;
  message: string;
  time: string;
  read: boolean;
};

const INITIAL_NOTIFICATIONS: Notification[] = [
  {
    id: 1,
    title: "Streak Reminder",
    message: "Don't forget to claim your daily streak! You're on a 5-day roll.",
    time: "1 min ago",
    read: false,
  },
  {
    id: 2,
    title: "Reward Earned",
    message: "You earned 15 points for your Rice submission!",
    time: "1 hour ago",
    read: false,
  },
  {
    id: 3,
    title: "Market Update",
    message: "Prices for eggs have increased in your region.",
    time: "2 hours ago",
    read: false,
  },
  {
    id: 4,
    title: "Submission Approved",
    message: "Your Yam price submission has been approved.",
    time: "2 hours ago",
    read: true,
  },
  {
    id: 5,
    title: "Bonus Points",
    message: "You received 10 bonus points for consistency!",
    time: "3 hours ago",
    read: true,
  },
];

const NotificationsDialog: React.FC<Props> = ({ isOpen, onClose }) => {
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);

  if (!isOpen) return null;

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      {/* Modal container */}
      <div className="bg-white rounded-xl w-full max-w-205 max-h-[90vh] flex flex-col shadow-lg">
        {/* ================= HEADER ================= */}
        <div className="flex flex-col  gap-4 px-6 py-4 w-205 linear-dialog rounded-t-xl h-48">
          <div className="flex items-center justify-end w-full">
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-xl"
            >
              ✕
            </button>
          </div>

          <div className="flex justify-start items-center gap-2">
            {" "}
            <div>
              {" "}
              <Image
                src="/images/profile/green-flame.svg"
                alt="Notifications"
                width={80}
                height={80}
              />
            </div>
            <div>
              <h2 className="text-3xl font-semibold">Notifications</h2>
              <p className="text-[#2C2C2C] text-lg">{unreadCount} unread</p>
            </div>
          </div>
          {/* Mark all as read */}
          <div className="flex items-center gap-2">
            <Image
              src="/images/profile/green-check.svg"
              alt="check icon"
              width={17}
              height={13}
            />
            <button
              onClick={markAllAsRead}
              className="text-[#14AE5C] font-semibold text-sm hover:underline"
            >
              Mark all as read
            </button>
          </div>
        </div>

        {/* ================= CONTENT ================= */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
          {/* Notifications list */}
          <div className="space-y-4">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`flex items-start justify-between p-4 rounded-lg transition
                  ${notification.read ? "bg-[#F1F1F1]" : "bg-[#E8F8F0]"}`}
              >
                <div className="flex items-start gap-3">
                  {/* Icon */}


                  {/* Text */}
                  <div>
                    <p className="font-semibold text-[#1E1E1E]">
                      {notification.title}
                    </p>
                    <p className="text-[#757575] text-sm">
                      {notification.message}
                    </p>
                    <p className="text-[#757575] text-sm">
                      {notification.time}
                    </p>
                  </div>
                </div>

                {/* Green dot for unread */}
                {!notification.read && (
                  <span className="w-3 h-3 bg-[#14AE5C] rounded-full mt-2" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationsDialog;
