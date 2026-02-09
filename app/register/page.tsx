"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Register() {
  const [user, setUser] = useState({ email: "", name: "", password: "" });
  const router = useRouter();

  function handleChange(e: any) {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  }

  async function handleSubmit(e: any) {
    e.preventDefault();
    const reg = await axios.post(`/api/register`, {
      data: user,
    });

    if (!reg || reg.status >= 400) return new Error("error when register:");

    return router.replace("/signin");
  }
  return (
    <main className="min-h-screen w-full bg-slate-200 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white rounded-lg shadow-lg px-5 py-6 space-y-5 transition delay-100 duration-300 ease-in-out hover:scale-110 hover:shadow-4xl hover:shadow-blue-600/50 focus-within:scale-110 focus-within:shadow-4xl focus-within:shadow-blue-600/50"
      >
        <h1 className="text-center text-3xl font-bold">Todo App</h1>

        <h2 className="text-xl font-semibold">Sign Up</h2>

        <div className="flex flex-col space-y-3">
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="px-3 py-2 border border-slate-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            onChange={(e) => handleChange(e)}
          />
          <input
            type="text"
            name="name"
            placeholder="Name"
            className="px-3 py-2 border border-slate-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="px-3 py-2 border border-slate-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            onChange={(e) => handleChange(e)}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white text-lg font-bold py-2 rounded hover:bg-blue-700 transition cursor-pointer"
        >
          Register
        </button>

        <p className="text-center text-sm">
          <a href="/signin" className="text-blue-500 hover:underline">
            Already have an account? Sign in here
          </a>
        </p>
      </form>
    </main>
  );
}
