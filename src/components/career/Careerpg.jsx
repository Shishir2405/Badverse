import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Sparkles } from "lucide-react";

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
    <div className="min-h-screen bg-black px-4 pt-28">
      <div className="max-w-6xl mx-auto">
        <div className="relative mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-700">
            INDUSTRIAL PROGRAMS
          </h1>
          <div className="absolute -top-6 right-1/4 text-red-500 animate-bounce">
            <Sparkles size={24} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {opportunities.map((opportunity) => (
            <div
              key={opportunity.id}
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-neutral-900 to-neutral-800 p-1"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-700 opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
              
              <div className="relative bg-neutral-900 rounded-xl p-6 h-full transition-transform duration-300 group-hover:-translate-y-1">
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowUpRight className="text-red-500" size={24} />
                </div>

                <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-red-500/10 text-red-500 mb-4">
                  {opportunity.type}
                </span>

                <h3 className="text-xl md:text-2xl font-bold text-white mb-3 group-hover:text-red-500 transition-colors">
                  {opportunity.title}
                </h3>

                <p className="text-gray-400 mb-6 group-hover:text-gray-300 transition-colors">
                  {opportunity.description}
                </p>

                <Link
                  to={`/career/${opportunity.id}`}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-red-500 to-red-700 text-white font-medium 
                    transition-all duration-300 hover:gap-4 hover:shadow-lg hover:shadow-red-500/20"
                >
                  Apply Now
                  <ArrowUpRight size={18} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Careerpg;