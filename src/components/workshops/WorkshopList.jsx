import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { db } from "../../config/firebase";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  collection,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore";

const WorkshopCard = ({ workshop }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15.5deg", "-17.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / width - 0.35);
    y.set(mouseY / height - 0.5);
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
      <div className="bg-black/40 backdrop-blur-sm rounded-lg shadow-lg hover:shadow-red-500/20 transition-all duration-300 border border-gray-800 hover:border-red-500/30">
        <div className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-xl font-semibold mb-2 text-white">
                {workshop.title}
              </h2>
              <p className="text-sm text-white/80">
                Instructor: {workshop.instructor}
              </p>
            </div>
            <div
              className={`px-3 py-1 rounded-full text-sm ${
                workshop.isFree
                  ? "bg-green-500/20 text-green-400"
                  : "bg-blue-500/20 text-blue-400"
              }`}
            >
              {workshop.isFree ? "Free" : `₹${workshop.price}`}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-4">
            <div>
              <p className="text-sm text-white/60">Date</p>
              <p className="text-white">{new Date(workshop.date).toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-sm text-white/60">Time</p>
              <p className="text-white">{new Date(workshop.date).toLocaleTimeString()}</p>
            </div>
            <div>
              <p className="text-sm text-white/60">Duration</p>
              <p className="text-white">{workshop.duration}</p>
            </div>
            <div>
              <p className="text-sm text-white/60">Available Spots</p>
              <p className="text-white">
                {workshop.availableSpots} / {workshop.totalSpots}
              </p>
            </div>
          </div>

          <div className="flex gap-4 mt-4">
            <Link
              to={`/workshops/${workshop.id}`}
              className="text-red-400 hover:text-red-300 transition-colors ml-auto"
            >
              View Public Page
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const WorkshopList = () => {
  const [workshops, setWorkshops] = useState([]);
  const [showPastWorkshops, setShowPastWorkshops] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchWorkshops();
  }, []);

  const fetchWorkshops = async () => {
    try {
      const workshopsQuery = query(
        collection(db, "workshops"),
        orderBy("date", "desc")
      );
      const querySnapshot = await getDocs(workshopsQuery);
      const workshopsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setWorkshops(workshopsData);
    } catch (error) {
      setError("Error fetching workshops");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredWorkshops = workshops.filter((workshop) => {
    const workshopDate = new Date(workshop.date);
    const now = new Date();
    return showPastWorkshops ? true : workshopDate >= now;
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4 pt-24">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-white">Upcoming Workshops</h1>
        <div className="flex items-center gap-3">
          <span className="text-white/75">Show past workshops</span>
          <button
            onClick={() => setShowPastWorkshops(!showPastWorkshops)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ease-in-out ${
              showPastWorkshops ? 'bg-red-500' : 'bg-gray-700'
            }`}
            role="switch"
            aria-checked={showPastWorkshops}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ease-in-out ${
                showPastWorkshops ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-500/20 text-red-400 p-4 rounded-md mb-6 backdrop-blur-sm border border-red-500/30">
          {error}
        </div>
      )}

      {filteredWorkshops.length === 0 ? (
        <div className="text-center py-12 bg-black/40 backdrop-blur-sm rounded-lg border border-gray-800">
          <p className="text-white/80">
            {showPastWorkshops ? "No workshops found." : "No upcoming workshops found."}
          </p>
          <Link
            to="/admin/workshops/new"
            className="text-red-400 hover:text-red-300 mt-2 inline-block transition-colors"
          >
            Create your first workshop
          </Link>
        </div>
      ) : (
        <div className="grid gap-6">
          {filteredWorkshops.map((workshop) => (
            <WorkshopCard key={workshop.id} workshop={workshop} />
          ))}
        </div>
      )}
    </div>
  );
};

export default WorkshopList;