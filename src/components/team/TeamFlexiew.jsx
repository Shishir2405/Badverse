
import React from "react";
import TeamCard from "./TeamCard";

const TeamFlexView = ({ teamMembers, windowWidth }) => {
  return (
    <div className="flex justify-center items-center">
      <div className="relative flex h-[400px] text-center justify-center items-center mt-8 mx-auto">
        {teamMembers
          .slice(0, windowWidth > 768 ? 7 : 2)
          .map((member, index, arr) => (
            <div
              key={member.id}
              className="absolute flex flex-col justify-center items-center w-[225px] p-2"
              style={{
                left: `calc(50% - ${(arr.length * 165) / 2}px + ${index * 155}px)`,
                top: 0,
                zIndex: index < 3 ? index : 7 - index,
              }}
            >
              <TeamCard member={member} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default TeamFlexView;