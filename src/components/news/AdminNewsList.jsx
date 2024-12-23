// src/components/news/AdminNewsList.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../../config/firebase';
import { collection, getDocs, deleteDoc, doc, query, orderBy } from 'firebase/firestore';

const AdminNewsList = () => {
  const [news, setNews] = useState([]);

  const fetchNews = async () => {
    try {
      const newsQuery = query(
        collection(db, 'news'),
        orderBy('publishedDate', 'desc')
      );
      const querySnapshot = await getDocs(newsQuery);
      const newsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setNews(newsData);
    } catch (error) {
      console.error('Error fetching news:', error);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this news item?')) {
      try {
        await deleteDoc(doc(db, 'news', id));
        fetchNews();
      } catch (error) {
        console.error('Error deleting news:', error);
      }
    }
  };

  return (
    <div className="container mx-auto py-8 px-4 pt-24">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Manage News</h1>
        <Link
          to="/admin/news/new"
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Add New Article
        </Link>
      </div>
      <div className="grid gap-6">
        {news.map((item) => (
          <div key={item.id} className=" backdrop-blur-md rounded-lg shadow-md p-6 border border-white">
            <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
            <p className="text-white/65 mb-4 line-clamp-2">{item.content}</p>
            <div className="flex justify-between items-center">
              <span className="text-sm text-white">
                {new Date(item.publishedDate).toLocaleDateString()}
              </span>
              <div className="flex gap-4">
                <Link
                  to={`/admin/news/${item.id}/edit`}
                  className="text-blue-600 hover:text-blue-800"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminNewsList;