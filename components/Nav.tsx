"use client";
import Link from "next/link";

export default function Nav() {
  return (
    <nav
      className="fixed top-10 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-7xl rounded-2xl 
      bg-white backdrop-blur-md border border-white/30 shadow-lg"
    >
      <div className="flex items-center justify-between px-8 py-4">
        <h1 className="text-2xl font-extrabold tracking-tight text-purple-600">
          Primetrade
        </h1>

        {/* Links */}
        <ul className="hidden md:flex items-center gap-10 text-sm font-medium text-slate-700">
          <li className="cursor-pointer font-semibold text-md hover:text-purple-600 transition">
            Home
          </li>
          <li className="cursor-pointer font-semibold text-md hover:text-purple-600 transition">
            About
          </li>
          <li className="cursor-pointer font-semibold text-md hover:text-purple-600 transition">
            Explore
          </li>
        </ul>

        <div className="flex items-center gap-4">
          <Link href="/login">
            <button className=" font-semibold text-md cursor-pointer text-slate-700 hover:text-purple-600 transition">
              Login
            </button>
          </Link>
          <Link href="/register">
            <button
              className="rounded-xl bg-linear-to-r from-purple-600 to-indigo-600 
            px-6 py-3 text-sm font-semibold text-white shadow-md 
            hover:scale-105 cursor-pointer hover:shadow-lg transition"
            >
              Register
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
