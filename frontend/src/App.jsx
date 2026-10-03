import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import AdminDashboard from "./pages/AdminDashboard";
import AdminComplaints from "./pages/AdminComplaints";
import Analytics from "./pages/Analytics";
import ComplaintDetails from "./pages/ComplaintDetails";
import ComplaintHistory from "./pages/ComplaintHistory";
import CreateComplaint from "./pages/CreateComplaint";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import UserDashboard from "./pages/UserDashboard";
import { useAuth } from "./context/AuthContext";

const ProtectedRoute = ({ children, role }) => {
  const { isAuthenticated, user } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (role && user?.role !== role) return <Navigate to={user?.role === "admin" ? "/admin" : "/dashboard"} replace />;
  return children;
};

const GuestRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuth();
  if (!isAuthenticated) return children;
  return <Navigate to={user?.role === "admin" ? "/admin" : "/dashboard"} replace />;
};

const App = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<GuestRoute><Login /></GuestRoute>} />
    <Route path="/register" element={<GuestRoute><Register /></GuestRoute>} />

    <Route element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
      <Route path="/dashboard" element={<UserDashboard />} />
      <Route path="/complaints" element={<ComplaintHistory />} />
      <Route path="/complaints/new" element={<CreateComplaint />} />
      <Route path="/complaints/:id" element={<ComplaintDetails />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/admin" element={<ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>} />
      <Route path="/admin/complaints" element={<ProtectedRoute role="admin"><AdminComplaints /></ProtectedRoute>} />
      <Route path="/analytics" element={<ProtectedRoute role="admin"><Analytics /></ProtectedRoute>} />
    </Route>

    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default App;
