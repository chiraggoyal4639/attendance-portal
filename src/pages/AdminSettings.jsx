import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import TopNav from "../components/admin/TopNav";
import Sidebar from "../components/admin/sideBar";
import PasswordInput from "../components/shared/PasswordInput"; // ✅ Import here

export default function AdminSettings() {
  const navigate = useNavigate();
  const [adminProfile, setAdminProfile] = useState({ username: "", password: "" });
  const [newUser, setNewUser] = useState({ username: "", password: "", role: "student" });

  useEffect(() => {
    const sessionUser = JSON.parse(sessionStorage.getItem("user") || "{}");
    if (!sessionUser || sessionUser.role !== "admin") {
      toast.error("Access denied. Please login again.");
      sessionStorage.removeItem("user");
      navigate("/");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const matchedAdmin = users.find(
      (u) => u.username === sessionUser.username && u.role === "admin"
    );

    if (matchedAdmin) {
      setAdminProfile({ username: matchedAdmin.username, password: matchedAdmin.password });
    }
  }, []);

  const handleProfileSave = () => {
    const sessionUser = JSON.parse(sessionStorage.getItem("user") || "{}");
    const users = JSON.parse(localStorage.getItem("users") || "[]");

    const updatedUsers = users.map((u) =>
      u.username === sessionUser.username && u.role === "admin"
        ? { ...u, username: adminProfile.username, password: adminProfile.password }
        : u
    );

    localStorage.setItem("users", JSON.stringify(updatedUsers));
    sessionStorage.setItem(
      "user",
      JSON.stringify({
        username: adminProfile.username,
        password: adminProfile.password,
        role: "admin",
      })
    );

    toast.success("Your admin credentials have been updated.");
  };

  const handleAddUser = () => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");

    if (!newUser.username || !newUser.password) {
      toast.error("Username and password are required.");
      return;
    }

    if (users.find((u) => u.username === newUser.username)) {
      toast.error("Username already exists.");
      return;
    }

    const updatedUsers = [...users, newUser];
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    toast.success(`User ${newUser.username} added as ${newUser.role}.`);

    setNewUser({ username: "", password: "", role: "student" });
  };

  return (
    <div className="min-h-screen bg-indigo-50">
      <TopNav />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-8">
          <h2 className="text-3xl font-bold text-rose-700 mb-8">Admin Settings</h2>

          {/* Update Admin Credentials */}
          <section className="bg-white p-6 rounded-lg shadow mb-10">
            <h3 className="text-xl font-[600] text-indigo-600 mb-4 text-[23px] pb-4">
              Update Your Credentials
            </h3>
            <div className="relative grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[20px] font-[600] text-gray-800 mb-1">Username</label>
                <input
                  type="text" placeholder="Enter your username"
                  value={adminProfile.username}
                  onChange={(e) =>
                    setAdminProfile({ ...adminProfile, username: e.target.value })
                  }
                  className="w-full border border-gray-300 px-4 py-2 rounded"
                />
              </div>
              <div>
                <PasswordInput
                  label="Password"
                  value={adminProfile.password}
                  onChange={(e) =>
                    setAdminProfile({ ...adminProfile, password: e.target.value })
                  }
                  className="absolute right-0 bottom-3.5 w-full"
                />
              </div>
            </div>
            <button
              onClick={handleProfileSave}
              className="mt-6 bg-green-600 text-[18px] text-white px-6 py-2 pb-2.5 rounded hover:bg-green-700 transition cursor-pointer"
            >
              Save Profile
            </button>
          </section>

          {/* Add New User Manually */}
          <section className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-[600] text-indigo-600 mb-4 text-[23px] pb-4">
              Add New User
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-[20px] font-[600] text-gray-800 mb-1">
                  Username
                </label>
                <input
                  type="text" placeholder="Enter username"
                  value={newUser.username}
                  onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                  className="w-full border border-gray-300 px-4 py-2 rounded"
                />
              </div>
              <div>
                <label className="block text-[20px] font-[600] text-gray-800 mb-1">
                  Password
                </label>
                <input
                  type="text" placeholder="Enter password"
                  value={newUser.password}
                  onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                  className="w-full border border-gray-300 px-4 py-2 rounded"
                />
              </div>
              <div>
                <label className="block text-[20px] font-[600] text-gray-800 mb-1">
                  Role
                </label>
                <select
                  value={newUser.role}
                  onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                  className="w-full border border-gray-300 px-4 py-2 rounded"
                >
                  <option value="student">Student</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
            </div>
            <button
              onClick={handleAddUser}
              className="mt-6 bg-green-600 text-[18px] text-white px-6 py-2 rounded hover:bg-green-700 transition cursor-pointer"
            >
              Add User
            </button>
          </section>


        </main>
      </div>
    </div>
  );
}
