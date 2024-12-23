// src/components/event/AdminEventForm.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db, storage } from "../../config/firebase";
import { doc, getDoc, addDoc, updateDoc, collection } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const AdminEventForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    isFree: true,
    price: 0,
    capacity: 100,
    image: null,
    imageUrl: "",
  });

  useEffect(() => {
    const fetchEvent = async () => {
      if (id) {
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
          console.error("Error fetching event:", error);
        }
      }
    };
    fetchEvent();
  }, [id]);

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setFormData({
        ...formData,
        image: e.target.files[0],
      });
    }
  };

  const uploadImage = async () => {
    if (!formData.image) return formData.imageUrl;

    const imageRef = ref(storage, `events/${formData.image.name + Date.now()}`);
    await uploadBytes(imageRef, formData.image);
    const url = await getDownloadURL(imageRef);
    return url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Combine date and time
      const eventDateTime = new Date(`${formData.date}T${formData.time}`);

      // Upload image if there's a new one
      const imageUrl = await uploadImage();

      const eventData = {
        title: formData.title,
        description: formData.description,
        date: eventDateTime.toISOString(),
        location: formData.location,
        isFree: formData.isFree,
        price: formData.isFree ? 0 : Number(formData.price),
        capacity: Number(formData.capacity),
        updatedAt: new Date().toISOString(),
      };

      if (id) {
        // Update existing event
        await updateDoc(doc(db, "events", id), eventData);
      } else {
        // Create new event
        await addDoc(collection(db, "events"), {
          ...eventData,
          createdAt: new Date().toISOString(),
        });
      }
      navigate("/admin/events");
    } catch (error) {
      console.error("Error saving event:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4 pt-24">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">
          {id ? "Edit Event" : "Create New Event"}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-white mb-1">
              Event Title
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-1">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full px-3 py-2 border rounded-md h-32"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-white mb-1">
                Date
              </label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-1">
                Time
              </label>
              <input
                type="time"
                value={formData.time}
                onChange={(e) =>
                  setFormData({ ...formData, time: e.target.value })
                }
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-1">
              Location
            </label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>

          {/* <div>
            <label className="block text-sm font-medium text-white mb-1">
              Event Image
            </label>
            <input
              type="file"
              onChange={handleImageChange}
              accept="image/*"
              className="w-full px-3 py-2 border rounded-md"
            />
            {formData.imageUrl && (
              <img
                src={formData.imageUrl}
                alt="Event preview"
                className="mt-2 h-32 object-cover rounded-md"
              />
            )}
          </div> */}

          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              checked={formData.isFree}
              onChange={(e) =>
                setFormData({ ...formData, isFree: e.target.checked })
              }
              className="h-4 w-4 text-blue-600 rounded border-gray-300"
            />
            <label className="ml-2 text-sm text-white">
              This is a free event
            </label>
          </div>

          {!formData.isFree && (
            <div>
              <label className="block text-sm font-medium text-white mb-1">
                Ticket Price (₹)
              </label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
                className="w-full px-3 py-2 border rounded-md"
                min="0"
                required
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-white mb-1">
              Event Capacity
            </label>
            <input
              type="number"
              value={formData.capacity}
              onChange={(e) =>
                setFormData({ ...formData, capacity: e.target.value })
              }
              className="w-full px-3 py-2 border rounded-md"
              min="1"
              required
            />
          </div>

          <div className="flex gap-4 justify-end">
            <button
              type="button"
              onClick={() => navigate("/admin/events")}
              className="px-4 py-2 text-gray-300 hover:text-gray-800"
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
