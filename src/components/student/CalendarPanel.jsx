// 📁 components/student/CalendarPanel.jsx
const CalendarPanel = ({
  showHistory,
  setShowHistory,
  selectedMonth,
  setSelectedMonth,
  selectedYear,
  setSelectedYear,
  getCalendarDays,
  isPresent,
  today,
}) => {
  const missedDays = getCalendarDays().filter(
    (day) =>
      !isPresent(day) &&
      day.toISOString().split("T")[0] <= today
  );

  return (
    <div
      className={`fixed top-0 right-0 h-full bg-white shadow-2xl border-l z-50 p-6 w-full md:w-[420px] transform transition-transform duration-500 ${
        showHistory ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-indigo-800">Attendance Calendar</h2>
        <button
          onClick={() => setShowHistory(false)}
          className="text-red-600 text-xl"
        >
          ✖
        </button>
      </div>

      {/* Dropdowns */}
      <div className="flex gap-3 mb-4">
        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(Number(e.target.value))}
          className="border px-3 py-1 rounded"
        >
          {[...Array(12)].map((_, i) => (
            <option key={i} value={i}>
              {new Date(0, i).toLocaleString("default", { month: "long" })}
            </option>
          ))}
        </select>
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(Number(e.target.value))}
          className="border px-3 py-1 rounded"
        >
          {[2023, 2024, 2025, 2026].map((year) => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
      </div>

      {/* Calendar */}
      <div className="grid grid-cols-7 gap-2 text-center text-sm mb-6">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div key={d} className="font-semibold text-gray-500">{d}</div>
        ))}
        {getCalendarDays().map((day) => {
          const dayStr = day.toISOString().split("T")[0];
          const isToday = dayStr === today;
          const isFuture = dayStr > today;
          const present = isPresent(day);

          let className = "p-2 rounded-lg ";

          if (isFuture) {
            className += "bg-white text-gray-400";
          } else if (isToday && present) {
            className += "bg-green-700 text-white font-semibold";
          } else if (isToday && !present) {
            className += "bg-red-600 text-white font-semibold";
          } else if (present) {
            className += "bg-green-500 text-white";
          } else {
            className += "bg-red-100 text-red-500";
          }

          return (
            <div key={dayStr} className={className}>
              {day.getDate()}
            </div>
          );
        })}
      </div>

      <div className="text-sm text-center text-red-600 font-medium">
        Missed Days This Month: {missedDays.length}
      </div>
    </div>
  );
};

export default CalendarPanel;
