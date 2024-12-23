// src/components/workshops/WorkshopCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const WorkshopCard = ({ workshop }) => {
  const workshopDate = new Date(workshop.date);
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative">
        {/* Optional badge for workshop type */}
        <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-semibold ${
          workshop.isFree ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
        }`}>
          {workshop.isFree ? 'Free' : `₹${workshop.price}`}
        </div>
      </div>

      <div className="p-6">
        {/* Workshop Title & Host */}
        <div className="mb-4">
          <h2 className="text-xl font-bold text-gray-900 mb-1">{workshop.title}</h2>
          <p className="text-sm text-gray-600">by {workshop.instructor}</p>
        </div>

        {/* Workshop Details */}
        <div className="space-y-2 mb-4">
          <p className="text-sm text-gray-600">
            <span className="font-medium">Date:</span> {workshopDate.toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-medium">Time:</span> {workshopDate.toLocaleTimeString('en-US', {
              hour: '2-digit',
              minute: '2-digit'
            })}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-medium">Duration:</span> {workshop.duration}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-medium">Location:</span> {workshop.location}
          </p>
        </div>

        {/* Description */}
        <p className="text-gray-600 mb-6 line-clamp-3">{workshop.description}</p>

        {/* Spots Available */}
        <div className="mb-4">
          <div className="flex justify-between items-center text-sm text-gray-600 mb-1">
            <span>Spots Available</span>
            <span>{workshop.availableSpots} / {workshop.totalSpots}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 rounded-full h-2"
              style={{ width: `${(workshop.availableSpots / workshop.totalSpots) * 100}%` }}
            />
          </div>
        </div>

        {/* Action Button */}
        <Link
          to={`/workshops/${workshop.id}`}
          className="block w-full text-center bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default WorkshopCard;