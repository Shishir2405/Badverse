// src/components/event/EventRegistration.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../../config/firebase";
import { doc, getDoc, collection, addDoc } from "firebase/firestore";
import { useAuth } from "../../context/AuthContext";
import { sendTicketEmail } from "../../services/email"; // Add this import

const EventRegistration = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: currentUser?.email || "",
    phone: "",
    numberOfTickets: 1,
  });

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const ticketData = {
        eventId: id,
        userId: currentUser?.uid,
        ...formData,
        status: event.isFree ? "confirmed" : "pending",
        createdAt: new Date().toISOString(),
        totalAmount: event.isFree ? 0 : event.price * formData.numberOfTickets,
      };

      const ticketRef = await addDoc(collection(db, "tickets"), ticketData);

      // Send email confirmation
      try {
        await sendTicketEmail(formData.email, {
          template_params: {
            name: formData.name,
            eventTitle: event.title,
            eventDate: new Date(event.date).toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            }),
            eventTime: new Date(event.date).toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
            }),
            eventLocation: event.location,
            ticketId: ticketRef.id,
            email: formData.email,
            phone: formData.phone,
            numberOfTickets: formData.numberOfTickets,
            totalAmount: event.isFree
              ? "Free"
              : `₹${event.price * formData.numberOfTickets}`,
          },
        });
      } catch (emailError) {
        console.error("Error sending email:", emailError);
        // Continue with navigation even if email fails
      }

      if (event.isFree) {
        navigate(`/events/ticket/${ticketRef.id}`);
      } else {
        navigate(`/payment/process/${ticketRef.id}`);
      }
    } catch (error) {
      console.error("Error registering for event:", error);
    } finally {
      setLoading(false);
    }
  };
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="container mx-auto py-8 px-4 text-center">
        <h2 className="text-2xl font-bold text-red-600">Event not found</h2>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-6">
            Register for {event.title}
          </h1>

          <div className="mb-6 bg-gray-50 rounded-lg p-4">
            <h2 className="font-semibold mb-2">Event Details</h2>
            <div className="space-y-2 text-sm text-gray-600">
              <p>Date: {new Date(event.date).toLocaleDateString()}</p>
              <p>Time: {new Date(event.date).toLocaleTimeString()}</p>
              <p>Location: {event.location}</p>
              <p>Price: {event.isFree ? "Free" : `₹${event.price}`}</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-white mb-1">
                Full Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-1">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {!event.isFree && (
              <div>
                <label className="block text-sm font-medium text-white mb-1">
                  Number of Tickets
                </label>
                <select
                  value={formData.numberOfTickets}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      numberOfTickets: parseInt(e.target.value),
                    })
                  }
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Price Breakdown</h3>
                <div className="flex justify-between items-center">
                  <span>
                    Tickets ({formData.numberOfTickets} × ₹{event.price})
                  </span>
                  <span className="font-semibold">
                    ₹{formData.numberOfTickets * event.price}
                  </span>
                </div>
              </div>
            )}

            <div className="flex gap-4 justify-end">
              <button
                type="button"
                onClick={() => navigate(`/events/${id}`)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 disabled:opacity-50"
              >
                {loading
                  ? "Processing..."
                  : event.isFree
                  ? "Register"
                  : "Continue to Payment"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EventRegistration;
