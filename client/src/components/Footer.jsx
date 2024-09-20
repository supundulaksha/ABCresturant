import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

import { CiLocationOn } from "react-icons/ci";
import { CiMail } from "react-icons/ci";
import { FiFacebook } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { CiYoutube } from "react-icons/ci";
import { PiPhoneLight } from "react-icons/pi";
import { IoMdClose } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";
import useWindowSize from "../Hooks/UseWindowSize";
import logo from "../assets/Images/logo.png"

function Footer() {
  const handleClick = () => {
    window.scrollTo({
      top: 0,
    });
  };
  const [showContactForm, setShowContactForm] = useState(false);
  const location = useLocation();
  const [activeLink, setActiveLink] = useState("");
  const size = useWindowSize();
  const toggleContactForm = () => {
    setShowContactForm(!showContactForm);
  };

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  useEffect(() => {
    const path = location.pathname;
    const link = path.includes("about")
      ? "about"
      : path.includes("menu")
      ? "menu"
      : path.includes("reservations")
      ? "reservations"
      : path.includes("contact")
      ? "contact"
      : path.includes("gallery")
      ? "gallery"
      : "home";
    setActiveLink(link);
  }, [location.pathname]);

  const isMobile = size.width <= 768;

  const mobileTransition = { duration: 0.4, stiffness: 70 };
  const desktopTransition = { duration: 0.6, stiffness: 90 };

  const mobileVariants = {
    initial: { opacity: 0, y: "100%" },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: "100%" },
  };

  const desktopVariants = {
    initial: { opacity: 0, x: "100%" },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: "100%" },
  };

  return (
    <>
      <div>

        <div className="bg-[#800000]">
          <div className="flex flex-col">
            <div className="lg:py-[80px] py-[48px] md:px-[24px] px-[16px]">
              <div className="container mx-auto ">
                <div className="flex lg:flex-row justify-between flex-col gap-[44px]">
                  <div className="flex flex-col lg:gap-[24px] md:gap-[36px] gap-[40px]">
                    <div className="flex flex-col lg:gap-[24px] md:gap-[24px] gap-[28px] lg:items-start md:items-center items-center">
                      <div>
                        <div className="flex lg:flex-row lg:gap-[4px] md:flex-row md:gap-[4px] flex-col gap-[20px] items-center">
                          <div className="flex flex-col md:gap-[2px] gap-[6px] lg:items-start md:items-start items-center px-[6px] ">
                            
                              <Link to="/" onClick={handleClick}>
                              <img 
      src={logo} 
      alt="ABC Restaurant Logo" 
      className="w-[80px] h-[40px] md:w-[80px] md:h-[60px] object-contain mb-[4px]" 
    />
                              </Link>
                  
                            
                          </div>
                        </div>
                      </div>
                      <div className="hidden md:block w-[268px] text-[#fff] font-Manrope font-semibold text-[18px] h-[42px] lg:w-[435px] capitalize lg:text-start md:text-center">
  <p>
  Offering a range of delicious dishes crafted from the finest ingredients
  </p>
</div>

                      {/* <div className="flex lg:hidden md:flex-row md:gap-[24px] flex-row gap-[12px] text-black items-center justify-center">
                        <Link to="https://www.facebook.com/yourrestaurant">
                          <p className="border border-[#000] p-[12px] hover:bg-[#D32F2F] cursor-pointer color-[#000]">
                            <FiFacebook />
                          </p>
                        </Link>
                        <Link to="https://wa.me/yourwhatsappnumber">
                          <p className="border border-[#000] p-[12px] hover:bg-[#D32F2F] cursor-pointer">
                            <FaWhatsapp />
                          </p>
                        </Link>
                        <Link to="https://www.youtube.com/yourrestaurant">
                          <p className="border border-[#000] p-[12px] hover:bg-[#D32F2F] cursor-pointer">
                            <CiYoutube />
                          </p>
                        </Link>
                      </div> */}
                    </div>
                    <div className="flex lg:flex-col lg:px-0 md:px-[12px] px-0 md:flex-row flex-col items-start justify-between gap-[16px] text-white">
                      <div className="flex gap-[4px] items-center">
                        <p className="text-[#fff] text-[24px]">
                          <CiLocationOn />
                        </p>
                        <p className="text-white lg:w-full w-[240px] text-[16px] font-normal font-Manrope">
                         346/A Morris Road, Galle ,Srilanka
                        </p>
                      </div>
                      <div className="flex gap-[4px] items-center">
                        <p className="text-[#fff] text-[24px]">
                          <CiMail />
                        </p>
                        <p className="text-white text-[16px] font-normal font-Manrope">
                          abcresturant@outlook.com
                        </p>
                      </div>
                      <div className="flex gap-[4px] items-center">
                        <p className="text-[#fff] text-[24px]">
                          <PiPhoneLight />
                        </p>
                        <p className="text-white text-[16px] font-normal font-Manrope">
                         +91 11 456 7894
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="text-white lg:px-0 md:px-[24px] px-0">
                    <div className="flex md:flex-row flex-col justify-between gap-[32px] md:gap-[84px] font-Manrope">
                      <div className="flex flex-col gap-[16px]">
                      <p className="text-[#fff] font-bold text-[18px] uppercase">
  Quick Links
</p>

                        <div className="flex flex-col gap-[12px] text-[16px] font-normal">
                          <Link to="/about" onClick={handleClick}>
                            <p
                              className={`${
                                activeLink === "about"
                                  ? "text-[#fff]"
                                  : "hover:text-[#f1f1f1]"
                              }`}
                              onClick={() => handleLinkClick("about")}
                            >
                              About Us
                            </p>
                          </Link>
                          <Link to="/menu" onClick={handleClick}>
                            <p
                              className={`${
                                activeLink === "menu"
                                  ? "text-[#fff]"
                                  : "hover:text-[#f1f1f1]"
                              }`}
                              onClick={() => handleLinkClick("menu")}
                            >
                              Menu
                            </p>
                          </Link>
                          <Link to="/reservations" onClick={handleClick}>
                            <p
                              className={`${
                                activeLink === "reservations"
                                  ? "text-[#fff]"
                                  : "hover:text-[#f1f1f1]"
                              }`}
                              onClick={() => handleLinkClick("reservations")}
                            >
                              Reservations
                            </p>
                          </Link>
                          <Link to="/gallery" onClick={handleClick}>
                            <p
                              className={`${
                                activeLink === "gallery"
                                  ? "text-[#fff]"
                                  : "hover:text-[#f1f1f1]"
                              }`}
                              onClick={() => handleLinkClick("gallery")}
                            >
                              Gallery
                            </p>
                          </Link>
                          <Link to="/contact" onClick={handleClick}>
                            <p
                              className={`${
                                activeLink === "contact"
                                  ? "text-[#fff]"
                                  : "hover:text-[#f1f1f1]"
                              }`}
                              onClick={() => handleLinkClick("contact")}
                            >
                              Contact
                            </p>
                          </Link>
                        </div>
                      </div>
                      <div className="flex flex-col gap-[16px]">
                        <p className="text-[#fff] font-bold text-[18px] uppercase">
                          Opening Hours
                        </p>
                        <div className="flex flex-col gap-[12px] text-[16px] font-normal">
                          <p>Mon - Fri: 11:00 AM - 10:00 PM</p>
                          <p>Sat - Sun: 9:00 AM - 11:00 PM</p>
                        </div>
                      </div>
                    </div>
                    <div className="lg:flex flex-row hidden gap-[24px] mt-[32px]">
  <Link to="https://www.facebook.com/yourrestaurant">
    <p className="border border-[#fff] p-[12px] w-[48px] h-[48px] flex items-center justify-center rounded-full">
      <FiFacebook />
    </p>
  </Link>
  <Link to="https://wa.me/yourwhatsappnumber">
    <p className="border border-[#fff] p-[12px] w-[48px] h-[48px] flex items-center justify-center rounded-full">
      <FaWhatsapp />
    </p>
  </Link>
  <Link to="https://www.youtube.com/yourrestaurant">
    <p className="border border-[#fff] p-[12px] w-[48px] h-[48px] flex items-center justify-center rounded-full">
      <CiYoutube />
    </p>
  </Link>
</div>

                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
        <AnimatePresence>
          {showContactForm && (
            <motion.div
              className="contact-form-wrapper"
              initial="initial"
              animate="animate"
              exit="exit"
              variants={isMobile ? mobileVariants : desktopVariants}
              transition={isMobile ? mobileTransition : desktopTransition}
            >
              <div className="contact-form">
                <IoMdClose onClick={toggleContactForm} />
                {/* Place your contact form component here */}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

export default Footer;
