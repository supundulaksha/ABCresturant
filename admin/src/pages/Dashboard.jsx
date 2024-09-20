import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

function Dashboard() {
  const [categories, setCategories] = useState([]);
  const [menus, setMenus] = useState([]);
  const [bookings, setBookings] = useState({
    confirmed: 0,
    canceled: 0,
    pending: 0,
    completed: 0
  });
  const [offers, setOffers] = useState([]);
  const [ordersSummary, setOrdersSummary] = useState({
    pending: 0,
    confirmed: 0,
    delivered: 0,
    canceled: 0
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:8081/api/categories");
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    const fetchMenus = async () => {
      try {
        const response = await axios.get("http://localhost:8081/api/menus");
        setMenus(response.data);
      } catch (error) {
        console.error("Error fetching menus:", error);
      }
    };

    const fetchBookings = async () => {
      try {
        const response = await axios.get("http://localhost:8081/api/bookings");
        const bookingsData = response.data;
        const stats = {
          confirmed: bookingsData.filter(b => b.status === 'CONFIRMED').length,
          canceled: bookingsData.filter(b => b.status === 'CANCELED').length,
          pending: bookingsData.filter(b => b.status === 'PENDING').length,
          completed: bookingsData.filter(b => b.status === 'COMPLETED').length,
        };
        setBookings(stats);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    const fetchOffers = async () => {
      try {
        const response = await axios.get("http://localhost:8081/api/offers");
        setOffers(response.data);
      } catch (error) {
        console.error("Error fetching offers:", error);
      }
    };

    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:8081/api/orders");
        const ordersData = response.data;
        const summary = {
          pending: ordersData.filter(o => o.status === 'Pending').length,
          confirmed: ordersData.filter(o => o.status === 'Processing').length,
          delivered: ordersData.filter(o => o.status === 'Cancelled').length,
          canceled: ordersData.filter(o => o.status === 'Completed').length,
        };
        setOrdersSummary(summary);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchCategories();
    fetchMenus();
    fetchBookings();
    fetchOffers();
    fetchOrders();
  }, []);
  return (
    <div className="p-8 min-h-screen text-white bg-gray-100">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">Dashboard</h1>

      <div className="bg-white text-gray-800 rounded-lg shadow-lg p-6 mb-8">
        <div className="flex gap-[32px] w-full">
          {/* Categories Section */}
          <div className="mb-12 w-full overflow-x-scroll">
            <h3 className="text-2xl font-semibold mb-6 text-gray-700">Categories</h3>
            <div className="flex p-[24px] w-screen gap-6">
              {categories.map((category) => (
                <div
                  key={category.id}
                  className="bg-gray-200 p-4 rounded-lg shadow-md transition-transform duration-300 hover:scale-105 hover:shadow-xl"
                >
                  <img
                    src={`http://localhost:8081/uploads/images/${category.imageUrl}`}
                    alt={category.categoryName}
                    className="w-32 h-32 object-cover rounded-full mx-auto"
                  />
                  <h3 className="text-lg font-semibold text-center mt-4 text-gray-800">
                    {category.categoryName}
                  </h3>
                </div>
              ))}
            </div>
          </div>

          {/* Booking Stats Section */}
          <div className="mb-12 w-full">
            <h3 className="text-2xl font-semibold mb-6 text-gray-700">Booking Statistics</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
              <div className="bg-green-100 p-4 rounded-lg shadow-md text-center">
                <h4 className="text-xl font-semibold text-green-800">Confirmed</h4>
                <p className="text-3xl font-bold text-green-600">{bookings.confirmed}</p>
              </div>
              <div className="bg-red-100 p-4 rounded-lg shadow-md text-center">
                <h4 className="text-xl font-semibold text-red-800">Canceled</h4>
                <p className="text-3xl font-bold text-red-600">{bookings.canceled}</p>
              </div>
              <div className="bg-yellow-100 p-4 rounded-lg shadow-md text-center">
                <h4 className="text-xl font-semibold text-yellow-800">Pending</h4>
                <p className="text-3xl font-bold text-yellow-600">{bookings.pending}</p>
              </div>
              <div className="bg-blue-100 p-4 rounded-lg shadow-md text-center">
                <h4 className="text-xl font-semibold text-blue-800">Completed</h4>
                <p className="text-3xl font-bold text-blue-600">{bookings.completed}</p>
              </div>
            </div>
          </div>
            {/* Orders Summary Section */}
       <div className="mb-12 w-full">
          <h3 className="text-2xl font-semibold mb-6 text-gray-700">Orders Summary</h3>
          <div className="bg-white text-gray-800 rounded-lg  ">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
              <div className="bg-blue-100 p-4 rounded-lg shadow-md text-center">
                <h4 className="text-xl font-semibold text-blue-800">Pending</h4>
                <p className="text-3xl font-bold text-blue-600">{ordersSummary.pending}</p>
              </div>
              <div className="bg-green-100 p-4 rounded-lg shadow-md text-center">
                <h4 className="text-xl font-semibold text-green-800">Confirmed</h4>
                <p className="text-3xl font-bold text-green-600">{ordersSummary.confirmed}</p>
              </div>
              <div className="bg-yellow-100 p-4 rounded-lg shadow-md text-center">
                <h4 className="text-xl font-semibold text-yellow-800">Delivered</h4>
                <p className="text-3xl font-bold text-yellow-600">{ordersSummary.delivered}</p>
              </div>
              <div className="bg-red-100 p-4 rounded-lg shadow-md text-center">
                <h4 className="text-xl font-semibold text-red-800">Canceled</h4>
                <p className="text-3xl font-bold text-red-600">{ordersSummary.canceled}</p>
              </div>
            </div>
          </div>
        </div>
        </div>
       
<div className="flex gap-[32px]">
        {/* Menus Section */}
        <div className="mb-12 w-full">
          <h3 className="text-2xl font-semibold mb-6 text-gray-700">Menus</h3>
          <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-8">
            {menus.map((menu) => (
              <div
                key={menu.id}
                className="card bg-[#ffffff] w-[100px] text-black rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="card__image">
                  <img
                    src={`http://localhost:8081/uploads/images/${menu.imageUrl}`}
                    className="w-[300px] h-48 object-cover"
                    alt={menu.name}
                  />
                </div>
                <div className="card__info flex flex-col p-6">
                  <div className="card__info--title mt-7">
                    <h3 className="text-xl font-bold">{menu.name}</h3>
                    <p className="text-sm text-gray-400">{menu.description}</p>
                  </div>
                  <div className="card__info--price flex flex-col items-center">
                    <p className="text-lg font-semibold">${menu.price}</p>
                    <p className="text-sm text-gray-400">
                        {menu.offerStatus
                          ? `${menu.offerClickPercentage}% off`
                          : "No Offer"}
                      </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Offers Section */}
        <div>
          <h3 className="text-2xl font-semibold mb-6 text-gray-700">Offers</h3>
          <div className="grid grid-cols-1 gap-[16px]  ">
          {offers.map((offer) => (
            <div
              key={offer.id}
              className="  bg-gradient-to-r from-indigo-950 to-black text-white p-8 rounded-lg shadow-lg "
            >
              <div className="text-3xl font-bold mb-4">Special Offer!</div>
              <div className="text-lg mb-4">
                Get{" "}
                <span className="text-yellow-400 font-bold">
                  {offer.percentage}% OFF
                </span>{" "}
                your next purchase!
              </div>

              <div>
                <img
                  src={`http://localhost:8081/uploads/images/${offer.imageUrl}`}
                  alt={offer.name}
                  className=" w-full h-[150px]  object-cover"
                />
              </div>
              <div className="text-sm flex flex-col gap-[4px] mt-4">
                <p className="text-yellow-400 font-bold">{offer.name}</p>
                <p>{offer.description}</p>
              </div>
            </div>
          ))}

          
        </div>
        </div>
        </div>
      </div>
      
      </div>
    
    
    
  );
}

export default Dashboard;