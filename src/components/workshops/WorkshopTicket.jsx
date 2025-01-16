import React, { useState, useEffect, useRef } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";
import { db } from "../../config/firebase";
import { useAuth } from "../../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { Ticket, ArrowDownToLine } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import html2canvas from "html2canvas";
import moment from "moment";

const UserTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [workshops, setWorkshops] = useState({});
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const { currentUser } = useAuth();
  const ticketRefs = useRef({});

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        if (!currentUser?.email) return;

        const registrationsRef = collection(db, "workshopRegistrations");
        const q = query(
          registrationsRef,
          where("email", "==", currentUser.email)
        );

        const querySnapshot = await getDocs(q);
        const registrationsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Fetch workshop details
        const workshopsData = {};
        for (const registration of registrationsData) {
          if (registration.workshopId) {
            const workshopDoc = await getDoc(
              doc(db, "workshops", registration.workshopId)
            );
            if (workshopDoc.exists()) {
              workshopsData[registration.workshopId] = {
                id: workshopDoc.id,
                ...workshopDoc.data(),
              };
            }
          }
        }

        setWorkshops(workshopsData);
        setTickets(registrationsData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching tickets:", error);
        setLoading(false);
      }
    };

    fetchTickets();
  }, [currentUser]);

  const handleDownload = async (ticketId) => {
    try {
      const ticketElement = ticketRefs.current[ticketId];
      if (ticketElement) {
        const canvas = await html2canvas(ticketElement);
        const image = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = image;
        link.download = `workshop-ticket-${ticketId}.png`;
        link.click();
      }
    } catch (error) {
      console.error("Error downloading ticket:", error);
    }
  };

  const PremiumTicket = ({ workshopData, ticket }) => (
    <div ref={(el) => (ticketRefs.current[ticket.id] = el)}>
      <motion.div
        className="bg-gradient-to-br from-gray-900 via-red-900 to-black border border-red-500/30 rounded-xl overflow-hidden relative"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
      >
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-40 h-40 bg-red-500/20 rounded-full -translate-y-20 translate-x-20 blur-xl" />
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-red-500/20 rounded-full translate-y-20 -translate-x-20 blur-xl" />
        </div>

        <div className="relative">
          <div className="p-6 border-b border-red-500/30">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">
                  {ticket.workshopTitle}
                </h2>
                <p className="text-red-400">
                  {moment(workshopData?.date).format("MMMM DD, YYYY • hh:mm A")}
                </p>
              </div>
              <span className="px-3 py-1 bg-red-500/20 text-red-400 border border-red-500/30 rounded-full text-sm">
                Premium Access
              </span>
            </div>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-red-400 text-sm mb-1">
                    Attendee Details
                  </h3>
                  <p className="text-white font-medium">{ticket.name}</p>
                  <p className="text-gray-300 text-sm">{ticket.email}</p>
                  <p className="text-gray-300 text-sm">{ticket.phone}</p>
                </div>
                <div>
                  <h3 className="text-red-400 text-sm mb-1">Payment ID</h3>
                  <p className="text-white font-mono text-sm">
                    {ticket.paymentId}
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-end">
                <div className="bg-black/30 p-4 rounded-lg mb-4">
                  <QRCodeSVG
                    value={ticket.registrationId}
                    size={120}
                    level="H"
                    className="qr-premium"
                  />
                </div>
                <motion.button
                  onClick={() => handleDownload(ticket.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-4 py-2 bg-red-500/20 text-red-400 rounded-full hover:bg-red-500/30 transition-colors"
                >
                  <ArrowDownToLine size={16} />
                  <span>Download</span>
                </motion.button>
              </div>
            </div>
          </div>

          <div className="p-4 bg-black/30 text-center">
            <p className="text-red-400 font-medium">
              Premium Ticket • Priority Access
            </p>
            <p className="text-sm text-gray-400 mt-1">
              Registration ID: {ticket.registrationId}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );

  const SimpleTicket = ({ workshopData, ticket }) => (
    <div ref={(el) => (ticketRefs.current[ticket.id] = el)}>
      <motion.div
        className="bg-gray-900 border border-gray-700 rounded-xl overflow-hidden"
        whileHover={{ scale: 1.01 }}
        transition={{ duration: 0.2 }}
      >
        <div className="p-6 border-b border-gray-700">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-xl font-bold text-white mb-2">
                {ticket.workshopTitle}
              </h2>
              <p className="text-gray-400">
                {moment(workshopData?.date).format("MMMM DD, YYYY • hh:mm A")}
              </p>
            </div>
            <span className="px-3 py-1 bg-gray-800 text-gray-400 border border-gray-700 rounded-full text-sm">
              Standard Access
            </span>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-gray-400 text-sm mb-1">Attendee</h3>
              <p className="text-white">{ticket.name}</p>
              <p className="text-gray-400 text-sm mt-1">{ticket.email}</p>
            </div>

            <div className="flex flex-col items-end">
              <QRCodeSVG value={ticket.registrationId} size={80} level="H" />
              <motion.button
                onClick={() => handleDownload(ticket.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-4 text-sm text-gray-400 hover:text-white transition-colors"
              >
                Download Ticket
              </motion.button>
            </div>
          </div>
        </div>

        <div className="p-4 bg-gray-800/50 text-center text-sm text-gray-400">
          <p>Registration ID: {ticket.registrationId}</p>
        </div>
      </motion.div>
    </div>
  );

  const filteredTickets = tickets.filter((ticket) => {
    if (filter === "paid") return ticket.status === "paid";
    if (filter === "free") return !ticket.paymentId;
    return true;
  });

  if (loading) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 px-4 pb-12">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white">
                My Workshop Tickets
              </h1>
              <p className="text-gray-400 mt-2">
                Manage your workshop registrations and tickets
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setFilter("all")}
                className={`px-4 py-2 rounded-full transition-colors ${
                  filter === "all"
                    ? "bg-red-500 text-white"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilter("paid")}
                className={`px-4 py-2 rounded-full transition-colors ${
                  filter === "paid"
                    ? "bg-red-500 text-white"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                }`}
              >
                Premium
              </button>
              <button
                onClick={() => setFilter("free")}
                className={`px-4 py-2 rounded-full transition-colors ${
                  filter === "free"
                    ? "bg-red-500 text-white"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                }`}
              >
                Free
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gray-700/50 rounded-lg">
                  <Ticket className="w-5 h-5 text-gray-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Total Tickets</p>
                  <p className="text-2xl font-bold text-white">
                    {tickets.length}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-red-500/10 rounded-lg">
                  <Ticket className="w-5 h-5 text-red-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Premium Tickets</p>
                  <p className="text-2xl font-bold text-red-400">
                    {tickets.filter((t) => t.status === "paid").length}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-500/10 rounded-lg">
                  <Ticket className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Free Tickets</p>
                  <p className="text-2xl font-bold text-green-400">
                    {tickets.filter((t) => !t.paymentId).length}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tickets Grid */}
        <AnimatePresence mode="wait">
          {filteredTickets.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center py-12"
            >
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 max-w-md mx-auto border border-gray-700/50">
                <Ticket className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <p className="text-gray-300">No tickets found</p>
                <p className="text-sm text-gray-400 mt-2">
                  {filter === "all"
                    ? "You haven't registered for any workshops yet"
                    : `No ${filter} tickets found`}
                </p>
              </div>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredTickets.map((ticket) => (
                <motion.div
                  key={ticket.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {ticket.status === "paid" ? (
                    <PremiumTicket
                      workshopData={workshops[ticket.workshopId]}
                      ticket={ticket}
                    />
                  ) : (
                    <SimpleTicket
                      workshopData={workshops[ticket.workshopId]}
                      ticket={ticket}
                    />
                  )}
                </motion.div>
              ))}
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

// Add necessary CSS for QR code styling
const style = document.createElement("style");
style.textContent = `
  .qr-premium {
    filter: drop-shadow(0 0 8px rgba(239, 68, 68, 0.3));
  }
`;
document.head.appendChild(style);

export default UserTickets;
