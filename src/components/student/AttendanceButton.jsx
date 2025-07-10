// 📁 components/student/AttendanceButton.jsx
const AttendanceButton = ({ isMarkedToday, handleMark }) => {
  return (
    <div className="text-center mb-8">
      <button
        onClick={handleMark}
        disabled={isMarkedToday}
        className={`px-8 py-3 rounded-lg text-white text-lg font-semibold shadow transition ${
          isMarkedToday
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-green-600 hover:bg-green-700"
        }`}
      >
        📅 Mark Attendance
      </button>
    </div>
  );
};

export default AttendanceButton;
