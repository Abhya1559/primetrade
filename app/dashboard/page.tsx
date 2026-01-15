"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch user data
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }

    fetch("http://localhost:3000/api/dashboard", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) throw new Error(data.message);
        setUser(data);
      })
      .catch(() => setError("Failed to load dashboard"))
      .finally(() => setLoading(false));
  }, [router]);

  // Delete user
  const handleDelete = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const confirmDelete = confirm(
      "Are you sure you want to delete your account?"
    );
    if (!confirmDelete) return;

    await fetch("http://localhost:3000/api/dashboard/delete", {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    localStorage.removeItem("token");
    router.push("/register");
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-purple-900 via-indigo-900 to-slate-900">
        <p className="text-white">Loading dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-purple-900 via-indigo-900 to-slate-900">
        <p className="text-red-400">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-purple-900 via-indigo-900 to-slate-900">
      <section className="w-full max-w-xl rounded-2xl bg-white/90 backdrop-blur-xl shadow-2xl border border-white/20">
        <div className="p-8 space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-bold text-slate-800">Dashboard</h1>
            <p className="text-sm text-slate-500">
              Welcome back to{" "}
              <span className="font-semibold text-purple-600">Primetrade</span>
            </p>
          </div>

          {/* User Info */}
          <div className="space-y-3 rounded-xl border border-slate-200 p-4 bg-white">
            <div className="flex justify-between">
              <span className="text-sm font-medium text-slate-600">Name</span>
              <span className="text-sm text-slate-800">{user.name}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-sm font-medium text-slate-600">Email</span>
              <span className="text-sm text-slate-800">{user.email}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-sm font-medium text-slate-600">
                User ID
              </span>
              <span className="text-xs text-slate-500 break-all">
                {user.id}
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Link
              href="/dashboard/update"
              className="flex-1 text-center  rounded-xl bg-linear-to-r from-purple-600 to-indigo-600 
                py-3 text-sm font-semibold text-white shadow-lg 
                hover:scale-[1.02] transition"
            >
              Update Profile
            </Link>

            <button
              onClick={handleDelete}
              className="flex-1 rounded-xl bg-red-600 py-3 text-sm font-semibold text-white
                hover:bg-red-700 transition"
            >
              Delete Account
            </button>
          </div>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="w-full rounded-xl border border-slate-300 py-3 text-sm
              font-semibold text-slate-700 hover:bg-slate-100 transition"
          >
            Logout
          </button>
        </div>
      </section>
    </div>
  );
}
