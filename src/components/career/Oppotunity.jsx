import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const opportunityDetails = {
  "software-engineer": {
    type: "Job",
    title: "Software Engineer at TechCorp",
    description: "Work on cutting-edge technologies in a collaborative environment.",
    formLink: "https://forms.gle/yourFormLink1",
    requirements: [
      "5+ years of experience in full-stack development",
      "Strong knowledge of React, Node.js, and cloud services",
      "Experience with agile methodologies"
    ],
    responsibilities: [
      "Develop and maintain web applications",
      "Collaborate with cross-functional teams",
      "Participate in code reviews and technical discussions"
    ]
  },
  "data-scientist": {
    type: "Job",
    title: "Data Scientist at InnovateAI",
    description: "Analyze large datasets to build predictive models.",
    formLink: "https://forms.gle/yourFormLink2",
    requirements: [
      "MS/PhD in Data Science or related field",
      "Experience with Python, R, and ML frameworks",
      "Strong statistical background"
    ],
    responsibilities: [
      "Build and deploy machine learning models",
      "Conduct data analysis and visualization",
      "Present findings to stakeholders"
    ]
  }
};

const OpportunityPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const opportunity = opportunityDetails[id];

  if (!opportunity) {
    return navigate('/career');
  }

  return (
    <div className="min-h-screen bg-[#121212] text-white pt-24">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-[#1e1e1e] rounded-lg shadow-lg p-8 hover:shadow-red-500/50 transition-all duration-300">
          <div className="mb-8">
            <span className="inline-block bg-red-500/20 text-red-500 text-sm font-semibold px-3 py-1 rounded-full mb-2">
              {opportunity.type}
            </span>
            <h1 className="text-3xl font-bold text-red-500 mb-4">{opportunity.title}</h1>
            <p className="text-lg text-gray-300 mb-6">{opportunity.description}</p>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold text-red-500 mb-4">Requirements</h2>
            <ul className="list-disc pl-5 space-y-2">
              {opportunity.requirements.map((req, index) => (
                <li key={index} className="text-gray-300">{req}</li>
              ))}
            </ul>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold text-red-500 mb-4">Responsibilities</h2>
            <ul className="list-disc pl-5 space-y-2">
              {opportunity.responsibilities.map((resp, index) => (
                <li key={index} className="text-gray-300">{resp}</li>
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
              href={opportunity.formLink}
              target="_blank"
              rel="noopener noreferrer"
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