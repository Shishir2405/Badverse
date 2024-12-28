// src/components/workshops/WorkshopTickets.jsx
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
  Timestamp
} from "firebase/firestore";
import { useAuth } from "../../context/AuthContext";
import {
  FaCalendar,
  FaClock,
  FaMapMarkerAlt,
  FaTicketAlt,
  FaUser,
  FaEnvelope
} from "react-icons/fa";

const WorkshopTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchTickets = async () => {
      if (!currentUser) {
        console.log("No user found");
        setLoading(false);
        return;
      }

      try {
        console.log("Fetching tickets for user:", currentUser.uid);
        const ticketsQuery = query(
          collection(db, "workshop_tickets"),
          where("userId", "==", currentUser.uid)
        );

        const ticketsSnapshot = await getDocs(ticketsQuery);
        console.log("Found tickets:", ticketsSnapshot.docs.length);

        const ticketsData = [];

        for (const ticketDoc of ticketsSnapshot.docs) {
          const ticketData = {
            id: ticketDoc.id,
            ...ticketDoc.data(),
            createdAt: ticketDoc.data().createdAt instanceof Timestamp 
              ? ticketDoc.data().createdAt.toDate() 
              : new Date(ticketDoc.data().createdAt)
          };
          console.log("Processing ticket:", ticketData);

          try {
            // Fetch workshop details
            const workshopDoc = await getDoc(doc(db, "workshops", ticketData.workshopId));
            console.log("Workshop doc:", workshopDoc.exists(), ticketData.workshopId);
            
            if (workshopDoc.exists()) {
              const workshopData = workshopDoc.data();
              ticketData.workshop = {
                id: workshopDoc.id,
                ...workshopData,
                date: workshopData.date instanceof Timestamp 
                  ? workshopData.date.toDate() 
                  : new Date(workshopData.date)
              };
              console.log("Workshop found:", ticketData.workshop);
            } else {
              console.log("Workshop not found for ID:", ticketData.workshopId);
            }
          } catch (workshopError) {
            console.error("Error fetching workshop:", workshopError);
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
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <p className="text-white mb-4">Please log in to view your tickets.</p>
        <Link
          to="/login"
          className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
        >
          Login
        </Link>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto py-8 px-4">
        <div className="bg-red-500/10 border border-red-500/20 text-red-500 rounded-lg p-4">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 pt-24">
      <h1 className="text-3xl font-bold text-white mb-8">My Workshop Tickets</h1>

      {tickets.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12">
          <FaTicketAlt className="text-4xl text-red-500 mb-4" />
          <p className="text-gray-300 mb-4">You haven't registered for any workshops yet.</p>
          <Link
            to="/workshops"
            className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            Browse Workshops
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {tickets.map((ticket) => (
            <div
              key={ticket.id}
              className="bg-gray-900/20 backdrop-blur-sm rounded-lg p-6 border border-gray-700 hover:border-red-500/30 transition-all duration-300"
            >
              <h2 className="text-xl font-semibold text-white mb-4">
                {ticket.workshop?.title || "Workshop Not Found"}
              </h2>

              <div className="space-y-3 mb-4">
                <div className="flex items-center text-gray-300">
                  <FaUser className="mr-2 text-red-500" />
                  {ticket.name}
                </div>
                <div className="flex items-center text-gray-300">
                  <FaEnvelope className="mr-2 text-red-500" />
                  {ticket.email}
                </div>

                {ticket.workshop && (
                  <>
                    <div className="flex items-center text-gray-300">
                      <FaCalendar className="mr-2 text-red-500" />
                      {ticket.workshop.date.toLocaleDateString()}
                    </div>
                    <div className="flex items-center text-gray-300">
                      <FaClock className="mr-2 text-red-500" />
                      {ticket.workshop.date.toLocaleTimeString()}
                    </div>
                    <div className="flex items-center text-gray-300">
                      <FaMapMarkerAlt className="mr-2 text-red-500" />
                      {ticket.workshop.location}
                    </div>
                  </>
                )}
              </div>

              <div className="mb-4">
                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    ticket.status === "confirmed"
                      ? "bg-green-500/20 text-green-500"
                      : "bg-yellow-500/20 text-yellow-500"
                  }`}
                >
                  {ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-400">
                  Ticket ID: {ticket.id.slice(-6).toUpperCase()}
                </span>
                {ticket.status === "confirmed" && (
                  <Link
                    to={`/workshops/ticket/${ticket.id}`}
                    className="text-red-500 hover:text-red-400 transition-colors"
                  >
                    View Details →
                  </Link>
                )}
              </div>

              <div className="text-sm text-gray-400 mt-4">
                Registered: {ticket.createdAt.toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WorkshopTickets;