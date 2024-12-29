import Wrapper from "@/components/wrapper/Wrapper";
import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function CreatePostPage() {
  const [postContent, setPostContent] = useState("");

  const handlePostCreation = () => {
    console.log("Post Created:", postContent);
    // Add logic to handle LinkedIn post creation
  };

  const handleImageCreation = () => {
    console.log("Image Creation Triggered");
    // Add logic to handle image creation
  };

  const handleDocumentCreation = () => {
    console.log("Document Creation Triggered");
    // Add logic to handle document creation
  };

  return (
    <Wrapper>
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="w-full max-w-2xl p-8 space-y-8 bg-white rounded-lg shadow-lg">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900">
              Create a LinkedIn Post
            </h2>
            <p className="text-gray-500 mt-2">
              Share your thoughts, achievements, or latest updates
            </p>
          </div>

          <div>
            <label
              htmlFor="post-content"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Your Post
            </label>
            <textarea
              id="post-content"
              name="post-content"
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
              placeholder="What's on your mind?"
              className="block w-full h-40 p-4 border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <button
              onClick={handlePostCreation}
              className="inline-flex justify-center py-3 px-4 border border-transparent rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition font-medium"
            >
              Create Post
            </button>

            <button
              onClick={handleImageCreation}
              className="inline-flex justify-center py-3 px-4 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition font-medium"
            >
              Add Image
            </button>

            <button
              onClick={handleDocumentCreation}
              className="inline-flex justify-center py-3 px-4 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition font-medium"
            >
              Add Document
            </button>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-600 mt-4">
              Need more options?{" "}
              <Link
                to="/linkedin/carousel/create"
                className="text-indigo-600 hover:text-indigo-500 font-medium"
              >
                Create a Carousel
              </Link>
            </p>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}
