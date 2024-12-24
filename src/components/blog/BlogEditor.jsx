import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db, storage } from "../../config/firebase";
import { doc, getDoc, addDoc, updateDoc, collection } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Editor } from '@tinymce/tinymce-react';

const STORAGE_KEY = "badtalks_blog_draft";

const BlogEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const [formData, setFormData] = useState(() => {
    const savedDraft = localStorage.getItem(STORAGE_KEY);
    if (savedDraft) {
      return JSON.parse(savedDraft);
    }
    return {
      title: "",
      description: "",
      content: "",
      coverImage: null,
      coverImageUrl: "",
      tags: [],
      category: "",
      published: false,
    };
  });

  const handleImageUpload = async (blobInfo) => {
    try {
      const file = blobInfo.blob();
      const imageRef = ref(storage, `blog/${Date.now()}-${blobInfo.filename()}`);
      await uploadBytes(imageRef, file);
      const url = await getDownloadURL(imageRef);
      return url;
    } catch (error) {
      console.error("Error uploading image:", error);
      throw new Error("Failed to upload image");
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [formData]);

  useEffect(() => {
    return () => {
      if (!loading) {
        localStorage.removeItem(STORAGE_KEY);
      }
    };
  }, [loading]);

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
          ...postData,
          coverImage: null,
        });
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({
            ...postData,
            coverImage: null,
          })
        );
      }
    } catch (error) {
      setError("Error fetching post");
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (formData.title || formData.content || formData.description) {
        e.preventDefault();
        e.returnValue = "";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [formData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      let coverImageUrl = formData.coverImageUrl;
      if (formData.coverImage) {
        const imageRef = ref(storage, `blog/${Date.now()}-${formData.coverImage.name}`);
        await uploadBytes(imageRef, formData.coverImage);
        coverImageUrl = await getDownloadURL(imageRef);
      }

      const postData = {
        title: formData.title,
        description: formData.description,
        content: formData.content,
        coverImageUrl,
        tags: formData.tags,
        category: formData.category,
        published: formData.published,
        updatedAt: new Date().toISOString(),
      };

      if (id) {
        await updateDoc(doc(db, "blog_posts", id), postData);
      } else {
        await addDoc(collection(db, "blog_posts"), {
          ...postData,
          createdAt: new Date().toISOString(),
        });
      }

      localStorage.removeItem(STORAGE_KEY);
      navigate("/admin/blog");
    } catch (error) {
      setError("Error saving post");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDiscard = () => {
    if (window.confirm("Are you sure you want to discard this draft?")) {
      localStorage.removeItem(STORAGE_KEY);
      setFormData({
        title: "",
        description: "",
        content: "",
        coverImage: null,
        coverImageUrl: "",
        tags: [],
        category: "",
        published: false,
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 pt-24">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-8">
          {id ? "Edit Blog Post" : "Create New Blog Post"}
        </h1>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg h-24"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Cover Image
            </label>
            <input
              type="file"
              onChange={(e) => setFormData({ ...formData, coverImage: e.target.files[0] })}
              accept="image/*"
              className="w-full"
            />
            {formData.coverImageUrl && (
              <img
                src={formData.coverImageUrl}
                alt="Cover preview"
                className="mt-2 h-48 object-cover rounded-lg"
              />
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Content
            </label>
            <Editor
              apiKey="he46ikcftmnlxtfq097fzcff4xvhkol52j1ugjqdb4lklo5x" // You'll need to sign up for a free API key at https://www.tiny.cloud/
              value={formData.content}
              onEditorChange={(content) => setFormData({ ...formData, content })}
              init={{
                height: 500,
                menubar: false,
                plugins: [
                  'advlist', 'autolink', 'lists', 'link', 'image', 'charmap',
                  'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                  'insertdatetime', 'media', 'table', 'preview', 'help', 'wordcount', 'paste'
                ],
                toolbar: 'undo redo | blocks | ' +
                  'bold italic forecolor | alignleft aligncenter ' +
                  'alignright alignjustify | bullist numlist outdent indent | ' +
                  'removeformat | help',
                skin: 'oxide-dark',
                content_css: 'dark',
                paste_retain_style_properties: 'all',
                paste_word_valid_elements: 'b,strong,i,em,h1,h2,h3,p,br',
                paste_data_images: true,
                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px; background-color: #1a1a1a; color: #ffffff; } .mce-content-body[data-mce-placeholder]:not(.mce-visualblocks)::before { color: #666; }',
              }}
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              checked={formData.published}
              onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
              className="h-4 w-4 text-blue-600 rounded border-gray-300"
            />
            <label className="ml-2 text-sm text-gray-700">
              Publish this post
            </label>
          </div>

          <div className="flex gap-4 justify-end">
            <button
              type="button"
              onClick={handleDiscard}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Discard
            </button>
            <button
              type="button"
              onClick={() => navigate("/admin/blog")}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 disabled:opacity-50"
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