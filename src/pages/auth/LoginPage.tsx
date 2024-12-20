import React from "react";
import { FaFacebook, FaGoogle, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function LoginPage() {
  const handleSubmit = (e: any) => {
    e.preventDefault();
    // Handle your form submission logic here
  };

  const handleSocialLogin = (provider: any) => {
    // Implement social login logic with the given provider
    console.log(`Logging in with ${provider}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Welcome Back</h2>
          <p className="text-gray-500 mt-2">Sign in to your account</p>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="you@example.com"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="flex justify-between text-sm font-medium text-gray-700"
            >
              <span>Password</span>
              <a href="#" className="text-indigo-600 hover:text-indigo-500">
                Forgot?
              </a>
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="••••••••"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition"
          >
            Sign in
          </button>
        </form>

        <div className="relative mt-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">
              Or continue with
            </span>
          </div>
        </div>

        <div className="flex gap-3">
          {/* LinkedIn Button */}
          <Link to={import.meta.env.VITE_API_URL + "/linkedin/accessToken"}>
            <button className="flex-1 inline-flex justify-center py-3 items-center gap-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-gray-700 font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition">
              <FaLinkedin />
              LinkedIn
            </button>
          </Link>

          {/* Facebook Button */}
          <button
            onClick={() => handleSocialLogin("Facebook")}
            className="flex-1 inline-flex items-center gap-2 justify-center py-3 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-gray-700 font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition"
          >
            <FaFacebook />
            Facebook
          </button>

          {/* Google Button */}
          <button
            onClick={() => handleSocialLogin("Google")}
            className="flex-1 inline-flex items-center gap-2 justify-center py-3 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-gray-700 font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition"
          >
            <FaGoogle />
            Google
          </button>
        </div>

        <p className="mt-6 text-center text-sm text-gray-600">
          Don&apos;t have an account?{" "}
          <a
            href="#"
            className="text-indigo-600 hover:text-indigo-500 font-medium"
          >
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
