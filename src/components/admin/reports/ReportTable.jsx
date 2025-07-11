import React from 'react';

const ReportTable = ({ rows, selectedDate }) => (
  <div className="bg-white rounded-xl shadow overflow-x-auto">
    <table className="w-full text-left min-w-max">
      <thead className="bg-rose-700 text-white font-[400] text-[21px]">
        <tr>
          <th className="p-3">#</th>
          <th className="p-3">Student</th>
          <th className="p-3">Status</th>
        </tr>
      </thead>
      <tbody>
        {rows.length > 0 ? (
          rows.map((row, i) => (
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
);

export default ReportTable;
