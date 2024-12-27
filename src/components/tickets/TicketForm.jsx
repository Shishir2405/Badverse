// src/components/tickets/TicketForm.jsx
import React, { useState } from "react";
import { db } from "../../config/firebase";
import { collection, addDoc } from "firebase/firestore";
import { useRazorpay } from "../../hooks/useRazorpay";
import { sendTicketEmail } from "../../services/email";
import { v4 as uuidv4 } from "uuid";

const TicketForm = ({ event, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [loading, setLoading] = useState(false);
  const { initPayment } = useRazorpay();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const ticketId = uuidv4();
      const ticketData = {
        ...formData,
        eventId: event.id,
        eventTitle: event.title,
        ticketId,
        status: event.isFree ? "confirmed" : "pending",
        createdAt: new Date().toISOString(),
      };

      if (event.isFree) {
        // Handle free registration
        await addDoc(collection(db, "tickets"), ticketData);
        await sendTicketEmail(formData.email, {
          ...ticketData,
          event,
        });
        onClose();
      } else {
        // Handle paid registration
        const paymentData = await initPayment({
          amount: event.price * 100, // Razorpay expects amount in paise
          currency: "INR",
          notes: {
            ticketId,
            eventId: event.id,
          },
        });

        // Save ticket with payment details
        await addDoc(collection(db, "tickets"), {
          ...ticketData,
          payment: {
            id: paymentData.razorpay_payment_id,
            status: "completed",
          },
        });

        // Send email with ticket
        await sendTicketEmail(formData.email, {
          ...ticketData,
          event,
          payment: paymentData,
        });

        onClose();
      }
    } catch (error) {
      console.error("Error processing ticket:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-opacity-80 backdrop-blur-sm bg-black/55 rounded-lg max-w-md w-full p-6">
        <h2 className="text-2xl font-bold mb-4">
          {event.isFree ? "Register for Event" : "Book Tickets"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-white mb-1">
              Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white mb-1">
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white mb-1">
              Phone
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600 disabled:opacity-50"
            >
              {loading
                ? "Processing..."
                : event.isFree
                ? "Register"
                : `Pay ₹${event.price}`}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TicketForm;
