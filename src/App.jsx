import react from 'react';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from './pages/Login'
import AdminDashboard  from './pages/AdminDashboard';
import StudentDashboard from './pages/StudentDashboard';
import AdminUsers from './pages/AdminUsers';
import AdminReports from './pages/AdminReports.jsx';
import AdminSettings from './pages/AdminSettings.jsx';
import { AdminRoute, StudentRoute } from "./components/ProtectedRoute.jsx";


function App() {

  return (
    <>
      <Toaster toastOptions={{style:{fontSize: "20px", padding: "9px 12px"}}}/>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<AdminRoute />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/reports" element={<AdminReports />}  />
          <Route path="/admin/settings" element={<AdminSettings />} />
        </Route>
        <Route element={<StudentRoute />}>
          <Route path="/student" element={<StudentDashboard />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
