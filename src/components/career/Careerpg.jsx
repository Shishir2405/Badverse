import React from "react";
import { Link } from "react-router-dom";
import "./Careerpg.css";

const opportunities = [
  {
    id: "software-engineer",
    type: "Job",
    title: "Software Engineer at TechCorp",
    description: "Work on cutting-edge technologies in a collaborative environment.",
  },
  {
    id: "data-scientist",
    type: "Job",
    title: "Data Scientist at InnovateAI",
    description: "Analyze large datasets to build predictive models.",
  },
  {
    id: "frontend-intern",
    type: "Internship",
    title: "Frontend Developer Intern at DevStart",
    description: "Gain experience building modern web interfaces.",
  },
  {
    id: "marketing-intern",
    type: "Internship",
    title: "Marketing Intern at BrandBoost",
    description: "Assist in digital marketing campaigns and content creation.",
  },
  {
    id: "tech-cofounder",
    type: "Co-Founder",
    title: "Tech Co-Founder for EdTech Startup",
    description: "Join a growing startup focused on revolutionizing education.",
  },
  {
    id: "business-cofounder",
    type: "Co-Founder",
    title: "Business Strategist for FinTech Company",
    description: "Shape the business strategy of an innovative financial platform.",
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