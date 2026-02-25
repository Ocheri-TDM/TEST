import { Outlet, NavLink } from "react-router-dom";

export const StudentLayout = () => {
  return (
    <div>
      <h2>Student Panel</h2>

      <nav>
        <NavLink to="/student">Dashboard</NavLink> |{" "}
        <NavLink to="/student/profile">Profile</NavLink> |{" "}
        <NavLink to="/student/job-match">Job Match</NavLink>
      </nav>

      <hr />

      <Outlet />
    </div>
  );
};