import { useNavigate } from "react-router-dom";
import { Navbar } from "../../components/Navbar";
import { ProgressBar } from "../../components/ProgressBar";
import { SkillBadge } from "../../components/SkillBadge";
import { StatCard } from "../../components/StatCard";
import { ArrowRight, TrendingUp, CheckCircle2, AlertCircle, Target } from "lucide-react";
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

export function StudentSkillAnalysis() {
  const navigate = useNavigate();

  const radarData = [
    { skill: "Frontend", value: 85, fullMark: 100 },
    { skill: "Backend", value: 65, fullMark: 100 },
    { skill: "Database", value: 70, fullMark: 100 },
    { skill: "DevOps", value: 45, fullMark: 100 },
    { skill: "Cloud", value: 50, fullMark: 100 },
    { skill: "Testing", value: 60, fullMark: 100 },
  ];

  const skillLevelData = [
    { name: "React", level: 85, category: "strong" },
    { name: "TypeScript", level: 80, category: "strong" },
    { name: "Node.js", level: 70, category: "moderate" },
    { name: "Python", level: 65, category: "moderate" },
    { name: "SQL", level: 60, category: "moderate" },
    { name: "Docker", level: 45, category: "weak" },
    { name: "AWS", level: 40, category: "weak" },
    { name: "Kubernetes", level: 30, category: "weak" },
  ];

  const strongSkills = skillLevelData.filter(s => s.category === "strong");
  const weakSkills = skillLevelData.filter(s => s.category === "weak");

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar role="student" userName="John Doe" />

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Skill Analysis Report</h1>
          <p className="text-gray-600">AI-powered insights into your technical abilities and market readiness</p>
        </div>

        {/* Market Readiness Score */}
        <div className="mb-8">
          <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
            <div className="flex items-start justify-between mb-6">
              <div>
                <p className="text-blue-100 mb-2">Overall Market Readiness Score</p>
                <h2 className="text-6xl font-bold mb-4">78%</h2>
                <p className="text-blue-100">You're competitive for mid-level positions</p>
              </div>
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <Target className="w-8 h-8" />
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <p className="text-sm text-blue-100 mb-1">Hard Skills</p>
                <p className="text-2xl font-bold">82%</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <p className="text-sm text-blue-100 mb-1">Soft Skills</p>
                <p className="text-2xl font-bold">75%</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <p className="text-sm text-blue-100 mb-1">Experience</p>
                <p className="text-2xl font-bold">70%</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <p className="text-sm text-blue-100 mb-1">Demand Align</p>
                <p className="text-2xl font-bold">85%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <StatCard
            title="Strong Skills"
            value={strongSkills.length}
            icon={CheckCircle2}
            iconColor="bg-green-100 text-green-600"
            trend={{ value: 12, label: "from last month" }}
          />
          <StatCard
            title="Skills to Improve"
            value={weakSkills.length}
            icon={AlertCircle}
            iconColor="bg-orange-100 text-orange-600"
          />
          <StatCard
            title="Job Matches Found"
            value={24}
            icon={TrendingUp}
            iconColor="bg-blue-100 text-blue-600"
            trend={{ value: 8, label: "new this week" }}
          />
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Radar Chart */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Skill Category Breakdown</h2>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={radarData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="skill" />
                <PolarRadiusAxis angle={90} domain={[0, 100]} />
                <Radar
                  name="Your Skills"
                  dataKey="value"
                  stroke="#3b82f6"
                  fill="#3b82f6"
                  fillOpacity={0.6}
                />
              </RadarChart>
            </ResponsiveContainer>
            <p className="text-sm text-gray-600 mt-4 text-center">
              Your strongest area is Frontend (85%), focus on improving DevOps skills
            </p>
          </div>

          {/* Bar Chart */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Individual Skill Levels</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={skillLevelData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Bar dataKey="level" fill="#8b5cf6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Strong Skills */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <CheckCircle2 className="w-6 h-6 text-green-600" />
            <h2 className="text-xl font-semibold text-gray-900">Strong Skills</h2>
          </div>
          <div className="space-y-4">
            {strongSkills.map((skill) => (
              <div key={skill.name}>
                <div className="flex items-center justify-between mb-2">
                  <SkillBadge skill={skill.name} variant="strong" />
                  <span className="text-sm font-semibold text-green-700">{skill.level}%</span>
                </div>
                <ProgressBar value={skill.level} color="green" showLabel={false} />
              </div>
            ))}
          </div>
        </div>

        {/* Weak Skills */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <AlertCircle className="w-6 h-6 text-orange-600" />
            <h2 className="text-xl font-semibold text-gray-900">Skills That Need Improvement</h2>
          </div>
          <div className="space-y-4">
            {weakSkills.map((skill) => (
              <div key={skill.name}>
                <div className="flex items-center justify-between mb-2">
                  <SkillBadge skill={skill.name} variant="weak" />
                  <span className="text-sm font-semibold text-orange-700">{skill.level}%</span>
                </div>
                <ProgressBar value={skill.level} color="orange" showLabel={false} />
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4">
          <button
            onClick={() => navigate("/student/profile")}
            className="px-6 py-3 text-gray-600 hover:text-gray-900 font-medium"
          >
            Back to Profile
          </button>
          <button
            onClick={() => navigate("/student/job-match")}
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all flex items-center gap-2"
          >
            View Job Matches
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
