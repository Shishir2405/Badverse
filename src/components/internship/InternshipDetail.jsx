import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  FaEdit,
  FaTrash,
  FaHeart,
  FaRegHeart,
  FaMapMarkerAlt,
  FaBriefcase,
  FaClock,
  FaShare,
  FaExternalLinkAlt
} from "react-icons/fa";
import { internshipService } from "../../services/internshipService";

const DEFAULT_APPLY_FORM = "https://forms.gle/FQtXzp3jA3PgxMAN9";

const InternshipDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [internship, setInternship] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchInternshipDetails();
  }, [id]);

  const fetchInternshipDetails = async () => {
    try {
      const data = await internshipService.getInternshipById(id);
      if (!data) {
        setError("Internship not found");
        return;
      }
      setInternship(data);
    } catch (err) {
      setError("Error fetching internship details");
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this internship?")) {
      try {
        await internshipService.deleteInternship(id);
        navigate("/internships");
      } catch (err) {
        console.error("Error deleting internship:", err);
      }
    }
  };

  const handleReaction = async () => {
    try {
      await internshipService.toggleReaction(id, currentUser.uid, "like");
      fetchInternshipDetails();
    } catch (err) {
      console.error("Error handling reaction:", err);
    }
  };

  const handleApply = () => {
    const applyLink = internship.applyLink || DEFAULT_APPLY_FORM;
    window.open(applyLink, '_blank', 'noopener,noreferrer');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
      </div>
    );
  }

  if (error || !internship) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <p className="text-red-500 text-xl mb-4">{error || "Internship not found"}</p>
        <Link to="/internships" className="text-blue-500 hover:underline">
          Back to Internships
        </Link>
      </div>
    );
  }

  const isOwner = currentUser?.uid === internship.userId;
  const hasLiked = internship.reactions?.some((r) => r.userId === currentUser?.uid);

  return (
    <div className="max-w-4xl mx-auto rounded-lg shadow-lg p-8 pt-28 text-white">
      {/* Header Section */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">{internship.title}</h1>
          <h2 className="text-xl mb-4">{internship.company}</h2>

          <div className="flex flex-wrap gap-4">
            <div className="flex items-center">
              <FaMapMarkerAlt className="mr-2 text-red-500" />
              {internship.location}
            </div>
            <div className="flex items-center">
              <FaClock className="mr-2 text-red-500" />
              {internship.duration}
            </div>
            <div className="flex items-center">
              <FaBriefcase className="mr-2 text-red-500" />
              ₹{internship.stipend}
            </div>
          </div>
        </div>

        <div className="flex space-x-3">
          <button
            onClick={handleApply}
            className="flex items-center px-6 py-3 bg-red-500 text-white rounded-lg 
                     hover:bg-red-600 transition-all duration-300 font-semibold
                     shadow-lg hover:shadow-red-500/20"
          >
            Apply Now <FaExternalLinkAlt className="ml-2 h-4 w-4" />
          </button>
          
          {isOwner && (
            <>
              <button
                onClick={() => navigate(`/internships/${id}/edit`)}
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
            </>
          )}
        </div>
      </div>

      {/* Internship Details */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Description</h3>
        <p className="whitespace-pre-line mb-6">{internship.description}</p>

        <h3 className="text-xl font-semibold mb-4">Requirements</h3>
        <ul className="list-disc list-inside space-y-2">
          {internship.requirements.split("\n").map((req, index) => (
            <li key={index}>{req}</li>
          ))}
        </ul>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between items-center border-t border-gray-700 pt-6">
        <div className="flex space-x-4">
          <button
            onClick={handleReaction}
            className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
              hasLiked
                ? "bg-red-500 text-white"
                : "text-white border border-white hover:bg-red-500"
            }`}
          >
            {hasLiked ? (
              <FaHeart className="mr-2" />
            ) : (
              <FaRegHeart className="mr-2" />
            )}
            {internship.reactions?.length || 0} Interested
          </button>

          <button
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              alert("Link copied to clipboard!");
            }}
            className="flex items-center px-4 py-2 border border-white text-white rounded-lg hover:bg-white hover:text-black transition-colors"
          >
            <FaShare className="mr-2" /> Share
          </button>
        </div>

        <Link
          to="/internships"
          className="px-6 py-2 text-white hover:underline"
        >
          Back to Internships
        </Link>
      </div>
    </div>
  );
};

export default InternshipDetail;