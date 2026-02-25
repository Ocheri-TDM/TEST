import { useNavigate } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import { Navbar } from "../../components/Navbar";
import { StatCard } from "../../components/StatCard";
import { TrendingUp, Users, Briefcase, Target, ArrowLeft } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

interface Candidate {
  id: number;
  matchPercentage: number;
  experienceLevel: string;
  matchingSkills: string[];
  missingSkills: string[];
}

export function EmployerAnalytics() {
  const navigate = useNavigate();

  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          "https://19e71b04da22e75b.mokky.dev/post-candidat"
        );
        const data = await res.json();
        setCandidates(data);
      } catch (err) {
        console.error("Failed to fetch analytics data", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  /* ===============================
     📊 DYNAMIC CALCULATIONS
  =============================== */

  const totalCandidates = candidates.length;

  const avgMatchRate =
    totalCandidates > 0
      ? Math.round(
          candidates.reduce((acc, c) => acc + c.matchPercentage, 0) /
            totalCandidates
        )
      : 0;

  const interviewRate =
    totalCandidates > 0
      ? Math.round(
          (candidates.filter((c) => c.matchPercentage >= 80).length /
            totalCandidates) *
            100
        )
      : 0;

  /* ---------- Experience Distribution ---------- */

  const experienceLevelData = useMemo(() => {
    const levels: Record<string, number> = {};

    candidates.forEach((c) => {
      levels[c.experienceLevel] =
        (levels[c.experienceLevel] || 0) + 1;
    });

    return Object.entries(levels).map(([name, value]) => ({
      name,
      value: Math.round((value / totalCandidates) * 100),
      color:
        name === "Senior"
          ? "#10b981"
          : name === "Mid Level"
          ? "#8b5cf6"
          : "#60a5fa",
    }));
  }, [candidates, totalCandidates]);

  /* ---------- Match Distribution ---------- */

  const matchDistributionData = useMemo(() => {
    const ranges = {
      "90-100%": 0,
      "80-89%": 0,
      "70-79%": 0,
      "60-69%": 0,
      "Below 60%": 0,
    };

    candidates.forEach((c) => {
      if (c.matchPercentage >= 90) ranges["90-100%"]++;
      else if (c.matchPercentage >= 80) ranges["80-89%"]++;
      else if (c.matchPercentage >= 70) ranges["70-79%"]++;
      else if (c.matchPercentage >= 60) ranges["60-69%"]++;
      else ranges["Below 60%"]++;
    });

    return Object.entries(ranges).map(([range, count]) => ({
      range,
      candidates: count,
    }));
  }, [candidates]);

  /* ---------- Skills Demand vs Supply ---------- */

  const topSkillsData = useMemo(() => {
    const supply: Record<string, number> = {};
    const demand: Record<string, number> = {};

    candidates.forEach((c) => {
      c.matchingSkills?.forEach((skill) => {
        supply[skill] = (supply[skill] || 0) + 1;
      });

      c.missingSkills?.forEach((skill) => {
        demand[skill] = (demand[skill] || 0) + 1;
      });
    });

    const allSkills = new Set([
      ...Object.keys(supply),
      ...Object.keys(demand),
    ]);

    return Array.from(allSkills).map((skill) => ({
      skill,
      supply: supply[skill] || 0,
      demand: demand[skill] || 0,
    }));
  }, [candidates]);

  /* ---------- Biggest Skill Gaps ---------- */

  const skillGapData = useMemo(() => {
    return topSkillsData
      .map((s) => ({
        name: s.skill,
        gap: (s.demand || 0) - (s.supply || 0),
      }))
      .filter((s) => s.gap > 0)
      .sort((a, b) => b.gap - a.gap)
      .slice(0, 5);
  }, [topSkillsData]);

  if (loading) return <div>Loading analytics...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar role="employer" userName="TechCorp Inc." />

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-8">
          <button
            onClick={() => navigate("/employer")}
            className="flex items-center gap-2 text-purple-600 font-medium mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </button>

          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Analytics & Insights
          </h1>
          <p className="text-gray-600">
            Real-time candidate pool analysis
          </p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Candidates"
            value={totalCandidates}
            icon={Users}
            iconColor="bg-blue-100 text-blue-600"
          />
          <StatCard
            title="Active Postings"
            value={1}
            icon={Briefcase}
            iconColor="bg-purple-100 text-purple-600"
          />
          <StatCard
            title="Avg Match Rate"
            value={`${avgMatchRate}%`}
            icon={Target}
            iconColor="bg-green-100 text-green-600"
          />
          <StatCard
            title="Interview Rate"
            value={`${interviewRate}%`}
            icon={TrendingUp}
            iconColor="bg-orange-100 text-orange-600"
          />
        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Demand vs Supply */}
          <div className="bg-white rounded-xl border p-6">
            <h2 className="text-xl font-semibold mb-6">
              Top Skills: Demand vs Supply
            </h2>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={topSkillsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="skill" angle={-45} textAnchor="end" height={80} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="demand" fill="#8b5cf6" name="Demand" />
                <Bar dataKey="supply" fill="#10b981" name="Supply" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Experience */}
          <div className="bg-white rounded-xl border p-6">
            <h2 className="text-xl font-semibold mb-6">
              Candidate Pool by Experience
            </h2>
            <ResponsiveContainer width="100%" height={350}>
              <PieChart>
                <Pie
                  data={experienceLevelData}
                  dataKey="value"
                  outerRadius={120}
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {experienceLevelData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Skill Gaps */}
          <div className="bg-white rounded-xl border p-6">
            <h2 className="text-xl font-semibold mb-6">
              Biggest Skill Gaps
            </h2>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={skillGapData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={100} />
                <Tooltip />
                <Bar dataKey="gap" fill="#ef4444" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Match Distribution */}
          <div className="bg-white rounded-xl border p-6">
            <h2 className="text-xl font-semibold mb-6">
              Candidate Match Distribution
            </h2>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={matchDistributionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="range" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="candidates" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}