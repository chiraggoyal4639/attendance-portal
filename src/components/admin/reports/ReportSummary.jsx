import React from 'react';

const ReportSummary = ({ total, present, absent }) => (
  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
    <div className="bg-white rounded-xl shadow p-6 text-center">
      <p className="text-gray-500 mb-1">Total Students</p>
      <p className="text-2xl font-bold text-indigo-700">{total}</p>
    </div>
    <div className="bg-white rounded-xl shadow p-6 text-center">
      <p className="text-gray-500 mb-1">Present</p>
      <p className="text-2xl font-bold text-green-600">{present}</p>
    </div>
    <div className="bg-white rounded-xl shadow p-6 text-center">
      <p className="text-gray-500 mb-1">Absent</p>
      <p className="text-2xl font-bold text-red-600">{absent}</p>
    </div>
  </div>
);

export default ReportSummary;
