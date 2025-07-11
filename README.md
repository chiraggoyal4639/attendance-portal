# Attendance Portal

> A React-based student attendance management system with role-based access, calendar view, and admin control panel.

---

## Table of Contents

- [Features](#features)  
- [Tech Stack](#tech-stack)  
- [Default Admin Credentials](#default-admin-credentials)  
- [Project Structure](#project-structure)  
- [Authentication & Authorization](#authentication----authorization)  
- [Data Storage](#data-storage)  
- [Access Request Flow](#access-request-flow)  
- [Getting Started](#getting-started)  
- [Contact](#contact)

---

## Features

- **Admin panel** with full control over users and attendance reports  
- **Student dashboard** with calendar-based attendance tracking  
- **Login-based authentication** with role-based redirection  
- **Access request approval** system by admin  
- **Persistent data** using `localStorage` and `sessionStorage`  
- **Export attendance reports** as downloadable CSV

---

## Tech Stack

- **Frontend:**  
  - React  
  - Tailwind CSS  
- **Libraries:**  
  - React Router  
  - React Hot Toast  
  - React Icons  

---

## Default Admin Credentials

- **Username:** `admin`  
- **Password:** `admin123`

> _Change these in production!_

---

### Routes

| Route               | Component            |
|---------------------|----------------------|
| `/`                 | Login                |
| `/admin`            | Admin Dashboard      |
| `/student`          | Student Dashboard    |
| `/admin/reports`    | Attendance Reports   |
| `/admin/users`      | User Management      |
| `/admin/settings`   | Admin Settings       |

---

## Authentication & Authorization

- **Method:**  
  - `localStorage` for persistent user and attendance data  
  - `sessionStorage` for active sessions  
- **Roles:**  
  - `admin`  
  - `student`  
- **Post-login Redirects:**  
  - Admin → `/admin`  
  - Student → `/student`

---

## Data Storage

| Data Type               | Storage          |
|-------------------------|------------------|
| Users                   | `localStorage`   |
| Attendance Records      | `localStorage`   |
| Registration Requests   | `localStorage`   |
| Current Session User    | `sessionStorage` |

---

## Access Request Flow

1. User submits a request via **Register** tab on the login page.  
2. Request shows up in the **Admin Dashboard**.  
3. Admin can **Approve** (adds to users) or **Reject** (removes from queue).  
4. Duplicate usernames are automatically rejected.

---

## Getting Started

1. **Clone the repo**  
   ```bash
   git clone https://github.com/chiraggoyal4639/attendance-portal.git
   cd attendance-portal

2. **Install dependencies**
   ```bash
   npm install

3. **Run in development**
   ```bash
   npm run dev

4. **Open in your browser**
   Visit: http://localhost:5173

## Contact
  - **Developer**: Chirag Goyal
  - **Email**: chiraggoyal4639@gmail.com
   
