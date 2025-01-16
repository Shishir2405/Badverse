import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRazorpay } from '../../hooks/useRazorpay';
import { db } from '../../config/firebase';
import { doc, updateDoc, addDoc, collection } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';

const WorkshopPaymentModal = ({ workshop, registrationData, onClose }) => {
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
        amount: workshop.price * 100, // Convert to paise
        currency: "INR",
        notes: {
          registrationId,
          workshopId: workshop.id,
          email: registrationData.email,
        },
      });

      // Update registration with payment details
      const updatedRegistration = await updateDoc(doc(db, "workshopRegistrations", registrationRef.id), {
        status: 'paid',
        paymentId: response.razorpay_payment_id,
        paymentDetails: response,
      });

      // Update workshop available spots
      await updateDoc(doc(db, "workshops", workshop.id), {
        availableSpots: workshop.availableSpots - 1,
      });

      // Close the modal
      onClose();

      // Show success message and redirect to tickets page
      const successToast = document.createElement('div');
      successToast.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in-out';
      successToast.textContent = 'Payment successful! Redirecting to your ticket...';
      document.body.appendChild(successToast);

      // Remove the toast after 3 seconds
      setTimeout(() => {
        document.body.removeChild(successToast);
      }, 3000);

      // Navigate to tickets page with focus on the new ticket
      navigate('/tickets', { 
        state: { 
          newTicketId: registrationId,
          highlight: true 
        }
      });

    } catch (error) {
      console.error('Payment failed:', error);
      
      // Show error toast
      const errorToast = document.createElement('div');
      errorToast.className = 'fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in-out';
      errorToast.textContent = 'Payment failed. Please try again.';
      document.body.appendChild(errorToast);

      // Remove the error toast after 3 seconds
      setTimeout(() => {
        document.body.removeChild(errorToast);
      }, 3000);

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-black/80 rounded-lg max-w-md w-full p-6 border border-red-500/30">
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
            className="flex-1 px-4 py-2 text-white border border-red-500/30 rounded-md hover:bg-red-500/10 transition-colors duration-200"
          >
            Cancel
          </button>
          <button
            onClick={handlePayment}
            disabled={loading}
            className="flex-1 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
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

export default WorkshopPaymentModal;