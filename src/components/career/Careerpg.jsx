import React from "react";
import { Link } from "react-router-dom";
import "./Careerpg.css";

const opportunities = [
  {
    id: "drift",
    type: "Industrial Training",
    title: "DRIFT Program - Drone Technology",
    description:
      "Join our comprehensive drone training program covering operations, safety, and maintenance. Get certified and placed with leading drone companies.",
  },
  {
    id: "bizeeHR",
    type: "Industrial Training",
    title: "BizeeHR Industrial Program",
    description:
      "Start your HR career with hands-on training, internship experience, and job placement support in top companies.",
  },
];
function Careerpg() {
  return (
    <div className="pt-24 career-container">
      <h1 className="career-heading">INDUSTRIAL PROGRAMS</h1>

      <div className="career-row">
        {opportunities.map((opportunity) => (
          <div className="career-box" key={opportunity.id}>
            <h2>{opportunity.type}</h2>
            <h3>{opportunity.title}</h3>
            <p>{opportunity.description}</p>
            <Link to={`/career/${opportunity.id}`} className="career-btn">
              Apply Now
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Careerpg;
