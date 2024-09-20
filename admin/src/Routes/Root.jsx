import React, { useState } from "react";
import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import RootLayout from "../Layout/RootLayout";

import Dashboard from "../pages/Dashboard";
import NotFound from "../Layout/NotFound";
import Login from "../pages/Login";
import AllStaff from "../pages/admin/Staff/AllStaff";
import CreateStaff from "../pages/admin/Staff/CreateStaff";
import Menu from "../pages/admin/MenuItem/Menu";
import CreateMenu from "../pages/admin/MenuItem/CreateMenu";
import AllCategory from "../pages/admin/Category/AllCategory";
import CreateCategory from "../pages/admin/Category/CreateCategory";
import Facility from "../pages/Facility/Facility";
import CreateFacility from "../pages/Facility/CreateFacility";
import CreateOffers from "../pages/admin/Offers/CreateOffers";
import Offers from "../pages/admin/Offers/Offers";
import AllBookings from "../pages/admin/TableBooking/AllBookings";
import CreateBookingForm from "../pages/admin/TableBooking/CreateBookingForm";
import ContactFormTable from "../components/ContactFormTable";
import AllOrders from "../pages/admin/Order/AllOrders";
import CreateOrder from "../pages/admin/Order/CreateOrder";



const Root = () => {
  const [userRole, setUserRole] = useState(
    localStorage.getItem("userRole") || ""
  );

  const handleLogin = (role) => {
    setUserRole(role);
    localStorage.setItem("userRole", role);
  };

  const generateRoutes = () => {
    const isLoggedIn = userRole !== "";
    return createRoutesFromElements(
      <>
        {isLoggedIn && (
          <Route
            path="/"
            element={
              <RootLayout userRole={userRole} setUserRole={setUserRole} />
            }
          >
            <Route
              path="/dashboard"
              element={
                userRole === "admin" ? (
                  <Dashboard userRole={userRole} />
                ) : (
                  <>
                   
                  </>
                )
              }
            ></Route>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/allstaff" element={<AllStaff />} />
            <Route path="/create-staff" element={<CreateStaff />} />
            <Route path="/create-category" element={ <CreateCategory/>} />
            <Route path="/menu-item" element={<Menu />} />
            <Route path="/create-menu" element={<CreateMenu />} />
            <Route path="/all-category" element={<AllCategory />} />
            <Route path="/facility" element={<Offers/>} />
            <Route path="/create-offers" element={<CreateOffers/>} />
            <Route path="/all-bookings" element={<AllBookings />} />
            <Route path="/create-table" element={<CreateBookingForm />} />
            <Route path="/form-table" element={<ContactFormTable />} />
            <Route path="/all-orders" element={<AllOrders />} />
            <Route path="/create-orders" element={<CreateOrder />} />
          </Route>
        )}
        <Route
          index
          element={
            <Login onLogin={(newUserRole) => handleLogin(newUserRole)} />
          }
        />
        <Route path="*" element={<NotFound />} />
      </>
    );
  };

  const router = createBrowserRouter(generateRoutes());

  return <RouterProvider router={router} />;
};

export default Root;
