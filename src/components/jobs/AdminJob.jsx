// src/components/jobs/JobList.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../../config/firebase";
import { useAuth } from "../../context/AuthContext";
import { FaPlus, FaBriefcase, FaMapMarkerAlt, FaClock } from "react-icons/fa";

const AdminJob = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const jobsRef = collection(db, "jobs");
      const q = query(jobsRef, orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);
      const jobsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setJobs(jobsData);
    } catch (error) {
      console.error("Error fetching jobs:", error);
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
        <h1 className="text-3xl font-bold text-white">Admin View For Jobs</h1>
        <Link
          to="/jobs/new"
          className="flex items-center px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
        >
          <FaPlus className="mr-2" /> Post Job
        </Link>
      </div>

      {jobs.length === 0 ? (
        <div className="text-center py-12">
          <FaBriefcase className="mx-auto text-4xl text-gray-400 mb-4" />
          <p className="text-gray-500">No jobs posted yet.</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {jobs.map((job) => (
            <Link
              key={job.id}
              to={`/jobs/${job.id}`}
              className="rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 border border-gray-100"
            >
              <div className="mb-4">
                <h2 className="text-xl font-semibold mb-2">{job.title}</h2>
                <p className=" font-medium">{job.company}</p>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center ">
                  <FaMapMarkerAlt className="mr-2" />
                  {job.location}
                </div>
                <div className="flex items-center ">
                  <FaClock className="mr-2" />
                  {job.type}
                </div>
                <div className="">₹{job.salary}</div>
              </div>

              <div className="flex justify-between items-center">
                <div className="text-sm ">
                  Posted{" "}
                  {new Date(job.createdAt?.toDate()).toLocaleDateString()}
                </div>
                <div className="flex space-x-2">
                  {job.reactions?.length > 0 && (
                    <span className="text-sm ">
                      {job.reactions.length} interested
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

export default AdminJob;
