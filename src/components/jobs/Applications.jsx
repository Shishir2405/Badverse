// src/components/admin/Applications.jsx
import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy, updateDoc, doc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { 
  FaUser, 
  FaEnvelope, 
  FaPhone, 
  FaGraduationCap, 
  FaClock, 
  FaMoneyBill,
  FaFileAlt,
  FaExternalLinkAlt,
  FaBriefcase 
} from 'react-icons/fa';

const ApplicationCard = ({ application, onStatusChange, showDetails, onToggleDetails }) => {
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-500';
      case 'reviewed':
        return 'bg-blue-500/20 text-blue-500';
      case 'accepted':
        return 'bg-green-500/20 text-green-500';
      case 'rejected':
        return 'bg-red-500/20 text-red-500';
      default:
        return 'bg-gray-500/20 text-gray-500';
    }
  };

  return (
    <div className="bg-gray-900/20 backdrop-blur-sm rounded-lg p-6 border border-gray-700 hover:border-red-500/30 transition-all duration-300">
      {/* Job Title and Applicant Name */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-semibold text-white">
            {application.jobTitle}
          </h3>
          <div className="flex items-center text-gray-300">
            <FaUser className="mr-2 text-red-500" />
            {application.fullName}
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm ${getStatusBadgeClass(application.status)}`}>
          {application.status}
        </span>
      </div>

      {/* Basic Info */}
      <div className="space-y-2 mb-4">
        <div className="flex items-center text-gray-300">
          <FaEnvelope className="mr-2 text-red-500" />
          {application.email}
        </div>
        <div className="flex items-center text-gray-300">
          <FaPhone className="mr-2 text-red-500" />
          {application.phone}
        </div>
        <div className="flex items-center text-gray-300">
          <FaGraduationCap className="mr-2 text-red-500" />
          {application.education}
        </div>
        <div className="flex items-center text-gray-300">
          <FaClock className="mr-2 text-red-500" />
          {application.experience} years experience
        </div>
        <div className="flex items-center text-gray-300">
          <FaMoneyBill className="mr-2 text-red-500" />
          Expected: ₹{application.expectedSalary}
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-3">
        {/* Resume and Details Buttons */}
        <div className="flex gap-2">
          <a
            href={application.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center px-3 py-2 bg-gray-700/50 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            <FaFileAlt className="mr-2" />
            Resume
            <FaExternalLinkAlt className="ml-2 text-xs" />
          </a>
          <button
            onClick={() => onToggleDetails(application.id)}
            className="flex-1 px-3 py-2 bg-gray-700/50 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            {showDetails === application.id ? 'Hide Details' : 'Show Details'}
          </button>
        </div>

        {/* Cover Letter */}
        {showDetails === application.id && (
          <div className="p-4 bg-gray-800/50 rounded-lg">
            <h4 className="text-white font-medium mb-2">Cover Letter</h4>
            <p className="text-gray-300 text-sm whitespace-pre-wrap">
              {application.coverLetter}
            </p>
          </div>
        )}

        {/* Status Update Buttons */}
        <div className="flex flex-wrap gap-2">
          {application.status !== 'accepted' && (
            <button
              onClick={() => onStatusChange(application.id, 'accepted')}
              className="px-3 py-1 bg-green-500/20 text-green-500 rounded-lg hover:bg-green-500/30 transition-colors"
            >
              Accept
            </button>
          )}
          {application.status !== 'rejected' && (
            <button
              onClick={() => onStatusChange(application.id, 'rejected')}
              className="px-3 py-1 bg-red-500/20 text-red-500 rounded-lg hover:bg-red-500/30 transition-colors"
            >
              Reject
            </button>
          )}
          {application.status !== 'reviewed' && (
            <button
              onClick={() => onStatusChange(application.id, 'reviewed')}
              className="px-3 py-1 bg-blue-500/20 text-blue-500 rounded-lg hover:bg-blue-500/30 transition-colors"
            >
              Mark Reviewed
            </button>
          )}
        </div>
      </div>

      {/* Application Date */}
      <div className="text-sm text-gray-400 mt-4">
        Applied: {application.appliedAt?.toLocaleDateString()} at{' '}
        {application.appliedAt?.toLocaleTimeString()}
      </div>
    </div>
  );
};

const Applications = () => {
  // ... keep your existing state and functions ...

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 pt-24">
      {/* Header section remains the same */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Job Applications</h1>
          <p className="text-gray-400 mt-2">
            Total Applications: {applications.length}
          </p>
        </div>
        
        <div className="flex gap-4">
          <button
            onClick={fetchApplications}
            className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600"
          >
            Refresh
          </button>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <option value="all">All Applications</option>
            <option value="pending">Pending</option>
            <option value="reviewed">Reviewed</option>
            <option value="accepted">Accepted</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      {/* Applications Grid */}
      {filteredApplications.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredApplications.map((application) => (
            <ApplicationCard
              key={application.id}
              application={application}
              onStatusChange={updateApplicationStatus}
              showDetails={showDetails}
              onToggleDetails={(id) => setShowDetails(showDetails === id ? null : id)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <FaBriefcase className="mx-auto text-4xl text-red-500 mb-4" />
          <p className="text-gray-300">No applications found</p>
        </div>
      )}
    </div>
  );
};

export default Applications;