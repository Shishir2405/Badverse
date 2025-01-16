import React, { useState } from "react";
import { db } from "../../config/firebase";
import { collection, addDoc } from "firebase/firestore";

const ImageLinkUploadForm = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!imageUrl.trim()) {
      setError("Please enter an image URL");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      // Add to Firestore partners collection
      const partnersRef = collection(db, "partners");
      await addDoc(partnersRef, {
        name: "New Partner",
        image: imageUrl.trim(),
        category: "technology",
        createdAt: new Date(),
      });

      // Clear form
      setImageUrl("");
      setSuccess("Image link added successfully!");
    } catch (err) {
      console.error("Error uploading image link:", err);
      setError("Failed to add image link. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-md pt-24 ">
      <h2 className="text-2xl font-bold mb-6 text-white text-center">
        Upload Image Link
      </h2>

      <form
        onSubmit={handleSubmit}
        className="bg-black/40 backdrop-blur-sm p-6 rounded-lg shadow-md"
      >
        <div className="mb-4">
          <label htmlFor="imageUrl" className="block text-white mb-2">
            Image URL
          </label>
          <input
            type="text"
            id="imageUrl"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="Enter image URL"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        {imageUrl && (
          <div className="mb-4 flex justify-center">
            <img
              src={imageUrl}
              alt="Image Preview"
              className="max-w-full h-48 object-contain rounded-md"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/placeholder.png";
              }}
            />
          </div>
        )}

        {error && <div className="mb-4 text-red-500 text-center">{error}</div>}

        {success && (
          <div className="mb-4 text-green-500 text-center">{success}</div>
        )}

        <button
          type="submit"
          disabled={loading || !imageUrl}
          className={`w-full py-3 rounded-md transition-colors duration-300 ${
            loading || !imageUrl
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-red-700 text-white hover:bg-red-800"
          }`}
        >
          {loading ? "Uploading..." : "Upload Image"}
        </button>
      </form>
    </div>
  );
};

export default ImageLinkUploadForm;
