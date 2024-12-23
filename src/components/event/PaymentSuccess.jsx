// src/components/event/PaymentSuccess.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { db } from "../../config/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { Check } from "lucide-react";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [ticket, setTicket] = useState(null);

  useEffect(() => {
    const updateTicketStatus = async () => {
      try {
        const ticketId = searchParams.get("ticketId");
        const paymentId = searchParams.get("paymentId");

        if (!ticketId || !paymentId) {
          navigate("/events");
          return;
        }

        // Get ticket data
        const ticketDoc = await getDoc(doc(db, "tickets", ticketId));
        if (!ticketDoc.exists()) {
          navigate("/events");
          return;
        }

        // Update ticket status
        await updateDoc(doc(db, "tickets", ticketId), {
          status: "confirmed",
          paymentId,
          updatedAt: new Date().toISOString(),
        });

        setTicket({
          id: ticketDoc.id,
          ...ticketDoc.data(),
        });
      } catch (error) {
        console.error("Error updating ticket:", error);
        navigate("/events");
      } finally {
        setLoading(false);
      }
    };

    updateTicketStatus();
  }, [searchParams, navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-16 px-4">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-6 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Payment Successful!
          </h2>
          <p className="text-gray-600 mb-6">
            Your ticket has been confirmed and sent to your email.
          </p>

          {ticket && (
            <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
              <h3 className="font-semibold mb-2">Booking Details:</h3>
              <p>
                <span className="text-gray-600">Ticket ID:</span> {ticket.id}
              </p>
              <p>
                <span className="text-gray-600">Name:</span> {ticket.name}
              </p>
              <p>
                <span className="text-gray-600">Email:</span> {ticket.email}
              </p>
            </div>
          )}

          <div className="space-y-3">
            <button
              onClick={() => navigate(`/events/ticket/${ticket.id}`)}
              className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              View Ticket
            </button>
            <button
              onClick={() => navigate("/events")}
              className="w-full bg-gray-100 text-white px-4 py-2 rounded hover:bg-gray-200"
            >
              Back to Events
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
