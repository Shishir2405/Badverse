import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../../config/firebase";
import { doc, getDoc, addDoc, collection, updateDoc } from "firebase/firestore";
import { motion, AnimatePresence } from "framer-motion";
import moment from "moment";
import { useAuth } from "../../context/AuthContext";
import { v4 as uuidv4 } from "uuid";
import { useRazorpay } from "../../hooks/useRazorpay";
import { Calendar, MapPin, Clock, Users, X } from "lucide-react";

// Registration Form Component
const RegistrationForm = ({ event, onSubmit, onClose }) => {
  const { currentUser } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: currentUser?.email || "",
    phone: "",
    numberOfTickets: 1,
  });

  const totalAmount = event.price * formData.numberOfTickets;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-black/80 rounded-lg max-w-md w-full p-6 border border-red-500/30"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Event Registration</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit(formData);
          }}
          className="space-y-4"
        >
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-1">
              Name
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full px-4 py-2 bg-gray-900/50 border border-red-500/30 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-red-500/50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-200 mb-1">
              Email
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full px-4 py-2 bg-gray-900/50 border border-red-500/30 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-red-500/50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-200 mb-1">
              Phone
            </label>
            <input
              type="tel"
              required
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              className="w-full px-4 py-2 bg-gray-900/50 border border-red-500/30 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-red-500/50"
            />
          </div>

          {!event.isFree && (
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-1">
                Number of Tickets
              </label>
              <select
                value={formData.numberOfTickets}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    numberOfTickets: Number(e.target.value),
                  })
                }
                className="w-full px-4 py-2 bg-gray-900/50 border border-red-500/30 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-red-500/50"
              >
                {[1, 2, 3, 4, 5].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
            </div>
          )}

          {!event.isFree && (
            <div className="bg-gray-900/50 p-4 rounded-md border border-gray-700">
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Price per ticket</span>
                <span className="text-white">₹{event.price}</span>
              </div>
              {formData.numberOfTickets > 1 && (
                <div className="flex justify-between items-center mt-2 text-sm text-gray-400">
                  <span>× {formData.numberOfTickets} tickets</span>
                  <span>₹{totalAmount}</span>
                </div>
              )}
            </div>
          )}

          <div className="pt-4 flex gap-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 text-white border border-red-500/30 rounded-md hover:bg-red-500/10 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-red-500 text-white px-4 py-3 rounded-md hover:bg-red-600 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
            >
              {event.isFree ? "Register" : "Proceed to Payment"}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

// Payment Modal Component
const PaymentModal = ({ event, registrationData, onClose, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const { initPayment } = useRazorpay();
  const navigate = useNavigate();

  const handlePayment = async () => {
    setLoading(true);
    const registrationId = uuidv4();
    const totalAmount = event.price * (registrationData.numberOfTickets || 1);

    try {
      // Create initial registration record
      const registrationRef = await addDoc(
        collection(db, "eventRegistrations"),
        {
          ...registrationData,
          eventId: event.id,
          eventTitle: event.title,
          registrationId,
          status: "pending",
          price: totalAmount,
          createdAt: new Date().toISOString(),
        }
      );

      // Initialize Razorpay payment
      const response = await initPayment({
        amount: totalAmount * 100,
        currency: "INR",
        notes: {
          registrationId,
          eventId: event.id,
          email: registrationData.email,
        },
      });

      // Update registration with payment details
      await updateDoc(doc(db, "eventRegistrations", registrationRef.id), {
        status: "paid",
        paymentId: response.razorpay_payment_id,
        paymentDetails: response,
      });

      onSuccess?.({
        ...registrationData,
        registrationId,
        paymentId: response.razorpay_payment_id,
      });
    } catch (error) {
      console.error("Payment failed:", error);
      navigate("/events/payment-failure");
    } finally {
      setLoading(false);
      onClose();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-black/80 rounded-lg max-w-md w-full p-6 border border-red-500/30"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Complete Payment</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-4 mb-6">
          <div className="bg-gray-900/50 p-4 rounded-md border border-gray-700">
            <h3 className="font-semibold mb-2 text-white">{event.title}</h3>
            <div className="space-y-2 text-sm text-gray-300">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{moment(event.date).format("MMMM DD, YYYY")}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{moment(event.date).format("hh:mm A")}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>{event.location}</span>
              </div>
            </div>
          </div>

          <div className="bg-gray-900/50 p-4 rounded-md border border-gray-700">
            <h3 className="font-semibold mb-2 text-white">Attendee Details</h3>
            <div className="space-y-1 text-sm text-gray-300">
              <p>Name: {registrationData.name}</p>
              <p>Email: {registrationData.email}</p>
              <p>Phone: {registrationData.phone}</p>
              {registrationData.numberOfTickets > 1 && (
                <p>Number of Tickets: {registrationData.numberOfTickets}</p>
              )}
            </div>
          </div>

          <div className="flex justify-between items-center bg-gray-900/30 p-4 rounded-md">
            <div>
              <p className="text-sm text-gray-400">Total Amount</p>
              <p className="text-xl font-bold text-white">
                ₹{event.price * (registrationData.numberOfTickets || 1)}
              </p>
            </div>
            {registrationData.numberOfTickets > 1 && (
              <div className="text-right">
                <p className="text-sm text-gray-400">Price per ticket</p>
                <p className="text-sm text-gray-300">₹{event.price}</p>
              </div>
            )}
          </div>
        </div>

        <div className="flex gap-4">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 text-white border border-red-500/30 rounded-md hover:bg-red-500/10 transition-colors duration-200"
          >
            Cancel
          </button>
          <button
            onClick={handlePayment}
            disabled={loading}
            className="flex-1 bg-red-500 text-white px-4 py-3 rounded-md hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed transform transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Processing...</span>
              </div>
            ) : (
              "Pay Now"
            )}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Main EventDetails Component
const EventDetails = () => {
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [registrationData, setRegistrationData] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();

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

  const handleRegister = async (formData) => {
    if (!currentUser) {
      navigate("/login");
      return;
    }

    if (event.isFree) {
      try {
        const registrationId = uuidv4();
        const registration = {
          ...formData,
          eventId: event.id,
          eventTitle: event.title,
          registrationId,
          status: "confirmed",
          createdAt: new Date().toISOString(),
        };

        await addDoc(collection(db, "eventRegistrations"), registration);

        navigate("/events/tickets", {
          state: {
            newTicketId: registrationId,
            highlight: true,
          },
        });
      } catch (error) {
        console.error("Registration failed:", error);
      }
    } else {
      setRegistrationData(formData);
      setShowPaymentModal(true);
    }
    setShowRegistrationForm(false);
  };

  const handlePaymentSuccess = (paymentData) => {
    navigate("/events/tickets", {
      state: {
        newTicketId: paymentData.registrationId,
        highlight: true,
      },
    });
  };

  const isEventPast = event && moment(event.date).isBefore(moment());

  if (loading) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 px-4 pb-12">
      <div className="max-w-4xl mx-auto">
        {/* Event Image */}
        <div className="relative rounded-xl overflow-hidden h-64 mb-8">
          <div className="absolute inset-0 bg-black/50"></div>
          <img
            src={event.imageUrl}
            alt={event.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Event Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <h1 className="text-3xl font-bold text-white">{event.title}</h1>
            <span
              className={`px-3 py-1 rounded-full text-sm ${
                event.isFree
                  ? "bg-green-500/20 text-green-400 border border-green-500/30"
                  : "bg-red-500/20 text-red-400 border border-red-500/30"
              }`}
            >
              {event.isFree ? "Free" : `₹${event.price}`}
            </span>
          </div>
          <p className="text-gray-300">{event.description}</p>
        </div>

        {/* Event Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
            <h2 className="text-xl font-semibold text-white mb-4">
              Event Details
            </h2>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-gray-300">
                <Calendar className="w-5 h-5 text-red-400" />
                <div>
                  <p className="font-medium">Date</p>
                  <p>{moment(event.date).format("MMMM DD, YYYY")}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <Clock className="w-5 h-5 text-red-400" />
                <div>
                  <p className="font-medium">Time</p>
                  <p>{moment(event.date).format("hh:mm A")}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <MapPin className="w-5 h-5 text-red-400" />
                <div>
                  <p className="font-medium">Location</p>
                  <p>{event.location}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <Users className="w-5 h-5 text-red-400" />
                <div>
                  <p className="font-medium">Capacity</p>
                  <p>{event.capacity} seats</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
            <h2 className="text-xl font-semibold text-white mb-4">
              Organizer Details
            </h2>
            <div className="space-y-4">
              <div>
                <p className="text-gray-400">Organizer</p>
                <p className="text-white font-medium">{event.organizer}</p>
              </div>
              <div>
                <p className="text-gray-400">Contact Email</p>
                <p className="text-white font-medium">{event.contactEmail}</p>
              </div>
              {event.contactPhone && (
                <div>
                  <p className="text-gray-400">Contact Phone</p>
                  <p className="text-white font-medium">{event.contactPhone}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Registration Button */}
        <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
          {isEventPast ? (
            <div className="text-center">
              <p className="text-xl font-semibold text-gray-400 mb-2">
                Event Has Ended
              </p>
              <p className="text-gray-500">
                This event is no longer available for registration.
              </p>
            </div>
          ) : (
            <div className="text-center">
              <button
                onClick={() => setShowRegistrationForm(true)}
                className="bg-red-500 text-white px-8 py-3 rounded-full hover:bg-red-600 transition-colors duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
              >
                {event.isFree ? "Register Now" : "Book Tickets"}
              </button>
              <p className="mt-2 text-gray-400">
                {event.isFree
                  ? "Free registration - Limited seats available"
                  : `Tickets starting at ₹${event.price}`}
              </p>
            </div>
          )}
        </div>

        {/* Modals */}
        <AnimatePresence>
          {showRegistrationForm && (
            <RegistrationForm
              event={event}
              onSubmit={handleRegister}
              onClose={() => setShowRegistrationForm(false)}
            />
          )}

          {showPaymentModal && (
            <PaymentModal
              event={event}
              registrationData={registrationData}
              onClose={() => setShowPaymentModal(false)}
              onSuccess={handlePaymentSuccess}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default EventDetails;
