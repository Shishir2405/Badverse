import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const partners = [
  { id: 1, name: "Partner 1", image: "/Parterns/1.png" },
  { id: 2, name: "Partner 2", image: "/Parterns/2.png" },
  { id: 3, name: "Partner 3", image: "/Parterns/3.png" },
  { id: 4, name: "Partner 4", image: "/Parterns/4.png" },
  { id: 5, name: "Partner 5", image: "/Parterns/5.png" },
  { id: 6, name: "Partner 6", image: "/Parterns/6.png" },
  { id: 7, name: "Partner 7", image: "/Parterns/7.png" },
  { id: 8, name: "Partner 8", image: "/Parterns/8.png" },
  { id: 9, name: "Partner 9", image: "/Parterns/9.png" },
  { id: 10, name: "Partner 10", image: "/Parterns/10.png" },
  { id: 11, name: "Partner 11", image: "/Parterns/11.png" },
  { id: 12, name: "Partner 12", image: "/Parterns/12.png" },
  { id: 13, name: "Partner 13", image: "/Parterns/13.png" },
  { id: 14, name: "Partner 14", image: "/Parterns/14.png" },
  { id: 15, name: "Partner 15", image: "/Parterns/15.png" },
  { id: 16, name: "Partner 16", image: "/Parterns/16.png" },
  { id: 17, name: "Partner 17", image: "/Parterns/17.png" },
  { id: 18, name: "Partner 18", image: "/Parterns/18.png" },
  { id: 19, name: "Partner 19", image: "/Parterns/19.png" },
  { id: 20, name: "Partner 20", image: "/Parterns/20.png" },
  { id: 21, name: "Partner 21", image: "/Parterns/21.png" },
  { id: 22, name: "Partner 22", image: "/Parterns/22.png" },
  { id: 23, name: "Partner 23", image: "/Parterns/23.png" },
  { id: 24, name: "Partner 24", image: "/Parterns/24.png" },
  { id: 25, name: "Partner 25", image: "/Parterns/25.png" },
  { id: 26, name: "Partner 26", image: "/Parterns/26.png" },
];

const PartnersSection = () => {
  return (
    <div className="w-full py-20 bg-black">
      <style>
        {`
          @keyframes scroll {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(calc(-248px * 26)); /* width of each item (200px) + gap (48px) * number of items */
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
              {/* First set of partners */}
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
                    />
                  </div>
                </div>
              ))}
              {/* Duplicate set for seamless loop */}
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
