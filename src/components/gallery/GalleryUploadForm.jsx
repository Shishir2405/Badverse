import React, { useState } from 'react';
import { db } from '../../config/firebase';
import { collection, addDoc } from 'firebase/firestore';

const GalleryUploadForm = () => {
  const [imageUrl, setImageUrl] = useState('');
  const [previewUrl, setPreviewUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleImageUrlChange = (e) => {
    const url = e.target.value;
    setImageUrl(url);
    setPreviewUrl(url);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!imageUrl.trim()) {
      setError('Please enter an image URL');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // Add to Firestore gallery collection
      const galleryRef = collection(db, 'gallery');
      const docRef = await addDoc(galleryRef, {
        src: imageUrl.trim(),
        createdAt: new Date()
      });

      // Clear form and show success message
      setImageUrl('');
      setPreviewUrl('');
      setSuccess('Image uploaded successfully!');
    } catch (err) {
      console.error('Error uploading image:', err);
      setError('Failed to upload image. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-md pt-28">
      <h2 className="text-2xl font-bold mb-6 text-white text-center">
        Upload Gallery Image
      </h2>
      
      <form onSubmit={handleSubmit} className="bg-black/40 backdrop-blur-sm p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <label htmlFor="imageUrl" className="block text-white mb-2">
            Image URL
          </label>
          <input
            type="text"
            id="imageUrl"
            value={imageUrl}
            onChange={handleImageUrlChange}
            placeholder="Enter image URL"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        {previewUrl && (
          <div className="mb-4 flex justify-center">
            <div className="relative w-64 h-64">
              <div
                className="absolute inset-0 bg-red-500 rounded-lg overflow-hidden"
                style={{
                  clipPath:
                    "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                }}
              >
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="w-full h-full object-cover rounded-lg"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/placeholder.png'; // Fallback image
                  }}
                />
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="mb-4 text-red-500 text-center">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-4 text-green-500 text-center">
            {success}
          </div>
        )}

        <button
          type="submit"
          disabled={loading || !imageUrl}
          className={`w-full py-3 rounded-md transition-colors duration-300 ${
            loading || !imageUrl
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-red-700 text-white hover:bg-red-800'
          }`}
        >
          {loading ? 'Uploading...' : 'Upload Image'}
        </button>
      </form>
    </div>
  );
};

export default GalleryUploadForm;