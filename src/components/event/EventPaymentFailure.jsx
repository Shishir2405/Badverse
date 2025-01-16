import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { XCircle } from 'lucide-react';

const EventPaymentFailure = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 pt-24 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-black/40 backdrop-blur-sm p-8 rounded-lg shadow-xl max-w-md w-full mx-auto border border-red-500/30"
      >
        <div className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", bounce: 0.5 }}
            className="mx-auto w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mb-6"
          >
            <XCircle className="h-8 w-8 text-red-500" />
          </motion.div>

          <h2 className="text-2xl font-bold mb-4 text-white">
            Payment Failed
          </h2>

          <div className="space-y-4 mb-8">
            <p className="text-gray-300">
              We couldn't process your payment. Please try again.
            </p>

            <div className="bg-red-500/10 p-4 rounded-md text-sm border border-red-500/30">
              <p className="text-red-400">
                If any amount was deducted, it will be refunded within 5-7 business days.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => window.history.back()}
              className="w-full bg-red-500 text-white px-6 py-3 rounded-md hover:bg-red-600 transition-colors duration-200"
            >
              Try Again
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/events')}
              className="w-full bg-gray-800 text-white px-6 py-3 rounded-md hover:bg-gray-700 transition-colors duration-200"
            >
              Back to Events
            </motion.button>
          </div>

          <p className="text-sm text-gray-400 mt-4">
            Need help? Contact our support team.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default EventPaymentFailure;