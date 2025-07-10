// 📁 src/pages/AdminReports.jsx
import { useEffect, useState } from "react";
import TopNav from "../components/admin/TopNav";
import Sidebar from "../components/admin/sideBar";

export default function AdminReports() {
  const today = new Date().toISOString().split("T")[0];
  const [attendance, setAttendance] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(today);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("attendanceData") || "[]");
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    setAttendance(data);
    setStudents(users.filter((u) => u.role === "student"));
  }, []);

  // Build a set of usernames present on selectedDate
  const presentSet = new Set(
    attendance
      .filter((r) => r.date === selectedDate)
      .map((r) => r.username)
  );

  // Map students to status and apply filters
  const reportRows = students
    .filter((s) => s.username.toLowerCase().includes(search.toLowerCase()))
    .map((student) => ({
      username: student.username,
      present: presentSet.has(student.username),
    }))
    .filter((row) =>
      statusFilter === "all"
        ? true
        : statusFilter === "present"
        ? row.present
        : !row.present
    );

  const total = reportRows.length;
  const presentCount = reportRows.filter((r) => r.present).length;
  const absentCount = total - presentCount;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100">
      <TopNav />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-8">
          <h2 className="text-3xl font-bold text-indigo-800 mb-6">Attendance Reports</h2>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow p-6 text-center">
              <p className="text-gray-500 mb-1">Total Students</p>
              <p className="text-2xl font-bold text-indigo-700">{total}</p>
            </div>
            <div className="bg-white rounded-xl shadow p-6 text-center">
              <p className="text-gray-500 mb-1">Present</p>
              <p className="text-2xl font-bold text-green-600">{presentCount}</p>
            </div>
            <div className="bg-white rounded-xl shadow p-6 text-center">
              <p className="text-gray-500 mb-1">Absent</p>
              <p className="text-2xl font-bold text-red-600">{absentCount}</p>
            </div>
          </div>

          {/* Controls */}
          <div className="bg-white p-6 rounded-xl shadow mb-8 grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            <div>
              <label className="block text-gray-700 mb-2">Select Date</label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full border rounded px-3 py-2 shadow-sm focus:ring-indigo-300"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Search Student</label>
              <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full border rounded px-3 py-2 shadow-sm focus:ring-indigo-300"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Status Filter</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full border rounded px-3 py-2 shadow-sm focus:ring-indigo-300"
              >
                <option value="all">All</option>
                <option value="present">Present</option>
                <option value="absent">Absent</option>
              </select>
            </div>
          </div>

          {/* Results Table */}
          <div className="bg-white rounded-xl shadow overflow-x-auto">
            <table className="w-full text-left min-w-max">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3">#</th>
                  <th className="p-3">Student</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {reportRows.length > 0 ? (
                  reportRows.map((row, i) => (
                    <tr key={row.username} className="hover:bg-gray-50">
                      <td className="p-3 border-b">{i + 1}</td>
                      <td className="p-3 border-b flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-indigo-200 flex items-center justify-center font-bold text-indigo-800">
                          {row.username.charAt(0).toUpperCase()}
                        </div>
                        {row.username}
                      </td>
                      <td className="p-3 border-b">
                        {row.present ? (
                          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full">Present</span>
                        ) : (
                          <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full">Absent</span>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} className="p-6 text-center text-gray-500">
                      No records found for {selectedDate}.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}
