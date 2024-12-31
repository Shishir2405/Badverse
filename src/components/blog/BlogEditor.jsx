import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import { db } from "../../config/firebase";
import { doc, getDoc, setDoc, updateDoc, collection } from "firebase/firestore";
import "react-quill/dist/quill.snow.css";
import "./editor.css";

const BlogEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    content: "",
    coverImageUrl: "",
    author: "",
    tags: [],
    youtubeUrl: "" // Added YouTube URL field
  });

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ script: "sub" }, { script: "super" }],
      [{ align: [] }],
      ["link", "image"],
      ["clean"]
    ]
  };

  const validateForm = () => {
    if (!formData.title.trim()) return "Title is required";
    if (!formData.description.trim()) return "Description is required";
    if (!formData.content.trim()) return "Content is required";
    if (!formData.author.trim()) return "Author name is required";
    return null;
  };

  const processYoutubeUrl = (url) => {
    if (!url) return "";
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/);
    return match ? match[1] : "";
  };

  useEffect(() => {
    if (id) {
      fetchPost();
    }
  }, [id]);

  const fetchPost = async () => {
    try {
      const postDoc = await getDoc(doc(db, "blog_posts", id));
      if (postDoc.exists()) {
        const postData = postDoc.data();
        setFormData({
          title: postData.title || "",
          description: postData.description || "",
          content: postData.content || "",
          coverImageUrl: postData.coverImageUrl || "",
          author: postData.author || "",
          tags: postData.tags || [],
          youtubeUrl: postData.youtubeUrl || ""
        });
      }
    } catch (error) {
      setError("Error fetching post");
      console.error("Error:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const youtubeVideoId = processYoutubeUrl(formData.youtubeUrl);
      const postData = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        content: formData.content,
        coverImageUrl: formData.coverImageUrl,
        author: formData.author.trim(),
        tags: formData.tags,
        youtubeUrl: youtubeVideoId,
        updatedAt: new Date().toISOString()
      };

      if (id) {
        await updateDoc(doc(db, "blog_posts", id), postData);
      } else {
        const newPostRef = doc(collection(db, "blog_posts"));
        await setDoc(newPostRef, {
          ...postData,
          createdAt: new Date().toISOString()
        });
      }

      navigate("/admin/blog");
    } catch (error) {
      setError("Error saving post");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-8 pt-24">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-red-500 mb-8">
          {id ? "Edit Blog Post" : "Create New Blog Post"}
        </h1>

        {error && (
          <div className="bg-red-500/20 text-red-400 p-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="form-group">
            <label className="block text-xl text-red-500 mb-2">Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full bg-gray-900 text-white rounded-lg p-3 border border-red-600/30 focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          </div>

          <div className="form-group">
            <label className="block text-xl text-red-500 mb-2">YouTube URL</label>
            <input
              type="url"
              value={formData.youtubeUrl}
              onChange={(e) => setFormData({ ...formData, youtubeUrl: e.target.value })}
              placeholder="Enter YouTube video URL"
              className="w-full bg-gray-900 text-white rounded-lg p-3 border border-red-600/30 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            {formData.youtubeUrl && processYoutubeUrl(formData.youtubeUrl) && (
              <div className="mt-4">
                <iframe
                  width="100%"
                  height="315"
                  src={`https://www.youtube.com/embed/${processYoutubeUrl(formData.youtubeUrl)}`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="rounded-lg"
                ></iframe>
              </div>
            )}
          </div>

          {/* Rest of your existing form fields */}
          <div className="form-group">
            <label className="block text-xl text-red-500 mb-2">Author</label>
            <input
              type="text"
              value={formData.author}
              onChange={(e) => setFormData({ ...formData, author: e.target.value })}
              className="w-full bg-gray-900 text-white rounded-lg p-3 border border-red-600/30 focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          </div>

          <div className="form-group">
            <label className="block text-xl text-red-500 mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full bg-gray-900 text-white rounded-lg p-3 border border-red-600/30 focus:outline-none focus:ring-2 focus:ring-red-500 h-32"
              required
            />
          </div>

          <div className="form-group">
            <label className="block text-xl text-red-500 mb-2">Cover Image URL</label>
            <input
              type="url"
              value={formData.coverImageUrl}
              onChange={(e) => setFormData({ ...formData, coverImageUrl: e.target.value })}
              placeholder="Enter image URL"
              className="w-full bg-gray-900 text-white rounded-lg p-3 border border-red-600/30 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            {formData.coverImageUrl && (
              <div className="mt-4">
                <img
                  src={formData.coverImageUrl}
                  alt="Cover preview"
                  className="max-w-full h-48 object-cover rounded-lg"
                  onError={() => setError("Invalid image URL")}
                />
              </div>
            )}
          </div>

          <div className="form-group">
            <label className="block text-xl text-red-500 mb-2">Tags</label>
            <input
              type="text"
              value={formData.tags.join(', ')}
              onChange={(e) => {
                const tagValue = e.target.value;
                setFormData({ 
                  ...formData, 
                  tags: tagValue.split(',').map(tag => tag.trim()).filter(tag => tag) 
                });
              }}
              placeholder="Enter tags separated by commas"
              className="w-full bg-gray-900 text-white rounded-lg p-3 border border-red-600/30 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <div className="form-group">
            <label className="block text-xl text-red-500 mb-2">Content</label>
            <div className="bg-gray-900 rounded-lg overflow-hidden border border-red-600/30">
              <ReactQuill
                theme="snow"
                value={formData.content}
                onChange={(content) => setFormData({ ...formData, content })}
                modules={modules}
                className="h-96 text-white"
              />
            </div>
          </div>

          <div className="flex gap-4 justify-end">
            <button
              type="button"
              onClick={() => navigate("/admin/blog")}
              className="px-6 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors disabled:opacity-50"
            >
              {loading ? "Saving..." : id ? "Update Post" : "Create Post"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BlogEditor;