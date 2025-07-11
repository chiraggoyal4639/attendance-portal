---
title: "Attendance Portal"
description: "A simple React-based student attendance management system with admin controls, calendar history, and data persistence."
features:
  - Admin Panel for user management and reports
  - Student attendance marking with calendar history
  - Data persistence via localStorage/sessionStorage
  - Password-protected login with role-based routing
  - Approve/reject access requests
  - Export reports as CSV
tech_stack:
  frontend: [React, TailwindCSS]
  tools: [React Router, React Hot Toast, React Icons]
default_admin:
  username: "admin"
  password: "admin123"
routes:
  login: "/"
  admin_dashboard: "/admin"
  student_dashboard: "/student"
  admin_reports: "/admin/reports"
  admin_users: "/admin/users"
  admin_settings: "/admin/settings"
how_to_run:
  - git clone https://github.com/chiraggoyal4639/attendance-portal.git
  - cd attendance-portal
  - npm install
  - npm run dev
  - visit http://localhost:5173
authentication:
  method: "localStorage for data, sessionStorage for sessions"
  roles:
    - admin
    - student
  redirect:
    admin: "/admin"
    student: "/student"
data:
  - users: localStorage
  - attendanceData: localStorage
  - regRequests: localStorage
  - session: sessionStorage
access_request:
  user: "Requests access from login page"
  admin: "Approves or rejects on dashboard"
contact:
  email: "chiraggoyal4639@gmail.com"
...
