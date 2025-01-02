// src/components/tickets/TicketDisplay.jsx
import React, { useRef } from "react";
import { QRCodeSVG } from "qrcode.react";
import moment from "moment";
import html2canvas from "html2canvas";

const TicketDisplay = ({ ticket, event }) => {
  const ticketRef = useRef();

  const downloadTicket = async () => {
    const ticketElement = ticketRef.current;
    if (ticketElement) {
      const canvas = await html2canvas(ticketElement);
      const link = document.createElement("a");
      link.download = `ticket-${ticket.id}.png`;
      link.href = canvas.toDataURL();
      link.click();
    }
  };

  // Create verification URL
  const verificationUrl = `${window.location.origin}/verify-ticket/${ticket.id}`;

  return (
    <div className="max-w-2xl mx-auto p-4">
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
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6">
          <h2 className="text-2xl font-bold">{event.title}</h2>
          <p className="opacity-90">
            {moment(event.date).format("MMMM DD, YYYY • hh:mm A")}
          </p>
        </div>

        <div className="p-6">
          <div className="flex justify-between">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm text-gray-600">Attendee</h3>
                <p className="font-semibold">{ticket.name}</p>
                <p className="text-sm text-gray-600">{ticket.email}</p>
              </div>

              <div>
                <h3 className="text-sm text-gray-600">Venue</h3>
                <p className="font-semibold">{event.location}</p>
              </div>

              <div>
                <h3 className="text-sm text-gray-600">Ticket Type</h3>
                <p className="font-semibold">
                  {event.isFree ? "Free Registration" : "Paid Ticket"}
                </p>
              </div>

              <div>
                <h3 className="text-sm text-gray-600">Status</h3>
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

            <div className="text-center space-y-2">
              <QRCodeSVG
                value={verificationUrl}
                size={120}
                level="H"
                includeMargin={true}
              />
              <p className="text-xs text-gray-500">Scan to verify ticket</p>
              <p className="text-xs text-gray-500">ID: {ticket.id}</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 px-6 py-4">
          <div className="text-center text-sm text-gray-600">
            <p>Present this ticket at the venue entrance</p>
            <p className="mt-1">For support, contact: support@BADVERSE.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketDisplay;
