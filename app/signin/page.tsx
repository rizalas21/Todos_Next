"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

export default function SignIn() {
  const [user, setUser] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const handleChange = async (e: any) => {
    const { name, value } = e.target;

    setUser({ ...user, [name]: value });
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    const res = await signIn("auth-session", {
      ...user,
      redirect: true,
      callbackUrl: "/",
    });
    if (!res?.ok || res.error) {
      console.log("failed to login: ", res);
      return;
    }
  };

  return (
    <main className="min-h-screen w-full bg-slate-200 flex items-center justify-center">
      <section className="w-full max-w-sm bg-white rounded-lg shadow-lg px-5 py-6 space-y-5 transition delay-100 duration-300 ease-in-out hover:scale-110 hover:shadow-4xl hover:shadow-blue-600/50 focus-within:scale-110 focus-within:shadow-4xl focus-within:shadow-blue-600/50">
        <h1 className="text-center text-3xl font-bold">Todo App</h1>

        <h2 className="text-xl font-semibold">Sign In</h2>

        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <input
            type="email"
            placeholder="Email"
            name="email"
            className="px-3 py-2 border border-slate-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => handleChange(e)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            className="px-3 py-2 border border-slate-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => handleChange(e)}
            required
          />
          {isLoading ? (
            <button
              type="submit"
              className="w-full bg-blue-700 text-white text-lg font-bold py-2 rounded transition cursor-pointer flex justify-center items-center space-x-3"
            >
              <svg
                className="size-4 rounded-full animate-spin border-2 border-t-transparent"
                viewBox="0 0 24 24"
              >
                {/* <!-- ... --> */}
              </svg>
              Processing ...
              <div className="" />
            </button>
          ) : (
            <button
              type="submit"
              className="w-full bg-blue-600 text-white text-lg font-bold py-2 rounded hover:bg-blue-700 transition cursor-pointer"
            >
              Login
              <div className="" />
            </button>
          )}
        </form>

        <p className="text-center text-sm">
          <a href="/register" className="text-blue-500 hover:underline">
            Don't have an account? Register here
          </a>
        </p>
      </section>
    </main>
  );
}
