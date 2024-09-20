import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import PaymentCard from "../components/PaymentCard";
import about from "../assets/Images/gallery.jpg";

function Menu() {
  const [menus, setMenus] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState(null);
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false); 

  const [isPaymentCardVisible, setIsPaymentCardVisible] = useState(true);

  const handleClose = () => {
    setIsPaymentCardVisible(false);
  };

  useEffect(() => {
   
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }

    
    
    const fetchData = async () => {
      try {
        const [menusResponse, categoriesResponse] = await Promise.all([
          axios.get("http://localhost:8081/api/menus"),
          axios.get("http://localhost:8081/api/categories"),
        ]);

        setMenus(menusResponse.data);
        setCategories(categoriesResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Error fetching data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setSelectedItems(JSON.parse(savedCart));
    }
  }, []);


  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(selectedItems));
  }, [selectedItems]);

  const handleAddToCart = (menu) => {
    const existingItem = selectedItems.find((item) => item.id === menu.id);

    if (existingItem) {
      const updatedItems = selectedItems.map((item) =>
        item.id === menu.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      setSelectedItems(updatedItems);
    } else {
      setSelectedItems([...selectedItems, { ...menu, quantity: 1 }]);
    }
    if (!userData) {
      setIsAlertModalOpen(true);
      
    } else {
      setIsCartOpen(true); 
    }
    
  };

  const handleRemoveFromCart = (menu) => {
    const updatedItems = selectedItems
      .map((item) =>
        item.id === menu.id ? { ...item, quantity: item.quantity - 1 } : item
      )
      .filter((item) => item.quantity > 0);
    setSelectedItems(updatedItems);
  };

  const calculateTotalPrice = () => {
    return selectedItems.reduce(
      (total, item) =>
        total + item.quantity * (item.offerStatus ? item.finalPrice : item.price),
      0
    );
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMenu(null);
  };

  const closeAlertModal = () => {
    setIsAlertModalOpen(false);
  };

  const filterMenus = () => {
    if (!searchQuery) {
      return menus;
    }
    return menus.filter((menu) =>
      menu.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const renderMenuItemsByCategory = (categoryId) => {
    const filteredMenus = filterMenus().filter(
      (menu) => menu.category && menu.category.id === categoryId
    );

  
  
    return filteredMenus.length > 0 ? (
      filteredMenus.map((menu) => (
        <div
          key={menu.id}
          className="mb-4 p-4 border h-[160px] rounded-lg shadow-md bg-[#fff] hover:shadow-lg transition-shadow duration-300"
        >
          <div className="flex justify-between items-center mb-4">
            <div className="text-[24px] font-bold text-[#800000]">
              <h4>{menu.name}</h4>
              <h4 className="text-[#800000]">
                {menu.offerStatus ? `${menu.offerClickPercentage}% offer` : ""}
              </h4>
            </div>

            <div className="text-right">
              <div className="text-xl font-bold text-[#800000]">
                ${menu.offerStatus ? menu.finalPrice.toFixed(2) : menu.price.toFixed(2)}
              </div>
              {menu.offerStatus && (
                <div className="text-sm text-white line-through">
                  Original: ${menu.price.toFixed(2)}
                </div>
              )}
            </div>
          </div>
          <div className="flex justify-start">
            <button
              onClick={() => handleAddToCart(menu)}
              className="select-none rounded-lg bg-[#800000] py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md  transition-all hover:shadow-lg  focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            >
              Add To Card
            </button>
          </div>
        </div>
      ))
    ) : (
      <p className="text-gray-500">No menu items available for this category.</p>
    );
  };

  const handlePaymentClick = () => {
    setIsPaymentModalOpen(true);
  };

 
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>

    {/* Background Image Section */}
    <section
        style={{ backgroundImage: `url(${about})` }}
        className="bg-cover bg-center bg-no-repeat py-60 h-60"
      >
        {/* Optional: Add content or overlay if needed */}
      </section>

    <div className="pt-[10] bg-white">
      <div className="container mx-auto pt-[50px]">
        <h2 className="text-5xl font-bold mb-12 text-center text-[#800000]">
          Discover our Foods
        </h2>

        {/* Search Bar */}
        <div className="mb-10 flex justify-center">
  <input
    type="text"
    placeholder="Search menu..."
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    className="px-4 py-2 border border-gray-800 rounded-lg w-1/2 text-black"
  />
</div>


        <div className="grid grid-cols-3 gap-[64px]">
          {categories.length === 0 ? (
            <p className="text-gray-500 text-center">No categories available.</p>
          ) : (
            categories.map((category) => (
              <div key={category.id} className="mb-12">
                <h3 className="text-2xl font-bold mb-6 text-white">
                  {category.categoryName}
                </h3>
                {renderMenuItemsByCategory(category.id)}
              </div>
            ))
          )}
        </div>
      </div>

    

      <AnimatePresence>
  {isCartOpen && (
    <motion.div
      className="fixed scrollbar-hidden top-0 right-0 overflow-scroll h-full bg-[#fff] text-[#80000] w-[480px] shadow-2xl p-6 z-50  backdrop-blur-lg border-l border-white/20"
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
    >
      {/* Close Button */}
      <button
        onClick={() => setIsCartOpen(false)}
        className="absolute top-6 right-6 text-[#80000] hover:text-[#800000] text-3xl"
      >
        &times;
      </button>

      {/* Cart Title */}
      <h2 className="text-4xl font-extrabold mb-8 text-center text-[#800000]">
        Your Cart
      </h2>

      {/* Cart Items */}
      {selectedItems.length > 0 ? (
        <div className="space-y-8">
          <ul className="space-y-6">
            {selectedItems.map((item) => (
              <li key={item.id} className="p-6 rounded-xl bg-white border border-black shadow-lg backdrop-blur-md flex flex-col items-center space-y-4"
>
                <div className="flex justify-between items-center w-full text-lg font-semibold text-black">
                  <span>{item.name} (x{item.quantity})</span>
                  <span className="text-xl text-[#800000]">
                    ${(
                      item.quantity *
                      (item.offerStatus ? item.finalPrice : item.price)
                    ).toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between w-full space-x-4">
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="bg-[#800000] border-black py-2 px-4 rounded-full text-white shadow-md  transition-all"
                  >
                    +
                  </button>
                  <button
                    onClick={() => handleRemoveFromCart(item)}
                    className="bg-[#800000] border-black py-2 px-4 rounded-full text-white shadow-md  transition-all"
                  >
                    -
                  </button>
                </div>
              </li>
            ))}
          </ul>

          {/* Total Amount */}
          <div className="mt-10 text-xl font-extrabold text-center text-black">
            Total: <span className="text-[#800000]">${calculateTotalPrice().toFixed(2)}</span>
          </div>

          {/* Pay Now Button */}
          <div className="flex justify-center mt-8">
            <button
              onClick={handlePaymentClick}
              className="bg-[#800000] py-4 px-12 rounded-full font-bold text-xl text-white shadow-xl hover:scale-105 hover:shadow-2xl transition-transform"
            >
              Pay Now
            </button>
          </div>
        </div>
      ) : (
        <p className="text-center text-black text-lg mt-16">Your cart is empty.</p>
      )}
    </motion.div>
  )}

  {/* Payment Modal */}
  {isPaymentModalOpen && (
    <motion.div
      className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {isPaymentCardVisible && (
        <PaymentCard 
          userData={userData} 
          selectedItems={selectedItems} 
          totalPrice={calculateTotalPrice()} 
          onClose={handleClose}
        />
      )}
    </motion.div>
  )}
</AnimatePresence>


    </div>
    </>
  );
}

export default Menu;
