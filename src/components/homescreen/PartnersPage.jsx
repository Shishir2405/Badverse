import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Globe, Building2, Briefcase } from 'lucide-react';

// Partner categories
const categories = [
  { id: 'all', name: 'All Partners', icon: Globe },
  { id: 'technology', name: 'Technology', icon: Building2 },
  { id: 'enterprise', name: 'Enterprise', icon: Briefcase },
];

// Partners data
const partners = [
  { 
    id: 1, 
    name: "TechCorp", 
    image: "/Parterns/1.png",
    category: "technology"
  },
  { 
    id: 2, 
    name: "InnovateHub", 
    image: "/Parterns/2.png",
    category: "enterprise"
  },
].concat(Array.from({ length: 24 }, (_, i) => ({
  id: i + 3,
  name: `Partner ${i + 3}`,
  image: `/Parterns/${i + 3}.png`,
  category: i % 2 === 0 ? "technology" : "enterprise"
})));

export const PartnersPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter partners based on category and search query
  const filteredPartners = partners.filter(partner => {
    const matchesCategory = selectedCategory === 'all' || partner.category === selectedCategory;
    const matchesSearch = partner.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-b from-black via-black to-red-950/20 py-24"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header section */}
        <motion.div
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold text-white mb-4">Our Partners</h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Collaborating with industry leaders to drive innovation and excellence
          </p>
        </motion.div>

        {/* Search and filter section */}
        <div className="mb-12 space-y-6">
          {/* Search bar */}
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search partners..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white/5 backdrop-blur-sm rounded-lg 
                         border border-white/10 focus:border-red-500/50 
                         text-white placeholder-gray-400 outline-none transition-all"
            />
          </div>

          {/* Category filters */}
          <div className="flex justify-center gap-4">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all
                             ${selectedCategory === category.id 
                               ? 'bg-red-500 text-white' 
                               : 'bg-white/5 text-gray-300 hover:bg-white/10'}`}
                >
                  <Icon className="h-4 w-4" />
                  {category.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Partners grid */}
        <motion.div 
          layout
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
        >
          {filteredPartners.map((partner) => (
            <motion.div
              layout
              key={partner.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <div className="aspect-video bg-white rounded-xl overflow-hidden 
                           shadow-lg transition-all duration-300
                           hover:shadow-xl hover:shadow-red-500/20 
                           hover:border-red-500/50">
                <img
                  src={partner.image}
                  alt={partner.name}
                  className="w-full h-full object-contain p-6 transition-all duration-300
                           group-hover:scale-110"
                />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* No results message */}
        {filteredPartners.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-gray-400 mt-12"
          >
            No partners found matching your criteria.
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default PartnersPage;