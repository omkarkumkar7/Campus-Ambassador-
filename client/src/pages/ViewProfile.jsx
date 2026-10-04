import React, { useContext } from 'react';
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, User, Mail, Phone, MapPin, Calendar, CreditCard, Award } from 'lucide-react';
import dashboardBg from "../assets/dashboardbg.webp";
import { fetchSubmittedData } from "../api/data";
import { useEffect } from "react";

const ViewProfile = () => {
    const { user, token } = useContext(AuthContext);
    const navigate = useNavigate();

    // Debugging: Log the user object to see what fields are available
    console.log("Current User Object in ViewProfile:", user);

    useEffect(() => {
        const getData = async () => {
            if (token) {
                try {
                    const data = await fetchSubmittedData(token);
                    console.log("Response from fetchSubmittedData:", data);
                } catch (error) {
                    console.error("Error fetching submitted data:", error);
                }
            }
        };
        getData();
    }, [token]);

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#0a0a0f] text-white">
                <p>Please log in to view your profile.</p>
                <button
                    onClick={() => navigate("/signin")}
                    className="ml-4 text-cyan-400 hover:underline"
                >
                    Sign In
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen relative text-white font-sans selection:bg-cyan-500/30">
            {/* Background */}
            <div
                className="absolute inset-0 z-0 bg-cover bg-center bg-fixed"
                style={{ backgroundImage: `url(${dashboardBg})` }}
            >
                <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
            </div>

            <div className="relative z-10 p-6 md:p-12 max-w-6xl mx-auto">
                <button
                    onClick={() => navigate("/dashboard")}
                    className="mb-8 flex items-center text-gray-400 hover:text-white transition-colors group"
                >
                    <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
                    Back to Dashboard
                </button>

                {/* Header Section */}
                <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-8">
                    <div className="text-center md:text-left">
                        <h1 className="font-jaro text-5xl md:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-600 drop-shadow-lg tracking-wide uppercase">
                            {user.name}
                        </h1>
                        <p className="text-gray-400 text-lg mt-2 tracking-widest uppercase">
                            {user.por || "Campus Ambassador"}
                        </p>
                    </div>

                    {/* Rank Card */}
                    <div className="flex gap-4">
                        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 min-w-[120px] text-center">
                            <Award className="w-6 h-6 text-cyan-400 mx-auto mb-2" />
                            <div className="text-sm text-gray-400 uppercase tracking-wider">Rank</div>
                            <div className="text-2xl font-bold text-white">#{user.rank || "N/A"}</div>
                        </div>
                    </div>
                </div>

                {/* Details Grid */}
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                        <div className="space-y-6">
                            <h3 className="text-xl font-jaro text-cyan-400 tracking-wide border-b border-white/10 pb-2">Academic Info</h3>
                            <div className="group">
                                <label className="text-sm text-gray-500 block mb-1">SF ID</label>
                                <div className="flex items-center text-white/90">
                                    <CreditCard className="w-4 h-4 mr-3 text-cyan-500/70" />
                                    {user.sfId || user.sf_id || user.sfid || user.SF_ID || user.sf_id_if_registered || "N/A"}
                                </div>
                            </div>
                            <div className="group">
                                <label className="text-sm text-gray-500 block mb-1">College</label>
                                <div className="flex items-center text-white/90">
                                    <MapPin className="w-4 h-4 mr-3 text-cyan-500/70" />
                                    {user.college || "N/A"}
                                </div>
                            </div>
                            <div className="group">
                                <label className="text-sm text-gray-500 block mb-1">Year of Passing</label>
                                <div className="flex items-center text-white/90">
                                    <Calendar className="w-4 h-4 mr-3 text-cyan-500/70" />
                                    {user.yop || user.yearOfPass || "N/A"}
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <h3 className="text-xl font-jaro text-purple-400 tracking-wide border-b border-white/10 pb-2">Contact Info</h3>
                            <div className="group">
                                <label className="text-sm text-gray-500 block mb-1">Email</label>
                                <div className="flex items-center text-white/90 truncate">
                                    <Mail className="w-4 h-4 mr-3 text-purple-500/70" />
                                    {user.email || "N/A"}
                                </div>
                            </div>
                            <div className="group">
                                <label className="text-sm text-gray-500 block mb-1">Mobile</label>
                                <div className="flex items-center text-white/90">
                                    <Phone className="w-4 h-4 mr-3 text-purple-500/70" />
                                    {user.mobile || "N/A"}
                                </div>
                            </div>
                            <div className="group">
                                <label className="text-sm text-gray-500 block mb-1">Address</label>
                                <div className="flex items-center text-white/90">
                                    <MapPin className="w-4 h-4 mr-3 text-purple-500/70" />
                                    {user.city}, {user.state}
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <h3 className="text-xl font-jaro text-pink-400 tracking-wide border-b border-white/10 pb-2">Personal Info</h3>
                            <div className="group">
                                <label className="text-sm text-gray-500 block mb-1">Gender</label>
                                <div className="flex items-center text-white/90">
                                    <User className="w-4 h-4 mr-3 text-pink-500/70" />
                                    {user.gender === 'M' ? 'Male' : user.gender === 'F' ? 'Female' : 'Other'}
                                </div>
                            </div>
                            <div className="group">
                                <label className="text-sm text-gray-500 block mb-1">Date of Birth</label>
                                <div className="flex items-center text-white/90">
                                    <Calendar className="w-4 h-4 mr-3 text-pink-500/70" />
                                    {user.dob ? new Date(user.dob).toLocaleDateString('en-GB') : "N/A"}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default ViewProfile;