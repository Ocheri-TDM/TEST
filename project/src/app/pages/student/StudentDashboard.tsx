import { useNavigate } from "react-router-dom";
import { Navbar } from "../../components/Navbar";
import { StatCard } from "../../components/StatCard";
import { ProgressBar } from "../../components/ProgressBar";
import { SkillBadge } from "../../components/SkillBadge";
import {
  User,
  Target,
  Briefcase,
  TrendingUp,
  CheckCircle2,
  ArrowRight,
  Award,
  BookOpen,
  Code,
  MessageSquare,
} from "lucide-react";

export function StudentDashboard() {
  const navigate = useNavigate();

  const recentJobs = [
    { title: "Senior Frontend Developer", company: "TechCorp Inc.", match: 92 },
    { title: "Junior Full Stack Developer", company: "Growth Tech", match: 94 },
    { title: "React Developer", company: "DigitalAgency", match: 88 },
  ];

  const topSkills = [
    { name: "React", level: 85 },
    { name: "TypeScript", level: 80 },
    { name: "Node.js", level: 70 },
  ];

  const recentActivity = [
    { action: "Completed AWS Course", time: "2 days ago", type: "course" },
    { action: "Built Serverless Project", time: "1 week ago", type: "project" },
    { action: "Applied to 3 jobs", time: "3 days ago", type: "job" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar role="student" userName="John Doe" />

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome back, John! 👋</h1>
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
              <p className="text-2xl font-bold">12</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <p className="text-sm text-blue-100 mb-1">Job Matches</p>
              <p className="text-2xl font-bold">24</p>
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
            value="83%"
            icon={TrendingUp}
            iconColor="bg-green-100 text-green-600"
            trend={{ value: 12, label: "from last month" }}
          />
          <StatCard
            title="Active Applications"
            value={7}
            icon={Briefcase}
            iconColor="bg-purple-100 text-purple-600"
          />
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          {/* Quick Actions */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
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
                {recentJobs.map((job, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">{job.title}</h3>
                      <p className="text-sm text-gray-600">{job.company}</p>
                    </div>
                    <div className="text-right ml-4">
                      <p className="text-2xl font-bold text-green-600">{job.match}%</p>
                      <p className="text-xs text-gray-600">Match</p>
                    </div>
                  </div>
                ))}
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
                  <div key={skill.name}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-gray-900">{skill.name}</span>
                      <span className="text-sm font-semibold text-blue-600">{skill.level}%</span>
                    </div>
                    <ProgressBar value={skill.level} color="blue" showLabel={false} />
                  </div>
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
              <div className="space-y-4">
                {recentActivity.map((activity, idx) => {
                  const icon = activity.type === "course" ? BookOpen : activity.type === "project" ? Code : Briefcase;
                  const Icon = icon;
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
                  <span>Apply to 3 matched jobs</span>
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
