// src/components/email/EmailTemplate.jsx
import React from "react";
import { renderToString } from "react-dom/server";

export const TicketEmailTemplate = ({ ticket, event }) => {
  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        maxWidth: "600px",
        margin: "0 auto",
      }}
    >
      <div
        style={{
          backgroundColor: "#f8f9fa",
          padding: "20px",
          textAlign: "center",
        }}
      >
        <h1 style={{ color: "#1a73e8" }}>Your Ticket Confirmation</h1>
      </div>

      <div style={{ padding: "20px" }}>
        <h2>Hello {ticket.name},</h2>
        <p>
          Thank you for registering for {event.title}. Your ticket has been
          confirmed.
        </p>

        <div
          style={{
            backgroundColor: "#f8f9fa",
            padding: "15px",
            margin: "20px 0",
          }}
        >
          <h3>Event Details</h3>
          <p>
            <strong>Date:</strong> {new Date(event.date).toLocaleDateString()}
          </p>
          <p>
            <strong>Time:</strong> {new Date(event.date).toLocaleTimeString()}
          </p>
          <p>
            <strong>Location:</strong> {event.location}
          </p>
          <p>
            <strong>Ticket ID:</strong> {ticket.ticketId}
          </p>
        </div>

        <div style={{ marginTop: "30px" }}>
          <p>Please keep this ticket handy when you arrive at the event.</p>
          <p>For any queries, please contact us at support@BADVERSE.com</p>
        </div>
      </div>

      <div
        style={{
          backgroundColor: "#f8f9fa",
          padding: "20px",
          textAlign: "center",
          marginTop: "20px",
        }}
      >
        <p style={{ margin: "0", color: "#666" }}>
          © 2024 BADVERSE. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export const getEmailHtml = (ticket, event) => {
  return renderToString(<TicketEmailTemplate ticket={ticket} event={event} />);
};
