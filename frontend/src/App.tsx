import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import LoadingScreen from "./components/LoadingScreen";
import BackToTop from "./components/BackToTop";
import ScrollToTop from "./components/ScrollToTop";

import Landing from "./pages/Landing";
import About from "./pages/About";
import Features from "./pages/Features";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Contact from "./pages/Contact";
import Team from "./pages/Team";
import NotFound from "./pages/NotFound";

import CommandCenter from "./pages/agent/CommandCenter";
import Chat from "./pages/agent/Chat";
import Feed from "./pages/agent/Feed";
import Discovery from "./pages/agent/Discovery";
import Editorial from "./pages/agent/Editorial";
import Memory from "./pages/agent/Memory";
import Publishing from "./pages/agent/Publishing";

export default function App() {
  return (
<BrowserRouter>
      <ScrollToTop />
      <AuthProvider>
        <div className="min-h-screen bg-surface-950">
          <LoadingScreen />
          <Navbar />

          <Routes>
            {/* Public */}
            <Route path="/" element={<Landing />} />
            <Route path="/about" element={<About />} />
            <Route path="/features" element={<Features />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/team" element={<Team />} />

            {/* Authentication */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Dashboard */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            {/* ARCTES */}
            <Route
              path="/agent"
              element={
                <ProtectedRoute>
                  <CommandCenter />
                </ProtectedRoute>
              }
            />

            <Route
              path="/agent/chat"
              element={
                <ProtectedRoute>
                  <Chat />
                </ProtectedRoute>
              }
            />

            <Route
              path="/agent/feed"
              element={
                <ProtectedRoute>
                  <Feed />
                </ProtectedRoute>
              }
            />

            <Route
              path="/agent/discovery"
              element={
                <ProtectedRoute>
                  <Discovery />
                </ProtectedRoute>
              }
            />

            <Route
              path="/agent/editorial"
              element={
                <ProtectedRoute>
                  <Editorial />
                </ProtectedRoute>
              }
            />

            <Route
              path="/agent/memory"
              element={
                <ProtectedRoute>
                  <Memory />
                </ProtectedRoute>
              }
            />

            <Route
              path="/agent/publishing"
              element={
                <ProtectedRoute>
                  <Publishing />
                </ProtectedRoute>
              }
            />

            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>

          <Footer />
          <BackToTop />
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}
