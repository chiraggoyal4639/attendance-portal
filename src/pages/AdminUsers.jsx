import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import TopNav from "../components/admin/TopNav";
import Sidebar from "../components/admin/sideBar";
import UsersTable from "../components/admin/users/UsersTable";

export default function AdminUsers() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [attendance, setAttendance] = useState([]);

  useEffect(() => {
    setUsers(JSON.parse(localStorage.getItem("users") || "[]"));
    setAttendance(JSON.parse(localStorage.getItem("attendanceData") || "[]"));
  }, []);

  const handleDelete = (username) => {
    if (!window.confirm(`Delete user "${username}"?`)) return;

    const updatedUsers = users.filter((u) => u.username !== username);
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    const updatedAttendance = attendance.filter((r) => r.username !== username);
    setAttendance(updatedAttendance);
    localStorage.setItem("attendanceData", JSON.stringify(updatedAttendance));

    const currentUser = JSON.parse(sessionStorage.getItem("user") || "{}");
    if (currentUser.username === username) {
      sessionStorage.removeItem("user");
      navigate("/");
    }

    toast.success(`Deleted user: ${username}`);
  };

  return (
    <div className="min-h-screen bg-indigo-50">
      <TopNav onLogout={() => { sessionStorage.clear(); navigate("/"); }} />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-8">
          <h2 className="text-3xl font-bold text-indigo-800 mb-6">Manage Users</h2>
          <UsersTable 
            users={users} 
            attendance={attendance} 
            onDelete={handleDelete} 
          />
        </main>
      </div>
    </div>
  );
}
