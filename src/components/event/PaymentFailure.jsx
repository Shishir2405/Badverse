// src/components/event/PaymentFailure.jsx
import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { X } from "lucide-react";

const PaymentFailure = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const errorMessage =
    searchParams.get("error") || "Payment could not be processed";

  return (
    <div className="container mx-auto py-16 px-4">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-6 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <X className="h-8 w-8 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Payment Failed
          </h2>
          <p className="text-gray-600 mb-6">{errorMessage}</p>

          <div className="space-y-3">
            <button
              onClick={() => window.history.back()}
              className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Try Again
            </button>
            <button
              onClick={() => navigate("/events")}
              className="w-full bg-gray-100 text-white px-4 py-2 rounded hover:bg-gray-200"
            >
              Back to Events
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentFailure;
