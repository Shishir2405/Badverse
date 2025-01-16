import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../../config/firebase";
import { useAuth } from "../../context/AuthContext";
import { FaPlus, FaBriefcase, FaMapMarkerAlt, FaClock, FaSearch } from "react-icons/fa";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const JobCard = ({ job }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      initial={{ scale: 1 }}
      whileHover={{ scale: 1.02 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <Link
        to={`/jobs/${job.id}`}
        className="block bg-gray-900/20 backdrop-blur-sm rounded-lg shadow-lg hover:shadow-red-500/20 transition-all duration-300 p-6 border border-gray-700 hover:border-red-500/30"
      >
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-white mb-2">{job.title}</h2>
          <p className="text-white/85 font-medium">{job.company}</p>
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex items-center text-white/75">
            <FaMapMarkerAlt className="mr-2 text-red-500" />
            {job.location}
          </div>
          <div className="flex items-center text-white/75">
            <FaClock className="mr-2 text-red-500" />
            {job.type}
          </div>
          <div className="text-red-400 font-semibold">
            ₹ {job.salary.toLocaleString()}
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="text-sm text-white/75">
            Posted {new Date(job.createdAt?.toDate()).toLocaleDateString()}
          </div>
          <div className="flex space-x-2">
            {job.reactions?.length > 0 && (
              <span className="text-sm text-red-400">
                {job.reactions.length} interested
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const { currentUser } = useAuth();

  useEffect(() => {
    fetchJobs();
  }, []);

  useEffect(() => {
    // Filter jobs based on search term
    const filtered = jobs.filter((job) => {
      const searchString = searchTerm.toLowerCase();
      return (
        job.title.toLowerCase().includes(searchString) ||
        job.company.toLowerCase().includes(searchString) ||
        job.location.toLowerCase().includes(searchString) ||
        job.type.toLowerCase().includes(searchString)
      );
    });
    setFilteredJobs(filtered);
  }, [searchTerm, jobs]);

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
      setFilteredJobs(jobsData);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
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
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold text-white">Job Listings</h1>
        <div className="relative w-full md:w-96">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search jobs by title, company, or location..."
            className="w-full pl-10 pr-4 py-2 bg-gray-900/20 backdrop-blur-sm rounded-lg border border-gray-700 focus:border-red-500/30 focus:outline-none focus:ring-1 focus:ring-red-500/30 text-white placeholder-gray-400"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
      </div>

      {filteredJobs.length === 0 ? (
        <div className="text-center py-12">
          <FaBriefcase className="mx-auto text-4xl text-red-500 mb-4" />
          <p className="text-white/75">
            {searchTerm ? "No jobs found matching your search." : "No jobs posted yet."}
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      )}
    </div>
  );
};

export default JobList;