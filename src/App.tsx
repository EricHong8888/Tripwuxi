import { Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import TravelItineraryPage from "@/pages/TravelItineraryPage";
import { useState } from "react";
import { AuthContext } from '@/contexts/authContext';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, logout }}
    >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/itinerary" element={<TravelItineraryPage />} />
        <Route path="/other" element={<div className="text-center text-xl">Other Page - Coming Soon</div>} />
        {/* 确保所有未匹配的路径都重定向到首页 */}
        <Route path="*" element={<Home />} />
      </Routes>
    </AuthContext.Provider>
  );
}
