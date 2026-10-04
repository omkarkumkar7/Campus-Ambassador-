import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import FAQ from "./pages/FAQ";
import Dashboard from "./pages/Dashboard";
import FormPage from "./pages/FormPage";
import ViewProfile from "./pages/ViewProfile";
import HomePage from "./pages/HomePage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import ProtectedRoute from "./components/ProtectedRoute";
import Testimonials from './components/testimonials';
import AboutPage from "./pages/AboutUs";
import { LandingPage } from "./pages/LandingPage";
import Responsibility from "./pages/Responsibility";
import OurTeam from "./pages/OurTeam";
import Guidelines from "./pages/Guidelines";
import Preloader from "./components/Preloader";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Leaderboard from "./pages/leaderboard.jsx";


export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <Preloader onComplete={() => setIsLoading(false)} />
      <AuthProvider>
        <Router>
          <ToastContainer
            position="top-right"
            autoClose={3000}
            newestOnTop
            closeOnClick
            pauseOnHover
          />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/form"
              element={
                <ProtectedRoute>
                  <FormPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/viewprofile"
              element={
                <ProtectedRoute>
                  <ViewProfile />
                </ProtectedRoute>
              }
            />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/signin" element={<SignInPage />} />
            <Route path="/responsibility" element={<Responsibility />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/testimonials" element={<Testimonials />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/ourteam" element={<OurTeam />} />
            <Route
              path="/leaderboard"
              element={
                <ProtectedRoute>
                  <Leaderboard />
                </ProtectedRoute>
              }
            />
            <Route path="/guidelines" element={<Guidelines />} />
          </Routes>
        </Router>
      </AuthProvider>
    </>
  );
}
