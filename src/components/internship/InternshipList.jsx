import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { FaBriefcase, FaMapMarkerAlt, FaClock, FaSearch } from "react-icons/fa";
import { internshipService } from "../../services/internshipService";

const InternshipCard = ({ internship }) => {
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
      initial={{ scale: 1, opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <Link
        to={`/internships/${internship.id}`}
        className="block bg-gray-900/20 backdrop-blur-sm rounded-lg shadow-lg hover:shadow-red-500/20 transition-all duration-300 p-6 border border-gray-700 hover:border-red-500/30"
      >
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-white mb-2">{internship.title}</h2>
          <p className="text-white/85 font-medium">{internship.company}</p>
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex items-center text-white/75">
            <FaMapMarkerAlt className="mr-2 text-red-500" />
            {internship.location}
          </div>
          <div className="flex items-center text-white/75">
            <FaClock className="mr-2 text-red-500" />
            {internship.duration}
          </div>
          <div className="text-red-400 font-semibold">
            ₹{internship.stipend}
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="text-sm text-white/75">
            Posted {new Date(internship.createdAt?.toDate()).toLocaleDateString()}
          </div>
          <div className="flex space-x-2">
            {internship.reactions?.length > 0 && (
              <span className="text-sm text-red-400">
                {internship.reactions.length} interested
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

const InternshipList = () => {
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredInternships, setFilteredInternships] = useState([]);

  useEffect(() => {
    fetchInternships();
  }, []);

  useEffect(() => {
    const filtered = internships.filter(
      (internship) =>
        internship.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        internship.company.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredInternships(filtered);
  }, [searchTerm, internships]);

  const fetchInternships = async () => {
    try {
      const internshipsData = await internshipService.getAllInternships();
      setInternships(internshipsData);
      setFilteredInternships(internshipsData);
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
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
        <h1 className="text-3xl font-bold text-white">Internship Listings</h1>
        
        {/* Search Bar */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative w-full md:w-96"
        >
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search internships..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-900/20 border border-gray-700 focus:border-red-500/30 rounded-lg 
              text-white placeholder-gray-400 outline-none transition-all duration-300
              focus:ring-2 focus:ring-red-500/20"
          />
        </motion.div>
      </div>

      {filteredInternships.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <FaBriefcase className="mx-auto text-4xl text-red-500 mb-4" />
          <p className="text-white/75">
            {searchTerm ? "No internships match your search." : "No internships posted yet."}
          </p>
        </motion.div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredInternships.map((internship) => (
            <InternshipCard key={internship.id} internship={internship} />
          ))}
        </div>
      )}
    </div>
  );
};

export default InternshipList;