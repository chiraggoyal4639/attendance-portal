import React from "react";

const UsersTable = ({ users, attendance, onDelete }) => {
  const last30 = Array.from({ length: 30 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - i);
    return d.toISOString().split("T")[0];
  });

  const countLast30 = (username) =>
    attendance.filter((r) => r.username === username && last30.includes(r.date)).length;

  const students = users.filter((u) => u.role !== "admin");

  return (
    <div className="overflow-x-auto bg-white rounded-xl shadow p-6">
      <table className="w-full text-left">
        <thead className="bg-rose-700 text-white font-medium text-lg">
          <tr>
            <th className="p-3 border-b">#</th>
            <th className="p-3 border-b">Username</th>
            <th className="p-3 border-b">Role</th>
            <th className="p-3 border-b">Last 30 Days</th>
            <th className="p-3 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.length > 0 ? (
            students.map((u, i) => (
              <tr key={u.username} className="hover:bg-gray-50">
                <td className="p-3 border-b">{i + 1}</td>
                <td className="p-3 border-b">{u.username}</td>
                <td className="p-3 border-b capitalize">{u.role}</td>
                <td className="p-3 border-b">{countLast30(u.username)}</td>
                <td className="p-3 border-b">
                  <button
                    onClick={() => onDelete(u.username)}
                    className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-md text-sm transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="p-6 text-center text-gray-500">
                No users found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;
