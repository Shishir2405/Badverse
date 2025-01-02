// src/components/event/EventTicketDisplay.jsx
import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../config/firebase";
import { doc, getDoc } from "firebase/firestore";
import { QRCodeSVG } from "qrcode.react"; // Changed this line
import html2canvas from "html2canvas";

const EventTicketDisplay = () => {
  const { ticketId } = useParams();
  const [ticket, setTicket] = useState(null);
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const ticketRef = useRef();

  useEffect(() => {
    const fetchTicketAndEvent = async () => {
      try {
        const ticketDoc = await getDoc(doc(db, "tickets", ticketId));
        if (ticketDoc.exists()) {
          const ticketData = { id: ticketDoc.id, ...ticketDoc.data() };
          setTicket(ticketData);

          // Fetch event details
          const eventDoc = await getDoc(doc(db, "events", ticketData.eventId));
          if (eventDoc.exists()) {
            setEvent({ id: eventDoc.id, ...eventDoc.data() });
          }
        }
      } catch (error) {
        console.error("Error fetching ticket:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTicketAndEvent();
  }, [ticketId]);

  const downloadTicket = async () => {
    const ticketElement = ticketRef.current;
    if (ticketElement) {
      const canvas = await html2canvas(ticketElement);
      const link = document.createElement("a");
      link.download = `ticket-${ticketId}.png`;
      link.href = canvas.toDataURL();
      link.click();
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
      </div>
    );
  }

  if (!ticket || !event) {
    return (
      <div className="container mx-auto py-8 px-4 text-center">
        <h2 className="text-2xl font-bold text-red-600">Ticket not found</h2>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-4 flex justify-end">
          <button
            onClick={downloadTicket}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Download Ticket
          </button>
        </div>

        <div
          ref={ticketRef}
          className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6">
            <h2 className="text-2xl font-bold">{event.title}</h2>
            <p className="opacity-90">
              {new Date(event.date).toLocaleDateString()} at{" "}
              {new Date(event.date).toLocaleTimeString()}
            </p>
          </div>

          {/* Ticket Content */}
          <div className="p-6">
            <div className="flex justify-between">
              {/* Left Section */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm text-gray-600">Attendee</h3>
                  <p className="font-semibold">{ticket.name}</p>
                  <p className="text-sm text-gray-600">{ticket.email}</p>
                  {ticket.phone && (
                    <p className="text-sm text-gray-600">{ticket.phone}</p>
                  )}
                </div>

                <div>
                  <h3 className="text-sm text-gray-600">Venue</h3>
                  <p className="font-semibold">{event.location}</p>
                </div>

                {ticket.numberOfTickets > 1 && (
                  <div>
                    <h3 className="text-sm text-gray-600">Number of Tickets</h3>
                    <p className="font-semibold">{ticket.numberOfTickets}</p>
                  </div>
                )}

                <div>
                  <h3 className="text-sm text-gray-600">Ticket Status</h3>
                  <p
                    className={`font-semibold ${
                      ticket.status === "confirmed"
                        ? "text-green-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {ticket.status.charAt(0).toUpperCase() +
                      ticket.status.slice(1)}
                  </p>
                </div>
              </div>

              {/* Right Section - QR Code */}
              <div className="text-center">
                <QRCodeSVG value={ticketId} size={120} level="H" />
                <p className="text-xs text-gray-500 mt-2">
                  Ticket ID: {ticketId}
                </p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-6 py-4">
            <div className="text-center text-sm text-gray-600">
              <p>Present this ticket at the venue entrance</p>
              <p className="mt-1">For support, contact: support@BADVERSE.com</p>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-6 bg-blue-50 p-4 rounded-lg">
          <h3 className="font-semibold mb-2">Important Information</h3>
          <ul className="text-sm text-gray-600 space-y-2">
            <li>• Please arrive 30 minutes before the event starts</li>
            <li>• Bring a valid ID for verification</li>
            <li>• This ticket is non-transferable</li>
            <li>
              •{" "}
              {event.isFree
                ? "This is a free event"
                : `Ticket price: ₹${event.price}`}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default EventTicketDisplay;
