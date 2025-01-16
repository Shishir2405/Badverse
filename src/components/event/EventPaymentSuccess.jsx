import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

const EventPaymentSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { eventData, registrationData } = location.state || {};

  useEffect(() => {
    // Redirect to ticket page after 3 seconds
    const timer = setTimeout(() => {
      navigate('/events/tickets', {
        state: {
          newTicketId: registrationData?.registrationId,
          highlight: true
        },
        replace: true
      });
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate, eventData, registrationData]);

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
            className="mx-auto w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-6"
          >
            <CheckCircle className="h-8 w-8 text-green-500" />
          </motion.div>

          <h2 className="text-2xl font-bold mb-4 text-white">
            Payment Successful!
          </h2>

          <div className="space-y-4 mb-8">
            <p className="text-gray-300">
              Thank you for registering for{" "}
              <span className="text-white font-medium">{eventData?.title}</span>
            </p>

            <div className="bg-gray-800/50 p-4 rounded-md text-sm border border-gray-700/50">
              <p className="text-gray-300">Transaction ID: {registrationData?.paymentId}</p>
              <p className="text-gray-300 mt-1">Registration ID: {registrationData?.registrationId}</p>
            </div>

            <p className="text-green-400 text-sm">
              Generating your event ticket...
            </p>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/events/tickets', {
              state: {
                newTicketId: registrationData?.registrationId,
                highlight: true
              }
            })}
            className="w-full bg-red-500 text-white px-6 py-3 rounded-md hover:bg-red-600 transition-colors duration-200"
          >
            View Ticket Now
          </motion.button>

          <p className="text-sm text-gray-400 mt-4">
            Redirecting to your ticket in 3 seconds...
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default EventPaymentSuccess;