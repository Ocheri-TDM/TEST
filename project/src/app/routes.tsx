import { createBrowserRouter } from "react-router-dom";
import { Landing } from "./pages/Landing";

import { StudentLayout } from "../layouts/StudentLayout";
import { EmployerLayout } from "../layouts/EmployerLayout";

import { StudentDashboard } from "./pages/student/StudentDashboard";
import { Register } from "./pages/auth/Register";
import { StudentSkillAnalysis } from "./pages/student/StudentSkillAnalysis";
import { StudentJobMatch } from "./pages/student/StudentJobMatch";
import { StudentSkillGap } from "./pages/student/StudentSkillGap";
import { StudentGrowthSimulator } from "./pages/student/StudentGrowthSimulator";
import { StudentActionPlan } from "./pages/student/StudentActionPlan";
import { StudentSkillTest } from "./pages/student/StudentSkillTest";

import { EmployerDashboard } from "./pages/employer/EmployerDashboard";
import { EmployerCreateJob } from "./pages/employer/EmployerCreateJob";
import { EmployerCandidates } from "./pages/employer/EmployerCandidates";
import { EmployerAnalytics } from "./pages/employer/EmployerAnalytics";

import { RoleGuard } from "./components/RoleGuard";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },

  // Registration page — без RoleGuard
  {
    path: "/register",
    element: <Register />,
  },

  // Страницы студента, требующие авторизации
  {
    path: "/student",
    element: (
      <RoleGuard allowedRole="student">
        <StudentLayout />
      </RoleGuard>
    ),
    children: [
      { index: true, element: <StudentDashboard /> },
      { path: "skill-analysis", element: <StudentSkillAnalysis /> },
      { path: "job-match", element: <StudentJobMatch /> },
      { path: "skill-gap", element: <StudentSkillGap /> },
      { path: "growth-simulator", element: <StudentGrowthSimulator /> },
      { path: "action-plan", element: <StudentActionPlan /> },
      { path: "skill-test/:postingId", element: <StudentSkillTest /> },
    ],
  },

  // Страницы работодателя
  {
    path: "/employer",
    element: (
      <RoleGuard allowedRole="employer">
        <EmployerLayout />
      </RoleGuard>
    ),
    children: [
      { index: true, element: <EmployerDashboard /> },
      { path: "create-job", element: <EmployerCreateJob /> },
      { path: "candidates", element: <EmployerCandidates /> },
      { path: "analytics", element: <EmployerAnalytics /> },
    ],
  },
]);