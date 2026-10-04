import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import OurTeam from "../pages/OurTeam.jsx";



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<h1>Home Page</h1>} />
        <Route path="/ourteam" element={<OurTeam />} />

      </Routes>
    </Router>
  );
}

export default App;
