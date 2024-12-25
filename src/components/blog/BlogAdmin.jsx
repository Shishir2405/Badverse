// BlogAdmin.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { db } from "../../config/firebase";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  query,
  orderBy,
} from "firebase/firestore";

const BlogAdmin = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const postsQuery = query(
        collection(db, "blog_posts"),
        orderBy("createdAt", "desc")
      );
      const snapshot = await getDocs(postsQuery);
      const postsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(postsData);
    } catch (error) {
      setError("Error fetching posts");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        await deleteDoc(doc(db, "blog_posts", id));
        fetchPosts();
      } catch (error) {
        setError("Error deleting post");
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-black">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-8 pt-24">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-red-500">Manage Blogs</h1>
          <Link
            to="/admin/blog/new"
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-md transition-colors duration-200"
          >
            Create New Blog
          </Link>
        </div>

        {error && (
          <div className="bg-red-500/20 text-red-400 p-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {posts.map((post) => (
            <div
              key={post.id}
              className="border border-red-600/30 rounded-lg bg-gray-900 overflow-hidden transition-transform hover:scale-[1.02] duration-200"
            >
              {post.coverImageUrl && (
                <img
                  src={post.coverImageUrl}
                  alt={post.title}
                  className="w-full h-48 object-cover border-b border-red-600/30"
                />
              )}
              <div className="p-6">
                <h2 className="text-2xl font-bold text-red-500 mb-2">
                  {post.title}
                </h2>
                <p className="text-gray-400 mb-4 line-clamp-2">
                  {post.description}
                </p>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-sm text-gray-500">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </span>
                  <div className="flex gap-4">
                    <Link
                      to={`/admin/blog/${post.id}/edit`}
                      className="text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(post.id)}
                      className="text-red-400 hover:text-red-300 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogAdmin;