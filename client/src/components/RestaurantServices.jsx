import React from "react";
import img4 from "../assets/Images/rest.jpg";

function RestaurantServices() {
  return (
    <>
       <div className="flex flex-col md:flex-row items-center justify-between p-6 md:p-12 bg-white rounded-lg">
        {/* Left Side: Title, Description, Button */}
        <div className="md:w-1/2 text-center md:text-left">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6">
            Our Restaurant
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-700 mb-6 md:mb-8">
            Our signature spice blends combined with our seasoned chefs create
            an experience in flavor that will be remembered forever.
          </p>
          <button className="bg-[#800000] text-white py-2 px-4 sm:py-3 sm:px-6 md:py-3 md:px-8 lg:py-2 lg:px-6 transition-all duration-300 rounded-3xl border border-transparent hover:border-[#800000] hover:text-[#800000] hover:bg-white flex items-center group text-sm sm:text-base md:text-lg mx-auto md:mx-0">
            Explore More
            <svg
              className="ml-2 sm:ml-3 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 transition-transform duration-300 transform group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
            </svg>
          </button>
        </div>

        {/* Right Side: Image */}
        <div className="md:w-1/2 mt-6 md:mt-0">
          <img
            src={img4}
            alt="Your image description"
            className="w-full h-auto rounded-lg"
          />
        </div>
      </div>
    </>
  );
}

export default RestaurantServices;
