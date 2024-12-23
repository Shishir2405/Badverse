// src/components/events/EventDetails.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../../config/firebase";
import { doc, getDoc } from "firebase/firestore";
import moment from "moment";
import TicketForm from "../tickets/TicketForm";
import PaymentModal from "../tickets/PaymentModal";
import TicketDisplay from "../tickets/TicketDisplay";

const EventDetails = () => {
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showTicketForm, setShowTicketForm] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [showTicket, setShowTicket] = useState(false);
  const [ticketData, setTicketData] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const eventDoc = await getDoc(doc(db, "events", id));
        if (eventDoc.exists()) {
          setEvent({ id: eventDoc.id, ...eventDoc.data() });
        } else {
          navigate("/events");
        }
      } catch (error) {
        console.error("Error fetching event:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id, navigate]);

  const handleTicketSubmission = (ticket) => {
    setTicketData(ticket);
    if (event.isFree) {
      // For free events, show ticket directly
      setShowTicket(true);
      setShowTicketForm(false);
    } else {
      // For paid events, show payment modal
      setShowPayment(true);
      setShowTicketForm(false);
    }
  };

  const handlePaymentSuccess = (response) => {
    // Update ticket data with payment info
    setTicketData((prev) => ({
      ...prev,
      paymentId: response.razorpay_payment_id,
      status: "paid",
    }));
    setShowPayment(false);
    setShowTicket(true);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl pt-24">
      <div className="text-white rounded-lg shadow-md overflow-hidden ">
        <img
          src={event.imageUrl}
          alt={event.title}
          className="w-full h-64 object-cover"
        />
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-4">{event.title}</h1>
          <div className="flex items-center gap-4 mb-6">
            <span className="text-white">
              {moment(event.date).format("MMMM DD, YYYY")}
            </span>
            <span
              className={`px-3 py-1 rounded-full text-sm ${
                event.isFree
                  ? "bg-green-100 text-green-800"
                  : "bg-blue-100 text-blue-800"
              }`}
            >
              {event.isFree ? "Free" : `₹${event.price}`}
            </span>
          </div>
          <p className="text-white mb-6">{event.description}</p>
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Event Details</h2>
            <div className="space-y-2">
              <p>
                <strong>Location:</strong> {event.location}
              </p>
              <p>
                <strong>Time:</strong> {moment(event.date).format("hh:mm A")}
              </p>
              <p>
                <strong>Duration:</strong> {event.duration}
              </p>
            </div>
          </div>
          {!showTicket && (
            <button
              onClick={() => setShowTicketForm(true)}
              className="w-full bg-red-500 text-white py-3 rounded-md "
            >
              {event.isFree ? "Register Now" : "Book Tickets"}
            </button>
          )}
        </div>
      </div>

      {/* Ticket Form Modal */}
      {showTicketForm && (
        <TicketForm
          event={event}
          onSubmit={handleTicketSubmission}
          onClose={() => setShowTicketForm(false)}
        />
      )}

      {/* Payment Modal */}
      {showPayment && (
        <PaymentModal
          ticket={ticketData}
          event={event}
          onSuccess={handlePaymentSuccess}
          onClose={() => setShowPayment(false)}
        />
      )}

      {/* Ticket Display */}
      {showTicket && <TicketDisplay ticket={ticketData} event={event} />}
    </div>
  );
};

export default EventDetails;
