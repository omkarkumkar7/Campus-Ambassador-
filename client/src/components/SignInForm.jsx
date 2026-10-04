// components/SignInForm.jsx
import { useState, useContext } from "react";
import { loginCA } from "../api/auth";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import festBg from "../assets/FB_IMG_1675170342527.webp";
import { toast } from "react-toastify";

const SignInForm = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // 🔄 Loading toast
    const toastId = toast.loading("Signing in...");

    try {
      const response = await loginCA(form);
      console.log("Login API response:", response);

      // Normalize API response
      const payload = response?.data ?? response;

      const token =
        payload?.token ??
        payload?.accessToken ??
        payload?.data?.token ??
        null;

      const user = payload?.user ?? payload?.data ?? {};

      // if (!token) {
      //   throw new Error("No token received from server");
      // }
      if (!token) {
        const backendMsg =
          payload?.message ||
          payload?.error ||
          payload?.data?.message ||
          "Login failed";

        throw new Error(backendMsg);
      }

      // ✅ Save auth
      login(token, user);

      // ✅ Success toast
      toast.update(toastId, {
        render: "Login successfully",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });

      // ➡️ Navigate after toast
      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);

    } catch (err) {
      console.error("Login error:", err);

      const serverMessage =
        err?.response?.data?.message ||
        err?.response?.data ||
        err?.message ||
        "Login failed";

      toast.update(toastId, {
        render: serverMessage,
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden">

      {/* Background image */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          zIndex: -30,
          backgroundImage: `linear-gradient(rgba(6,8,15,0.35), rgba(6,8,15,0.55)), url(${festBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          transform: "scale(1.06)",
          filter: "contrast(0.95) saturate(0.9)",
        }}
      />

      {/* Overlay */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(2,6,23,0.55)",
          zIndex: -10,
        }}
      />

      <form
        onSubmit={handleSubmit}
        className="relative z-10 w-full max-w-lg p-8 rounded-3xl bg-white/6 backdrop-blur-md border border-white/8 shadow-2xl text-white"
      >
        {/* Back Button */}
        <button
          type="button"
          onClick={() => navigate("/")}
          className="absolute top-4 left-4 flex items-center gap-2 text-white/70 hover:text-white transition-colors duration-200 group"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 transform group-hover:-translate-x-1 transition-transform duration-200"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          <span className="text-sm font-medium">Back</span>
        </button>

        <h2 className="text-3xl font-semibold text-center mb-6 mt-4">
          Sign In
        </h2>

        <div className="flex flex-col gap-4">
          <label>
            <span className="text-xs text-white/60">Email</span>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@domain.com"
              required
              className="w-full px-4 py-3 mt-1 rounded-xl bg-white/6 border border-white/6 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/25 outline-none"
            />
          </label>

          <label>
            <span className="text-xs text-white/60">Password</span>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
              className="w-full px-4 py-3 mt-1 rounded-xl bg-white/6 border border-white/6 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/25 outline-none"
            />
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 mt-6 rounded-xl bg-emerald-600 hover:bg-emerald-500 font-semibold tracking-wide hover:scale-[1.02] hover:shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 disabled:opacity-60 disabled:hover:scale-100"
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>

        <div className="mt-6 text-center text-sm text-white/70">
          New user?{" "}
          <Link
            to="/signup"
            className="text-indigo-400 hover:text-pink-400 font-medium hover:underline"
          >
            Sign Up
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
