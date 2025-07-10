const stats = [
  {
    label: "Total Students",
    value: "245",
    color: "text-gray-900",
    bg: "bg-blue-100",
    icon: "👥",
  },
  {
    label: "Present Today",
    value: "records.length",
    color: "text-green-600",
    bg: "bg-green-100",
    icon: "✅",
  },
  {
    label: "Pending Requests",
    value: "requests.length",
    color: "text-orange-600",
    bg: "bg-orange-100",
    icon: "📨",
  },
  {
    label: "Attendance Rate",
    value: "89%",
    color: "text-blue-600",
    bg: "bg-blue-100",
    icon: "📊",
  },
];

const DashboardStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{stat.label}</p>
              <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
            </div>
            <div className={`p-3 rounded-full ${stat.bg}`}>
              <span className="text-xl">{stat.icon}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardStats;