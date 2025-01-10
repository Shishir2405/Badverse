// src/components/tickets/PaymentModal.jsx
import React, { useState } from "react";
import { useRazorpay } from "../../hooks/useRazorpay";
import { db } from "../../config/firebase";
import { doc, updateDoc } from "firebase/firestore";

const PaymentModal = ({ ticket, event, onSuccess, onClose }) => {
  const [loading, setLoading] = useState(false);
  const { initPayment } = useRazorpay();

  const handlePayment = async () => {
    setLoading(true);
    try {
      const response = await initPayment({
        amount: event.price * 100, // Razorpay expects amount in paise
        currency: "INR",
        notes: {
          ticketId: ticket.id,
          eventId: event.id,
          email: ticket.email,
          phone: ticket.phone,
        },
      });

      // Update ticket with payment information
      await updateDoc(doc(db, "tickets", ticket.id), {
        status: "paid",
        paymentId: response.razorpay_payment_id,
        paymentDetails: response,
      });

      onSuccess(response);
    } catch (error) {
      console.error("Payment failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0  flex items-center justify-center p-4">
      <div className="bg-black rounded-lg max-w-md w-full p-6">
        <h2 className="text-2xl font-bold mb-4">Complete Payment</h2>

        <div className="space-y-4 mb-6">
          <div className="bg-gray-900 p-4 rounded-md">
            <h3 className="font-semibold mb-2">{event.title}</h3>
            <div className="text-sm text-white">
              <p>Ticket ID: {ticket.ticketId}</p>
              <p>Amount: ₹{event.price}</p>
            </div>
          </div>
        </div>

        <div className="border-t pt-4">
          <div className="flex justify-between items-center mb-4">
            <span className="text-white">Total Amount:</span>
            <span className="text-xl font-bold">₹{event.price}</span>
          </div>

          <div className="flex gap-4">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 text-white hover:text-gray-800 border rounded-md"
            >
              Cancel
            </button>
            <button
              onClick={handlePayment}
              disabled={loading}
              className="flex-1 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 disabled:opacity-50"
            >
              {loading ? "Processing..." : "Pay Now"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
