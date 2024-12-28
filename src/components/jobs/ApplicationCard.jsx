// src/components/admin/ApplicationCard.jsx
import React from "react";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaGraduationCap,
  FaClock,
  FaMoneyBill,
  FaFileAlt,
  FaBriefcase,
  FaExternalLinkAlt,
} from "react-icons/fa";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const ApplicationCard = ({ application }) => {
  const {
    fullName,
    email,
    phone,
    education,
    experience,
    expectedSalary,
    appliedAt,
    status,
    resume,
    jobTitle,
    coverLetter,
  } = application;

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(
    mouseYSpring,
    [-0.5, 0.5],
    ["17.5deg", "-17.5deg"]
  );
  const rotateY = useTransform(
    mouseXSpring,
    [-0.5, 0.5],
    ["-17.5deg", "17.5deg"]
  );

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "bg-yellow-500/20 text-yellow-500";
      case "approved":
      case "accepted":
        return "bg-green-500/20 text-green-500";
      case "rejected":
        return "bg-red-500/20 text-red-500";
      default:
        return "bg-gray-500/20 text-gray-500";
    }
  };

  const [showCoverLetter, setShowCoverLetter] = React.useState(false);

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
      className="bg-gray-900/20 backdrop-blur-sm rounded-lg p-6 border border-gray-700 hover:border-red-500/30 transition-all duration-300"
    >
      <motion.div
        style={{
          transform: "translateZ(75px)",
        }}
      >
        {/* Header with Job Title and Status */}
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-xl font-semibold text-white mb-2">
              {jobTitle}
            </h2>
            <div className="flex items-center text-gray-300">
              <FaUser className="mr-2 text-red-500" />
              {fullName}
            </div>
          </div>
          <span
            className={`px-3 py-1 rounded-full text-sm ${getStatusColor(
              status
            )}`}
          >
            {status}
          </span>
        </div>

        {/* Contact Information */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-gray-300">
            <FaEnvelope className="mr-2 text-red-500" />
            {email}
          </div>
          <div className="flex items-center text-gray-300">
            <FaPhone className="mr-2 text-red-500" />
            {phone}
          </div>
          <div className="flex items-center text-gray-300">
            <FaGraduationCap className="mr-2 text-red-500" />
            {education}
          </div>
          <div className="flex items-center text-gray-300">
            <FaBriefcase className="mr-2 text-red-500" />
            {experience} years experience
          </div>
          <div className="flex items-center text-gray-300">
            <FaMoneyBill className="mr-2 text-red-500" />
            Expected: ₹{expectedSalary}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3">
          <div className="flex gap-2">
            <a
              href={resume}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center px-3 py-2 bg-gray-700/50 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              <FaFileAlt className="mr-2" />
              Resume
              <FaExternalLinkAlt className="ml-2 text-xs" />
            </a>
            {coverLetter && (
              <button
                onClick={() => setShowCoverLetter(!showCoverLetter)}
                className="flex-1 px-3 py-2 bg-gray-700/50 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                {showCoverLetter ? "Hide Cover Letter" : "Show Cover Letter"}
              </button>
            )}
          </div>

          {showCoverLetter && coverLetter && (
            <div className="p-4 bg-gray-800/50 rounded-lg">
              <h4 className="text-white font-medium mb-2">Cover Letter</h4>
              <p className="text-gray-300 text-sm whitespace-pre-wrap">
                {coverLetter}
              </p>
            </div>
          )}
        </div>

        {/* Timestamp */}
        <div className="text-sm text-gray-400 mt-4">
          <FaClock className="inline mr-2 text-red-500" />
          Applied: {appliedAt?.toDate().toLocaleDateString()} at{" "}
          {appliedAt?.toDate().toLocaleTimeString()}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ApplicationCard;
