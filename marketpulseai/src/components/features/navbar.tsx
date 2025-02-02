"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import moment from "moment";
import logo from "../../../public/icon.png";
import userIcon from "../../../public/usericon.png";
import Link from "next/link";
import { getUserDetails } from "@/api/users";
import { UserDetails } from "@/models/userModel";
import { deleteThemeCookies } from "@/lib/cookies";

const Navbar = () => {
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUserDetails();
        setUserDetails(data?.userDetails || null);
      } catch (error) {
        console.error("Failed to fetch user details", error);
      }
    };

    fetchData();
  }, []);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  // Calculate days remaining
  const validUntil = userDetails?.["custom:valid_until"];
  const daysLeft = validUntil ? moment(validUntil).diff(moment(), "days") : null;

  return (
    <div className="py-2 px-6">
      <nav className="flex items-center justify-between w-11/12 mx-auto relative">
        <Link className="flex items-center gap-2 text-primary" href="/">
          <Image src={logo} alt="Market Pulse Logo" width={32} height={32} />
          <h1 className="text-xl font-semibold">M@rketPulse AI</h1>
        </Link>

        <div className="relative">
          <button onClick={toggleDropdown} className="rounded-full flex items-center justify-center">
            <span className="sr-only">Profile</span>
            <Image
              src={userDetails?.picture || userIcon}
              alt="User Profile Image"
              className="rounded-full"
              width={40}
              height={40}
            />
          </button>

          {isOpen && (
            <div
              id="dropdownInformation"
              className="z-10 absolute top-14 right-0 w-44 bg-white divide-y rounded-lg shadow-lg border border-gray-300 dark:bg-gray-700 dark:border-gray-600"
            >
              <div className="px-4 py-3 text-sm text-gray-900 dark:text-white flex flex-col items-center space-y-2">
                <div className="text-lg font-semibold">{userDetails?.preferred_username}</div>
                <div className="font-medium text-gray-600 dark:text-gray-300 truncate">
                  {userDetails?.email}
                </div>
              </div>
              <ul className=" text-sm text-gray-700 mb-4">
                <div className="space-y-4 mx-4">
                  <div className=" rounded-lg p-1 shadow-sm">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-black">Tier</span>
                      <span className="font-bold text-gray-900 dark:text-gray-100">
                        {userDetails?.["custom:subscription_status"] || "Free"}
                      </span>
                    </div>
                  </div>

                  {/* Days Remaining Section */}
                  {daysLeft !== null && (
                    <div className=" shadow-sm">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-black">Subscription ends in </span>
                        <span className="font-bold text-gray-900 dark:text-gray-100">
                          {daysLeft > 0 ? `${daysLeft} days` : "Expired"}
                        </span>
                      </div>
                    </div>
                  )}

                  <button className="w-full m-auto rounded-md bg-gray-400 text-black py-2">
                    Get Subscription
                  </button>

                  <button
                    className="w-full  m-auto rounded-md bg-red-500 text-white py-2 mt-2"
                    onClick={async () => {
                      await deleteThemeCookies();
                    }}
                  >
                    Logout
                  </button>
                </div>
              </ul>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
