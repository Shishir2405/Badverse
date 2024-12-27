// pages/admin/Login.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaEnvelope, FaLock, FaShieldAlt } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    adminCode: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { loginAsAdmin } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await loginAsAdmin(formData.email, formData.password, formData.adminCode);
      navigate("/");
    } catch (err) {
      setError("Invalid admin credentials");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="bg-black border border-white p-8 rounded-lg shadow-lg w-96">
        <div className="flex items-center justify-center mb-8">
          <FaShieldAlt className="text-red-500 text-4xl" />
        </div>
        <h2 className="text-2xl font-bold text-white text-center mb-6">
          Admin Login
        </h2>

        {error && (
          <div className="bg-red-500 text-white p-3 rounded mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
            <input
              type="email"
              placeholder="Admin Email"
              className="w-full pl-10 pr-4 py-2 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />
          </div>

          <div className="relative">
            <FaLock className="absolute left-3 top-3 text-gray-400" />
            <input
              type="password"
              placeholder="Password"
              className="w-full pl-10 pr-4 py-2 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required
            />
          </div>

          <div className="relative">
            <FaShieldAlt className="absolute left-3 top-3 text-gray-400" />
            <input
              type="password"
              placeholder="Admin Access Code"
              className="w-full pl-10 pr-4 py-2 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              value={formData.adminCode}
              onChange={(e) =>
                setFormData({ ...formData, adminCode: e.target.value })
              }
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition-colors duration-300 disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login as Admin"}
          </button>
        </form>

        <div className="mt-6 space-y-2 text-center text-gray-400">
          <div>
            <Link to="/login" className="text-red-500 hover:text-red-400">
              Go to User Login
            </Link>
          </div>
          <div>
            <Link
              to="/admin/signup"
              className="text-red-500 hover:text-red-400"
            >
              Go to Admin Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
