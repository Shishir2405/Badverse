// src/components/events/EventList.jsx
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
        console.log("Fetching events...");
        const eventsRef = collection(db, "events");
        const querySnapshot = await getDocs(eventsRef);

        console.log(
          "Raw snapshot:",
          querySnapshot.docs.length,
          "documents found"
        );

        const eventsData = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          console.log("Event data:", { id: doc.id, ...data });
          return {
            id: doc.id,
            ...data,
          };
        });

        console.log("Processed events:", eventsData);
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
        <div className="text-red-600">Error loading events: {error}</div>
      </div>
    );
  }

  console.log("Rendering events:", events);

  return (
    <div className="container mx-auto py-8 px-4 pt-24">
      <h1 className="text-3xl font-bold mb-8">Events</h1>
      {events.length === 0 ? (
        <div className="text-center text-gray-600">No events found.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
};

export default EventList;
