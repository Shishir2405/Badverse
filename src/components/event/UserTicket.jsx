// src/components/event/UserTickets.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { db } from "../../config/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";
import { useAuth } from "../../context/AuthContext";

const UserTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchTickets = async () => {
      if (!currentUser) {
        setLoading(false);
        return;
      }

      try {
        console.log("Fetching tickets for user:", currentUser.uid);

        // Get tickets
        const ticketsQuery = query(
          collection(db, "tickets"),
          where("userId", "==", currentUser.uid)
        );

        const ticketsSnapshot = await getDocs(ticketsQuery);
        console.log("Found tickets:", ticketsSnapshot.docs.length);

        const ticketsData = [];

        for (const ticketDoc of ticketsSnapshot.docs) {
          const ticketData = {
            id: ticketDoc.id,
            ...ticketDoc.data(),
          };
          console.log("Processing ticket:", ticketData);

          try {
            // Fetch event details
            const eventDocRef = doc(db, "events", ticketData.eventId);
            const eventDoc = await getDoc(eventDocRef);

            if (eventDoc.exists()) {
              ticketData.event = {
                id: eventDoc.id,
                ...eventDoc.data(),
              };
              console.log("Found event for ticket:", ticketData.event);
            } else {
              console.log("No event found for ticket:", ticketData.eventId);
            }
          } catch (eventError) {
            console.error("Error fetching event for ticket:", eventError);
          }

          ticketsData.push(ticketData);
        }

        console.log("Final tickets data:", ticketsData);
        setTickets(ticketsData);
      } catch (error) {
        console.error("Error fetching tickets:", error);
        setError("Failed to load tickets. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, [currentUser]);

  if (!currentUser) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="text-center">
          <p className="text-gray-600 mb-4">
            Please log in to view your tickets.
          </p>
          <Link to="/login" className="text-blue-500 hover:text-blue-600">
            Login
          </Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="bg-red-50 border border-red-200 text-red-600 rounded-md p-4">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">My Tickets</h1>

      {tickets.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600 mb-4">You don't have any tickets yet.</p>
          <Link to="/events" className="text-blue-500 hover:text-blue-600">
            Browse Events
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {tickets.map((ticket) => (
            <div
              key={ticket.id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-2">
                  {ticket.event?.title || "Event Not Found"}
                </h2>
                {ticket.event ? (
                  <div className="mb-4 text-sm text-gray-600">
                    <p>
                      <span className="font-medium">Date:</span>{" "}
                      {new Date(ticket.event.date).toLocaleDateString()}
                    </p>
                    <p>
                      <span className="font-medium">Time:</span>{" "}
                      {new Date(ticket.event.date).toLocaleTimeString()}
                    </p>
                    <p>
                      <span className="font-medium">Location:</span>{" "}
                      {ticket.event.location}
                    </p>
                    <p>
                      <span className="font-medium">Price:</span>{" "}
                      {ticket.event.isFree ? "Free" : `₹${ticket.event.price}`}
                    </p>
                  </div>
                ) : (
                  <p className="mb-4 text-sm text-gray-500">
                    Event details not available
                  </p>
                )}
                <div className="mb-4">
                  <span
                    className={`px-2 py-1 rounded-full text-sm ${
                      ticket.status === "confirmed"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {ticket.status.charAt(0).toUpperCase() +
                      ticket.status.slice(1)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">
                    Ticket ID: {ticket.id.slice(-6)}
                  </span>
                  <Link
                    to={`/events/ticket/${ticket.id}`}
                    className="text-blue-500 hover:text-blue-600"
                  >
                    View Ticket
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserTickets;
