import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const programs = {
  "drift": {
    id: "drift",
    title: "DRIFT Program",
    tagline: "Drone, Research, Innovation, Flight, and Planning",
    type: "Training",
    description: "A comprehensive, industry-oriented training and development initiative designed for individuals who aspire to become professionals in the rapidly growing drone industry.",
    eligibility: "10th-grade pass",
    overview: [
      "Blend of theoretical learning and practical experience",
      "Industry-recognized certification",
      "Job placement assistance",
      "Hands-on training with latest drone technology"
    ],
    phases: [
      {
        name: "Training",
        duration: "40 days",
        cost: "₹10,000 INR",
        stipend: null,
        highlights: [
          "10 days intensive theoretical training",
          "30 days on-site practical training",
          "DGCA approved trainers",
          "Latest industry standards coverage",
          "Safety protocols and maintenance training",
          "Regulatory compliance education"
        ]
      },
      {
        name: "Internships",
        duration: "Variable",
        cost: null,
        stipend: "₹10,000 INR",
        highlights: [
          "Real-world project experience",
          "Professional mentorship",
          "Industry exposure",
          "Internship Certificate provided",
          "Live project participation",
          "Hands-on troubleshooting experience"
        ]
      },
      {
        name: "Placement",
        duration: "Permanent",
        salary: "₹22,000 - ₹25,000 INR per month",
        highlights: [
          "Real-time drone operations",
          "Industry placement assistance",
          "Pre-Placement Offer opportunities",
          "Network building with industry leaders",
          "Career guidance and support",
          "Continuous learning opportunities"
        ]
      }
    ],
    outcomes: [
      "Proficiency in drone operations",
      "Industry-recognized certification",
      "Practical experience in flight planning",
      "Network of industry connections",
      "Job placement support"
    ],
    applicationLink: "/apply/drift"
  },
  "bizeeHR": {
    id: "bizeeHR",
    title: "BizeeHR Industrial Program",
    tagline: "Professional HR Management Training",
    type: "Training",
    description: "A specialized initiative designed to equip participants with practical skills and experience needed to excel in human resources roles within various industries.",
    eligibility: "Open to all",
    overview: [
      "Comprehensive HR training",
      "Practical internship experience",
      "Industry placement support",
      "Professional certification"
    ],
    phases: [
      {
        name: "Training",
        duration: "1 Month",
        cost: "Free",
        stipend: null,
        highlights: [
          "HR principles and practices",
          "Recruitment processes",
          "Employee relations management",
          "Performance management systems",
          "Payroll and compensation",
          "Labor laws and compliance"
        ]
      },
      {
        name: "Internship",
        duration: "Variable",
        cost: null,
        stipend: "₹5,000 INR per month",
        highlights: [
          "Hands-on HR experience",
          "Real company exposure",
          "Practical skill development",
          "Professional mentoring",
          "Project participation",
          "Network building"
        ]
      },
      {
        name: "Placement",
        duration: "Permanent",
        salary: "To be discussed with HR",
        highlights: [
          "Job placement assistance",
          "Career guidance",
          "Industry networking",
          "Interview preparation",
          "Resume building",
          "Salary negotiation support"
        ]
      }
    ],
    outcomes: [
      "Professional HR certification",
      "Practical industry experience",
      "Strong HR foundation",
      "Professional network",
      "Career opportunities"
    ],
    applicationLink: "/apply/bizeeHR"
  }
};

const OpportunityPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const program = programs[id];

  if (!program) {
    return navigate('/career');
  }

  return (
    <div className="min-h-screen bg-[#121212] text-white pt-24">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-[#1e1e1e] rounded-lg shadow-lg p-8 hover:shadow-red-500/50 transition-all duration-300">
          <div className="mb-8">
            <span className="inline-block bg-red-500/20 text-red-500 text-sm font-semibold px-3 py-1 rounded-full mb-2">
              {program.type}
            </span>
            <h1 className="text-3xl font-bold text-red-500 mb-2">{program.title}</h1>
            <p className="text-xl text-gray-400 mb-4">{program.tagline}</p>
            <p className="text-gray-300 mb-4">{program.description}</p>
            <p className="text-sm text-gray-400">Eligibility: {program.eligibility}</p>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold text-red-500 mb-4">Overview</h2>
            <ul className="list-disc pl-5 space-y-2">
              {program.overview.map((item, index) => (
                <li key={index} className="text-gray-300">{item}</li>
              ))}
            </ul>
          </div>

          {program.phases.map((phase, index) => (
            <div key={index} className="mb-8">
              <h2 className="text-xl font-semibold text-red-500 mb-4">
                Phase {index + 1}: {phase.name}
                <span className="text-sm text-gray-400 ml-2">({phase.duration})</span>
              </h2>
              <ul className="list-disc pl-5 space-y-2">
                {phase.highlights.map((highlight, idx) => (
                  <li key={idx} className="text-gray-300">{highlight}</li>
                ))}
              </ul>
              <div className="mt-4 space-y-1">
                {phase.cost && <p className="text-sm text-gray-400">Cost: {phase.cost}</p>}
                {phase.stipend && <p className="text-sm text-gray-400">Stipend: {phase.stipend}</p>}
                {phase.salary && <p className="text-sm text-gray-400">Salary: {phase.salary}</p>}
              </div>
            </div>
          ))}

          <div className="mb-8">
            <h2 className="text-xl font-semibold text-red-500 mb-4">Program Outcomes</h2>
            <ul className="list-disc pl-5 space-y-2">
              {program.outcomes.map((outcome, index) => (
                <li key={index} className="text-gray-300">{outcome}</li>
              ))}
            </ul>
          </div>

          <div className="flex justify-end">
            <button 
              onClick={() => navigate('/career')}
              className="mr-4 px-6 py-2 border border-red-500/30 text-red-500 rounded-md hover:bg-red-500/10 transition-colors"
            >
              Back
            </button>
            <a 
              href={program.applicationLink}
              className="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
            >
              Apply Now
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OpportunityPage;