// PaymentSuccess.jsx
import React, { useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { workshopTitle, registrationId, email } = location.state || {};

  useEffect(() => {
    // Redirect to workshops page after 5 seconds
    const timer = setTimeout(() => {
      navigate('/workshops');
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 pt-24">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md w-full mx-4">
        <div className="mb-4">
          <svg
            className="mx-auto h-16 w-16 text-green-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          Registration Successful!
        </h2>
        <div className="text-gray-600 space-y-4 mb-6">
          <p className="font-medium">
            Thank you for registering for {workshopTitle}
          </p>
          <div className="bg-gray-50 p-4 rounded-md text-sm">
            <p>Registration ID: {registrationId}</p>
            <p>A confirmation email has been sent to: {email}</p>
          </div>
          <p className="text-sm">
            Please check your email for workshop details and instructions.
          </p>
        </div>
        <div className="space-y-4">
          <Link
            to="/workshops"
            className="block w-full bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600"
          >
            Back to Workshops
          </Link>
          <p className="text-sm text-gray-500">
            Automatically redirecting in 5 seconds...
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;