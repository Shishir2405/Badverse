// src/components/workshops/AdminWorkshopForm.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../../config/firebase";
import { doc, getDoc, addDoc, updateDoc, collection } from "firebase/firestore";

const AdminWorkshopForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    instructor: "",
    date: "",
    time: "",
    duration: "",
    location: "",
    isFree: true,
    price: 0,
    totalSpots: 50,
    availableSpots: 50,
    requirements: "",
    learningOutcomes: "",
    targetAudience: "",
    contactEmail: "",
    contactPhone: "",
  });

  useEffect(() => {
    const fetchWorkshop = async () => {
      if (id) {
        try {
          const workshopDoc = await getDoc(doc(db, "workshops", id));
          if (workshopDoc.exists()) {
            const workshopData = workshopDoc.data();
            const workshopDate = new Date(workshopData.date);
            setFormData({
              ...workshopData,
              date: workshopDate.toISOString().split("T")[0],
              time: workshopDate.toTimeString().split(" ")[0].slice(0, 5),
            });
          }
        } catch (error) {
          setError("Failed to fetch workshop details");
          console.error("Error fetching workshop:", error);
        }
      }
    };

    fetchWorkshop();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Combine date and time
      const workshopDateTime = new Date(`${formData.date}T${formData.time}`);

      const workshopData = {
        title: formData.title,
        description: formData.description,
        instructor: formData.instructor,
        date: workshopDateTime.toISOString(),
        duration: formData.duration,
        location: formData.location,
        isFree: formData.isFree,
        price: formData.isFree ? 0 : Number(formData.price),
        totalSpots: Number(formData.totalSpots),
        availableSpots: Number(formData.availableSpots),
        requirements: formData.requirements,
        learningOutcomes: formData.learningOutcomes,
        targetAudience: formData.targetAudience,
        contactEmail: formData.contactEmail,
        contactPhone: formData.contactPhone,
        updatedAt: new Date().toISOString(),
      };

      if (id) {
        // Update existing workshop
        await updateDoc(doc(db, "workshops", id), workshopData);
      } else {
        // Create new workshop
        await addDoc(collection(db, "workshops"), {
          ...workshopData,
          createdAt: new Date().toISOString(),
        });
      }

      navigate("/admin/workshops");
    } catch (error) {
      console.error("Error saving workshop:", error);
      setError("Failed to save workshop. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4 pt-24">
      <div className="max-w-2xl mx-auto rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6">
          {id ? "Edit Workshop" : "Create New Workshop"}
        </h1>

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-600 rounded-md p-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Workshop Title */}
          <div>
            <label className="block text-sm font-medium text-white mb-1">
              Workshop Title
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-white mb-1">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full px-3 py-2 border rounded-md h-32 focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          </div>

          {/* Instructor */}
          <div>
            <label className="block text-sm font-medium text-white mb-1">
              Instructor Name
            </label>
            <input
              type="text"
              value={formData.instructor}
              onChange={(e) =>
                setFormData({ ...formData, instructor: e.target.value })
              }
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          </div>

          {/* Date and Time */}
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
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
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
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              />
            </div>
          </div>

          {/* Duration */}
          <div>
            <label className="block text-sm font-medium text-white mb-1">
              Duration
            </label>
            <input
              type="text"
              value={formData.duration}
              onChange={(e) =>
                setFormData({ ...formData, duration: e.target.value })
              }
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="e.g., 2 hours"
              required
            />
          </div>

          {/* Location */}
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
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Workshop venue address"
              required
            />
          </div>

          {/* Price Settings */}
          <div className="space-y-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={formData.isFree}
                onChange={(e) =>
                  setFormData({ ...formData, isFree: e.target.checked })
                }
                className="h-4 w-4 text-red-600 rounded border-gray-300"
              />
              <label className="ml-2 text-sm text-white">
                This is a free workshop
              </label>
            </div>

            {!formData.isFree && (
              <div>
                <label className="block text-sm font-medium text-white mb-1">
                  Workshop Price (₹)
                </label>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  min="0"
                  required
                />
              </div>
            )}
          </div>

          {/* Capacity */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-white mb-1">
                Total Spots
              </label>
              <input
                type="number"
                value={formData.totalSpots}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    totalSpots: parseInt(e.target.value),
                    availableSpots: parseInt(e.target.value),
                  })
                }
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                min="1"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-1">
                Available Spots
              </label>
              <input
                type="number"
                value={formData.availableSpots}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    availableSpots: parseInt(e.target.value),
                  })
                }
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                min="0"
                max={formData.totalSpots}
                required
              />
            </div>
          </div>

          {/* Additional Information */}
          <div>
            <label className="block text-sm font-medium text-white mb-1">
              Requirements
            </label>
            <textarea
              value={formData.requirements}
              onChange={(e) =>
                setFormData({ ...formData, requirements: e.target.value })
              }
              className="w-full px-3 py-2 border rounded-md h-24 focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="What should participants bring or prepare?"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-1">
              Learning Outcomes
            </label>
            <textarea
              value={formData.learningOutcomes}
              onChange={(e) =>
                setFormData({ ...formData, learningOutcomes: e.target.value })
              }
              className="w-full px-3 py-2 border rounded-md h-24 focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="What will participants learn from this workshop?"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-1">
              Target Audience
            </label>
            <textarea
              value={formData.targetAudience}
              onChange={(e) =>
                setFormData({ ...formData, targetAudience: e.target.value })
              }
              className="w-full px-3 py-2 border rounded-md h-24 focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Who is this workshop for?"
              required
            />
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-white mb-1">
                Contact Email
              </label>
              <input
                type="email"
                value={formData.contactEmail}
                onChange={(e) =>
                  setFormData({ ...formData, contactEmail: e.target.value })
                }
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-1">
                Contact Phone
              </label>
              <input
                type="tel"
                value={formData.contactPhone}
                onChange={(e) =>
                  setFormData({ ...formData, contactPhone: e.target.value })
                }
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              />
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex gap-4 justify-end">
            <button
              type="button"
              onClick={() => navigate("/admin/workshops")}
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
                ? "Saving..."
                : id
                ? "Update Workshop"
                : "Create Workshop"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminWorkshopForm;
