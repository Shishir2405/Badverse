import React from "react";
import { Link } from "react-router-dom";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const EventCard = ({ event }) => {
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
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

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
      className="h-full"
    >
      <div className="bg-black/40 backdrop-blur-sm rounded-lg shadow-lg hover:shadow-red-500/20 transition-all duration-300 border border-gray-800 hover:border-red-500/30 p-6 h-full">
        <h2 className="text-xl font-bold mb-2 text-white transform translate-z-10">{event.title}</h2>
        <p className="text-white/80 mb-4 line-clamp-3">{event.description}</p>
        <div className="space-y-2 mb-4">
          <p className="text-sm text-white/80">
            <span className="font-medium text-white">Date:</span> {formattedDate}
          </p>
          <p className="text-sm text-white/80">
            <span className="font-medium text-white">Time:</span> {formattedTime}
          </p>
          <p className="text-sm text-white/80">
            <span className="font-medium text-white">Location:</span> {event.location}
          </p>
        </div>
        <div className="flex justify-between items-center">
          <span
            className={`px-3 py-1 rounded-full text-sm ${
              event.isFree
                ? "bg-green-500/20 text-green-400"
                : "bg-blue-500/20 text-blue-400"
            }`}
          >
            {event.isFree ? "Free" : `₹${event.price}`}
          </span>
          <Link
            to={`/events/${event.id}`}
            className="text-red-400 hover:text-red-300 px-4 py-2 rounded-md transition-colors"
          >
            View Details
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default EventCard;