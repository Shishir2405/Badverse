// src/components/workshops/WorkshopTicketDetail.jsx
import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { db } from "../../config/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useAuth } from "../../context/AuthContext";
import {
  FaCalendar,
  FaClock,
  FaMapMarkerAlt,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaBriefcase,
  FaGraduationCap,
  FaDownload,
  FaTicketAlt
} from "react-icons/fa";
import { QRCodeSVG } from "qrcode.react"; // Changed import

const WorkshopTicketDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [ticket, setTicket] = useState(null);
  const [workshop, setWorkshop] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTicketDetails = async () => {
      if (!currentUser) {
        navigate('/login');
        return;
      }

      try {
        const ticketDoc = await getDoc(doc(db, "workshop_tickets", id));
        
        if (!ticketDoc.exists()) {
          setError("Ticket not found");
          return;
        }

        const ticketData = { id: ticketDoc.id, ...ticketDoc.data() };

        if (ticketData.userId !== currentUser.uid) {
          setError("You don't have permission to view this ticket");
          return;
        }

        const workshopDoc = await getDoc(doc(db, "workshops", ticketData.workshopId));
        
        if (workshopDoc.exists()) {
          setWorkshop({ id: workshopDoc.id, ...workshopDoc.data() });
        }

        setTicket(ticketData);
      } catch (err) {
        console.error("Error fetching ticket details:", err);
        setError("Failed to load ticket details");
      } finally {
        setLoading(false);
      }
    };

    fetchTicketDetails();
  }, [id, currentUser, navigate]);

  const handleDownload = () => {
    const svg = document.getElementById("qr-code");
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.download = `workshop-ticket-${ticket.id.slice(-6)}.png`;
      downloadLink.href = pngFile;
      downloadLink.click();
    };
    img.src = "data:image/svg+xml;base64," + btoa(svgData);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-3xl mx-auto py-8 px-4 pt-24">
        <div className="bg-red-500/10 border border-red-500/20 text-red-500 rounded-lg p-4 text-center">
          {error}
        </div>
        <div className="text-center mt-4">
          <Link
            to="/tickets"
            className="text-red-500 hover:text-red-400 transition-colors"
          >
            ← Back to Tickets
          </Link>
        </div>
      </div>
    );
  }

  if (!ticket || !workshop) return null;

  return (
    <div className="max-w-3xl mx-auto py-8 px-4 pt-24">
      <div className="bg-gray-900/20 backdrop-blur-sm rounded-lg p-8 border border-gray-700">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">{workshop.title}</h1>
          <span
            className={`inline-block px-4 py-1 rounded-full text-sm ${
              ticket.status === "confirmed"
                ? "bg-green-500/20 text-green-500"
                : "bg-yellow-500/20 text-yellow-500"
            }`}
          >
            {ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
          </span>
        </div>

        {/* QR Code */}
        <div className="flex justify-center mb-8">
          <div className="bg-white p-4 rounded-lg">
            <QRCodeSVG
              id="qr-code"
              value={`${window.location.origin}/verify-ticket/${ticket.id}`}
              size={200}
              level="H"
              includeMargin={true}
            />
          </div>
        </div>

        {/* Workshop Details */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-white mb-4">Workshop Details</h2>
            <div className="flex items-center text-gray-300">
              <FaCalendar className="mr-3 text-red-500" />
              {new Date(workshop.date).toLocaleDateString()}
            </div>
            <div className="flex items-center text-gray-300">
              <FaClock className="mr-3 text-red-500" />
              {new Date(workshop.date).toLocaleTimeString()}
            </div>
            <div className="flex items-center text-gray-300">
              <FaMapMarkerAlt className="mr-3 text-red-500" />
              {workshop.location}
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-white mb-4">Attendee Details</h2>
            <div className="flex items-center text-gray-300">
              <FaUser className="mr-3 text-red-500" />
              {ticket.name}
            </div>
            <div className="flex items-center text-gray-300">
              <FaEnvelope className="mr-3 text-red-500" />
              {ticket.email}
            </div>
            <div className="flex items-center text-gray-300">
              <FaPhone className="mr-3 text-red-500" />
              {ticket.phone}
            </div>
          </div>
        </div>

        {/* Additional Details */}
        <div className="space-y-4 mb-8">
          <div className="flex items-center text-gray-300">
            <FaBriefcase className="mr-3 text-red-500" />
            <span className="font-medium mr-2">Occupation:</span> {ticket.occupation}
          </div>
          <div className="flex items-center text-gray-300">
            <FaGraduationCap className="mr-3 text-red-500" />
            <span className="font-medium mr-2">Experience Level:</span> 
            {ticket.experience.charAt(0).toUpperCase() + ticket.experience.slice(1)}
          </div>
        </div>

        {/* Ticket ID and Actions */}
        <div className="flex flex-col sm:flex-row justify-between items-center border-t border-gray-700 pt-6">
          <div className="text-gray-400 mb-4 sm:mb-0">
            <div className="flex items-center">
              <FaTicketAlt className="mr-2 text-red-500" />
              Ticket ID: {ticket.id.slice(-6).toUpperCase()}
            </div>
          </div>
          <div className="flex gap-4">
            <button
              onClick={handleDownload}
              className="flex items-center px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              <FaDownload className="mr-2" />
              Download Ticket
            </button>
            <Link
              to="/tickets"
              className="px-4 py-2 border border-gray-600 text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
              Back to Tickets
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkshopTicketDetail;