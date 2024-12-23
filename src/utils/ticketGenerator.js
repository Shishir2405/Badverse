// src/utils/ticketGenerator.js
import { PDFDocument, rgb } from '@react-pdf/renderer';
import QRCode from 'qrcode';

export const generateTicketPDF = async (ticketData) => {
  const qrCodeData = await QRCode.toDataURL(ticketData.ticketId);
  
  // Create PDF document
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([400, 200]);
  
  // Add ticket content
  page.drawText(ticketData.eventTitle, {
    x: 50,
    y: 150,
    size: 20,
  });

  // Add QR code
  const qrCodeImage = await pdfDoc.embedPng(qrCodeData);
  page.drawImage(qrCodeImage, {
    x: 300,
    y: 50,
    width: 50,
    height: 50,
  });

  // Save PDF
  const pdfBytes = await pdfDoc.save();
  return pdfBytes;
};

