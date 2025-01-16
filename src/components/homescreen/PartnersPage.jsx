import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Globe, Building2, Briefcase, Plus } from 'lucide-react';
import { db } from '../../config/firebase';
import { 
  collection, 
  query, 
  orderBy, 
  getDocs, 
  where 
} from 'firebase/firestore';



export const PartnersPage = () => {
  const [partners, setPartners] = useState([]);
  const [filteredPartners, setFilteredPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState(null);

  // Fetch partners from Firestore
  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const partnersRef = collection(db, 'partners');
        const q = query(
          partnersRef, 
          orderBy('createdAt', 'desc')
        );

        const snapshot = await getDocs(q);
        const fetchedPartners = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        setPartners(fetchedPartners);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching partners:', err);
        setError('Failed to load partners');
        setLoading(false);
      }
    };

    fetchPartners();
  }, []);

  // Filter partners when category or search query changes
  useEffect(() => {
    const filtered = partners.filter(partner => {
      const matchesCategory = selectedCategory === 'all' || partner.category === selectedCategory;
      const matchesSearch = partner.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });

    setFilteredPartners(filtered);
  }, [partners, selectedCategory, searchQuery]);

  // Render loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-black">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-black text-white">
        {error}
      </div>
    );
  }

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
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/placeholder.png';
                  }}
                />
              </div>
              <p className="text-center text-white mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                {partner.name}
              </p>
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