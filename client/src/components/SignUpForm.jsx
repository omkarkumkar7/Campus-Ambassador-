// components/SignUpForm.jsx
import { useState, useContext, useRef } from "react";
import { registerCA } from "../api/auth";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import festBg from "../assets/FB_IMG_1675170342527.webp";
import { toast } from "react-toastify";

import ReCAPTCHA from "react-google-recaptcha";

const SignUpForm = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    gender: "M",
    por: "College Admin",
    dob: "",
    mobile: "",
    yop: "",
    college: "",
    addr: "",
    city: "",
    state: "",
    alt_email: "",
    security_question: "",
    security_answer: "",
  });

  const [captchaToken, setCaptchaToken] = useState(null);
  const recaptchaRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleCaptchaChange = (token) => {
    // react-google-recaptcha passes null when the token expires or is cleared.
    setCaptchaToken(token);
  };

  // A reCAPTCHA token is single-use and expires ~2 minutes after it is solved.
  // Clearing state alone leaves the checkbox visibly ticked while captchaToken
  // is null, so every retry reports "Please complete the CAPTCHA verification"
  // with no way to recover short of reloading the page. Reset the widget too.
  const resetCaptcha = () => {
    recaptchaRef.current?.reset();
    setCaptchaToken(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!captchaToken) {
      toast.error("Please complete the CAPTCHA verification");
      return;
    }

    // Validate Mobile
    if (!/^\d{10}$/.test(form.mobile)) {
      toast.error("Invalid mobile number. Must be 10 digits.");
      return;
    }

    // Validate Year of Passing
    // Assuming YOP should be a 4-digit year, reasonably recent or near future
    const yopNum = parseInt(form.yop, 10);
    if (!/^\d{4}$/.test(form.yop) || yopNum < 1990 || yopNum > 2035) {
      toast.error("Invalid Year of Passing. Please enter a valid 4-digit year.");
      return;
    }

    setLoading(true);

    // 🔄 Loading toast
    const toastId = toast.loading("Creating your account...");

    // Construct payload strictly matching backend requirements
    const payloadData = {
      ...form,
      yop: parseInt(form.yop, 10), // Expected: number
      captcha: captchaToken, // Expected: string
      addr: form.addr // Ensure addr is included
    };

    console.log("Payload:", payloadData);

    try {
      const response = await registerCA(payloadData);

      // Normalize response
      const payload = response?.data ?? response;

      const token =
        payload?.token ||
        payload?.accessToken ||
        payload?.data?.token ||
        null;

      // if (!token) throw new Error("No token received from server");
      if (!token) {
        const backendMsg =
          payload?.message ||
          payload?.error ||
          payload?.data?.message ||
          "Registration failed";

        throw new Error(backendMsg);
      }

      // Auto-login removed as per request
      // login(token, payload?.user ?? payload ?? {});

      // ✅ Success toast
      toast.update(toastId, {
        render: "Registration successful! Please login.",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });

      // ➡️ Navigate after toast
      setTimeout(() => {
        navigate("/signin");
      }, 1500);

    } catch (err) {
      console.error("Signup error:", err);

      const serverMessage =
        err?.response?.data?.message ||
        err?.response?.data ||
        err?.message ||
        "Error registering";

      toast.update(toastId, {
        render: serverMessage,
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });

      // Reset captcha on error - the token is spent either way.
      resetCaptcha();

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center p-6 relative overflow-hidden">

      {/* Background */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          zIndex: -30,
          backgroundImage: festBg
            ? `linear-gradient(rgba(6,8,15,0.35), rgba(6,8,15,0.55)), url(${festBg})`
            : "linear-gradient(135deg, rgba(59,20,120,0.9) 0%, rgba(37,99,235,0.9) 100%)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          transform: "scale(1.05)",
          filter: "contrast(0.95) saturate(0.95)",
        }}
      />

      {/* Overlay */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(2,6,23,0.45)",
          zIndex: -10,
        }}
      />

      <form
        onSubmit={handleSubmit}
        className="relative z-10 w-full max-w-lg p-8 rounded-3xl bg-white/6 backdrop-blur-md border border-white/8 shadow-2xl text-white max-h-[90vh] overflow-y-auto"
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
          Sign Up
        </h2>

        {/* Form Fields */}
        <div className="flex flex-col">
          {Object.keys(form).map((key) => (
            <input
              key={key}
              type={
                key.includes("password")
                  ? "password"
                  : key === "dob"
                    ? "date"
                    : key === "yop" || key === "mobile"
                      ? "number" // Use number input type
                      : "text"
              }
              name={key}
              placeholder={key.replace(/_/g, " ").toUpperCase()}
              value={form[key]}
              onChange={handleChange}
              required={true} // All fields now required based on backend feedback
              className="w-full mb-3 p-3 rounded-xl bg-white/6 placeholder-white/60 border border-white/6 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/25 outline-none transition-all duration-200 text-sm"
            />
          ))}
        </div>

        <div className="flex justify-center mb-4">
          <ReCAPTCHA
            ref={recaptchaRef}
            sitekey="6LcfDKsrAAAAALOedfX8knxtsIJpPqnwQ_h3LdjB"
            onChange={handleCaptchaChange}
            onExpired={() => setCaptchaToken(null)}
            onErrored={() => setCaptchaToken(null)}
            theme="dark"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 mt-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 font-semibold tracking-wide hover:scale-[1.02] hover:shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 disabled:opacity-60 disabled:hover:scale-100"
        >
          {loading ? "Registering..." : "Register"}
        </button>

        {/* Footer */}
        <div className="mt-6 text-center text-sm text-white/70">
          Already have an account?{" "}
          <Link
            to="/signin"
            className="text-indigo-400 hover:text-pink-400 font-medium hover:underline"
          >
            Sign In
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
