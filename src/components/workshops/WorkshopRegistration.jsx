import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../../config/firebase';
import { doc, getDoc, addDoc, collection, updateDoc } from 'firebase/firestore';
import { useAuth } from '../../context/AuthContext';
import { v4 as uuidv4 } from 'uuid';
import { useRazorpay } from '../../hooks/useRazorpay';
import { motion, AnimatePresence } from 'framer-motion';

const PaymentModal = ({ workshop, registrationData, onClose }) => {
  const [loading, setLoading] = useState(false);
  const { initPayment } = useRazorpay();
  const navigate = useNavigate();

  const handlePayment = async () => {
    setLoading(true);
    const registrationId = uuidv4();

    try {
      // Create initial registration record
      const registrationRef = await addDoc(collection(db, "workshopRegistrations"), {
        ...registrationData,
        workshopId: workshop.id,
        workshopTitle: workshop.title,
        registrationId,
        status: 'pending',
        price: workshop.price,
        createdAt: new Date().toISOString(),
      });

      // Initialize Razorpay payment
      const response = await initPayment({
        amount: workshop.price * 100,
        currency: "INR",
        notes: {
          registrationId,
          workshopId: workshop.id,
          email: registrationData.email,
        },
      });

      // Update registration with payment details
      await updateDoc(doc(db, "workshopRegistrations", registrationRef.id), {
        status: 'paid',
        paymentId: response.razorpay_payment_id,
        paymentDetails: response,
      });

      // Update workshop available spots
      await updateDoc(doc(db, "workshops", workshop.id), {
        availableSpots: workshop.availableSpots - 1,
      });

      // Navigate to tickets page
      navigate('/tickets', {
        state: {
          newTicketId: registrationId,
          highlight: true
        }
      });

    } catch (error) {
      console.error('Payment failed:', error);
      // You might want to show an error message to the user here
    } finally {
      setLoading(false);
      onClose();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-black/80 rounded-lg max-w-md w-full p-6 border border-red-500/30"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Complete Registration</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-4 mb-6">
          <div className="bg-gray-900/50 p-4 rounded-md border border-gray-700">
            <h3 className="font-semibold mb-2 text-white">{workshop.title}</h3>
            <div className="space-y-2 text-sm text-gray-300">
              <p>Name: {registrationData.name}</p>
              <p>Email: {registrationData.email}</p>
              <p>Phone: {registrationData.phone}</p>
            </div>
          </div>

          <div className="flex justify-between items-center text-white">
            <span>Registration Fee:</span>
            <span className="text-xl font-bold">₹{workshop.price}</span>
          </div>
        </div>

        <div className="flex gap-4">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 text-white border border-red-500/30 rounded-md hover:bg-red-500/10"
          >
            Cancel
          </button>
          <button
            onClick={handlePayment}
            disabled={loading}
            className="flex-1 bg-red-500 text-white px-4 py-3 rounded-md hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed transform transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Processing...</span>
              </div>
            ) : (
              "Pay Now"
            )}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

const WorkshopRegistration = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [workshop, setWorkshop] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: currentUser?.email || '',
    phone: '',
  });

  useEffect(() => {
    const fetchWorkshop = async () => {
      try {
        const workshopDoc = await getDoc(doc(db, "workshops", id));
        if (workshopDoc.exists()) {
          setWorkshop({ id: workshopDoc.id, ...workshopDoc.data() });
        } else {
          navigate('/workshops');
        }
      } catch (error) {
        console.error("Error fetching workshop:", error);
        navigate('/workshops');
      } finally {
        setLoading(false);
      }
    };

    fetchWorkshop();
  }, [id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (workshop.isFree) {
      try {
        const registrationId = uuidv4();
        
        // Create registration record
        await addDoc(collection(db, "workshopRegistrations"), {
          ...formData,
          workshopId: workshop.id,
          workshopTitle: workshop.title,
          registrationId,
          status: 'confirmed',
          price: 0,
          createdAt: new Date().toISOString(),
        });

        // Update workshop available spots
        await updateDoc(doc(db, "workshops", workshop.id), {
          availableSpots: workshop.availableSpots - 1,
        });

        // Navigate to tickets page
        navigate('/tickets', {
          state: {
            newTicketId: registrationId,
            highlight: true
          }
        });
      } catch (error) {
        console.error('Registration failed:', error);
      }
    } else {
      setShowPaymentModal(true);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 pt-24">
      <div className="max-w-md mx-auto">
        <div className="bg-black/80 backdrop-blur-sm rounded-lg p-6 border border-red-500/30">
          <h1 className="text-2xl font-bold mb-6 text-white">
            Register for {workshop.title}
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-1">
                Name
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 bg-gray-900/50 border border-red-500/30 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-red-500/50"
                placeholder="Your full name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-200 mb-1">
                Email
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2 bg-gray-900/50 border border-red-500/30 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-red-500/50"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-200 mb-1">
                Phone
              </label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-2 bg-gray-900/50 border border-red-500/30 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-red-500/50"
                placeholder="Your phone number"
              />
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition-colors duration-200"
              >
                {workshop.isFree ? "Register Now" : `Pay ₹${workshop.price}`}
              </button>
            </div>
          </form>
        </div>
      </div>

      <AnimatePresence>
        {showPaymentModal && (
          <PaymentModal
            workshop={workshop}
            registrationData={formData}
            onClose={() => setShowPaymentModal(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default WorkshopRegistration;