import { Outlet, NavLink } from "react-router-dom";

export const EmployerLayout = () => {
  return (
    <div>
      {/* <h2>Employer Panel</h2>

      <nav>
        <NavLink to="/employer">Dashboard</NavLink> |{" "}
        <NavLink to="/employer/create-job">Create Job</NavLink> |{" "}
        <NavLink to="/employer/candidates">Candidates</NavLink>
      </nav>

      <hr /> */}

      <Outlet />
    </div>
  );
};