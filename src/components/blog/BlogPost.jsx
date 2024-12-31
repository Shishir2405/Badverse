import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../../config/firebase";
import { doc, getDoc } from "firebase/firestore";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";

const BlogPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const docRef = doc(db, "blog_posts", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setPost({ id: docSnap.id, ...docSnap.data() });
        } else {
          navigate("/blog");
        }
      } catch (error) {
        console.error("Error fetching post:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-black">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white pt-24">
      {post.coverImageUrl && (
        <div className="relative h-[60vh] w-full">
          <div className="absolute inset-0 bg-black/50"></div>
          <img
            src={post.coverImageUrl}
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="max-w-4xl mx-auto text-center px-4">
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">{post.title}</h1>
              <p className="text-xl text-gray-200">
                {new Date(post.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto px-4 py-12">
        {!post.coverImageUrl && (
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-red-500 mb-4">{post.title}</h1>
            <p className="text-gray-400">
              {new Date(post.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        )}

        <div className="prose prose-lg prose-invert mx-auto">
          <div className="text-xl text-gray-300 leading-relaxed mb-8">
            {post.description}
          </div>

          {post.youtubeUrl && (
            <div className="aspect-w-16 aspect-h-9 mb-8">
              <iframe
                src={`https://www.youtube.com/embed/${post.youtubeUrl}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full rounded-lg"
                style={{ minHeight: "400px" }}
              ></iframe>
            </div>
          )}
          
          <div className="prose prose-red prose-invert max-w-none">
            <ReactQuill
              value={post.content}
              readOnly={true}
              theme="bubble"
              modules={{ toolbar: false }}
            />
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-gray-800">
          <button
            onClick={() => navigate("/blog")}
            className="text-red-500 hover:text-red-400 flex items-center gap-2 transition-colors"
          >
            ← Back to Blog
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;