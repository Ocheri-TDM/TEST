import { useNavigate } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import { Navbar } from "../../components/Navbar";
import { StatCard } from "../../components/StatCard";
import { ProgressBar } from "../../components/ProgressBar";
import {
  CheckCircle2,
  ArrowRight,
  BookOpen,
  Code,
  Briefcase,
  User,
  Award,
  Target,
  TrendingUp,
} from "lucide-react";

interface Student {
  id: number;
  name: string;
  email: string;
  github: string;
  portfolio: string;
  experience: string;
  techStack: string[];
  tests?: { name: string; score: number }[];
  appliedJobs?: { jobId: number; score: number }[];
  activities?: { action: string; type: string; time: string }[];
}

interface Job {
  id: number;
  jobTitle: string;
  description: string;
  location: string;
  jobType: string;
  experienceLevel: string;
  salaryMin: string;
  salaryMax: string;
  hardSkills: string[];
  softSkills: string[];
  postedBy: string;
  idEmployer: number;
}

export function StudentDashboard() {
  const navigate = useNavigate();
  const [student, setStudent] = useState<Student | null>(null);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    const token = localStorage.getItem("authToken");

    if (!email || !token) {
      navigate("/");
      return;
    }

    const fetchData = async () => {
      try {
        const [studentRes, jobsRes] = await Promise.all([
          fetch("https://19e71b04da22e75b.mokky.dev/students"),
          fetch("https://19e71b04da22e75b.mokky.dev/employer-posting"),
        ]);

        const studentsData: Student[] = await studentRes.json();
        const jobsData: Job[] = await jobsRes.json();

        const currentStudent = studentsData.find((s) => s.email === email);
        setStudent(currentStudent || null);
        setJobs(jobsData);
      } catch (err) {
        console.error("Student dashboard loading error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  if (loading) return <div>Loading dashboard...</div>;
  if (!student) return <div>No student data found.</div>;

  // ---------------------------
  // Dynamic Data
  // ---------------------------

  // Top Skills (tests)
  const topSkills = student.tests?.length
    ? student.tests.map((t) => ({ name: t.name, level: t.score }))
    : [{ name: "No completed tests", level: 0 }];

  // Top Job Matches (appliedJobs + score)
  const topJobMatches = student.appliedJobs
    ? student.appliedJobs
        .map((a) => {
          const job = jobs.find((j) => j.id === a.jobId);
          return job ? { ...job, matchPercentage: a.score } : null;
        })
        .filter(Boolean)
        .slice(0, 5)
    : [];

  // Average Match
  const averageMatch = topJobMatches.length
    ? Math.round(
        topJobMatches.reduce((acc, j) => acc + (j.matchPercentage || 0), 0) /
          topJobMatches.length
      )
    : 0;

  // Total jobs (applied)
  const totalJobs = student.appliedJobs?.length || 0;

  // Recent Activity
  const recentActivity = student.activities || [];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar role="student" userName={student.name} />

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Welcome back, {student.name.split(" ")[0]}! 👋
          </h1>
          <p className="text-blue-100 mb-6">
            Here's your career progress overview. Keep up the great work!
          </p>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <p className="text-sm text-blue-100 mb-1">Profile Complete</p>
              <p className="text-2xl font-bold">100%</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <p className="text-sm text-blue-100 mb-1">Skills Listed</p>
              <p className="text-2xl font-bold">{student.techStack.length}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <p className="text-sm text-blue-100 mb-1">Job Matches</p>
              <p className="text-2xl font-bold">{totalJobs}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <p className="text-sm text-blue-100 mb-1">Learning Items</p>
              <p className="text-2xl font-bold">8</p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <StatCard
            title="Market Readiness"
            value="78%"
            icon={Target}
            iconColor="bg-blue-100 text-blue-600"
            trend={{ value: 5, label: "from last week" }}
          />
          <StatCard
            title="Average Match"
            value={`${averageMatch}%`}
            icon={TrendingUp}
            iconColor="bg-green-100 text-green-600"
            trend={{ value: 12, label: "from last month" }}
          />
          <StatCard
            title="Active Applications"
            value={totalJobs}
            icon={Briefcase}
            iconColor="bg-purple-100 text-purple-600"
          />
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          {/* Quick Actions */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Quick Actions
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <button
                  onClick={() => navigate("/student/profile")}
                  className="flex items-center gap-4 p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors text-left"
                >
                  <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Edit Profile</h3>
                    <p className="text-sm text-gray-600">Update your information</p>
                  </div>
                </button>

                <button
                  onClick={() => navigate("/student/skill-analysis")}
                  className="flex items-center gap-4 p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors text-left"
                >
                  <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Skill Analysis</h3>
                    <p className="text-sm text-gray-600">View your assessment</p>
                  </div>
                </button>

                <button
                  onClick={() => navigate("/student/job-match")}
                  className="flex items-center gap-4 p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors text-left"
                >
                  <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Briefcase className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Browse Jobs</h3>
                    <p className="text-sm text-gray-600">Find your perfect match</p>
                  </div>
                </button>

                <button
                  onClick={() => navigate("/student/action-plan")}
                  className="flex items-center gap-4 p-4 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors text-left"
                >
                  <div className="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Action Plan</h3>
                    <p className="text-sm text-gray-600">View learning roadmap</p>
                  </div>
                </button>
              </div>
            </div>

            {/* Top Job Matches */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Top Job Matches</h2>
                <button
                  onClick={() => navigate("/student/job-match")}
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
                >
                  View All
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-4">
                {topJobMatches.length ? (
                  topJobMatches.map((job) => (
                    <div
                      key={job.id}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                    >
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">
                          {job.jobTitle}
                        </h3>
                        <p className="text-sm text-gray-600">{job.location}</p>
                      </div>
                      <div className="text-right ml-4">
                        <p className="text-2xl font-bold text-green-600">
                          {job.matchPercentage}%
                        </p>
                        <p className="text-xs text-gray-600">Match</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">No job matches yet.</p>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Top Skills */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Top Skills</h2>
              <div className="space-y-4">
                {topSkills.map((skill) => (
                  <ProgressBar
                    key={skill.name}
                    value={skill.level}
                    color="blue"
                    showLabel={true}
                    label={skill.name}
                  />
                ))}
              </div>
              <button
                onClick={() => navigate("/student/skill-gap")}
                className="w-full mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
              >
                View Skill Gaps
              </button>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
              {recentActivity.length ? (
                <div className="space-y-4">
                  {recentActivity.map((activity, idx) => {
                    const Icon =
                      activity.type === "course"
                        ? BookOpen
                        : activity.type === "project"
                        ? Code
                        : Briefcase;
                    return (
                      <div key={idx} className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Icon className="w-4 h-4 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                          <p className="text-xs text-gray-500">{activity.time}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-gray-500">No recent activity.</p>
              )}
            </div>

            {/* Next Steps */}
            <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-xl p-6 text-white">
              <h3 className="font-semibold mb-3">🎯 Next Steps</h3>
              <ul className="space-y-2 text-sm text-orange-50">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>Complete Growth Simulator</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>Take optional skill test</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>Apply to matched jobs</span>
                </li>
              </ul>
              <button
                onClick={() => navigate("/student/growth-simulator")}
                className="w-full mt-4 px-4 py-2 bg-white text-orange-600 rounded-lg hover:bg-orange-50 transition-colors text-sm font-medium"
              >
                Start Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}