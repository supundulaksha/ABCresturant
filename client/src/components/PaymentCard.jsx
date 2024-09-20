import React, { useState } from 'react';
import axios from 'axios';

function PaymentCard({ userData, selectedItems, totalPrice, onClose }) {
  const [paymentError, setPaymentError] = useState("");
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentCancelled, setPaymentCancelled] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState({
    accountNumber: "",
    expiryDate: "",
    cvv: "",
  });
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handlePaymentChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    const { accountNumber, expiryDate, cvv } = paymentDetails;

    // Basic validation
    if (accountNumber.length !== 10) {
      setPaymentError("Account number must be exactly 10 digits.");
    } else if (!expiryDate || !cvv) {
      setPaymentError("All fields are required.");
    } else {
      setPaymentError("");

      try {
        // Prepare payment data
        const paymentData = {
          accountNumber,
          expiryDate,
          cvv,
          username: userData.username,
          email: userData.email,
          phoneNumber: userData.phoneNumber,
          itemName: selectedItems.map(item => item.name).join(', '),
          itemQuantity: selectedItems.reduce((total, item) => total + item.quantity, 0),
          totalPrice,
          status: "Pending",
        };

        const response = await axios.post('http://localhost:8081/api/payments', paymentData);

        if (response.status === 200) {
          setPaymentSuccess(true);
          setShowSuccessModal(true);
          setTimeout(() => {
            setShowSuccessModal(false);
            onClose(); 
          }, 8000); 
        } else {
          setPaymentError("Payment failed. Please try again.");
        }
      } catch (error) {
        setPaymentError("An error occurred. Please try again.");
      }
    }
  };

  const handleCancelPayment = () => {
    setPaymentCancelled(true); 
    setTimeout(() => {
      onClose(); 
    }, 8000);
  };

  return (
    <>
      <div className="bg-white p-8 font-Manrope rounded-2xl w-full max-w-lg shadow-lg transform transition-all duration-300 ease-in-out">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Payment Information</h2>
        <h3 className='text-center font-bold text-[24px] uppercase'>{userData.username}</h3>
        <div className="my-6 p-4 bg-gray-800 text-white rounded-lg shadow-lg">
          <h3 className="text-xl font-bold mb-4 border-b-2 border-gray-600 pb-2">Order Summary</h3>
          <ul className="space-y-2">
            {selectedItems.map((item) => (
              <li key={item.id} className="flex justify-between items-center">
                <span>{item.name} (x{item.quantity})</span>
                <span>
                  ${item.offerStatus ? item.finalPrice.toFixed(2) : item.price.toFixed(2)}
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex justify-between font-bold text-lg">
            <span>Total:</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
        </div>

        <form onSubmit={handlePaymentSubmit}>
          <div className="mb-6">
            <label
              htmlFor="accountNumber"
              className="block text-lg font-semibold text-gray-700 mb-2"
            >
              Account Number
            </label>
            <input
              type="text"
              id="accountNumber"
              name="accountNumber"
              value={paymentDetails.accountNumber}
              onChange={handlePaymentChange}
              placeholder="Enter  account number"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
            />
          </div>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label htmlFor="expiryDate" className="block text-lg font-semibold text-gray-700 mb-2">
                Expiry Date
              </label>
              <input
                type="text"
                id="expiryDate"
                name="expiryDate"
                value={paymentDetails.expiryDate}
                onChange={handlePaymentChange}
                placeholder="MM/YY"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
              />
            </div>
            <div>
              <label htmlFor="cvv" className="block text-lg font-semibold text-gray-700 mb-2">
                CVV
              </label>
              <input
                type="text"
                id="cvv"
                name="cvv"
                value={paymentDetails.cvv}
                onChange={handlePaymentChange}
                placeholder="3 digits"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
              />
            </div>
          </div>

          {paymentError && (
            <p className="text-red-500 text-sm text-center mb-4">{paymentError}</p>
          )}
          {paymentSuccess && (
            <p className="text-green-500 text-sm text-center mb-4">
              Payment successful!
            </p>
          )}
          {paymentCancelled && (
            <p className="text-red-500 font-semibold  text-[16px] text-center mb-4">
              Payment canceled.
            </p>
          )}

          <div className="flex justify-between items-center mt-6">
            <button
              type="button"
              onClick={handleCancelPayment}
              className="bg-gray-500 text-white py-2 px-6 rounded-lg font-semibold shadow-md hover:bg-gray-600 transition duration-200 ease-in-out"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="text-white bg-[#800000] flex items-center gap-2 hover:bg-[#fff] hover:text-[#800000] hover:border-[#800000] hover:border-1 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 border border-transparent"
            >
              Submit Payment
            </button>
          </div>
        </form>
      </div>

      {showSuccessModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h3 className="text-xl font-bold mb-4">Payment Successful</h3>
            <p>Your payment has been processed successfully!</p>
            <button
              onClick={() => setShowSuccessModal(false)}
              className="mt-4 bg-amber-500 py-2 px-4 rounded-lg text-black font-bold shadow-lg hover:bg-amber-600 transition duration-200 ease-in-out"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default PaymentCard;
