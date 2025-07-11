import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardStats from "../components/admin/Home/stats.jsx";
import Sidebar from "../components/admin/sideBar.jsx";
import AttendanceTable from "../components/admin/Home/AttendanceTable.jsx";
import RegistrationRequests from "../components/admin/Home/RegistrationRequests.jsx";
import TopNav from "../components/admin/TopNav.jsx";

const AdminDashboard  = () => {
  const navigate = useNavigate();
  const [records, setRecords] = useState([]);
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    if (!users.length) {
      const defaultAdmin = [{ username: "admin", password: "admin123", role: "admin" }];
      localStorage.setItem("users", JSON.stringify(defaultAdmin));
      console.log("Default admin created: admin / admin123");
    }
    const attendance = JSON.parse(localStorage.getItem("attendanceData") || "[]");
    const regRequests = JSON.parse(localStorage.getItem("regRequests") || "[]");

    setRecords(attendance);
    setRequests(regRequests);
  }, []);

  const approveRequest = (index) => {
    let newRequests = [...requests];
    const approvedUser = newRequests[index];

    newRequests = newRequests.filter((r) => r.username !== approvedUser.username);
    setRequests(newRequests);
    localStorage.setItem("regRequests", JSON.stringify(newRequests));

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    users.push({
      username: approvedUser.username,
      password: approvedUser.password,
      role: "student",
    });
    localStorage.setItem("users", JSON.stringify(users));
    toast.success(`Approved ${approvedUser.username} and rejected duplicates.`);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("user");
    navigate("/");
  };

  const rejectRequest = (index) => {
    const updatedRequests = [...requests];
    updatedRequests.splice(index, 1);
    setRequests(updatedRequests);
    localStorage.setItem("regRequests", JSON.stringify(updatedRequests));
  };

  const totalStudents = JSON.parse(localStorage.getItem("users") || "[]").filter(u => u.role === "student").length;
  const today = new Date().toISOString().split("T")[0];
  const presentToday = records.filter(r => r.date === today).length;
  const attendanceRate = totalStudents ? Math.round((presentToday / totalStudents) * 100) : 0;

  return (
    <div className="min-h-screen bg-indigo-50">
      <TopNav onLogout={handleLogout} />
      <div className="flex">
        <Sidebar />
        <div className="flex-1 p-8">
          <DashboardStats
            totalStudents={totalStudents}
            presentToday={presentToday}
            pendingRequests={requests.length}
            attendanceRate={attendanceRate}
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <AttendanceTable records={records} />
            <RegistrationRequests requests={requests} approveRequest={approveRequest} rejectRequest={rejectRequest} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard ;
