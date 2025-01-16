import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { db } from "../../config/firebase";
import { collection, query, orderBy, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const PartnersSection = () => {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch partners from Firestore
  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const partnersRef = collection(db, "partners");
        const q = query(partnersRef, orderBy("createdAt", "desc"));

        const snapshot = await getDocs(q);
        const fetchedPartners = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setPartners(fetchedPartners);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching partners:", err);
        setError("Failed to load partners");
        setLoading(false);
      }
    };

    fetchPartners();
  }, []);

  // Render loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-black">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-black text-white">
        {error}
      </div>
    );
  }

  return (
    <div className="w-full py-20 bg-black">
      <style>
        {`
          @keyframes scroll {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(calc(-248px * ${partners.length}));
            }
          }
          
          .partners-scroll {
            animation: scroll 50s linear infinite;
          }
          
          .partners-scroll:hover {
            animation-play-state: paused;
          }
        `}
      </style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-bold text-white">Our Partners</h2>
          <Link
            to="/partners"
            className="flex items-center gap-2 text-red-500 hover:text-red-400 transition-colors duration-300"
          >
            View all partners
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="relative overflow-hidden w-full">
          {/* Gradient overlays */}
          <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-black to-transparent z-10" />
          <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-black to-transparent z-10" />

          <div className="overflow-hidden relative">
            <div className="partners-scroll flex gap-8 whitespace-nowrap">
              {/* Render partners */}
              {partners.map((partner) => (
                <div key={partner.id} className="inline-block shrink-0">
                  <div
                    className="w-48 h-24 bg-white/5 rounded-lg overflow-hidden backdrop-blur-sm 
                               border border-white/10 transition-all duration-300
                               hover:border-red-500/50 hover:shadow-lg hover:shadow-red-500/20 group"
                  >
                    <img
                      src={partner.image}
                      alt={partner.name}
                      className="w-full h-full object-contain p-4 filter grayscale 
                               group-hover:grayscale-0 transition-all duration-300
                               group-hover:scale-110"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/placeholder.png";
                      }}
                    />
                  </div>
                </div>
              ))}
              {/* Duplicate partners for seamless scrolling */}
              {partners.map((partner) => (
                <div
                  key={`${partner.id}-dup`}
                  className="inline-block shrink-0"
                >
                  <div
                    className="w-48 h-24 bg-white/5 rounded-lg overflow-hidden backdrop-blur-sm 
                               border border-white/10 transition-all duration-300
                               hover:border-red-500/50 hover:shadow-lg hover:shadow-red-500/20 group"
                  >
                    <img
                      src={partner.image}
                      alt={partner.name}
                      className="w-full h-full object-contain p-4 filter grayscale 
                               group-hover:grayscale-0 transition-all duration-300
                               group-hover:scale-110"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/placeholder.png";
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnersSection;
