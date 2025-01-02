import React, { useState, useEffect } from "react";
import { db } from "../../config/firebase";
import { doc, getDoc } from "firebase/firestore";
import ReactQuill from "react-quill";
import "../blog/editor.css";

const PrivacyPolicy = () => {
  const [policy, setPolicy] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrivacyPolicy = async () => {
      try {
        const docRef = doc(db, "settings", "privacy_policy");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setPolicy(docSnap.data());
        }
      } catch (error) {
        console.error("Error fetching privacy policy:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPrivacyPolicy();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-black">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white pt-24">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-red-500 mb-8">{policy?.title || "Privacy Policy"}</h1>
        
        <div className="prose prose-lg prose-invert mx-auto">
          <div className="prose prose-red prose-invert max-w-none">
            <ReactQuill
              value={policy?.content || ""}
              readOnly={true}
              theme="bubble"
              modules={{ toolbar: false }}
            />
          </div>
        </div>

        {policy?.lastUpdated && (
          <div className="mt-8 text-gray-400">
            Last updated: {new Date(policy.lastUpdated).toLocaleDateString()}
          </div>
        )}
      </div>
    </div>
  );
};

export default PrivacyPolicy;