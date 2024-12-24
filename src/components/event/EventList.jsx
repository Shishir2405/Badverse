import React, { useState, useEffect } from "react";
import { db } from "../../config/firebase";
import { collection, getDocs } from "firebase/firestore";
import EventCard from "./EventCard";

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventsRef = collection(db, "events");
        const querySnapshot = await getDocs(eventsRef);
        const eventsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setEvents(eventsData);
      } catch (error) {
        console.error("Error fetching events:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

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
        <div className="text-red-600 bg-black/40 backdrop-blur-sm p-4 rounded-lg border border-red-500/30">
          Error loading events: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4 pt-24">
      <h1 className="text-3xl font-bold mb-8 text-white">Events</h1>
      {events.length === 0 ? (
        <div className="text-center text-white/75 bg-black/40 backdrop-blur-sm p-8 rounded-lg border border-gray-800">
          No events found.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <div 
              key={event.id} 
              className="group bg-gray-900/20 backdrop-blur-sm rounded-lg shadow-lg hover:shadow-red-500/20 transition-all duration-300 border border-gray-800 hover:border-red-500/30 transform perspective-1000"
            >
              <div className="transform transition-transform duration-300 group-hover:[transform:rotateX(2deg)_rotateY(-2deg)] group-hover:scale-[0.98]">
                <EventCard event={event} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EventList;