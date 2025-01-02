// src/components/certificate/CertificatePreview.jsx
import React from "react";
import { useSearchParams } from "react-router-dom";
import html2canvas from "html2canvas";

const CertificatePreview = () => {
  const [searchParams] = useSearchParams();
  const name = searchParams.get("name");
  const date = new Date(searchParams.get("date")).toLocaleDateString();
  const place = searchParams.get("place");
  const title = searchParams.get("title");

  const downloadCertificate = async () => {
    const certificate = document.getElementById("certificate");
    const canvas = await html2canvas(certificate);
    const link = document.createElement("a");
    link.download = `${name}-certificate.png`;
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <div className="container mx-auto py-8 px-4 pt-24">
      <div className="mb-4 text-center">
        <button
          onClick={downloadCertificate}
          className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600"
        >
          Download Certificate
        </button>
      </div>

      <div
        id="certificate"
        className="w-[800px] h-[600px] mx-auto bg-white border-8 border-double border-gray-800 p-8"
      >
        <div className="h-full flex flex-col items-center justify-between text-center">
          <div>
            <img
              src="/your-logo.png"
              alt="BADVERSE Logo"
              className="w-32 h-32 object-contain"
            />
          </div>

          <div className="space-y-6">
            <h1 className="text-4xl font-serif text-gray-800">
              Certificate of Participation
            </h1>
            <p className="text-xl text-gray-600">This is to certify that</p>
            <h2 className="text-3xl font-bold text-blue-800">{name}</h2>
            <p className="text-xl text-gray-600">has participated in</p>
            <h3 className="text-2xl font-bold text-gray-800">{title}</h3>
            <p className="text-xl text-gray-600">
              held on {date} at {place}
            </p>
          </div>

          <div className="flex justify-between w-full mt-12">
            <div className="text-center">
              <div className="w-48 border-t border-gray-400"></div>
              <p className="mt-2">Event Director</p>
            </div>
            <div className="text-center">
              <div className="w-48 border-t border-gray-400"></div>
              <p className="mt-2">Organization Head</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificatePreview;
