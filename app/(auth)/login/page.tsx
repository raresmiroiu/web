"use client";
import { LoginAction } from "@/libs/login-action";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { redirect } from "next/navigation";

const Page = () => {
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-xl p-8 space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
            <p className="text-gray-600">Sign in to your account</p>
          </div>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-300" />
            </div>
          </div>
          <form
            className="space-y-4"
            action={async (formData) => {
              const res = await LoginAction(formData);
              console.log(res);
              if (!res.success) {
                alert("Invalid Credentials");
              } else {
                redirect("/");
              }
            }}
          >
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-black"
              >
                Email Address
              </label>
              <input
                id="email"
                name="email"
                placeholder="you@example.com"
                type="email"
                required
                autoComplete="email"
                className="w-full px-4 py-2 text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-black"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                placeholder="••••••••"
                type="password"
                required
                autoComplete="current-password"
                className="w-full px-4 py-2 text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>
            <button
              className="w-full bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 ease-in-out transform hover:scale-105"
              type="submit"
            >
              Sign In
            </button>
          </form>
          <div className="text-center text-sm text-gray-600">
            Don&apos;t have an account?{" "}
            <Link
              href="/sign-up"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Sign up here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Page;
