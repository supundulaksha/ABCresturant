import React, { useEffect, useState } from "react";
import axios from "axios";

const ContactFormTable = () => {
  const [contactForms, setContactForms] = useState([]);

  useEffect(() => {
    const fetchContactForms = async () => {
      try {
        const response = await axios.get("http://localhost:8081/api/contact");
        const data = response.data;
        if (Array.isArray(data)) {
          setContactForms(data);
        } else {
          console.error('Unexpected response format:', data);
          setContactForms([]); 
        }
      } catch (error) {
        console.error("Error fetching contact forms:", error);
        setContactForms([]); 
      }
    };

    fetchContactForms();
  }, []);

  const handleEmailReply = (email) => {
  
    window.location.href = `mailto:${email}?subject=Re: Your Inquiry&body=Dear Customer,`;
  };



  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-semibold text-gray-900 mb-6">
        Contact Form Submissions
      </h1>
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone Number</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Message</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {Array.isArray(contactForms) && contactForms.length > 0 ? (
              contactForms.map((form) => (
                <tr key={form.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">{form.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">{form.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">{form.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">{form.phoneNumber}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">{form.subject}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">{form.message}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                    <button
                      onClick={() => handleEmailReply(form.email)}
                      className="text-blue-500 hover:underline"
                    >
                      Reply via Email
                    </button>
                    <br />
                  
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="px-6 py-4 text-center text-gray-500">No data available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ContactFormTable;
