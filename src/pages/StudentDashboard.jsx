import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

// Components
import SummaryCards from "../components/student/SummaryCards";
import AttendanceButton from "../components/student/AttendanceButton";
import ProgressBar from "../components/student/ProgressBar";
import CalendarPanel from "../components/student/CalendarPanel";

const StudentDashboard = () => {
  const [user, setUser] = useState({ username: "Guest" });
  const [records, setRecords] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const today = new Date().toISOString().split("T")[0];

  const navigate = useNavigate();

  useEffect(() => {
    const sessionUser = JSON.parse(
      sessionStorage.getItem("user") || '{"username":"Guest"}'
    );
    const allUsers = JSON.parse(localStorage.getItem("users") || "[]");
    const userExists = allUsers.find((u) => u.username === sessionUser.username);
    if (!userExists || sessionUser.role !== "student") {
      toast.error("Access denied. Please login again.");
      sessionStorage.removeItem("user");
      navigate("/");
      return;
    }
    setUser(sessionUser);
    const data = JSON.parse(localStorage.getItem("attendanceData") || "[]");
    const userRecords = data.filter((r) => r.username === sessionUser.username);
    setRecords(userRecords);

  }, []);


  const handleMark = () => {
    const alreadyMarked = records.some((r) => r.date === today);
    if (alreadyMarked) {
      toast.error("You have already marked attendance today.");
      return;
    }

    const newRecord = { username: user.username, date: today };
    const updatedRecords = [...records, newRecord];
    setRecords(updatedRecords);

    const all = JSON.parse(localStorage.getItem("attendanceData") || "[]");
    localStorage.setItem("attendanceData", JSON.stringify([...all, newRecord]));

    toast.success("Attendance marked successfully!");
  };

  const getCalendarDays = () => {
    const days = [];
    const date = new Date(selectedYear, selectedMonth, 1);
    const month = date.getMonth();
    while (date.getMonth() === month) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return days;
  };

  const isPresent = (date) => {
    const d = date.toISOString().split("T")[0];
    return records.some((r) => r.date === d);
  };

  const isMarkedToday = records.some((r) => r.date === today);
  const recent30Days = Array.from({ length: 30 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - i);
    return date.toISOString().split("T")[0];
  });
  const recentPresent = records.filter((r) =>
    recent30Days.includes(r.date)
  ).length;
  const attendanceRate = Math.round((recentPresent / 30) * 100);

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-6 relative overflow-hidden">
      <div
        className={`max-w-4xl mx-auto bg-white p-10 rounded-xl shadow-lg transition-transform duration-500 ${
          showHistory ? "translate-x-[-180px] scale-95 blur-sm" : ""
        }`}
      >
        <h1 className="text-4xl font-extrabold text-indigo-800 mb-8 text-center">
          Welcome, <span className="text-indigo-600">{user.username}</span>
        </h1>

        <SummaryCards
          totalDays={records.length}
          isMarkedToday={isMarkedToday}
          attendanceRate={attendanceRate}
        />

        <ProgressBar percentage={attendanceRate} />

        <AttendanceButton
          isMarkedToday={isMarkedToday}
          handleMark={handleMark}
        />

        <div className="text-center">
          <button
            onClick={() => setShowHistory(!showHistory)}
            className="text-indigo-600 hover:underline font-semibold"
          >
            {showHistory ? "Close Calendar View" : "Open Calendar History"}
          </button>
        </div>
      </div>

      <CalendarPanel
        showHistory={showHistory}
        setShowHistory={setShowHistory}
        selectedMonth={selectedMonth}
        setSelectedMonth={setSelectedMonth}
        selectedYear={selectedYear}
        setSelectedYear={setSelectedYear}
        getCalendarDays={getCalendarDays}
        isPresent={isPresent}
        today={today}
      />
    </div>
  );
};

export default StudentDashboard;
