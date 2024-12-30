import React from "react";
import "./Careerpg.css";

// Example opportunities data
const opportunities = [
  {
    type: "Job",
    title: "Software Engineer at TechCorp",
    description:
      "Work on cutting-edge technologies in a collaborative environment.",
    buttonLabel: "Apply Now",
  },
  {
    type: "Job",
    title: "Data Scientist at InnovateAI",
    description: "Analyze large datasets to build predictive models.",
    buttonLabel: "Apply Now",
  },
  {
    type: "Internship",
    title: "Frontend Developer Intern at DevStart",
    description: "Gain experience building modern web interfaces.",
    buttonLabel: "Apply Now",
  },
  {
    type: "Internship",
    title: "Marketing Intern at BrandBoost",
    description: "Assist in digital marketing campaigns and content creation.",
    buttonLabel: "Apply Now",
  },
  {
    type: "Co-Founder",
    title: "Tech Co-Founder for EdTech Startup",
    description: "Join a growing startup focused on revolutionizing education.",
    buttonLabel: "Apply Now",
  },
  {
    type: "Co-Founder",
    title: "Business Strategist for FinTech Company",
    description:
      "Shape the business strategy of an innovative financial platform.",
    buttonLabel: "Apply Now",
  },
];

function Careerpg() {
  return (
    <div className="pt-24 career-container">
      <h1 className="career-heading">INDUSTRIAL PROGRAMS</h1>

      <div className="career-row">
        {opportunities.map((opportunity, index) => (
          <div className="career-box" key={index}>
            <h2>{opportunity.type}</h2>
            <h3>{opportunity.title}</h3>
            <p>{opportunity.description}</p>
            <button className="career-btn">{opportunity.buttonLabel}</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Careerpg;
