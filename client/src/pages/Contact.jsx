import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Make sure to include the CSS

const Contact = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmit = async (data) => {
    try {
      await axios.post('http://localhost:8081/api/contact', data);
      toast.success('Message sent successfully!');
      reset(); 
    } catch (error) {
      toast.error('Failed to send message');
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto p-6 bg-[#800000] shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold text-white mb-6 text-center">Contact Us</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Name Field */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-300">Name</label>
          <input
            type="text"
            id="name"
            placeholder=""
            {...register('name', { required: 'Name is required' })}
            className={`mt-1 p-3 border rounded-md w-full ${errors.name ? 'border-red-500' : 'border-gray-600'} bg-[#fff] text-white`}
          />
          {errors.name && <span className="text-red-500 text-sm mt-1">{errors.name.message}</span>}
        </div>

        {/* Email Field */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email</label>
          <input
            type="email"
            id="email"
            placeholder=""
            {...register('email', { required: 'Email is required', pattern: { value: /\S+@\S+\.\S+/, message: 'Email is invalid' } })}
            className={`mt-1 p-3 border rounded-md w-full ${errors.email ? 'border-red-500' : 'border-gray-600'} bg-[#fff] text-white`}
          />
          {errors.email && <span className="text-red-500 text-sm mt-1">{errors.email.message}</span>}
        </div>

        {/* Phone Number Field */}
        <div>
          <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-300">Phone Number</label>
          <input
            type="text"
            id="phoneNumber"
            placeholder=""
            {...register('phoneNumber')}
            className="mt-1 p-3 border rounded-md w-full bg-[#fff] text-white border-gray-600"
          />
        </div>

        {/* Subject Field */}
        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-gray-300">Subject</label>
          <input
            type="text"
            id="subject"
            placeholder="Subject of your message"
            {...register('subject')}
            className="mt-1 p-3 border rounded-md w-full bg-[#fff] text-white border-gray-600"
          />
        </div>

        {/* Message Field */}
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-300">Message</label>
          <textarea
            id="message"
            placeholder="Your message here..."
            {...register('message', { required: 'Message is required' })}
            className={`mt-1 p-3 border rounded-md w-full ${errors.message ? 'border-red-500' : 'border-gray-600'} bg-[#fff] text-white`}
            rows="5"
          />
          {errors.message && <span className="text-red-500 text-sm mt-1">{errors.message.message}</span>}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2 bg-[#000] text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Send Message
        </button>
      </form>
    </div>
  );
};

export default Contact;
