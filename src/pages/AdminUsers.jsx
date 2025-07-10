import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import TopNav from "../components/admin/TopNav.jsx";
import Sidebar from "../components/admin/sideBar.jsx";

export default function AdminUsers() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [attendance, setAttendance] = useState([]);

  // Compute the last 30 dates as strings
  const last30 = Array.from({ length: 30 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - i);
    return d.toISOString().split("T")[0];
  });

  useEffect(() => {
    // load everything once
    const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");
    const storedAttendance = JSON.parse(localStorage.getItem("attendanceData") || "[]");
    setUsers(storedUsers);
    setAttendance(storedAttendance);
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
  }

  toast.success(`Deleted user: ${username}`);
};



  // Count how many of the last 30 days each user was present
  const countLast30 = (username) =>
    attendance.filter(
      (r) => r.username === username && last30.includes(r.date)
    ).length;

  return (
    <div className="min-h-screen bg-indigo-50">
      <TopNav onLogout={() => { sessionStorage.clear(); navigate("/"); }} />
      <div className="flex">
        <Sidebar />

        <main className="flex-1 p-8">
          <h2 className="text-2xl font-bold text-indigo-800 mb-6">Manage Users</h2>

          <div className="overflow-x-auto bg-white rounded-xl shadow p-6">
            <table className="w-full text-left">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3 border-b">#</th>
                  <th className="p-3 border-b">Username</th>
                  <th className="p-3 border-b">Role</th>
                  <th className="p-3 border-b">Last 30 Days</th>
                  <th className="p-3 border-b">Actions</th>
                </tr>
              </thead>
              <tbody>
                {(() => {
                  const newUsers = users.filter(u => u.role !== "admin");

                  return newUsers.length > 0 ? (
                    newUsers.map((u, i) => (
                      <tr key={u.username} className="hover:bg-gray-50">
                        <td className="p-3 border-b">{i + 1}</td>
                        <td className="p-3 border-b">{u.username}</td>
                        <td className="p-3 border-b capitalize">{u.role}</td>
                        <td className="p-3 border-b">{countLast30(u.username)}</td>
                        <td className="p-3 border-b">
                          <button
                            onClick={() => handleDelete(u.username)}
                            className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-md text-sm transition"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="p-6 text-center text-gray-500">
                        No users found.
                      </td>
                    </tr>
                  );
                })()}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}
