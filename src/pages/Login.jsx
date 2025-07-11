import { useState } from "react";
import { toast } from "react-hot-toast";
import { FiEye, FiEyeOff } from "react-icons/fi";
import PasswordInput from "../components/shared/PasswordInput.jsx";

const LoginModal = () => {
  const [mode, setMode] = useState("login");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    if (mode === "login") {
      const users = JSON.parse(localStorage.getItem("users")) || [{ username: "admin", password: "admin123", role: "admin" }];
      const user = users.find(
        (u) => u.username === username && u.password === password
      );
      if (!user) {
        toast.error("Invalid credentials");
        return;
      }
      sessionStorage.setItem("user", JSON.stringify(user));
      toast.success("Login successful!");

      if (user.role === "admin") {
        window.location.href = "/admin";
      } else {
        window.location.href = "/student";
      }
    } else {
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const existingRequests = JSON.parse(localStorage.getItem("regRequests") || "[]");

      // Check if already approved
      const userExists = users.some((u) => u.username === username);
      if (userExists) {
        toast.error("Username already exists or has already been approved.");
        return;
      }

      // Check if a request from the same username already exists
      const duplicatePending = existingRequests.some((r) => r.username === username);
      if (duplicatePending) {
        toast.error("A request with this username is already pending.");
        return;
      }

      // If passed all checks, push the new request
      existingRequests.push({ name, username, password, date: new Date().toISOString() });
      localStorage.setItem("regRequests", JSON.stringify(existingRequests));
      toast.success("Request sent! Admin will review your registration.", { duration: 2500 });
      setMode("login");
    }
  };

  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <form
        onSubmit={onSubmit}
        onClick={(e) => e.stopPropagation()}
        className="relative z-40 flex flex-col gap-5 bg-white p-8 sm:p-10 rounded-xl shadow-xl w-[70%] max-w-md "
      >
        {/* Title */}
        <h2 className="text-2xl font-bold text-center pb-3 text-purple-900">
          {mode === "login" ? (
            <>
              <span className="underline text-indigo-600">Student</span> Login
            </>
          ) : (
            <>
              <span className="underline text-indigo-600">Request</span> Access
            </>
          )}
        </h2>


        {/* Register only: Name */}
        {mode === "register" && (
          <div>
            <label className="block mb-1 text-[20px] font-medium text-gray-700 text-left pt-2.5 pb-1">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Gaurav Sharma"
              className="w-full border border-gray-300 bg-white text-gray-800 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        )}

        {/* Username */}
        <div>
          <label className="block mb-1 text-[20px] font-medium text-gray-700 text-left pt-2.5 pb-1">
            Username
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            className="w-full border border-gray-300 bg-white text-gray-800 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Password */}
        <PasswordInput label="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>


        {/* Toggle Login/Register */}
        <p className="text-sm text-center text-gray-600">
          {mode === "login" ? (
            <>
              Not registered?{" "}
              <span
                onClick={() => setMode("register")}
                className="text-blue-600 cursor-pointer hover:underline"
              >
                Request Access
              </span>
            </>
          ) : (
            <>
              Already have access?{" "}
              <span
                onClick={() => setMode("login")}
                className="text-blue-600 cursor-pointer hover:underline"
              >
                Login Here
              </span>
            </>
          )}
        </p>

        {/* Submit Button */}
        <button
          type="submit"
          className="mt-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-purple-500 hover:to-blue-500 text-white py-2 rounded-lg font-semibold shadow-md transition-all duration-300 ease-in-out transform hover:scale-[1.03]"
          >
          {mode === "login" ? "Log In" : "Send Request"}
        </button>

      </form>
    </div>
  );
};

export default LoginModal;
