// components/internships/AdminInternship.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaPlus, FaBriefcase, FaMapMarkerAlt, FaClock } from "react-icons/fa";
import { internshipService } from "../../services/internshipService";
import { useAuth } from "../../context/AuthContext";

const AdminInternship = () => {
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();

  useEffect(() => {
    fetchInternships();
  }, []);

  const fetchInternships = async () => {
    try {
      const data = await internshipService.getAllInternships();
      setInternships(data);
    } catch (error) {
      console.error("Error fetching internships:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 pt-24">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">Admin View For Internships</h1>
        <Link
          to="/internships/new"
          className="flex items-center px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
        >
          <FaPlus className="mr-2" /> Post Internship
        </Link>
      </div>

      {internships.length === 0 ? (
        <div className="text-center py-12">
          <FaBriefcase className="mx-auto text-4xl text-gray-400 mb-4" />
          <p className="text-gray-500">No internships posted yet.</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {internships.map((internship) => (
            <Link
              key={internship.id}
              to={`/internships/${internship.id}`}
              className="rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 border border-gray-100"
            >
              <div className="mb-4">
                <h2 className="text-xl font-semibold text-white mb-2">
                  {internship.title}
                </h2>
                <p className="text-white font-medium">{internship.company}</p>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center text-white">
                  <FaMapMarkerAlt className="mr-2" />
                  {internship.location}
                </div>
                <div className="flex items-center text-white">
                  <FaClock className="mr-2" />
                  {internship.duration}
                </div>
                <div className="text-white">₹{internship.stipend}</div>
              </div>

              <div className="flex justify-between items-center">
                <div className="text-sm text-white">
                  Posted{" "}
                  {new Date(internship.createdAt?.toDate()).toLocaleDateString()}
                </div>
                <div className="flex space-x-2">
                  {internship.reactions?.length > 0 && (
                    <span className="text-sm text-white">
                      {internship.reactions.length} interested
                    </span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminInternship;