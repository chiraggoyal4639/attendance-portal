const SummaryCards = ({ totalDays, isMarkedToday, attendanceRate }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
      <div className="bg-indigo-100 rounded-lg p-6 text-center shadow-md">
        <p className="text-gray-700 font-semibold mb-2">Total Days Attended</p>
        <p className="text-3xl font-bold text-indigo-700">{totalDays}</p>
      </div>
      <div className="bg-green-100 rounded-lg p-6 text-center shadow-md">
        <p className="text-gray-700 font-semibold mb-2">Today's Status</p>
        <p
          className={`text-3xl font-bold ${
            isMarkedToday ? "text-green-700" : "text-red-600"
          }`}
        >
          {isMarkedToday ? "Present" : "Not Marked"}
        </p>
      </div>
      <div className="bg-yellow-100 rounded-lg p-6 text-center shadow-md">
        <p className="text-gray-700 font-semibold mb-2">30-Day Attendance</p>
        <p className="text-3xl font-bold text-yellow-700">{attendanceRate}%</p>
      </div>
    </div>
  );
};

export default SummaryCards;
