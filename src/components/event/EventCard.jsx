// src/components/events/EventCard.jsx
import React from "react";
import { Link } from "react-router-dom";

const EventCard = ({ event }) => {
  const eventDate = new Date(event.date);
  const formattedDate = eventDate.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const formattedTime = eventDate.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="rounded-lg shadow-md overflow-hidden border border-white">
      <div className="p-6">
        <h2 className="text-xl font-bold mb-2">{event.title}</h2>
        <p className="text-white mb-4 line-clamp-3">{event.description}</p>
        <div className="space-y-2 mb-4">
          <p className="text-sm text-white">
            <span className="font-medium">Date:</span> {formattedDate}
          </p>
          <p className="text-sm text-white">
            <span className="font-medium">Time:</span> {formattedTime}
          </p>
          <p className="text-sm text-white">
            <span className="font-medium">Location:</span> {event.location}
          </p>
        </div>
        <div className="flex justify-between items-center">
          <span
            className={`px-3 py-1 rounded-full text-sm ${
              event.isFree
                ? "bg-green-100 text-green-800"
                : "bg-blue-100 text-blue-800"
            }`}
          >
            {event.isFree ? "Free" : `₹${event.price}`}
          </span>
          <Link
            to={`/events/${event.id}`}
            className=" text-red-500 px-4 py-2 rounded-md"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
