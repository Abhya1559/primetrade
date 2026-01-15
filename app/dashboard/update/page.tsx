"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function UpdateProfile() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Load current user data
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
        if (!res.ok) throw new Error();
        setForm({ name: data.name || "", email: data.email || "" });
      })
      .catch(() => setError("Failed to load profile"));
  }, [router]);

  // Update profile
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await fetch("http://localhost:3000/api/dashboard/update", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Update failed");
        return;
      }

      setSuccess("Profile updated successfully");
      setTimeout(() => router.push("/dashboard"), 1000);
    } catch {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center 
      bg-linear-to-br from-purple-900 via-indigo-900 to-slate-900"
    >
      <section
        className="w-full max-w-md rounded-2xl bg-white/90 backdrop-blur-xl 
        shadow-2xl border border-white/20"
      >
        <div className="p-8 space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-bold text-slate-800">
              Update Profile
            </h1>
            <p className="text-sm text-slate-500">Edit your account details</p>
          </div>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          {success && (
            <p className="text-green-600 text-sm text-center">{success}</p>
          )}

          {/* Form */}
          <form onSubmit={handleUpdate} className="space-y-5">
            <div>
              <label className="block mb-1 text-sm font-medium text-slate-700">
                Name
              </label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm
                  focus:outline-none focus:ring-2 focus:ring-purple-600"
                required
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-slate-700">
                Email
              </label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm
                  focus:outline-none focus:ring-2 focus:ring-purple-600"
                required
              />
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 rounded-xl bg-linear-to-r from-purple-600 to-indigo-600 
                  py-3 text-sm font-semibold text-white shadow-lg 
                  hover:scale-[1.02] transition disabled:opacity-50"
              >
                {loading ? "Updating..." : "Save Changes"}
              </button>

              <button
                type="button"
                onClick={() => router.push("/dashboard")}
                className="flex-1 rounded-xl border border-slate-300 py-3 text-sm
                  font-semibold text-slate-700 hover:bg-slate-100 transition"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
