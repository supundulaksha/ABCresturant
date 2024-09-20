import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";
import useWindowSize from "../Hooks/UseWindowSize";
import Contact from "../pages/Contact";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { FaSignOutAlt, FaUser } from "react-icons/fa";
import logo from "../assets/Images/logo.png"

function Header() {
  const [showContactForm, setShowContactForm] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const [activeLink, setActiveLink] = useState("home");
  const location = useLocation();
  const [isIconVisible, setIsIconVisible] = useState(false);
  const size = useWindowSize();
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [showLogoutButton, setShowLogoutButton] = useState(false);

  const formRef = useRef(null);

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      const userData = JSON.parse(storedUserData);
      setIsLoggedIn(true);
      setUsername(userData.username);
    }
  }, []);

  const toggleForm = () => {
    setIsLoginForm(!isLoginForm);
  };

  const openForm = () => {
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
  };

  const handleClickOutside = (event) => {
    if (formRef.current && !formRef.current.contains(event.target)) {
      closeForm();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleContactForm = () => {
    setShowContactForm(!showContactForm);
  };

  const handleLinkClick = (link) => {
    setActiveLink(link);
    setIsIconVisible(true);
  };

  const handleClick = () => {
    setIsIconVisible(true);
    window.scrollTo({
      top: 0,
    });
  };

  useEffect(() => {
    const path = location.pathname;
    const link = path.includes("aboutus")
      ? "aboutus"
      : path.includes("services")
      ? "services"
      : path.includes("courses")
      ? "courses"
      : path.includes("contactus")
      ? "contactus"
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

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      setVisible(
        (prevScrollPos > currentScrollPos &&
          prevScrollPos - currentScrollPos > 0) ||
          currentScrollPos < 100
      );
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos]);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const email = event.target.email.value.trim();
    const password = event.target.password.value.trim();
    const username = event.target.username?.value.trim();
    const phoneNumber = event.target.phoneNumber?.value.trim();

    if (isLoginForm) {
      if (!email || !password) {
        toast.error("Please fill in all fields.");
        return;
      }
      if (!validateEmail(email)) {
        toast.error("Invalid email format.");
        return;
      }
      try {
        const response = await axios.post(
          "http://localhost:8081/api/customers/login",
          { email, password }
        );
        toast.success("Login successful!");
        setIsLoggedIn(true);
        setUsername(response.data.username);
        const userData = {
          id: response.data.id,
          username: response.data.username,
          email: response.data.email,
          phoneNumber: response.data.phoneNumber,
        };
        localStorage.setItem("userData", JSON.stringify(userData));

        closeForm();
      } catch (error) {
        if (error.response && error.response.status === 401) {
          toast.error("Incorrect email or password.");
        } else {
          toast.error("An error occurred. Please try again.");
        }
      }
    } else {
      if (!username || !email || !phoneNumber || !password) {
        toast.error("Please fill in all fields.");
        return;
      }
      if (!validateEmail(email)) {
        toast.error("Invalid email format.");
        return;
      }
      try {
        await axios.post("http://localhost:8081/api/customers/register", {
          username,
          email,
          phoneNumber,
          password,
        });
        toast.success("Registration successful! Please log in.");
        setIsLoginForm(true);
      } catch (error) {
        if (error.response && error.response.status === 400) {
          toast.error("Email or phone number already exists.");
        } else {
          toast.error("An error occurred. Please try again.");
        }
      }
    }
  };
  const handleLogout = () => {
    localStorage.removeItem("userData");
    setIsLoggedIn(false);
    setUsername("");
    toast.success("You have been logged out successfully!");
  };
  const handleUsernameClick = () => {
    if (isLoggedIn) {
      setShowLogoutButton(!showLogoutButton);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (formRef.current && !formRef.current.contains(event.target)) {
        closeForm();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  return (
    <>
      <div
        className={`md:px-[10px] px-[10px] fixed z-30  bg-white w-full  drop-shadow-xl  ${
          visible ? "header-show" : "header-hide "
        }`}
      >
        <div className="container mx-auto md:py-[10px] py-[10px] ">
          <div className="flex justify-between z-20 bg-white">
            <div
              className="flex gap-[4px]"
              onClick={() => handleLinkClick("home")}
            >

<div className="">
  <Link to="/">
    <img 
      src={logo} 
      alt="ABC Restaurant Logo" 
      className="w-[80px] h-[40px] md:w-[80px] md:h-[60px] object-contain mb-[4px]" 
    />
  </Link>
</div>


            </div>
            <div className="hidden lg:flex gap-[16px] items-center font-medium text-[16px] text-start text-[#800000] font-Manrope">
              <div
                className={`flex headerLink items-center gap-[6px] px-[12px] py-[8px] ${
                  activeLink === "aboutus"
                    ? "text-[#FBA919]"
                    : "hover:text-[#8D8D8E]"
                }`}
                onClick={() => handleLinkClick("aboutus")}
              >
                {activeLink === "about" && (
                  <img
                    src={HeaderActiveIcon}
                    alt="HeaderActiveIcon"
                    className="h-[12px] w-[12px] headericon"
                  />
                )}
                <Link to="/about" onClick={handleClick}>
                  ABOUT
                </Link>
              </div>
              <div
                className={`flex headerLink items-center gap-[6px] px-[12px] py-[8px] ${
                  activeLink === "menu"
                    ? "text-[#800000] "
                    : "hover:text-[#8D8D8E] "
                }`}
                onClick={() => handleLinkClick("menu")}
              >
                {/* {activeLink === "services" && (
                  <img
                    src={HeaderActiveIcon}
                    alt="HeaderActiveIcon"
                    className="h-[12px] w-[12px] headericon"
                  />
                )} */}
                <Link to="/menu" onClick={handleClick}>
                  MENU
                </Link>
              </div>
              <div
               
               >
                <Link to="gallery" >
                  GALLERY
                </Link>
              </div>
              <div
                className={`flex headerLink items-center gap-[6px] px-[12px] py-[8px] ${
                  activeLink === "reservations"
                    ? "text-[#FBA919]"
                    : "hover:text-[#8D8D8E]"
                }`}
                
              >
           
                <Link to="/reservation" onClick={handleClick}>
                  RESERVATION
                </Link>
              </div>
              <div
                className="px-4 py-2 rounded-xl text-white font-bold m-0 cursor-pointer bg-[#800000]  transition"
                onClick={toggleContactForm}
              >
                CONTACT
              </div>

              <div className="w-fit rounded-xl ">
                <button
                  className="px-4 py-2 rounded-xl border border-[#800000] m-0  text-800000 transition"
                  onClick={openForm}
                >
                  {" "}
                  {isLoggedIn ? (
                    <div
                      className="flex items-center capitalize gap-2"
                      onClick={handleUsernameClick}
                    >
                      <FaUser size={20} />
                      <span className="mr-2 cursor-pointer">{username}</span>
                    </div>
                  ) : (
                    <span>{isLoginForm ? "Login" : "Register"}</span>
                  )}
                </button>
                {isFormOpen && !isLoggedIn && (
                  <div
                    ref={formRef}
                    className="absolute right-[180px] top-[80px] w-[500px] mt-4 p-4 bg-[#800000] text-white rounded shadow-lg"
                  >
                    <form onSubmit={handleFormSubmit}>
                      <h2 className="text-center text-2xl mb-4">
                        {isLoginForm ? "Login" : "Register"}
                      </h2>
                      {isLoginForm ? (
                        <>
                          <div className="my-2">
                            <label className="block text-white">Email:</label>
                            <input
                              type="email"
                              name="email"
                              className="w-full text-black p-2 rounded"
                              required
                            />
                          </div>
                          <div className="my-2">
                            <label className="block text-gray-300">
                              Password:
                            </label>
                            <input
                              type="password"
                              name="password"
                              className="w-full text-black p-2 rounded"
                              required
                            />
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="my-2">
                            <label className="block text-white">
                              Username:
                            </label>
                            <input
                              type="text"
                              name="username"
                              className="w-full text-black p-2 rounded"
                              required
                            />
                          </div>
                          <div className="my-2">
                            <label className="block text-white">Email:</label>
                            <input
                              type="email"
                              name="email"
                              className="w-full text-black p-2 rounded"
                              required
                            />
                          </div>
                          <div className="my-2">
                            <label className="block text-white">
                              Phone Number:
                            </label>
                            <input
                              type="text"
                              name="phoneNumber"
                              className="w-full text-black p-2 rounded"
                              required
                            />
                          </div>
                          <div className="my-2">
                            <label className="block text-white">
                              Password:
                            </label>
                            <input
                              type="password"
                              name="password"
                              className="w-full text-black p-2 rounded"
                              required
                            />
                          </div>
                        </>
                      )}
                      <button
                        type="submit"
                        className="w-full bg-[#000] text-white py-2 rounded"
                      >
                        {isLoginForm ? "Login" : "Register"}
                      </button>
                      <button
                        type="button"
                        onClick={toggleForm}
                        className="w-full bg-transparent border border-[#000] text-[#fff] py-2 mt-2 rounded"
                      >
                        {isLoginForm
                          ? "Need an account? Register"
                          : "Already have an account? Login"}
                      </button>
                    </form>
                  </div>
                )}
                {isLoggedIn && showLogoutButton && (
    <div className="absolute flex flex-col items-center gap-4 right-[180px] top-[80px] w-[200px] mt-4 p-4 bg-[#800000] text-white rounded shadow-lg">
    <Link to="myorder">
      <button className="hover:bg-black hover:text-white w-full text-center py-2 px-10 rounded">My Orders</button>
    </Link>
    <Link to="mybookings">
      <button className="hover:bg-black hover:text-white w-full text-center py-2 px-8 rounded">My Bookings</button>
    </Link>
    <button
      onClick={handleLogout}
      className="hover:bg-black hover:text-white w-full text-center py-2 rounded"
    >
      <FaSignOutAlt className="inline-block mr-2" />
      Logout
    </button>
  </div>
  

                )}
              </div>
            </div>
            {/* <div className="lg:hidden  flex items-center">
              <HeaderMenu toggleContactForm={toggleContactForm} />
            </div> */}
          </div>
        </div>
      </div>
      <AnimatePresence>
        {showContactForm && (
          <motion.div
            initial={
              isMobile ? mobileVariants.initial : desktopVariants.initial
            }
            animate={
              isMobile ? mobileVariants.animate : desktopVariants.animate
            }
            exit={isMobile ? mobileVariants.exit : desktopVariants.exit}
            transition={isMobile ? mobileTransition : desktopTransition}
            className="fixed inset-0 z-50 w-full top-0 flex justify-end  items-center"
          >
            <div className="bg-[#f1f1f1] px-[16px] hide-scrollbar overflow-scroll py-[36px]    md:px-[64px] md:py-[32px]  h-full  flex flex-col gap-[32px] w-[963px] ">
              <div className="flex justify-end ">
                <button
                  className=" text-[36px] text-[#800000]"
                  onClick={toggleContactForm}
                >
                  <IoMdClose />
                </button>
              </div>
              <div className=" text-[white] ">
                <Contact onFormSubmit={toggleContactForm} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <ToastContainer />
    </>
  );
}

export default Header;
