import React, { useState, useEffect, useRef } from 'react';
import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { useAuth } from '../../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Ticket, ArrowDownToLine, Calendar, MapPin } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import html2canvas from 'html2canvas';
import moment from 'moment';

const EventTicket = ({ ticket, event }) => {
  const ticketRef = useRef();
  const isPaid = ticket.status === 'paid';

  const handleDownload = async () => {
    try {
      const ticketElement = ticketRef.current;
      const canvas = await html2canvas(ticketElement);
      const image = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = image;
      link.download = `event-ticket-${ticket.registrationId}.png`;
      link.click();
    } catch (error) {
      console.error('Error downloading ticket:', error);
    }
  };

  return (
    <div ref={ticketRef}>
      <motion.div
        className={`relative overflow-hidden rounded-xl border ${
          isPaid 
            ? 'bg-gradient-to-br from-gray-900 via-red-900 to-black border-red-500/30'
            : 'bg-gray-900 border-gray-700'
        }`}
        whileHover={{ scale: 1.01 }}
        transition={{ duration: 0.2 }}
      >
        {/* Premium Effects */}
        {isPaid && (
          <>
            <div className="absolute inset-0">
              <div className="absolute top-0 right-0 w-40 h-40 bg-red-500/20 rounded-full -translate-y-20 translate-x-20 blur-xl" />
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-red-500/20 rounded-full translate-y-20 -translate-x-20 blur-xl" />
            </div>
          </>
        )}

        <div className="relative">
          {/* Header */}
          <div className={`p-6 border-b ${isPaid ? 'border-red-500/30' : 'border-gray-700'}`}>
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">{event?.title}</h2>
                <div className="flex items-center gap-2 text-gray-400">
                  <Calendar size={16} />
                  <p>{moment(event?.date).format('MMMM DD, YYYY • hh:mm A')}</p>
                </div>
                <div className="flex items-center gap-2 text-gray-400 mt-1">
                  <MapPin size={16} />
                  <p>{event?.location}</p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm ${
                isPaid 
                  ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                  : 'bg-gray-800 text-gray-400 border border-gray-700'
              }`}>
                {isPaid ? 'Premium Access' : 'Standard Access'}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h3 className={`text-sm ${isPaid ? 'text-red-400' : 'text-gray-400'} mb-1`}>
                    Attendee Details
                  </h3>
                  <p className="text-white font-medium">{ticket.name}</p>
                  <p className="text-gray-400 text-sm">{ticket.email}</p>
                  {ticket.phone && (
                    <p className="text-gray-400 text-sm">{ticket.phone}</p>
                  )}
                </div>

                {isPaid && (
                  <div>
                    <h3 className="text-sm text-red-400 mb-1">Transaction ID</h3>
                    <p className="text-white font-mono text-sm">{ticket.paymentId}</p>
                  </div>
                )}
              </div>

              <div className="flex flex-col items-end justify-between">
                <div className={`${isPaid ? 'bg-black/30' : 'bg-gray-800'} p-4 rounded-lg`}>
                  <QRCodeSVG
                    value={ticket.registrationId}
                    size={100}
                    level="H"
                    className={isPaid ? 'qr-premium' : ''}
                  />
                </div>
                <button
                  onClick={handleDownload}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full mt-4 ${
                    isPaid
                      ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30'
                      : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                  } transition-colors`}
                >
                  <ArrowDownToLine size={16} />
                  <span>Download</span>
                </button>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className={`p-4 text-center ${
            isPaid ? 'bg-black/30 text-gray-400' : 'bg-gray-800/50 text-gray-500'
          }`}>
            <p>Please present this ticket at the event entrance</p>
            {isPaid && (
              <p className="text-red-400 mt-1">Premium ticket • Priority access</p>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const EventTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [events, setEvents] = useState({});
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        if (!currentUser?.email) return;

        // Fetch tickets
        const ticketsQuery = query(
          collection(db, 'eventRegistrations'),
          where('email', '==', currentUser.email)
        );

        const ticketsSnapshot = await getDocs(ticketsQuery);
        const ticketsData = ticketsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        // Fetch event details
        const eventsData = {};
        for (const ticket of ticketsData) {
          if (ticket.eventId) {
            const eventDoc = await getDoc(doc(db, 'events', ticket.eventId));
            if (eventDoc.exists()) {
              eventsData[ticket.eventId] = {
                id: eventDoc.id,
                ...eventDoc.data()
              };
            }
          }
        }

        setEvents(eventsData);
        setTickets(ticketsData);
      } catch (error) {
        console.error('Error fetching tickets:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, [currentUser]);

  const filteredTickets = tickets.filter(ticket => {
    if (filter === 'paid') return ticket.status === 'paid';
    if (filter === 'free') return ticket.status === 'confirmed';
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
              <h1 className="text-3xl font-bold text-white">My Event Tickets</h1>
              <p className="text-gray-400 mt-2">Manage your event tickets and registrations</p>
            </div>

            {/* Filter Buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-full transition-colors ${
                  filter === 'all'
                    ? 'bg-red-500 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilter('paid')}
                className={`px-4 py-2 rounded-full transition-colors ${
                  filter === 'paid'
                    ? 'bg-red-500 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                Premium
              </button>
              <button
                onClick={() => setFilter('free')}
                className={`px-4 py-2 rounded-full transition-colors ${
                  filter === 'free'
                    ? 'bg-red-500 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
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
                  <p className="text-2xl font-bold text-white">{tickets.length}</p>
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
                    {tickets.filter(t => t.status === 'paid').length}
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
                    {tickets.filter(t => t.status === 'confirmed').length}
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
                  {filter === 'all' 
                    ? "You haven't registered for any events yet"
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
                  <EventTicket
                    ticket={ticket}
                    event={events[ticket.eventId]}
                  />
                </motion.div>
              ))}
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const styles = `
  .qr-premium {
    filter: drop-shadow(0 0 8px rgba(239, 68, 68, 0.3));
  }
`;

// Add styles to document
const styleSheet = document.createElement('style');
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

export default EventTickets;