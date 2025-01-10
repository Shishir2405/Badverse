import React, { useState, useEffect } from "react";
import { db } from "../../config/firebase";
import { collection, getDocs } from "firebase/firestore";
import EventCard from "./EventCard";

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [showPastEvents, setShowPastEvents] = useState(false);
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

  const filteredEvents = events.filter((event) => {
    const eventDate = new Date(event.date);
    const now = new Date();
    return showPastEvents ? true : eventDate >= now;
  });

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
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">Events</h1>
        <div className="flex items-center gap-3">
          <span className="text-white/75">Show past events</span>
          <button
            onClick={() => setShowPastEvents(!showPastEvents)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ease-in-out ${
              showPastEvents ? 'bg-red-500' : 'bg-gray-700'
            }`}
            role="switch"
            aria-checked={showPastEvents}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ease-in-out ${
                showPastEvents ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      </div>

      {filteredEvents.length === 0 ? (
        <div className="text-center text-white/75 bg-black/40 backdrop-blur-sm p-8 rounded-lg border border-gray-800">
          {showPastEvents ? "No events found." : "No upcoming events found."}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
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