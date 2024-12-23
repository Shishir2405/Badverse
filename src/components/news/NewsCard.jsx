import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const NewsCard = ({ news }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
      className="shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl"
    >
      {news.imageUrl && (
        <div className="relative h-48 w-full overflow-hidden">
          <img
            src={news.imageUrl}
            alt={news.title}
            className="object-cover w-full h-full transform transition-transform duration-300 hover:scale-105"
          />
          {news.category && (
            <span className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
              {news.category}
            </span>
          )}
        </div>
      )}

      <div className="p-6 border border-white rounded-md">
        <div className="flex items-center mb-4 ">
          <time className="text-sm text-white/80">
            {new Date(news.publishedDate).toLocaleDateString("en-US", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </time>
        </div>

        <h2 className="text-xl font-bold text-white mb-3 line-clamp-2 transition-colors">
          {news.title}
        </h2>

        <p className="text-white mb-4 line-clamp-3">{news.content}</p>

        <div className="flex justify-between items-center pt-4 border-t border-gray-100">
          <Link
            to={`/news/${news.id}`}
            className="inline-flex items-center text-red-600 font-semibold group"
          >
            Read More
            <motion.span
              initial={{ x: 0 }}
              whileHover={{ x: 5 }}
              className="ml-2"
            >
              →
            </motion.span>
          </Link>

          <motion.button
            whileTap={{ scale: 0.95 }}
            className="text-gray-400 hover:text-red-500 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default NewsCard;
