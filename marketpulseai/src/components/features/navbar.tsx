"use client";
import { CircleUserRound } from "lucide-react";
import React, { useState } from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import logo from "../../../public/icon.png";
import user from "../../../public/usericon.png";
import Link from "next/link";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <div className=" p-6">
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

        {/* <CircleUserRound /> */}
        <Image
            src={user}
            alt="Market Pulse Logo"
            width={50}
            height={50}
          />
      </button>
      {isOpen && (
        <div
          id="dropdownInformation"
          className="z-10 absolute top-20 right-8 md:right-4 w-44 bg-white divide-y rounded-lg shadow-lg border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:divide-gray-600"
        >
          <div className="px-4 py-3 text-sm text-gray-900 dark:text-white flex flex-col items-center space-y-2">
            <CircleUserRound className="h-16 w-16 mb-4">
              <div className="bg-primary text-primary-foreground rounded-full w-full h-full flex items-center justify-center text-xl">
                U
              </div>
            </CircleUserRound>
            <div className="text-lg font-semibold">Bonnie Green</div>
            <div className="font-medium text-gray-600 dark:text-gray-300 truncate">
              name@flowbite.com
            </div>
          </div>
          <ul
            className="py-2 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="dropdownInformationButton"
          >
            <div className="space-y-4 mx-4">
              <div className="bg-muted/50 rounded-lg p-3 shadow-sm">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-800 dark:text-gray-200">
                    Tier
                  </span>
                  <span className="font-bold text-gray-900 dark:text-gray-100">
                    1
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
