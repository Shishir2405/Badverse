// src/components/jobs/JobDetail.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { doc, getDoc, collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase";
import { useAuth } from "../../context/AuthContext";
import {
  FaEdit,
  FaTrash,
  FaHeart,
  FaRegHeart,
  FaMapMarkerAlt,
  FaBriefcase,
  FaClock,
  FaDollarSign,
  FaShare,
} from "react-icons/fa";
import { jobService } from "../../services/jobService";
import JobApplicationForm from './JobApplicationForm';

const JobDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);

  useEffect(() => {
    fetchJobDetails();
  }, [id]);

  useEffect(() => {
    if (currentUser && id) {
      checkIfApplied();
    }
  }, [currentUser, id]);

  const checkIfApplied = async () => {
    try {
      const applicationsRef = collection(db, 'applications');
      const q = query(
        applicationsRef, 
        where('userId', '==', currentUser.uid),
        where('jobId', '==', id)
      );
      const snapshot = await getDocs(q);
      setHasApplied(!snapshot.empty);
    } catch (error) {
      console.error('Error checking application status:', error);
    }
  };

  const fetchJobDetails = async () => {
    try {
      const jobDoc = await jobService.getJobById(id);
      if (!jobDoc) {
        setError("Job not found");
        return;
      }
      setJob(jobDoc);
    } catch (err) {
      setError("Error fetching job details");
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this job?")) {
      try {
        await jobService.deleteJob(id);
        navigate("/jobs");
      } catch (err) {
        console.error("Error deleting job:", err);
      }
    }
  };

  const handleReaction = async () => {
    if (!currentUser) {
      navigate('/login');
      return;
    }
    try {
      await jobService.toggleReaction(id, currentUser.uid, "like");
      fetchJobDetails();
    } catch (err) {
      console.error("Error handling reaction:", err);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <p className="text-red-500 text-xl mb-4">{error || "Job not found"}</p>
        <Link to="/jobs" className="text-blue-500 hover:underline">
          Back to Jobs
        </Link>
      </div>
    );
  }

  const isOwner = currentUser?.uid === job.userId;
  const hasLiked = job.reactions?.some((r) => r.userId === currentUser?.uid);

  return (
    <div className="max-w-4xl mx-auto rounded-lg shadow-lg p-8 pt-28 text-white">
      {/* Header Section */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">{job.title}</h1>
          <h2 className="text-xl text-white mb-4">{job.company}</h2>

          <div className="flex flex-wrap gap-4 text-white">
            <div className="flex items-center text-white">
              <FaMapMarkerAlt className="mr-2 text-red-500" />
              {job.location}
            </div>
            <div className="flex items-center text-white">
              <FaClock className="mr-2 text-red-500" />
              {job.type}
            </div>
            <div className="flex items-center text-white">
              <FaDollarSign className="mr-2 text-red-500" />
              {job.salary}
            </div>
          </div>
        </div>

        {isOwner && (
          <div className="flex space-x-3">
            <button
              onClick={() => navigate(`/jobs/${id}/edit`)}
              className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              <FaEdit className="mr-2" /> Edit
            </button>
            <button
              onClick={handleDelete}
              className="flex items-center px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              <FaTrash className="mr-2" /> Delete
            </button>
          </div>
        )}
      </div>

      {/* Job Details */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Job Description</h3>
        <p className="text-white whitespace-pre-line mb-6">{job.description}</p>

        <h3 className="text-xl font-semibold mb-4">Requirements</h3>
        <ul className="list-disc list-inside text-white space-y-2">
          {job.requirements.split("\n").map((req, index) => (
            <li key={index}>{req}</li>
          ))}
        </ul>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between items-center border-t pt-6">
        <div className="flex space-x-4">
          <button
            onClick={handleReaction}
            className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
              hasLiked
                ? "bg-red-100 text-red-500"
                : "text-white border border-white"
            }`}
          >
            {hasLiked ? (
              <FaHeart className="mr-2" />
            ) : (
              <FaRegHeart className="mr-2" />
            )}
            {job.reactions?.length || 0} Likes
          </button>

          <button
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              alert("Link copied to clipboard!");
            }}
            className="flex items-center px-4 py-2 border border-white text-white rounded-lg transition-colors"
          >
            <FaShare className="mr-2" /> Share
          </button>
        </div>

        <div className="flex space-x-4">
          {!isOwner && currentUser && !hasApplied && (
            <button
              onClick={() => setShowApplicationForm(true)}
              className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              Apply Now
            </button>
          )}
          {hasApplied && (
            <span className="px-6 py-3 bg-green-500/20 text-green-500 rounded-lg">
              Application Submitted
            </span>
          )}
          {!currentUser && (
            <Link
              to="/login"
              className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              Login to Apply
            </Link>
          )}
          <Link
            to="/jobs"
            className="px-6 py-3 text-white rounded-lg border border-white hover:bg-gray-800 transition-colors"
          >
            Back to Jobs
          </Link>
        </div>
      </div>

      {/* Application Form Modal */}
      {showApplicationForm && (
        <JobApplicationForm
          jobId={id}
          jobTitle={job.title}
          onClose={() => setShowApplicationForm(false)}
        />
      )}
    </div>
  );
};

export default JobDetail;