import { Toaster } from "react-hot-toast";
import { AppContextProvider } from "./context/creatContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Chat from "./components/Chat";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import { useState } from "react";
import DashboardContent from "./components/DashboardContent";

function App() {

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <AppContextProvider>
      <BrowserRouter>
        <div className="flex h-screen bg-gray-100">
          <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
          <div className="flex-1 flex flex-col overflow-hidden">
            <Header toggleSidebar={toggleSidebar} />
            <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
              <Routes>
                <Route path="/" element={<DashboardContent/>} />
                <Route path="/message" element={<Chat />} />
              </Routes>
            </main>
          </div>
        </div>
      </BrowserRouter>
      <Toaster position="bottom-right" reverseOrder={false} />
    </AppContextProvider>
  );
}

export default App;
