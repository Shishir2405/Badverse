// src/components/workshops/AdminWorkshopList.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { db } from "../../config/firebase";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  query,
  orderBy,
} from "firebase/firestore";

const AdminWorkshopList = () => {
  const [workshops, setWorkshops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchWorkshops();
  }, []);

  const fetchWorkshops = async () => {
    try {
      const workshopsQuery = query(
        collection(db, "workshops"),
        orderBy("date", "desc")
      );
      const querySnapshot = await getDocs(workshopsQuery);
      const workshopsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setWorkshops(workshopsData);
    } catch (error) {
      setError("Error fetching workshops");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this workshop?")) {
      try {
        await deleteDoc(doc(db, "workshops", id));
        fetchWorkshops(); // Refresh the list
      } catch (error) {
        setError("Error deleting workshop");
        console.error("Error:", error);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4 pt-24">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Manage Workshops</h1>
        <Link
          to="/admin/workshops/new"
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Create Workshop
        </Link>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-md mb-6">
          {error}
        </div>
      )}

      <div className="grid gap-6">
        {workshops.map((workshop) => (
          <div
            key={workshop.id}
            className="rounded-lg shadow-md overflow-hidden text-white border border-white"
          >
            <div className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-semibold mb-2">
                    {workshop.title}
                  </h2>
                  <p className="text-sm">
                    Instructor: {workshop.instructor}
                  </p>
                </div>
                <div
                  className={`px-3 py-1 rounded-full text-sm ${
                    workshop.isFree
                      ? "bg-green-100 text-green-800"
                      : "bg-blue-100 text-blue-800"
                  }`}
                >
                  {workshop.isFree ? "Free" : `₹${workshop.price}`}
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-4">
                <div>
                  <p className="text-sm ">Date</p>
                  <p>{new Date(workshop.date).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm ">Time</p>
                  <p>{new Date(workshop.date).toLocaleTimeString()}</p>
                </div>
                <div>
                  <p className="text-sm ">Duration</p>
                  <p>{workshop.duration}</p>
                </div>
                <div>
                  <p className="text-sm ">Available Spots</p>
                  <p>
                    {workshop.availableSpots} / {workshop.totalSpots}
                  </p>
                </div>
              </div>

              <div className="flex gap-4 mt-4">
                <Link
                  to={`/admin/workshops/${workshop.id}/edit`}
                  className="text-blue-500 hover:text-blue-600"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(workshop.id)}
                  className="text-red-500 hover:text-red-600"
                >
                  Delete
                </button>
                <Link
                  to={`/workshops/${workshop.id}`}
                  className="text-gray-200 hover: ml-auto"
                >
                  View Public Page
                </Link>
              </div>
            </div>
          </div>
        ))}

        {workshops.length === 0 && (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <p className="">No workshops found.</p>
            <Link
              to="/admin/workshops/new"
              className="text-blue-500 hover:text-blue-600 mt-2 inline-block"
            >
              Create your first workshop
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminWorkshopList;
