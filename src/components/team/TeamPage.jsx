import React, { useState, useEffect } from "react";
import TeamFlexView from "./TeamFlexiew";
import TeamGridView from "./TeamGridView";
import { FaExpandAlt, FaCompressAlt } from "react-icons/fa";
import { motion } from "framer-motion";

const Vignette = ({ position, size }) => {
  const vignetteStyle = {
    position: "absolute",
    left: position.left,
    top: position.top,
    width: size.width,
    height: size.height,
    pointerEvents: "none",
    background:
      "radial-gradient(circle, rgba(354, 0, 0, 0.5) 0%, rgba(278, 0, 0, 0) 70%)",
    zIndex: -30,
  };
  return <div style={vignetteStyle}></div>;
};

const TeamPage = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [showAllMembers, setShowAllMembers] = useState(false);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const teamMembers = [
    {
      id: 1,
      name: "Smit Rami",
      image: "/team/smit.jpeg",
      title: "CTO",
    },
    {
      id: 1,
      name: "Vaishnavi",
      image: "/team/Vaishnavi.jpeg",
      title: "MD",
    },
    {
      id: 1,
      name: "Shivanshi Gupta",
      image: "/team/shivanshi.jpeg",
      title: "Project Lead",
    },
    {
      id: 1,
      name: "Shishir Shrivastava",
      image: "/team/shishir.jpg",
      title: "Developer",
    },

    {
      id: 1,
      name: "Sonali Singh",
      image: "/team/sonali.jpeg",
    },

    {
      id: 1,
      name: "Muskan",
      image: "/team/Muskan.jpeg",
    },
  ];

  return (
    <>
      {windowWidth > 768 && (
        <>
          <Vignette
            position={{ left: "0", top: "0" }}
            size={{ width: "700px", height: "700px" }}
          />
          <Vignette
            position={{ left: "900px", top: "0px" }}
            size={{ width: "500px", height: "500px" }}
          />
        </>
      )}

      <div className="min-h-screen bg-black/40 backdrop-blur-sm pt-24">
        <div className="flex justify-center items-center p-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col p-4 text-center"
          >
            <h1 className="text-red-500 font-bold text-2xl uppercase text-center">
              Our Team
            </h1>
            <p className="text-white/75 text-center">
              Meet the brilliant minds behind our success
            </p>
          </motion.div>
        </div>

        {showAllMembers ? (
          <TeamGridView teamMembers={teamMembers} />
        ) : (
          <TeamFlexView teamMembers={teamMembers} windowWidth={windowWidth} />
        )}

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowAllMembers(!showAllMembers)}
          className={`${windowWidth <= 730 || showAllMembers ? "" : "hidden"} 
            mx-auto flex justify-center text-center items-center mt-4 gap-3 p-2 
            border-2 border-red-500 rounded-xl
            hover:shadow-lg hover:shadow-red-500/20 
            transition-all duration-300
            text-white`}
        >
          {showAllMembers ? (
            <FaCompressAlt className="text-red-500" />
          ) : (
            <FaExpandAlt className="text-red-500" />
          )}
          {showAllMembers ? "Show Less" : "Show More"}
        </motion.button>
      </div>
    </>
  );
};

export default TeamPage;
