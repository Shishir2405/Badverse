import React, { useState, useEffect } from "react";
import {
  FaExpand,
  FaChevronLeft,
  FaChevronRight,
  FaTimes,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { db } from "../../config/firebase";
import {
  collection,
  query,
  orderBy,
  getDocs,
  limit,
  startAfter,
} from "firebase/firestore";

const IMAGES_PER_PAGE = 5;

const Gallery = () => {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState([]);
  const [displayedImages, setDisplayedImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [lastVisible, setLastVisible] = useState(null);
  const [imagePosition, setImagePosition] = useState({
    left: 0,
    top: 0,
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Fetch initial images
  useEffect(() => {
    fetchGalleryImages();
  }, []);

  // Fetch gallery images from Firestore
  const fetchGalleryImages = async () => {
    try {
      setLoading(true);
      const galleryRef = collection(db, "gallery");
      const q = query(
        galleryRef,
        orderBy("createdAt", "desc"),
        limit(IMAGES_PER_PAGE)
      );

      const snapshot = await getDocs(q);
      const fetchedImages = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setImages(fetchedImages);
      setDisplayedImages(fetchedImages);
      setLastVisible(snapshot.docs[snapshot.docs.length - 1]);
      setHasMore(fetchedImages.length === IMAGES_PER_PAGE);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching gallery images:", error);
      setLoading(false);
    }
  };

  // Load more images
  const loadMore = async () => {
    if (!lastVisible) return;

    try {
      const galleryRef = collection(db, "gallery");
      const q = query(
        galleryRef,
        orderBy("createdAt", "desc"),
        startAfter(lastVisible),
        limit(IMAGES_PER_PAGE)
      );

      const snapshot = await getDocs(q);
      const newImages = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const updatedImages = [...images, ...newImages];
      setImages(updatedImages);
      setDisplayedImages(updatedImages);
      setLastVisible(snapshot.docs[snapshot.docs.length - 1]);
      setHasMore(newImages.length === IMAGES_PER_PAGE);
      setCurrentPage((prev) => prev + 1);
    } catch (error) {
      console.error("Error loading more images:", error);
    }
  };

  const rows = [];
  let row = [];
  let isOddRow = true;

  const getImagesPerRow = () =>
    isDesktop ? (isOddRow ? 5 : 4) : isOddRow ? 3 : 2;

  displayedImages.forEach((image) => {
    row.push(image);
    const imagesPerRow = getImagesPerRow();

    if (row.length === imagesPerRow) {
      rows.push(row);
      row = [];
      isOddRow = !isOddRow;
    }
  });

  if (row.length > 0) {
    rows.push(row);
  }

  const openFullScreen = (image, event) => {
    const imageElement = event.target;
    const rect = imageElement.getBoundingClientRect();
    setImagePosition({
      left: rect.left,
      top: rect.top,
      width: rect.width,
      height: rect.height,
    });

    setCurrentImage(image);
    setIsFullScreen(true);
  };

  const closeFullScreen = () => {
    setIsFullScreen(false);
    setCurrentImage(null);
  };

  const goToNextImage = () => {
    const currentIndex = displayedImages.findIndex(
      (img) => img.id === currentImage.id
    );
    const nextIndex = (currentIndex + 1) % displayedImages.length;
    setCurrentImage(displayedImages[nextIndex]);
  };

  const goToPreviousImage = () => {
    const currentIndex = displayedImages.findIndex(
      (img) => img.id === currentImage.id
    );
    const prevIndex =
      (currentIndex - 1 + displayedImages.length) % displayedImages.length;
    setCurrentImage(displayedImages[prevIndex]);
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-8 pt-24">
      <div className="relative w-fit mx-auto">
        <span className="h-[1px] w-36 bg-white absolute -bottom-2 -right-9" />
        <span className="h-[1px] w-36 bg-white absolute -top-2 -left-9" />
        <h1 className="text-center font-bold text-5xl">
          Ga<span className="text-red-700">lle</span>ry
        </h1>
      </div>

      <div className="flex flex-col items-center mt-24">
        {rows.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className="flex justify-center gap-[6px] mb-[6px] flex-wrap"
            style={{
              marginTop: isDesktop
                ? rowIndex % 2 === 0
                  ? "-45px"
                  : "-45px"
                : "-20px",
            }}
          >
            {row.map((image) => (
              <div
                key={image.id}
                className="relative w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-52 lg:h-52 xl:w-64 xl:h-64 transition-all duration-500 ease-out transform hover:scale-105 hover:opacity-90 hover:shadow-xl"
              >
                <div
                  className="absolute inset-0 bg-red-500 rounded-lg overflow-hidden"
                  style={{
                    clipPath:
                      "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                  }}
                >
                  <img
                    src={image.src}
                    alt={`Gallery item ${image.id}`}
                    className="w-full h-full object-cover rounded-lg"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/placeholder.png"; // Fallback image
                    }}
                  />
                </div>

                <div
                  className="absolute inset-0 flex justify-center items-center opacity-0 hover:opacity-100 transition-opacity duration-300"
                  style={{
                    clipPath:
                      "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                  }}
                >
                  <button
                    onClick={(e) => openFullScreen(image, e)}
                    className="text-white bg-black bg-opacity-50 rounded-full p-2 shadow-md hover:bg-opacity-75 transition-all duration-200"
                  >
                    <FaExpand size={24} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ))}

        <Link to="/gallery">
        <button
          
          className="mt-8 px-6 py-3 bg-red-700 text-white rounded-lg hover:bg-red-800 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
        >
          Load More
        </button></Link>
      </div>

      {currentImage && (
        <div
          className={`fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50 transition-opacity duration-700 ease-out ${
            isFullScreen ? "opacity-100" : "opacity-0"
          }`}
          onClick={closeFullScreen}
        >
          <div
            className="relative w-full h-full flex justify-center items-center"
            onClick={(e) => e.stopPropagation()}
            style={{
              left: isFullScreen ? 0 : imagePosition.left + "px",
              top: isFullScreen ? 0 : imagePosition.top + "px",
              width: isFullScreen ? "100%" : imagePosition.width + "px",
              height: isFullScreen ? "100%" : imagePosition.height + "px",
              transition: "all 0.7s ease-out",
            }}
          >
            <img
              src={currentImage.src}
              alt="Full screen"
              className="max-w-full max-h-full object-contain transition-all duration-700 ease-out transform"
              style={{
                transform: isFullScreen ? "scale(1)" : "scale(0)",
                opacity: isFullScreen ? 1 : 0,
              }}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/placeholder.png"; // Fallback image
              }}
            />

            <button
              onClick={goToPreviousImage}
              className="absolute left-10 top-1/2 transform -translate-y-1/2 p-4 bg-black text-white rounded-full hover:bg-gray-700 focus:outline-none transition duration-300 ease-in-out shadow-lg hover:scale-110"
            >
              <FaChevronLeft size={24} />
            </button>

            <button
              onClick={goToNextImage}
              className="absolute right-10 top-1/2 transform -translate-y-1/2 p-4 bg-black text-white rounded-full hover:bg-gray-700 focus:outline-none transition duration-300 ease-in-out shadow-lg hover:scale-110"
            >
              <FaChevronRight size={24} />
            </button>

            <button
              onClick={closeFullScreen}
              className="absolute top-4 right-4 text-white bg-black bg-opacity-50 p-3 rounded-full hover:bg-opacity-75 hover:scale-110 transition-all duration-200 ease-in-out shadow-lg"
            >
              <FaTimes size={24} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
