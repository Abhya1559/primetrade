"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
  const router = useRouter();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
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
      localStorage.setItem("token", data.token);

      router.push("/dashboard");
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
              Sign in to your account
            </h1>
            {error && (
              <p className="text-red-500 text-sm mb-3 text-center">{error}</p>
            )}

            <p className="text-sm text-slate-500">
              Welcome back to{" "}
              <span className="font-semibold text-purple-600">Primetrade</span>
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block mb-1 text-sm font-medium text-slate-700">
                Email
              </label>
              <input
                type="email"
                value={userData.email}
                name="email"
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

            {/* Options */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-slate-600">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-slate-300 text-purple-600 focus:ring-purple-600"
                />
                Remember me
              </label>

              <a
                href="#"
                className="font-medium text-purple-600 hover:underline"
              >
                Forgot password?
              </a>
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl cursor-pointer bg-linear-to-r from-purple-600 to-indigo-600 
                py-3 text-sm font-semibold text-white shadow-lg 
                hover:scale-[1.02] hover:shadow-xl transition"
            >
              {loading ? "loading" : " Sign in"}
            </button>

            {/* Footer */}
            <p className="text-center text-sm text-slate-500">
              Don’t have an account?{" "}
              <Link
                href="/register"
                className="font-semibold text-purple-600 hover:underline"
              >
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </section>
    </div>
  );
}
