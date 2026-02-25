import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../../components/Navbar";
import { ArrowRight, TrendingUp, Plus, X, Zap, Target } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface Skill {
  name: string;
  impact: number;
}

export function StudentGrowthSimulator() {
  const navigate = useNavigate();
  const [selectedSkills, setSelectedSkills] = useState<Skill[]>([]);
  const [currentMatch, setCurrentMatch] = useState(83);

  const availableSkills: Skill[] = [
    { name: "AWS", impact: 8 },
    { name: "Kubernetes", impact: 7 },
    { name: "Docker", impact: 6 },
    { name: "GraphQL", impact: 5 },
    { name: "Next.js", impact: 5 },
    { name: "CI/CD", impact: 6 },
    { name: "MongoDB", impact: 4 },
    { name: "Redis", impact: 3 },
    { name: "Terraform", impact: 5 },
    { name: "Microservices", impact: 6 },
  ];

  const toggleSkill = (skill: Skill) => {
    if (selectedSkills.find(s => s.name === skill.name)) {
      setSelectedSkills(selectedSkills.filter(s => s.name !== skill.name));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const projectedMatch = currentMatch + selectedSkills.reduce((acc, s) => acc + s.impact, 0);
  const cappedProjectedMatch = Math.min(projectedMatch, 100);

  // Generate timeline data
  const generateTimelineData = () => {
    const data = [{ month: "Now", match: currentMatch }];
    let accumulatedMatch = currentMatch;

    selectedSkills.forEach((skill, idx) => {
      accumulatedMatch += skill.impact;
      data.push({
        month: `Month ${idx + 1}`,
        match: Math.min(accumulatedMatch, 100),
      });
    });

    return data;
  };

  const timelineData = generateTimelineData();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar role="student" userName="John Doe" />

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Growth Simulator</h1>
          <p className="text-gray-600">Visualize how learning new skills will impact your job match percentage</p>
        </div>

        {/* Current vs Projected */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">Current Average Match</p>
                <p className="text-5xl font-bold text-gray-900">{currentMatch}%</p>
              </div>
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                <Target className="w-8 h-8 text-gray-600" />
              </div>
            </div>
            <p className="text-sm text-gray-600">Based on your current skill set</p>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl p-6 text-white">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-green-100 mb-1">Projected Match</p>
                <p className="text-5xl font-bold">{cappedProjectedMatch}%</p>
              </div>
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <TrendingUp className="w-8 h-8" />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5" />
              <p className="text-sm text-green-100">
                {selectedSkills.length === 0
                  ? "Select skills below to see impact"
                  : `+${cappedProjectedMatch - currentMatch}% increase with ${selectedSkills.length} skill${selectedSkills.length !== 1 ? 's' : ''}`
                }
              </p>
            </div>
          </div>
        </div>

        {/* Growth Timeline Chart */}
        {selectedSkills.length > 0 && (
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Projected Growth Timeline</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={timelineData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="match"
                  stroke="#10b981"
                  strokeWidth={3}
                  dot={{ fill: "#10b981", r: 6 }}
                  name="Match Percentage"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Selected Skills */}
        {selectedSkills.length > 0 && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
            <h3 className="font-semibold text-gray-900 mb-4">Your Learning Plan ({selectedSkills.length} skills)</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {selectedSkills.map((skill) => (
                <div
                  key={skill.name}
                  className="flex items-center justify-between bg-white rounded-lg p-4 border border-blue-200"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{skill.name}</p>
                      <p className="text-sm text-green-600 font-medium">+{skill.impact}% match increase</p>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleSkill(skill)}
                    className="w-8 h-8 rounded-lg bg-red-100 hover:bg-red-200 flex items-center justify-center transition-colors"
                  >
                    <X className="w-4 h-4 text-red-600" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Available Skills */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Available Skills to Learn</h2>
          <p className="text-sm text-gray-600 mb-6">Click on skills to add them to your learning plan</p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {availableSkills
              .filter(skill => !selectedSkills.find(s => s.name === skill.name))
              .map((skill) => (
                <button
                  key={skill.name}
                  onClick={() => toggleSkill(skill)}
                  className="flex items-center justify-between p-4 border-2 border-gray-200 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-100 group-hover:bg-blue-100 rounded-lg flex items-center justify-center transition-colors">
                      <Plus className="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition-colors" />
                    </div>
                    <div className="text-left">
                      <p className="font-semibold text-gray-900">{skill.name}</p>
                      <p className="text-sm text-green-600 font-medium">+{skill.impact}% impact</p>
                    </div>
                  </div>
                </button>
              ))}
          </div>
        </div>

        {/* Impact Summary */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-6 mb-8 text-white">
          <h3 className="text-xl font-semibold mb-4">Impact Summary</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <p className="text-purple-100 text-sm mb-1">Skills Selected</p>
              <p className="text-4xl font-bold">{selectedSkills.length}</p>
            </div>
            <div>
              <p className="text-purple-100 text-sm mb-1">Total Match Increase</p>
              <p className="text-4xl font-bold">+{cappedProjectedMatch - currentMatch}%</p>
            </div>
            <div>
              <p className="text-purple-100 text-sm mb-1">New Job Opportunities</p>
              <p className="text-4xl font-bold">~{selectedSkills.length * 3}</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4">
          <button
            onClick={() => navigate("/student/skill-gap")}
            className="px-6 py-3 text-gray-600 hover:text-gray-900 font-medium"
          >
            Back to Skill Gap
          </button>
          <button
            onClick={() => navigate("/student/action-plan")}
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all flex items-center gap-2"
          >
            Generate Action Plan
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
