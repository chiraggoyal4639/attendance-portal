import React from 'react';

const ReportFilters = ({ selectedDate, setSelectedDate, search, setSearch, statusFilter, setStatusFilter }) => (
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
);

export default ReportFilters;
