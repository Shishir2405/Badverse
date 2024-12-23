// src/services/email.js
import emailjs from '@emailjs/browser';

const EMAIL_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAIL_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAIL_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

export const sendEmail = async (templateParams) => {
  try {
    const response = await emailjs.send(
      EMAIL_SERVICE_ID,
      EMAIL_TEMPLATE_ID,
      templateParams,
      EMAIL_PUBLIC_KEY
    );
    return response;
  } catch (error) {
    throw new Error('Failed to send email');
  }
};

export const sendTicketEmail = async (email, ticketData) => {
  const { event } = ticketData;
  const templateParams = {
    to_email: email,
    to_name: ticketData.name,
    event_name: event.title,
    event_date: new Date(event.date).toLocaleDateString(),
    event_time: new Date(event.date).toLocaleTimeString(),
    event_location: event.location,
    ticket_id: ticketData.ticketId,
    ticket_type: event.isFree ? 'Free Registration' : 'Paid Ticket',
    payment_status: ticketData.status,
    payment_amount: event.isFree ? 'Free' : `₹${event.price}`,
    qr_code_url: `https://your-domain.com/verify-ticket/${ticketData.ticketId}`
  };

  try {
    return await sendEmail(templateParams);
  } catch (error) {
    console.error('Error sending ticket email:', error);
    throw new Error('Failed to send ticket email');
  }
};

export const sendPaymentConfirmationEmail = async (email, paymentData) => {
  const templateParams = {
    to_email: email,
    to_name: paymentData.name,
    payment_id: paymentData.paymentId,
    amount: `₹${paymentData.amount}`,
    event_name: paymentData.eventTitle,
    payment_date: new Date().toLocaleDateString()
  };

  try {
    return await sendEmail(templateParams);
  } catch (error) {
    console.error('Error sending payment confirmation:', error);
    throw new Error('Failed to send payment confirmation');
  }
};