import React, { useEffect, useState } from "react";
import { collection, query, orderBy, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase"; // Adjust this path to your firebase configuration
import ApplicationCard from "./ApplicationCard"; // Ensure this path is correct

const AdminApplications = () => {
  const [applications, setApplications] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const applicationsRef = collection(db, "applications");
        const q = query(applicationsRef, orderBy("appliedAt", "desc"));
        const snapshot = await getDocs(q);
        const applicationData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log("Fetched Applications:", applicationData); // Debug log
        setApplications(applicationData);
      } catch (error) {
        console.error("Error fetching applications:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  const filteredApplications = filter === "all"
    ? applications
    : applications.filter((app) => app.status === filter);

  if (loading) {
    return <div className="text-center mt-10">Loading applications...</div>;
  }

  return (
    <div className="p-4 pt-24">
      <h1 className="text-2xl font-bold mb-4">Applications</h1>
      <div className="flex items-center gap-4 mb-6">
        <button
          className={`px-4 py-2 rounded ${filter === "all" ? "bg-red-500 text-white" : "bg-black"}`}
          onClick={() => setFilter("all")}
        >
          All
        </button>
        <button
          className={`px-4 py-2 rounded ${filter === "pending" ? "bg-red-500 text-white" : "bg-black"}`}
          onClick={() => setFilter("pending")}
        >
          Pending
        </button>
        <button
          className={`px-4 py-2 rounded ${filter === "approved" ? "bg-red-500 text-white" : "bg-black"}`}
          onClick={() => setFilter("approved")}
        >
          Approved
        </button>
        <button
          className={`px-4 py-2 rounded ${filter === "rejected" ? "bg-red-500 text-white" : "bg-black"}`}
          onClick={() => setFilter("rejected")}
        >
          Rejected
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredApplications.map((application) => (
          <ApplicationCard key={application.id} application={application} />
        ))}
      </div>
    </div>
  );
};

export default AdminApplications;
