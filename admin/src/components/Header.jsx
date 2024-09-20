import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { profile } from "../constants/Data";
import { IoPersonCircleSharp } from "react-icons/io5";
import logo from "../assets/Images/logo.png"

const Header = ({ onToggleSidebar, userRole }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  console.log("userRole in Header:", userRole);

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    navigate("/");
  };

  return (
    <>
      <nav className="fixed top-0 z-50 w-full bg-[#ffffff]  border-b border-gray-200 ">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start ">
              <button
                onClick={onToggleSidebar}
                className="inline-flex items-center p-2 text-sm text-[#07111e] rounded-lg sm:hidden hover:bg-gray-100"
              >
                <span className="sr-only">Open sidebar</span>
                <svg
                  className="w-6 h-6"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clipRule="evenodd"
                    fillRule="evenodd"
                    d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                  ></path>
                </svg>
              </button>
              <a href="/" className="flex items-center justify-center ms-2 md:me-24">
  <img src={logo} alt="Restaurant Logo" className="h-[50px]" />
</a>
            </div>
            <div className="relative">
              <button
                id="dropdownNavbarLink"
                onClick={handleDropdownToggle}
                className="flex items-center justify-between w-full px-3 py-2 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0 md:w-auto "
              >
                <div className="flex items-center gap-3">
                  {userRole === "admin" && (
                    <span className="text-red-500"><img src={profile} alt="" className="h-[50px] w-[50px] object-cover rounded-full" /></span>
                  )}
                  {userRole === "staff" && (
                    <span className=" text-[50px]"><IoPersonCircleSharp /></span>
                  )}
                </div>
              </button>

              {isDropdownOpen && (
                <div
                  id="dropdownNavbar"
                  className="absolute right-0 z-10 font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-44 "
                >
                  <ul
                    className="py-2 text-sm text-gray-700 "
                    aria-labelledby="dropdownLargeButton"
                  ></ul>
                  <div className="py-1">
                    <a
                      onClick={handleLogout}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 "
                    >
                     Log out
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
