// BlogList.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { db } from "../../config/firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isParticlesReady, setIsParticlesReady] = useState(false);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const blogQuery = query(
          collection(db, "blog_posts"),
          orderBy("createdAt", "desc")
        );
        const snapshot = await getDocs(blogQuery);
        const blogData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBlogs(blogData);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();

    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setIsParticlesReady(true));
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-black">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header with Particles */}
      <div className="relative h-[30em] mb-12">
        {isParticlesReady && (
          <div className="absolute inset-0 [mask-image:radial-gradient(50%_50%,white,transparent_95%)]">
            <Particles
              options={{
                particles: {
                  color: { value: "#ffffff" },
                  number: { value: 800 },
                  opacity: { value: { min: 0.1, max: 1 } },
                  size: { value: { min: 0.8, max: 1.2 } },
                },
                interactivity: {
                  events: {
                    onClick: { enable: true, mode: "push" },
                    onHover: { enable: true, mode: "grab" },
                  },
                },
              }}
            />
          </div>
        )}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(239, 68, 68, 0.2) 0%, rgba(0, 0, 0, 0) 70%)",
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-8xl font-bold text-red-500 animate-pulse">BLOGS</h1>
        </div>
      </div>

      {/* Blog List */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <div key={blog.id} className="group">
              <div className="bg-gray-900 rounded-lg overflow-hidden border border-red-600/30 transition-all duration-300 group-hover:scale-[1.02] group-hover:shadow-lg group-hover:shadow-red-500/20">
                {blog.coverImageUrl && (
                  <img
                    src={blog.coverImageUrl}
                    alt={blog.title}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-red-500 mb-2">{blog.title}</h2>
                  <p className="text-gray-400 mb-4 line-clamp-2">{blog.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">
                      {new Date(blog.createdAt).toLocaleDateString()}
                    </span>
                    <Link
                      to={`/blog/${blog.id}`}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition-colors"
                    >
                      Read more
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {blogs.length === 0 && (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-400 text-lg">No blog posts found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogList;
