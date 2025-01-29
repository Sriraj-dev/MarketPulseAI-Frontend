"use client";
import React, {  useEffect, useState } from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import logo from "../../../public/icon.png";
import user from "../../../public/usericon.png";
import Link from "next/link";
import { getUserDetails } from "@/api/users";
import { UserDetails } from "@/models/userModel";

const Navbar = () => {

  const [userDetails, setUserDetails] = useState<UserDetails>();
  // const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUserDetails();
        setUserDetails(data.userDetails);
      } catch (error) {
        console.error("Failed to fetch user details", error);
      } finally {
        // setLoading(false);
      }
    };

    fetchData();
  }, []);

  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <div className="py-2 px-6">
    <nav className="flex items-center justify-between w-11/12 mx-auto ">
        <Link className="flex items-center gap-2 text-primary"
        href={"/"}
        >
        <Image
            src={logo}
            alt="Market Pulse Logo"
            width={32}
            height={32}
          />
        <h1 className=" text-xl font-semibold">M@rketPulse AI</h1>
      </Link>
    <button
    onClick={toggleDropdown}
    className="rounded-full bg-transparent flex items-center justify-center"
  >
    <span className="sr-only">Profile</span>

    {user ? (
      <Image
        src={userDetails?.picture || user}
        alt="User Profile Image"
        className="rounded-full"
        width={50}
        height={50}
      />
    ) : (
      <Image
        src={user}
        alt="Fallback Profile Image"
        className="rounded-full"
        width={50}
        height={50}
      />
    )}
  </button>
      {isOpen && (
        <div
          id="dropdownInformation"
          className="z-10 absolute top-20 right-8 md:right-4 w-44 bg-white divide-y rounded-lg shadow-lg border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:divide-gray-600"
        >
          <div className="px-4 py-3 text-sm text-gray-900 dark:text-white flex flex-col items-center space-y-2">
          <div className="text-lg font-semibold">{userDetails?.preferred_username}</div>
            <div className="font-medium text-gray-600 dark:text-gray-300 truncate">
              {userDetails?.email}
            </div>
          </div>
          <ul
            className="py-2 text-sm text-gray-700 "
            aria-labelledby="dropdownInformationButton"
          >
            <div className="space-y-4 mx-4">
              <div className="bg-muted/50 rounded-lg p-3 shadow-sm">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-black ">
                    Tier
                  </span>
                  <span className="font-bold text-gray-900 dark:text-gray-100">
                    {userDetails?.["custom:subscription_status"]}
                  </span>
                </div>
              </div>
              <Button className="w-full mt-4" variant="default">
                Get Subscription
              </Button>
            </div>
          </ul>
        </div>
      )}
    </nav>
    </div>
  );
};

export default Navbar;
