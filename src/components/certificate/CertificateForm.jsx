// src/components/certificate/CertificateForm.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../config/firebase";
import { collection, addDoc } from "firebase/firestore";

const CertificateForm = () => {
  const [formData, setFormData] = useState({
    participantName: "",
    eventDate: new Date().toISOString().split("T")[0],
    eventPlace: "",
    eventTitle: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "certificates"), {
        ...formData,
        createdAt: new Date().toISOString(),
      });
      navigate(
        `/certificate/preview?name=${encodeURIComponent(
          formData.participantName
        )}&date=${encodeURIComponent(
          formData.eventDate
        )}&place=${encodeURIComponent(
          formData.eventPlace
        )}&title=${encodeURIComponent(formData.eventTitle)}`
      );
    } catch (error) {
      console.error("Error saving certificate:", error);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-2xl pt-24">
      <h1 className="text-3xl font-bold mb-8">Generate Certificate</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-white mb-2">
            Participant Name
          </label>
          <input
            type="text"
            value={formData.participantName}
            onChange={(e) =>
              setFormData({ ...formData, participantName: e.target.value })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-white mb-2">
            Event Title
          </label>
          <input
            type="text"
            value={formData.eventTitle}
            onChange={(e) =>
              setFormData({ ...formData, eventTitle: e.target.value })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-white mb-2">
            Event Date
          </label>
          <input
            type="date"
            value={formData.eventDate}
            onChange={(e) =>
              setFormData({ ...formData, eventDate: e.target.value })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-white mb-2">
            Event Place
          </label>
          <input
            type="text"
            value={formData.eventPlace}
            onChange={(e) =>
              setFormData({ ...formData, eventPlace: e.target.value })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600"
          >
            Generate Certificate
          </button>
        </div>
      </form>
    </div>
  );
};

export default CertificateForm;
