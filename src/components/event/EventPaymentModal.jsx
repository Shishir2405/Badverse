import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRazorpay } from '../../hooks/useRazorpay';
import { db } from '../../config/firebase';
import { doc, updateDoc, addDoc, collection } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';

const EventPaymentModal = ({ event, registrationData, onClose }) => {
  const [loading, setLoading] = useState(false);
  const { initPayment } = useRazorpay();
  const navigate = useNavigate();

  const handlePayment = async () => {
    setLoading(true);
    const registrationId = uuidv4();
    const totalAmount = event.price * (registrationData.numberOfTickets || 1);

    try {
      // Create initial registration record
      const registrationRef = await addDoc(collection(db, "eventRegistrations"), {
        ...registrationData,
        eventId: event.id,
        eventTitle: event.title,
        registrationId,
        status: 'pending',
        price: totalAmount,
        createdAt: new Date().toISOString(),
      });

      // Initialize Razorpay payment
      const response = await initPayment({
        amount: totalAmount * 100, // Convert to paise
        currency: "INR",
        notes: {
          registrationId,
          eventId: event.id,
          email: registrationData.email,
        },
      });

      // Update registration with payment details
      await updateDoc(doc(db, "eventRegistrations", registrationRef.id), {
        status: 'paid',
        paymentId: response.razorpay_payment_id,
        paymentDetails: response,
      });

      // Navigate to success page
      navigate('/events/payment-success', {
        state: {
          eventData: event,
          registrationData: {
            ...registrationData,
            registrationId,
            paymentId: response.razorpay_payment_id,
          },
        },
      });
      
    } catch (error) {
      console.error('Payment failed:', error);
      navigate('/events/payment-failure');
    } finally {
      setLoading(false);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-black/80 rounded-lg max-w-md w-full p-6 border border-red-500/30">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Complete Payment</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-4 mb-6">
          <div className="bg-gray-900/50 p-4 rounded-md border border-gray-700">
            <h3 className="font-semibold mb-2 text-white">{event.title}</h3>
            <div className="space-y-2 text-sm text-gray-300">
              <p>Name: {registrationData.name}</p>
              <p>Email: {registrationData.email}</p>
              <p>Phone: {registrationData.phone}</p>
              <p>Tickets: {registrationData.numberOfTickets || 1}</p>
            </div>
          </div>

          <div className="flex justify-between items-center text-white bg-gray-900/30 p-4 rounded-md">
            <div>
              <p className="text-sm text-gray-400">Total Amount</p>
              <p className="text-xl font-bold">
                ₹{event.price * (registrationData.numberOfTickets || 1)}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-400">Price per ticket</p>
              <p className="text-sm text-gray-300">₹{event.price}</p>
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 text-white border border-red-500/30 rounded-md hover:bg-red-500/10 transition-colors duration-200"
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
      </div>
    </div>
  );
};

export default EventPaymentModal;