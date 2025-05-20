"use client";
import GoogleAuth from "@/components/auth/GoogleAuth/GoogleAuth";
import Link from "next/link";
import React, { useState } from "react";

function SignupPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Signup attempt with:", formData);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Section */}
      <div className="w-1/2 bg-white p-8 flex items-center">
        <div className="w-full max-w-md mx-auto">
          <h1 className="text-4xl font-bold mb-2">Join Fennec Today</h1>
          <p className="text-gray-500 mb-8">Create your account to get started.</p>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="firstName" className="text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                id="name"
                name="firstName"
                type="text"
                value={formData.firstName}
                onChange={handleChange}
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-orange-500"
                placeholder="John"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-orange-500"
                placeholder="example@mail.com"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-orange-500"
                placeholder="8+ strong characters"
                required
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-orange-500"
                placeholder="Confirm your password"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full mt-8 py-3 px-4 border border-transparent rounded-md shadow-sm font-medium text-white bg-orange-500 hover:bg-orange-600 transition-colors duration-300"
            >
              Sign Up
            </button>
          </form>

          {/* Line separator */}
          <div className="flex items-center my-2 text-gray-500 text-center">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-4">or</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          <div>
            <GoogleAuth mode="signup"/>
          </div>

          {/* Login Link */}
          <div className="text-center mt-4">
            <p className="text-gray-500">
              Already have an account?{" "}
              <Link href="/login" className="text-orange-500 hover:underline">
                Log In
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-1/2 bg-orange-600 p-8 flex items-center justify-center text-white">
        <div className="max-w-md">
          <h2 className="text-5xl font-bold mb-8">"Discover your next real estate opportunity with Fennec."</h2>
          <div>
            <p className="font-semibold">- Andres Tavera</p>
            <p className="text-sm opacity-80">Co-Founder</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;