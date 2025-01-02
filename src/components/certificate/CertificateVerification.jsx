// src/components/certificate/CertificateVerification.jsx
import React, { useState } from "react";
import { db } from "../../config/firebase";
import { doc, getDoc } from "firebase/firestore";

const CertificateVerification = () => {
  const [certificateId, setCertificateId] = useState("");
  const [verificationResult, setVerificationResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const verifyCertificate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setVerificationResult(null);

    try {
      const certificateRef = doc(db, "certificates", certificateId);
      const certificateSnap = await getDoc(certificateRef);

      if (certificateSnap.exists()) {
        setVerificationResult({
          verified: true,
          data: certificateSnap.data(),
        });
      } else {
        setError("Certificate not found. Please check the ID and try again.");
      }
    } catch (error) {
      console.error("Error verifying certificate:", error);
      setError(
        "An error occurred while verifying the certificate. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-2xl">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold">Certificate Verification</h1>
        <p className="text-gray-600 mt-2">
          Enter the certificate ID to verify its authenticity
        </p>
      </div>

      <form onSubmit={verifyCertificate} className="mb-8">
        <div className="flex gap-4">
          <input
            type="text"
            value={certificateId}
            onChange={(e) => setCertificateId(e.target.value)}
            placeholder="Enter Certificate ID"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 disabled:opacity-50"
          >
            {loading ? "Verifying..." : "Verify"}
          </button>
        </div>
      </form>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 rounded-md p-4 mb-6">
          {error}
        </div>
      )}

      {verificationResult && (
        <div className="bg-green-50 border border-green-200 rounded-md p-6">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <svg
                className="w-6 h-6 text-green-500"
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
            <h2 className="text-xl font-semibold ml-4">Certificate Verified</h2>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-white">Participant Name:</h3>
              <p>{verificationResult.data.participantName}</p>
            </div>
            <div>
              <h3 className="font-semibold text-white">Event Title:</h3>
              <p>{verificationResult.data.eventTitle}</p>
            </div>
            <div>
              <h3 className="font-semibold text-white">Event Date:</h3>
              <p>
                {new Date(
                  verificationResult.data.eventDate
                ).toLocaleDateString()}
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white">Event Place:</h3>
              <p>{verificationResult.data.eventPlace}</p>
            </div>
            <div>
              <h3 className="font-semibold text-white">
                Certificate Generated On:
              </h3>
              <p>
                {new Date(verificationResult.data.createdAt).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CertificateVerification;

// Update CertificateForm.jsx to include certificate ID
const CertificateForm = () => {
  // ... existing imports and state ...

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Add the document and get the ID
      const docRef = await addDoc(collection(db, "certificates"), {
        ...formData,
        createdAt: new Date().toISOString(),
      });

      // Navigate with both the certificate data and ID
      navigate(
        `/certificate/preview?id=${docRef.id}&name=${encodeURIComponent(
          formData.participantName
        )}&date=${encodeURIComponent(
          formData.eventDate
        )}&place=${encodeURIComponent(
          formData.eventPlace
        )}&title=${encodeURIComponent(formData.eventTitle)}`
      );
    } catch (error) {
      console.error("Error saving certificate:", error);
    }
  };

  // ... rest of the component ...
};

// Update CertificatePreview.jsx to display the verification ID
const CertificatePreview = () => {
  // ... existing imports and state ...
  const id = searchParams.get("id");

  return (
    <div className="container mx-auto py-8 px-4">
      {/* ... existing download button ... */}

      <div className="mb-4 text-center">
        <div className="bg-blue-50 border border-blue-200 rounded-md p-4 inline-block">
          <p className="text-sm text-gray-600">Certificate Verification ID:</p>
          <p className="font-mono text-lg">{id}</p>
          <p className="text-sm text-gray-500 mt-2">
            Use this ID to verify the certificate at{" "}
            <span className="font-semibold">verify.BADVERSE.com</span>
          </p>
        </div>
      </div>

      {/* ... existing certificate preview ... */}
    </div>
  );
};
