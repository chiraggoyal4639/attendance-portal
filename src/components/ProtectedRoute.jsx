import { Navigate, Outlet } from "react-router-dom";

export function AdminRoute() {
  const user = JSON.parse(sessionStorage.getItem("user") || "{}");
  return user.role === "admin" ? <Outlet/> : <Navigate to="/" replace />;
}

export function StudentRoute() {
  const user = JSON.parse(sessionStorage.getItem("user") || "{}");
  return user.role === "student" ? <Outlet/> : <Navigate to="/" replace />;
}
