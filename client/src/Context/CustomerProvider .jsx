// src/contexts/CustomerContext.js
import React, { createContext, useState, useContext } from 'react';

// Create Context
const CustomerContext = createContext();

// Create a provider component
export const CustomerProvider = ({ children }) => {
  const [customer, setCustomer] = useState(null);

  return (
    <CustomerContext.Provider value={{ customer, setCustomer }}>
      {children}
    </CustomerContext.Provider>
  );
};

// Custom hook to use customer context
export const useCustomer = () => {
  return useContext(CustomerContext);
};
