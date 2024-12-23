import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../../config/firebase";
import { collection, addDoc, doc, getDoc, updateDoc } from "firebase/firestore";

const NewsForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    publishedDate: new Date().toISOString().split("T")[0],
  });
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      const fetchNews = async () => {
        try {
          const docRef = doc(db, "news", id);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const data = docSnap.data();
            setFormData({
              title: data.title,
              content: data.content,
              publishedDate: data.publishedDate,
            });
          }
        } catch (error) {
          console.error("Error fetching news:", error);
        }
      };
      fetchNews();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (id) {
        // Update existing news
        await updateDoc(doc(db, "news", id), {
          ...formData,
          updatedAt: new Date().toISOString(),
        });
      } else {
        // Add new news
        await addDoc(collection(db, "news"), {
          ...formData,
          createdAt: new Date().toISOString(),
        });
      }
      navigate("/admin/news");
    } catch (error) {
      console.error("Error saving news:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-2xl pt-24">
      <h1 className="text-3xl font-bold mb-8">
        {id ? "Edit News Article" : "Create News Article"}
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-white mb-2">
            Title
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-white mb-2">
            Content
          </label>
          <textarea
            value={formData.content}
            onChange={(e) =>
              setFormData({ ...formData, content: e.target.value })
            }
            rows="6"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-white mb-2">
            Published Date
          </label>
          <input
            type="date"
            value={formData.publishedDate}
            onChange={(e) =>
              setFormData({ ...formData, publishedDate: e.target.value })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => navigate("/admin/news")}
            className="mr-4 px-4 py-2 text-white/55 hover:text-white"
          >
            Cancel
          </button>
          <button
            class="relative flex items-center px-6 py-3 overflow-hidden font-semibold transition-all bg-red-500 rounded-md group"
            type="submit"
            disabled={loading}
          >
            <span class="absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-red-700 rounded group-hover:-mr-4 group-hover:-mt-4">
              <span class="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white/50"></span>
            </span>
            <span class="absolute bottom-0 rotate-180 left-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-red-700 rounded group-hover:-ml-4 group-hover:-mb-4">
              <span class="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white/50"></span>
            </span>
            <span class="absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full bg-red-600 rounded-md group-hover:translate-x-0"></span>
            <span class="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-white">
              {loading ? "Saving..." : id ? "Update" : "Create"}
            </span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewsForm;
