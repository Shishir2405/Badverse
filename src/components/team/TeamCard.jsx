
import React from "react";
import { motion } from "framer-motion";

const TeamCard = ({ member }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.05 }}
      className="flex flex-col justify-center items-center w-full p-2 transition-all duration-300"
    >
      <div className="relative group">
        <img
          className="rounded-full w-[200px] border-[3px] border-gray-800 shadow-lg shadow-black/50
          group-hover:shadow-red-500/20 transition-all duration-300"
          src={member.image}
          alt={member.name}
        />
      </div>
      <div className="text-center w-[140px] mt-6">
        <h3 className="mt-2 text-lg font-bold text-white">{member.name}</h3>
        <p className="text-md font-bold text-red-500">{member.title}</p>
        <p className="text-sm text-white/75">{member.description}</p>
      </div>
    </motion.div>
  );
};

export default TeamCard;




