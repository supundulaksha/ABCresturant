import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

const RootLayout = ({ userRole, onLogout,setUserRole  }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const storedUserRole = localStorage.getItem("userRole");
    if (storedUserRole) {
      setUserRole(storedUserRole);
    }
  }, []);
  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <div className="flex flex-row w-screen h-screen overflow-hidden bg-neutral-100">
        <Sidebar isOpen={isSidebarOpen} userRole={userRole} />
        <Header onToggleSidebar={toggleSidebar} userRole={userRole} onLogout={onLogout} />
        <div className="md:pl-[270px]  md:pt-[80px] pt-[80px] px-[10px] w-screen overflow-scroll">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default RootLayout;
