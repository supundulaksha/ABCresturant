import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CreateOrder() {
  const [menuItems, setMenuItems] = useState([]);
  const [itemName, setMenuName] = useState('');
  const [itemQuantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('Cash');
  const [amount, setAmount] = useState(0);
  const [status, setStatus] = useState('Pending');
  const [loading, setLoading] = useState(false);

  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  useEffect(() => {
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
    const selectedItem = menuItems.find((item) => item.name === itemName);
    if (selectedItem) {
      setTotalPrice(selectedItem.price * itemQuantity);
    }
  }, [itemName, itemQuantity, menuItems]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);

    const orderData = {
      username,
      email,
      phoneNumber,
      itemName,
      itemQuantity,
      totalPrice: paymentMethod === 'Cash' ? totalPrice : amount,
      paymentMethod,
      status: 'Pending'
    };

    axios.post('http://localhost:8081/api/payments', orderData)
      .then(() => {
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
    <div className="max-w-[600px] mx-auto bg-gray-50 shadow-lg rounded-xl p-8 mt-10">
      <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">Place an Order</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="userName" className="block text-sm font-medium text-gray-600">Name</label>
          <input
            type="text"
            id="userName"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
            className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white focus:ring-2 focus:ring-teal-500 focus:outline-none sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white focus:ring-2 focus:ring-teal-500 focus:outline-none sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-600">Phone Number</label>
          <input
            type="text"
            id="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white focus:ring-2 focus:ring-teal-500 focus:outline-none sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="menuName" className="block text-sm font-medium text-gray-600">Menu Item</label>
          <select
            id="menuName"
            value={itemName}
            onChange={(e) => setMenuName(e.target.value)}
            className="mt-2 block w-full pl-4 pr-10 py-2 border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-teal-500 sm:text-sm"
          >
            {menuItems.map((item) => (
              <option key={item.id} value={item.name}>
                {item.name} - ${item.price}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="quantity" className="block text-sm font-medium text-gray-600">Quantity</label>
          <input
            type="number"
            id="quantity"
            value={itemQuantity}
            onChange={(e) => setQuantity(e.target.value)}
            min="1"
            className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-teal-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="totalPrice" className="block text-sm font-medium text-gray-600">Total Price</label>
          <input
            type="text"
            id="totalPrice"
            value={`$${totalPrice.toFixed(2)}`}
            readOnly
            className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 focus:outline-none sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="paymentMethod" className="block text-sm font-medium text-gray-600">Payment Method</label>
          <select
            id="paymentMethod"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="mt-2 block w-full pl-4 pr-10 py-2 border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-teal-500 sm:text-sm"
          >
            <option value="Cash">Cash</option>
            <option value="Credit Card">Credit Card</option>
            <option value="PayPal">PayPal</option>
          </select>
        </div>
        {paymentMethod !== 'Cash' && (
          <div className="mb-4">
            <label htmlFor="amount" className="block text-sm font-medium text-gray-600">Amount</label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              min={totalPrice}
              className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-teal-500 sm:text-sm"
            />
          </div>
        )}
        <div className="flex gap-4">
          <button
            type="submit"
            className="w-full bg-teal-600 text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
            disabled={loading}
          >
            {loading ? 'Placing Order...' : 'Place Order'}
          </button>
          <button
            type="button"
            className="w-full bg-gray-500 text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
            onClick={() => window.history.back()}
          >
            Close
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
}

export default CreateOrder;
