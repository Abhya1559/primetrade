"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Register() {
  const router = useRouter();
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: userData.name,
          email: userData.email,
          password: userData.password,
        }),
      });
      const data: any = await res.json();
      if (!res.ok) {
        setError(data.message || "login failed");
        setLoading(false);
        return;
      }

      router.push("/login");
    } catch (error) {
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
            <h1 className="text-2xl font-bold tracking-tight text-slate-800">
              Create your account
            </h1>
            {error && (
              <p className="text-red-500 text-sm mb-3 text-center">{error}</p>
            )}
          </div>

          {/* Form */}
          <form className="space-y-5">
            {/* Name */}
            <div>
              <label className="block mb-1 text-sm font-medium text-slate-700">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={userData.name}
                onChange={(e) =>
                  setUserData({ ...userData, name: e.target.value })
                }
                placeholder="John Doe"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm
                  focus:outline-none focus:ring-2 focus:ring-purple-600"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block mb-1 text-sm font-medium text-slate-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={userData.email}
                onChange={(e) =>
                  setUserData({ ...userData, email: e.target.value })
                }
                placeholder="name@gmail.com"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm
                  focus:outline-none focus:ring-2 focus:ring-purple-600"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block mb-1 text-sm font-medium text-slate-700">
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                name="password"
                value={userData.password}
                onChange={(e) =>
                  setUserData({ ...userData, password: e.target.value })
                }
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm
                  focus:outline-none focus:ring-2 focus:ring-purple-600"
                required
              />
            </div>

            {/* Button */}
            <button
              type="submit"
              className="w-full rounded-xl bg-linear-to-r from-purple-600 to-indigo-600 
                py-3 text-sm font-semibold text-white shadow-lg 
                hover:scale-[1.02] hover:shadow-xl transition cursor-pointer"
            >
              {loading ? "loading" : " Create account"}
            </button>

            {/* Footer */}
            <p className="text-center text-sm text-slate-500">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-semibold text-purple-600 hover:underline"
              >
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </section>
    </div>
  );
}
