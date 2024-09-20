import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const OrderForm = ({onClose}) => {
  const [menuItems, setMenuItems] = useState([]);
  const [menuName, setMenuName] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('Cash');
  const [amount, setAmount] = useState(0);
  const [status, setStatus] = useState('Pending');
  const [loading, setLoading] = useState(false);

  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  useEffect(() => {
    // Fetch user data from localStorage
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (userData) {
      setUserName(userData.username);
      setEmail(userData.email);
      setPhoneNumber(userData.phoneNumber);
    }

    // Fetch menu items from the backend
    axios.get('http://localhost:8081/api/menus')
      .then((response) => {
        setMenuItems(response.data);
        if (response.data.length > 0) {
          setMenuName(response.data[0].name);
          setTotalPrice(response.data[0].price);
        }
      })
      .catch((error) => {
        toast.error('Error fetching menu items');
        console.error('Error fetching the menu items!', error);
      });
  }, []);

  useEffect(() => {
    // Update total price when menu item or quantity changes
    const selectedItem = menuItems.find((item) => item.name === menuName);
    if (selectedItem) {
      setTotalPrice(selectedItem.price * quantity);
    }
  }, [menuName, quantity, menuItems]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);

    const orderData = {
      userName,
      email,
      phoneNumber,
      menuName,
      quantity,
      totalPrice: paymentMethod === 'Cash' ? totalPrice : amount,
      paymentMethod,
      status:"Pending"
    };

    axios.post('http://localhost:8081/api/orders', orderData)
      .then((response) => {
        toast.success('Order placed successfully!');
        setQuantity(1);
        setPaymentMethod('Cash');
        setStatus('Pending');
        setAmount(0);
      })
      .catch((error) => {
        toast.error('Error placing the order');
        console.error('Error placing the order!', error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className=" w-[800px] bg-white  rounded-lg p-6 mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center">Place an Order</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="userName" className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            id="userName"
            value={userName}
            readOnly
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 focus:outline-none sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            readOnly
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 focus:outline-none sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Phone Number</label>
          <input
            type="text"
            id="phoneNumber"
            value={phoneNumber}
            readOnly
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 focus:outline-none sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="menuName" className="block text-sm font-medium text-gray-700">Menu Item</label>
          <select
            id="menuName"
            value={menuName}
            onChange={(e) => setMenuName(e.target.value)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            {menuItems.map((item) => (
              <option key={item.id} value={item.name}>
                {item.name} - ${item.price}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">Quantity</label>
          <input
            type="number"
            id="quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            min="1"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="totalPrice" className="block text-sm font-medium text-gray-700">Total Price</label>
          <input
            type="text"
            id="totalPrice"
            value={`$${totalPrice.toFixed(2)}`}
            readOnly
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 focus:outline-none sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="paymentMethod" className="block text-sm font-medium text-gray-700">Payment Method</label>
          <select
            id="paymentMethod"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option value="Cash">Cash</option>
            <option value="Credit Card">Credit Card</option>
            <option value="PayPal">PayPal</option>
          </select>
        </div>
        {paymentMethod !== 'Cash' && (
          <div className="mb-4">
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Amount</label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              min={totalPrice}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        )}
      <div className='flex gap-[32px]'>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          disabled={loading}
        >
          {loading ? 'Placing Order...' : 'Place Order'}
        </button >

        <button onClick={onClose}  className="w-full bg-red-500 text-white py-2 px-4 rounded-md text-sm font-mediumr focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
         Close
         
        </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default OrderForm;
