// WorkshopRegistration.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../../config/firebase";
import { doc, getDoc, collection, addDoc, updateDoc } from "firebase/firestore";
import { useAuth } from "../../context/AuthContext";
import { sendTicketEmail } from "../../services/email";
import PaymentModal from "../tickets/PaymentModal";

const WorkshopRegistration = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [workshop, setWorkshop] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showPayment, setShowPayment] = useState(false);
  const [registrationId, setRegistrationId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    occupation: "",
    experience: "",
    expectations: "",
  });

  useEffect(() => {
    const fetchWorkshop = async () => {
      try {
        const workshopDoc = await getDoc(doc(db, "workshops", id));
        if (workshopDoc.exists()) {
          const workshopData = { id: workshopDoc.id, ...workshopDoc.data() };
          if (workshopData.availableSpots <= 0) {
            setError("This workshop is fully booked.");
          }
          setWorkshop(workshopData);
        } else {
          navigate("/workshops");
        }
      } catch (error) {
        setError("Error fetching workshop details");
      } finally {
        setLoading(false);
      }
    };

    fetchWorkshop();
  }, [id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Create registration data
      const registrationData = {
        workshopId: id,
        userId: currentUser?.uid || null,
        ...formData,
        status: workshop.isFree ? "confirmed" : "pending",
        createdAt: new Date().toISOString(),
      };

      // Add registration to Firestore
      const registrationRef = await addDoc(
        collection(db, "workshop_registrations"),
        registrationData
      );

      // Update available spots
      await updateDoc(doc(db, "workshops", id), {
        availableSpots: workshop.availableSpots - 1,
      });

      setRegistrationId(registrationRef.id);

      if (workshop.isFree) {
        // Send confirmation email for free workshops
        try {
          await sendTicketEmail(formData.email, {
            template_params: {
              name: formData.name,
              eventTitle: workshop.title,
              eventDate: new Date(workshop.date).toLocaleDateString(),
              eventTime: new Date(workshop.date).toLocaleTimeString(),
              eventLocation: workshop.location,
              ticketId: registrationRef.id,
            },
          });
        } catch (emailError) {
          console.error("Error sending email:", emailError);
        }
        navigate("/workshops");
      } else {
        // Show payment modal for paid workshops
        setShowPayment(true);
      }
    } catch (error) {
      setError("Registration failed. Please try again.");
      console.error("Registration error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentSuccess = async (response) => {
    try {
      // Update registration status
      await updateDoc(doc(db, "workshop_registrations", registrationId), {
        status: "confirmed",
        paymentId: response.razorpay_payment_id,
        paymentDetails: response,
        updatedAt: new Date().toISOString(),
      });

      // Send confirmation email
      try {
        await sendTicketEmail(formData.email, {
          template_params: {
            name: formData.name,
            eventTitle: workshop.title,
            eventDate: new Date(workshop.date).toLocaleDateString(),
            eventTime: new Date(workshop.date).toLocaleTimeString(),
            eventLocation: workshop.location,
            ticketId: registrationId,
          },
        });
      } catch (emailError) {
        console.error("Error sending email:", emailError);
      }

      // Navigate to success page with registration details
      navigate(`/payment/success`, {
        state: {
          workshopTitle: workshop.title,
          registrationId: registrationId,
          email: formData.email,
        },
      });
    } catch (error) {
      console.error("Error updating registration:", error);
      navigate(`/payment/failure`, {
        state: {
          error: "Failed to update registration status",
        },
      });
    }
  };

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
        <div className="max-w-2xl mx-auto bg-red-50 p-4 rounded-lg text-red-600">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4 pt-24">
      <div className="max-w-2xl mx-auto rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6">
          Register for {workshop.title}
        </h1>

        {/* Workshop Details */}
        <div className="mb-6 text-white rounded-lg p-4 border border-white">
          <h2 className="font-semibold mb-2">Workshop Details</h2>
          <div className="space-y-2 text-sm">
            <p>Date: {new Date(workshop.date).toLocaleDateString()}</p>
            <p>Time: {new Date(workshop.date).toLocaleTimeString()}</p>
            <p>Duration: {workshop.duration}</p>
            <p>Location: {workshop.location}</p>
            <p>Price: {workshop.isFree ? "Free" : `₹${workshop.price}`}</p>
            <p>Available Spots: {workshop.availableSpots}</p>
          </div>
        </div>

        {/* Registration Form */}
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
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
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
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
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
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-1">
              Occupation
            </label>
            <input
              type="text"
              value={formData.occupation}
              onChange={(e) =>
                setFormData({ ...formData, occupation: e.target.value })
              }
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-1">
              Experience Level
            </label>
            <select
              value={formData.experience}
              onChange={(e) =>
                setFormData({ ...formData, experience: e.target.value })
              }
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            >
              <option value="">Select experience level</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-1">
              What do you expect to learn?
            </label>
            <textarea
              value={formData.expectations}
              onChange={(e) =>
                setFormData({ ...formData, expectations: e.target.value })
              }
              className="w-full px-3 py-2 border rounded-md h-32 focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          </div>

          <div className="flex gap-4 justify-end">
            <button
              type="button"
              onClick={() => navigate(`/workshops/${id}`)}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600 disabled:opacity-50"
            >
              {loading
                ? "Processing..."
                : workshop.isFree
                ? "Register"
                : "Continue to Payment"}
            </button>
          </div>
        </form>

        {/* Payment Modal */}
        {showPayment && (
          <PaymentModal
            ticket={{
              id: registrationId,
              email: formData.email,
              phone: formData.phone,
            }}
            event={{
              id: workshop.id,
              title: workshop.title,
              price: workshop.price,
            }}
            onSuccess={handlePaymentSuccess}
            onClose={() => setShowPayment(false)}
          />
        )}
      </div>
    </div>
  );
};

export default WorkshopRegistration;



