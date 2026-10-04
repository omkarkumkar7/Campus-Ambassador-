// Dashboard.jsx
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { fetchSubmittedData } from "../api/data";
import { User, BookOpen, Crown, CheckCircle, Home, LogOut } from 'lucide-react';
import dashboardBg from "../assets/dashboardbg.webp";



const Dashboard = () => {
  const navigate = useNavigate();
  const { token, logout } = useContext(AuthContext);
  const [submittedData, setSubmittedData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const data = await fetchSubmittedData();
        setSubmittedData(data);
        setError(null);
      } catch (err) {
        console.error("Dashboard fetch error:", err);
        setError("Failed to fetch dashboard data");
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  const tasks = [
    { name: "Get participant to SF", pts: 30, ptsGained: 0, type: "participant" },
    { name: "Suggest Idea", pts: 5, ptsGained: 0, type: "idea" },
    { name: "Submit Contacts", pts: 10, ptsGained: 0, type: "contact" },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0a0f] text-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0a0f] text-red-400">
        {error}
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen relative text-white selection:bg-cyan-500/30 font-sans">
      {/* Home & Logout Buttons */}
      <div className="absolute top-6 right-6 z-20 flex gap-3">
        <button
          onClick={() => navigate("/")}
          className="group flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-4 py-2 hover:bg-white/20 transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]"
        >
          <Home className="w-5 h-5 text-white group-hover:text-yellow-400 transition-colors" />
          <span className="text-sm font-medium text-white">Home</span>
        </button>
        <button
          onClick={handleLogout}
          className="group flex items-center gap-2 bg-red-500/20 backdrop-blur-md border border-red-500/30 rounded-xl px-4 py-2 hover:bg-red-500/30 transition-all duration-300 hover:shadow-[0_0_15px_rgba(239,68,68,0.2)]"
        >
          <LogOut className="w-5 h-5 text-red-400 group-hover:text-red-300 transition-colors" />
          <span className="text-sm font-medium text-red-400 group-hover:text-red-300">Logout</span>
        </button>
      </div>

      {/* Background with Overlay */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-fixed"
        style={{ backgroundImage: `url(${dashboardBg})` }}
      >
        <div className="absolute inset-0 bg-black/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-transparent to-transparent opacity-80" />
      </div>

      <div className="relative z-10 pt-32 pb-12 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-jaro text-5xl sm:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400 mb-4 drop-shadow-xl tracking-wider">
            DASHBOARD
          </h1>
          <p className="text-gray-300 text-sm sm:text-base tracking-[0.2em] uppercase opacity-90">
            Campus Ambassador Program
          </p>
        </div>

        {/* Cards Row (Restored Layout) */}
        <div className="flex flex-col sm:flex-row gap-4 md:gap-6 mb-12">
          {[
            { title: "View Profile", icon: User, action: () => navigate("/viewprofile") },
            { title: "Guidelines", icon: BookOpen, action: () => navigate("/guidelines") },
            { title: "Leaderboard", icon: Crown, action: () => navigate("/leaderboard") }
          ].map((item, index) => (
            <button
              key={index}
              onClick={item.action}
              className="group relative flex-1 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(250,204,21,0.15)] flex flex-col items-center justify-center text-center gap-3 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <item.icon className="w-8 h-8 text-yellow-400 group-hover:scale-110 transition-transform duration-300" />
              <span className="font-semibold text-white tracking-wide z-10">{item.title}</span>
            </button>
          ))}
        </div>

        {/* Tasks Table (Restored Layout) */}
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 sm:p-8 shadow-xl overflow-x-auto">
          <div className="mb-6 border-b border-white/10 pb-4">
            <h2 className="font-jaro text-3xl text-white tracking-wide">YOUR TASKS</h2>
          </div>

          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-gray-400 border-b border-white/10 text-sm uppercase tracking-wider">
                <th className="py-4 px-4 font-semibold">Task</th>
                <th className="py-4 px-4 font-semibold text-center">Action</th>
                <th className="py-4 px-4 font-semibold text-center">Points</th>
                <th className="py-4 px-4 font-semibold text-center">Progress</th>
              </tr>
            </thead>
            <tbody className="text-gray-200">
              {tasks.map((t, i) => (
                <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-colors duration-200 group">
                  <td className="py-4 px-4 font-medium text-white group-hover:text-yellow-400 transition-colors">
                    {t.name}
                  </td>
                  <td className="py-4 px-4 text-center">
                    <button
                      onClick={() => navigate("/form", { state: { type: t.type } })}
                      className="bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-bold py-2 px-6 rounded-lg shadow-lg shadow-blue-500/20 transition-all active:scale-95"
                    >
                      Click Here
                    </button>
                  </td>
                  <td className="py-4 px-4 text-center font-bold text-yellow-400 text-lg">
                    {t.pts}
                  </td>
                  <td className="py-4 px-4 text-center font-bold text-emerald-400 text-lg">
                    {t.ptsGained}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;

