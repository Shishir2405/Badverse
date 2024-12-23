// src/utils/emailSender.js
import { sendEmail } from '../services/email';
import { generateTicketPDF } from './ticketGenerator';

export const sendTicketEmail = async (ticketData) => {
  // Generate PDF ticket
  const pdfBytes = await generateTicketPDF(ticketData);
  
  // Convert PDF to base64
  const pdfBase64 = Buffer.from(pdfBytes).toString('base64');

  // Send email with PDF attachment
  await sendEmail({
    to_email: ticketData.email,
    to_name: ticketData.name,
    event_name: ticketData.eventTitle,
    ticket_id: ticketData.ticketId,
    attachments: [
      {
        content: pdfBase64,
        filename: `ticket-${ticketData.ticketId}.pdf`,
        type: 'application/pdf',
        disposition: 'attachment'
      }
    ]
  });
};