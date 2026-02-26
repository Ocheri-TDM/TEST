import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../../components/Navbar";
import { ProgressBar } from "../../components/ProgressBar";
import { SkillBadge } from "../../components/SkillBadge";
import { StatCard } from "../../components/StatCard";
import { ArrowRight, TrendingUp, CheckCircle2, AlertCircle, Target } from "lucide-react";
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface CandidateAttempt {
  studentId: number;
  jobId: number;
  MatchingSkills: string;
  MissingSkills: string;
  matchPercentage: number;
  id: number;
}

interface SkillLevel {
  name: string;
  level: number;
  category: "strong" | "moderate" | "weak";
}

export function StudentSkillAnalysis() {
  const navigate = useNavigate();
  const [attempts, setAttempts] = useState<CandidateAttempt[]>([]);
  const [strongSkills, setStrongSkills] = useState<SkillLevel[]>([]);
  const [weakSkills, setWeakSkills] = useState<SkillLevel[]>([]);
  const [radarData, setRadarData] = useState<any[]>([]);
  const [skillLevelData, setSkillLevelData] = useState<SkillLevel[]>([]);
  const [loading, setLoading] = useState(true);

  const studentId = 1; // текущий пользователь

  useEffect(() => {
    const fetchAttempts = async () => {
      try {
        const res = await fetch("https://19e71b04da22e75b.mokky.dev/post-candidate");
        const data: CandidateAttempt[] = await res.json();

        const userAttempts = data.filter(a => a.studentId === studentId);
        setAttempts(userAttempts);

        const skillMap: Record<string, { matched: number; total: number }> = {};

        userAttempts.forEach(a => {
          const matched = a.MatchingSkills ? a.MatchingSkills.split(",").map(s => s.trim()) : [];
          const missing = a.MissingSkills ? a.MissingSkills.split(",").map(s => s.trim()) : [];

          matched.forEach(skill => {
            if (!skillMap[skill]) skillMap[skill] = { matched: 0, total: 0 };
            skillMap[skill].matched += 1;
            skillMap[skill].total += 1;
          });

          missing.forEach(skill => {
            if (!skillMap[skill]) skillMap[skill] = { matched: 0, total: 0 };
            skillMap[skill].total += 1; // total увеличиваем, matched остаётся 0
          });
        });

        // создаём уровни
        const levels: SkillLevel[] = Object.entries(skillMap).map(([name, val]) => {
          const level = Math.round((val.matched / val.total) * 100);
          let category: SkillLevel["category"];
          if (level >= 80) category = "strong";
          else if (level >= 50) category = "moderate";
          else category = "weak";
          return { name, level, category };
        });

        setSkillLevelData(levels);
        setStrongSkills(levels.filter(s => s.category === "strong"));
        setWeakSkills(levels.filter(s => s.category === "weak"));

        // Пример radarData по категориям навыков
        const categoryMap: Record<string, { sum: number; count: number }> = {};
        levels.forEach(s => {
          let cat = "Other";
          if (/React|HTML|CSS|TypeScript|JS/i.test(s.name)) cat = "Frontend";
          else if (/Node|Python|Java/i.test(s.name)) cat = "Backend";
          else if (/SQL|Mongo|Database/i.test(s.name)) cat = "Database";
          else if (/Docker|Kubernetes|DevOps/i.test(s.name)) cat = "DevOps";

          if (!categoryMap[cat]) categoryMap[cat] = { sum: 0, count: 0 };
          categoryMap[cat].sum += s.level;
          categoryMap[cat].count += 1;
        });

        const radar = Object.entries(categoryMap).map(([skill, val]) => ({
          skill,
          value: Math.round(val.sum / val.count),
          fullMark: 100,
        }));
        setRadarData(radar);

      } catch (err) {
        console.error("Failed to load attempts", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAttempts();
  }, []);

  if (loading) return <div>Loading skill analysis...</div>;

  // Market Readiness Score — пример на основе существующих strong/weak skills
  const hardSkillsScore = strongSkills.length > 0 ? 80 : 60;
  const softSkillsScore = 75; // можно заменить на реальные данные
  const experienceScore = 70; // можно заменить на реальные данные
  const demandAlignScore = strongSkills.length + weakSkills.length > 0 ? 85 : 65;

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
                <h2 className="text-6xl font-bold mb-4">{Math.round((hardSkillsScore + softSkillsScore + experienceScore + demandAlignScore) / 4)}%</h2>
                <p className="text-blue-100">You're competitive for mid-level positions</p>
              </div>
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <Target className="w-8 h-8" />
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <p className="text-sm text-blue-100 mb-1">Hard Skills</p>
                <p className="text-2xl font-bold">{hardSkillsScore}%</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <p className="text-sm text-blue-100 mb-1">Soft Skills</p>
                <p className="text-2xl font-bold">{softSkillsScore}%</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <p className="text-sm text-blue-100 mb-1">Experience</p>
                <p className="text-2xl font-bold">{experienceScore}%</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <p className="text-sm text-blue-100 mb-1">Demand Align</p>
                <p className="text-2xl font-bold">{demandAlignScore}%</p>
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
          />
          <StatCard
            title="Skills to Improve"
            value={weakSkills.length}
            icon={AlertCircle}
            iconColor="bg-orange-100 text-orange-600"
          />
          <StatCard
            title="Job Matches Found"
            value={attempts.length}
            icon={TrendingUp}
            iconColor="bg-blue-100 text-blue-600"
          />
        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
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
          </div>

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
            {strongSkills.map(skill => (
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
            {weakSkills.map(skill => (
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
            onClick={() => navigate("/student")}
            className="px-6 py-3 text-gray-600 hover:text-gray-900 font-medium"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}