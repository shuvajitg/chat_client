import { useState } from "react";
import DashboardContent from "./DashboardContent";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { Route, Routes } from "react-router-dom";
import Contact from "./Contact";

export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header toggleSidebar={toggleSidebar} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <Routes>
            <Route path="/" element={<DashboardContent />} />
            <Route path="/contacts" element={<Contact />} />
            <Route path="/message" element={<DashboardContent />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}