import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../../config/firebase";
import { doc, getDoc, addDoc, updateDoc, collection } from "firebase/firestore";

const EVENT_CATEGORIES = [
  "Workshop",
  "Conference",
  "Meetup",
  "Seminar",
  "Social",
  "Other",
];

const AdminEventForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    isFree: true,
    price: 0,
    capacity: 100,
    category: "",
    tags: [],
    organizer: "",
    contactEmail: "",
    contactPhone: "",
    imageUrl: "",
    registeredUsers: 0,
    availableCapacity: 100,
  });

  useEffect(() => {
    if (id) fetchEvent();
  }, [id]);

  const fetchEvent = async () => {
    try {
      const eventDoc = await getDoc(doc(db, "events", id));
      if (eventDoc.exists()) {
        const eventData = eventDoc.data();
        const eventDate = new Date(eventData.date);
        setFormData({
          ...eventData,
          date: eventDate.toISOString().split("T")[0],
          time: eventDate.toTimeString().split(" ")[0].slice(0, 5),
        });
      }
    } catch (error) {
      setError("Failed to fetch event details");
      console.error("Error:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const eventData = {
        ...formData,
        date: new Date(`${formData.date}T${formData.time}`).toISOString(),
        updatedAt: new Date().toISOString(),
      };

      if (id) {
        await updateDoc(doc(db, "events", id), eventData);
      } else {
        await addDoc(collection(db, "events"), {
          ...eventData,
          createdAt: new Date().toISOString(),
        });
      }

      navigate("/admin/events");
    } catch (error) {
      setError("Failed to save event: " + error.message);
      console.error("Form submission error:", error);
    } finally {
      setLoading(false);
    }
  };

  const validateImageUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  return (
    <div className="container mx-auto py-8 px-4 pt-24">
      <div className="max-w-2xl mx-auto rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6 text-white">
          {id ? "Edit Event" : "Create New Event"}
        </h1>

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-600 rounded-md p-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Event Title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="w-full px-3 py-2 border rounded-md text-white"
              required
            />

            <textarea
              placeholder="Description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full px-3 py-2 border rounded-md text-white h-32"
              required
            />

            <select
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              className="w-full px-3 py-2 border rounded-md text-white"
              required
            >
              <option value="">Select Category</option>
              {EVENT_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Date Time */}
          <div className="grid grid-cols-2 gap-4">
            <input
              type="date"
              value={formData.date}
              onChange={(e) =>
                setFormData({ ...formData, date: e.target.value })
              }
              className="px-3 py-2 border rounded-md text-white"
              required
            />
            <input
              type="time"
              value={formData.time}
              onChange={(e) =>
                setFormData({ ...formData, time: e.target.value })
              }
              className="px-3 py-2 border rounded-md text-white"
              required
            />
          </div>

          {/* Location */}
          <input
            type="text"
            placeholder="Location"
            value={formData.location}
            onChange={(e) =>
              setFormData({ ...formData, location: e.target.value })
            }
            className="w-full px-3 py-2 border rounded-md text-white"
            required
          />

          {/* Image URL Input */}
          <div className="space-y-2">
            <input
              type="url"
              placeholder="Image URL"
              value={formData.imageUrl}
              onChange={(e) =>
                setFormData({ ...formData, imageUrl: e.target.value })
              }
              className="w-full px-3 py-2 border rounded-md text-white"
              required
            />
            {formData.imageUrl && validateImageUrl(formData.imageUrl) && (
              <img
                src={formData.imageUrl}
                alt="Event"
                className="mt-2 h-48 w-full object-cover rounded-lg"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.style.display = 'none';
                  setError("Invalid image URL or image failed to load");
                }}
              />
            )}
          </div>

          {/* Contact Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Organizer Name"
              value={formData.organizer}
              onChange={(e) =>
                setFormData({ ...formData, organizer: e.target.value })
              }
              className="px-3 py-2 border rounded-md text-white"
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={formData.contactEmail}
              onChange={(e) =>
                setFormData({ ...formData, contactEmail: e.target.value })
              }
              className="px-3 py-2 border rounded-md text-white"
              required
            />
            <input
              type="tel"
              placeholder="Phone"
              value={formData.contactPhone}
              onChange={(e) =>
                setFormData({ ...formData, contactPhone: e.target.value })
              }
              className="px-3 py-2 border rounded-md text-white"
              required
            />
          </div>

          {/* Ticket Info */}
          <div className="space-y-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={formData.isFree}
                onChange={(e) =>
                  setFormData({ ...formData, isFree: e.target.checked })
                }
                className="h-4 w-4 text-blue-600 rounded"
              />
              <span className="ml-2 text-white">Free Event</span>
            </div>

            {!formData.isFree && (
              <input
                type="number"
                placeholder="Price (₹)"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
                className="w-full px-3 py-2 border rounded-md text-white"
                min="0"
                required
              />
            )}

            <input
              type="number"
              placeholder="Capacity"
              value={formData.capacity}
              onChange={(e) =>
                setFormData({ ...formData, capacity: e.target.value })
              }
              className="w-full px-3 py-2 border rounded-md text-white"
              min="1"
              required
            />
          </div>

          {/* Submit */}
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => navigate("/admin/events")}
              className="px-4 py-2 text-gray-300 hover:text-white border border-gray-300 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600 disabled:opacity-50"
            >
              {loading ? "Saving..." : id ? "Update Event" : "Create Event"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminEventForm;