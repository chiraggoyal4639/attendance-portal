import { useEffect, useState } from "react";
import TopNav from "../components/admin/TopNav";
import Sidebar from "../components/admin/sideBar";
import ReportSummary from "../components/admin/reports/ReportSummary";
import ReportFilters from "../components/admin/reports/ReportFilters";
import ReportTable from "../components/admin/reports/ReportTable";

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

  const presentSet = new Set(
    attendance.filter((r) => r.date === selectedDate).map((r) => r.username)
  );

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
    <div className="min-h-screen bg-indigo-50 from-indigo-100 to-purple-100">
      <TopNav />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-8">
          <h2 className="text-3xl font-bold text-green-700 mb-6">Attendance Reports</h2>
          <ReportSummary total={total} present={presentCount} absent={absentCount} />
          <ReportFilters
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            search={search}
            setSearch={setSearch}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
          />
          <ReportTable rows={reportRows} selectedDate={selectedDate} />
        </main>
      </div>
    </div>
  );
}
