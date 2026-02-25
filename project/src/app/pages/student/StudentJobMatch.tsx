import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../../components/Navbar";
import { SkillBadge } from "../../components/SkillBadge";
import { ProgressBar } from "../../components/ProgressBar";
import { ArrowRight, Briefcase, MapPin, DollarSign, Clock, Info, ChevronDown, ChevronUp, Building2 } from "lucide-react";

interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  matchPercentage: number;
  matchingSkills: string[];
  missingSkills: string[];
  description: string;
}

export function StudentJobMatch() {
  const navigate = useNavigate();
  const [expandedJob, setExpandedJob] = useState<number | null>(null);
  const [hoveredMatch, setHoveredMatch] = useState<number | null>(null);

  const jobs: Job[] = [
    {
      id: 1,
      title: "Senior Frontend Developer",
      company: "TechCorp Inc.",
      location: "San Francisco, CA",
      salary: "$120k - $160k",
      type: "Full-time",
      matchPercentage: 92,
      matchingSkills: ["React", "TypeScript", "JavaScript", "HTML/CSS"],
      missingSkills: ["Next.js", "GraphQL"],
      description: "We're looking for a senior frontend developer with strong React skills.",
    },
    {
      id: 2,
      title: "Full Stack Engineer",
      company: "StartupXYZ",
      location: "Remote",
      salary: "$100k - $140k",
      type: "Full-time",
      matchPercentage: 85,
      matchingSkills: ["React", "Node.js", "TypeScript", "SQL"],
      missingSkills: ["MongoDB", "Redis", "Microservices"],
      description: "Join our fast-growing startup as a full stack engineer.",
    },
    {
      id: 3,
      title: "React Developer",
      company: "DigitalAgency",
      location: "New York, NY",
      salary: "$90k - $120k",
      type: "Full-time",
      matchPercentage: 88,
      matchingSkills: ["React", "JavaScript", "TypeScript"],
      missingSkills: ["Vue.js", "Animation Libraries"],
      description: "Create beautiful user experiences for our clients.",
    },
    {
      id: 4,
      title: "Cloud Engineer",
      company: "CloudFirst Solutions",
      location: "Austin, TX",
      salary: "$110k - $150k",
      type: "Full-time",
      matchPercentage: 58,
      matchingSkills: ["Python", "SQL"],
      missingSkills: ["AWS", "Kubernetes", "Terraform", "Docker", "CI/CD"],
      description: "Help us build scalable cloud infrastructure.",
    },
    {
      id: 5,
      title: "Junior Full Stack Developer",
      company: "Growth Tech",
      location: "Boston, MA",
      salary: "$75k - $95k",
      type: "Full-time",
      matchPercentage: 94,
      matchingSkills: ["React", "Node.js", "JavaScript", "TypeScript", "SQL"],
      missingSkills: ["Testing Frameworks"],
      description: "Perfect entry-level role for growing developers.",
    },
  ];

  const getMatchColor = (percentage: number) => {
    if (percentage >= 80) return { color: "green", bg: "bg-green-50", text: "text-green-700", border: "border-green-200" };
    if (percentage >= 60) return { color: "orange", bg: "bg-orange-50", text: "text-orange-700", border: "border-orange-200" };
    return { color: "red", bg: "bg-red-50", text: "text-red-700", border: "border-red-200" };
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar role="student" userName="John Doe" />

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Job Matches</h1>
          <p className="text-gray-600">AI-matched opportunities based on your skills and experience</p>
        </div>

        {/* Summary */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 mb-8 text-white">
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <p className="text-blue-100 text-sm mb-1">Total Matches</p>
              <p className="text-4xl font-bold">{jobs.length}</p>
            </div>
            <div>
              <p className="text-blue-100 text-sm mb-1">Best Match</p>
              <p className="text-4xl font-bold">{Math.max(...jobs.map(j => j.matchPercentage))}%</p>
            </div>
            <div>
              <p className="text-blue-100 text-sm mb-1">Avg Match Score</p>
              <p className="text-4xl font-bold">
                {Math.round(jobs.reduce((acc, j) => acc + j.matchPercentage, 0) / jobs.length)}%
              </p>
            </div>
          </div>
        </div>

        {/* Jobs List */}
        <div className="space-y-4">
          {jobs.map((job) => {
            const matchStyle = getMatchColor(job.matchPercentage);
            const isExpanded = expandedJob === job.id;

            return (
              <div
                key={job.id}
                className="bg-white rounded-xl border border-gray-200 hover:shadow-lg transition-all overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-start gap-3 mb-2">
                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Building2 className="w-6 h-6 text-gray-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-gray-900 mb-1">{job.title}</h3>
                          <p className="text-gray-600 font-medium">{job.company}</p>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {job.location}
                        </div>
                        <div className="flex items-center gap-1">
                          <DollarSign className="w-4 h-4" />
                          {job.salary}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {job.type}
                        </div>
                      </div>
                    </div>

                    {/* Match Score */}
                    <div
                      className="relative ml-4"
                      onMouseEnter={() => setHoveredMatch(job.id)}
                      onMouseLeave={() => setHoveredMatch(null)}
                    >
                      <div className={`${matchStyle.bg} ${matchStyle.border} border-2 rounded-xl p-4 text-center min-w-[120px]`}>
                        <p className={`text-3xl font-bold ${matchStyle.text}`}>
                          {job.matchPercentage}%
                        </p>
                        <p className="text-xs text-gray-600 mt-1">Match Score</p>
                        <Info className="w-4 h-4 text-gray-400 mx-auto mt-2" />
                      </div>

                      {/* Tooltip */}
                      {hoveredMatch === job.id && (
                        <div className="absolute right-0 top-full mt-2 w-64 bg-gray-900 text-white text-xs rounded-lg p-4 z-10 shadow-xl">
                          <p className="font-semibold mb-2">Match Calculation:</p>
                          <ul className="space-y-1">
                            <li>• Skills match: 70%</li>
                            <li>• Experience level: 20%</li>
                            <li>• Soft skills: 10%</li>
                          </ul>
                          <div className="mt-2 pt-2 border-t border-gray-700">
                            <p className="text-gray-300">
                              You have {job.matchingSkills.length} of {job.matchingSkills.length + job.missingSkills.length} required skills
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Matching Skills */}
                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-700 mb-2">Matching Skills:</p>
                    <div className="flex flex-wrap gap-2">
                      {job.matchingSkills.map((skill) => (
                        <SkillBadge key={skill} skill={skill} variant="strong" />
                      ))}
                    </div>
                  </div>

                  {/* Missing Skills */}
                  {job.missingSkills.length > 0 && (
                    <div className="mb-4">
                      <p className="text-sm font-medium text-gray-700 mb-2">Missing Skills:</p>
                      <div className="flex flex-wrap gap-2">
                        {job.missingSkills.map((skill) => (
                          <SkillBadge key={skill} skill={skill} variant="missing" />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Match Progress */}
                  <div className="mb-4">
                    <ProgressBar value={job.matchPercentage} color={matchStyle.color as any} />
                  </div>

                  {/* Expand/Collapse */}
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => setExpandedJob(isExpanded ? null : job.id)}
                      className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 font-medium"
                    >
                      {isExpanded ? (
                        <>
                          <ChevronUp className="w-4 h-4" />
                          Show Less
                        </>
                      ) : (
                        <>
                          <ChevronDown className="w-4 h-4" />
                          View Details
                        </>
                      )}
                    </button>

                    <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm">
                      Apply Now
                    </button>
                  </div>

                  {/* Expanded Details */}
                  {isExpanded && (
                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <h4 className="font-semibold text-gray-900 mb-2">Job Description</h4>
                      <p className="text-gray-600 mb-4">{job.description}</p>
                      
                      <div className="bg-blue-50 rounded-lg p-4">
                        <p className="text-sm text-blue-900 font-medium mb-2">
                          💡 Tips to improve your match:
                        </p>
                        <ul className="text-sm text-blue-700 space-y-1">
                          {job.missingSkills.slice(0, 2).map((skill, idx) => (
                            <li key={idx}>• Learn {skill} to increase your match by ~5-8%</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4 mt-8">
          <button
            onClick={() => navigate("/student/skill-analysis")}
            className="px-6 py-3 text-gray-600 hover:text-gray-900 font-medium"
          >
            Back to Analysis
          </button>
          <button
            onClick={() => navigate("/student/skill-gap")}
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all flex items-center gap-2"
          >
            Analyze Skill Gaps
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
