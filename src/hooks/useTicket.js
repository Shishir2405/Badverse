// src/hooks/useTicket.js
import { useState, useCallback } from 'react';
import { db } from '../config/firebase';
import { collection, addDoc, updateDoc, doc, getDoc } from 'firebase/firestore';
import { sendEmail } from '../services/email';

export const useTicket = () => {
  const [loading, setLoading] = useState(false);

  const generateTicket = useCallback(async (ticketData) => {
    setLoading(true);
    try {
      const docRef = await addDoc(collection(db, 'tickets'), ticketData);
      const ticketId = docRef.id;
      
      // Send confirmation email
      await sendEmail({
        to_email: ticketData.email,
        to_name: ticketData.name,
        event_name: ticketData.eventTitle,
        ticket_id: ticketId
      });

      return ticketId;
    } catch (error) {
      throw new Error('Failed to generate ticket');
    } finally {
      setLoading(false);
    }
  }, []);

  const updateTicketStatus = useCallback(async (ticketId, status) => {
    try {
      await updateDoc(doc(db, 'tickets', ticketId), { status });
    } catch (error) {
      throw new Error('Failed to update ticket status');
    }
  }, []);

  return { generateTicket, updateTicketStatus, loading };
};