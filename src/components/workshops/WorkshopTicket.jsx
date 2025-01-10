// WorkshopTicket.jsx
import React, { useRef } from 'react';
import { useLocation, Link } from 'react-router-dom';
import html2canvas from 'html2canvas';

const WorkshopTicket = () => {
  const location = useLocation();
  const { workshopData, registrationData } = location.state || {};
  const ticketRef = useRef(null);

  const handleDownload = async () => {
    try {
      const ticketElement = ticketRef.current;
      const canvas = await html2canvas(ticketElement);
      const image = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = image;
      link.download = `workshop-ticket-${registrationData.registrationId}.png`;
      link.click();
    } catch (error) {
      console.error('Error downloading ticket:', error);
    }
  };

  if (!workshopData || !registrationData) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p>Ticket information not found.</p>
        <Link to="/workshops" className="text-red-500 hover:text-red-600">
          Return to Workshops
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4 pt-24">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Download Button */}
        <div className="text-center mb-8">
          <button
            onClick={handleDownload}
            className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 inline-flex items-center gap-2"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
            Download Ticket
          </button>
        </div>

        {/* Ticket Design */}
        <div 
          ref={ticketRef} 
          className="bg-white rounded-lg shadow-xl overflow-hidden border-4 border-red-500"
        >
          {/* Header */}
          <div className="bg-red-500 text-white px-6 py-4">
            <h1 className="text-2xl font-bold text-center">Workshop Ticket</h1>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Workshop Info */}
            <div className="space-y-2">
              <h2 className="text-xl font-bold text-gray-800">{workshopData.title}</h2>
              <div className="grid grid-cols-2 gap-4 text-gray-600">
                <div>
                  <p className="font-semibold">Date</p>
                  <p>{new Date(workshopData.date).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="font-semibold">Time</p>
                  <p>{new Date(workshopData.date).toLocaleTimeString()}</p>
                </div>
                <div>
                  <p className="font-semibold">Duration</p>
                  <p>{workshopData.duration}</p>
                </div>
                <div>
                  <p className="font-semibold">Location</p>
                  <p>{workshopData.location}</p>
                </div>
              </div>
            </div>

            {/* Attendee Info */}
            <div className="border-t pt-6 space-y-2">
              <h3 className="font-semibold text-gray-800">Attendee Information</h3>
              <div className="grid grid-cols-2 gap-4 text-gray-600">
                <div>
                  <p className="font-semibold">Name</p>
                  <p>{registrationData.name}</p>
                </div>
                <div>
                  <p className="font-semibold">Email</p>
                  <p>{registrationData.email}</p>
                </div>
                <div>
                  <p className="font-semibold">Registration ID</p>
                  <p>{registrationData.registrationId}</p>
                </div>
                <div>
                  <p className="font-semibold">Status</p>
                  <p className="text-green-600 font-medium">Confirmed</p>
                </div>
              </div>
            </div>

            {/* QR Code Placeholder */}
            <div className="border-t pt-6 flex justify-center">
              <div className="text-center">
                <p className="text-sm text-gray-500 mb-2">Registration ID</p>
                <div className="bg-gray-100 p-4 rounded-lg">
                  {registrationData.registrationId}
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-6 py-4 text-center text-sm text-gray-500">
            <p>Please show this ticket at the workshop venue</p>
            <p>For any queries, contact: {workshopData.contactEmail}</p>
          </div>
        </div>

        {/* Navigation */}
        <div className="text-center mt-8">
          <Link
            to="/workshops"
            className="text-gray-600 hover:text-gray-800"
          >
            Back to Workshops
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WorkshopTicket;