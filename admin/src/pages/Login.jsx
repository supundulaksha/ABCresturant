import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const adminCredentials = {
      email: "abcadmin@gmail.com",
      password: "123admin",
    };

    if (
      email === adminCredentials.email &&
      password === adminCredentials.password
    ) {
      onLogin("admin");
      navigate("/dashboard");
    } else {
      try {
        const response = await axios.post(
          "http://localhost:8081/api/staff/login",
          { email, password }
        );
        if (response.data) {
          onLogin("staff");
          navigate("/dashboard");
        } else {
          setError("Invalid email or password");
        }
      } catch (error) {
        console.error("Failed to login:", error);
        setError("Invalid email or password");
      }
    }

    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-gradient-to-r from-white to-gray-300 px-4">
      <div className="w-full max-w-sm bg-white border border-gray-300 rounded-lg shadow-lg p-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900">ABC RESTAURANT</h1>
        </div>
        {error && (
          <div
            className="p-4 mt-4 absolute h-[150px] flex items-center ml-10 text-red-800 bg-red-100 border border-red-300 rounded-lg"
            role="alert"
          >
            {error}
          </div>
        )}
        <form className="space-y-6 mt-6" onSubmit={handleLogin}>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full px-4 py-3 mt-1 text-sm border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder=""
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full px-4 py-3 mt-1 text-sm border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder=""
                required
              />
            </div>
          </div>
          <button
  type="submit"
  className="flex justify-center w-full px-4 py-3 text-lg font-semibold text-white bg-[#800000] border border-transparent rounded-lg shadow-lg hover:bg-[#fff] hover:text-[#800000] hover:border-[#800000] focus:outline-[#800000] focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
  disabled={loading}
>
  {loading ? "Logging in..." : "Login"}
</button>

        </form>
      </div>
    </div>
  );
};

export default Login;
