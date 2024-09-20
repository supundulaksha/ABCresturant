import React, { useRef } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios'; 
import 'react-toastify/dist/ReactToastify.css';


const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  phone: Yup.string().required('Phone number is required'),
  nic: Yup.string().required('NIC number is required'),
});

function CreateStaff() {
  const formRef = useRef(null);

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      phone: '',
      nic: '',
    },
    validationSchema, 
    onSubmit: (values) => {
      axios.post('http://localhost:8081/api/staff', values)
        .then(response => {
          toast.success('Staff created successfully!');
          formik.resetForm(); 
        })
        .catch(error => {
          toast.error('Error creating staff. Please try again.');
          console.error('Error:', error);
        });
    },
  });

  return (
    <>
      <div className="flex flex-col w-full gap-5 mx-auto">
        <nav className="my-2">
          <ol className="flex gap-[16px] text-gray-500">
            
            <li className="flex items-center text-red-950">
              <span>Create Staff</span>
            </li>
          </ol>
        </nav>
        <hr />
        <div className="flex flex-col lg:flex-row lg:gap-3">
          <form
            className=""
            onSubmit={formik.handleSubmit}
            ref={formRef}
          >
            <div className="p-[20px] bg-white rounded-md shadow-sm lg:w-[560px] dark:bg-[#0e2139]">
              <div className="flex flex-col lg:gap-3 lg:flex-row lg:w-[500px]">
                <div className="mb-5 lg:w-[500px]">
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className={`shadow-sm ${
                      formik.touched.name && formik.errors.name
                        ? 'border-red-500'
                        : 'border-gray-300'
                    } bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                    placeholder="Enter Name"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.name}
                  />
                  {formik.touched.name && formik.errors.name && (
                    <p className="mt-1 text-xs text-red-500">
                      {formik.errors.name}
                    </p>
                  )}
                </div>
                <div className="mb-5 lg:w-[500px]">
                  <label
                    htmlFor="phone"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Phone Number
                  </label>
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    className={`shadow-sm ${
                      formik.touched.phone && formik.errors.phone
                        ? 'border-red-500'
                        : 'border-gray-300'
                    } bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                    placeholder="Enter Phone Number"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.phone}
                  />
                  {formik.touched.phone && formik.errors.phone && (
                    <p className="mt-1 text-xs text-red-500">
                      {formik.errors.phone}
                    </p>
                  )}
                </div>
              </div>
              <div className="mb-5 lg:w-[500px]">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className={`shadow-sm ${
                    formik.touched.email && formik.errors.email
                      ? 'border-red-500'
                      : 'border-gray-300'
                  } bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                  placeholder="Enter Email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                />
                {formik.touched.email && formik.errors.email && (
                  <p className="mt-1 text-xs text-red-500">
                    {formik.errors.email}
                  </p>
                )}
              </div>
              <div className="mb-5 lg:w-[500px]">
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className={`shadow-sm ${
                    formik.touched.password && formik.errors.password
                      ? 'border-red-500'
                      : 'border-gray-300'
                  } bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                  placeholder="Enter Password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                />
                {formik.touched.password && formik.errors.password && (
                  <p className="mt-1 text-xs text-red-500">
                    {formik.errors.password}
                  </p>
                )}
              </div>
              <div className="mb-5 lg:w-[500px]">
                <label
                  htmlFor="nic"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  NIC Number
                </label>
                <input
                  type="text"
                  id="nic"
                  name="nic"
                  className={`shadow-sm ${
                    formik.touched.nic && formik.errors.nic
                      ? 'border-red-500'
                      : 'border-gray-300'
                  } bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                  placeholder="Enter NIC Number"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.nic}
                />
                {formik.touched.nic && formik.errors.nic && (
                  <p className="mt-1 text-xs text-red-500">
                    {formik.errors.nic}
                  </p>
                )}
              </div>
              <div className="flex justify-end">
                <button
                  type="button" // Changed from 'reset' to 'button'
                  onClick={() => formik.resetForm()} // Reset form using Formik's method
                  className="text-white bg-[#cb3636] hover:bg-[#e05050] font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
                >
                  Clear All
                </button>
                <button
                  type="submit"
                  className="text-white bg-[#3067af] hover:bg-[#0e2139] font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </div>
    </>
  );
}

export default CreateStaff;
