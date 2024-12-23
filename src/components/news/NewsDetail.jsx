// src/components/news/NewsDetail.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../../config/firebase";
import { doc, getDoc } from "firebase/firestore";
import { motion } from "framer-motion";

const NewsDetail = () => {
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const newsDoc = await getDoc(doc(db, "news", id));
        if (newsDoc.exists()) {
          setNews({ id: newsDoc.id, ...newsDoc.data() });
        } else {
          navigate("/news");
        }
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl mt-20">
      {/* Animation for the card */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="rounded-lg shadow-lg p-8 relative z-10"
      >
        <h1 className="text-4xl font-extrabold mb-4 text-white">
          {news.title}
        </h1>
        <div className="text-sm text-white/90 mb-6">
          Published on {new Date(news.publishedDate).toLocaleDateString()}
        </div>
        <div className="prose max-w-none text-white">{news.content}</div>
      </motion.div>

      {/* Backdrop to prevent overlap with navbar */}
      <div className="fixed inset-0 bg-black bg-opacity-10 -z-10"></div>
    </div>
  );
};

export default NewsDetail;
