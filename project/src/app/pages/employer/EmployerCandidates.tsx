import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../../components/Navbar";
import { SkillBadge } from "../../components/SkillBadge";
import { ProgressBar } from "../../components/ProgressBar";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Github,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Star,
  Download,
  Filter,
} from "lucide-react";

interface Candidate {
  id: number;
  name: string;
  email: string;
  phone: string;
  location: string;
  github?: string;
  portfolio?: string;
  matchPercentage: number;
  experienceLevel: string;
  matchingSkills: string[];
  missingSkills: string[];
  softSkills: string[];
  marketReadiness: number;
  summary: string;
}

export function EmployerCandidates() {
  const navigate = useNavigate();

  const employerName = localStorage.getItem("userName") || "Employer";

  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedJob, setSelectedJob] = useState("Senior Frontend Developer");
  const [expandedCandidate, setExpandedCandidate] = useState<number | null>(null);
  const [filterMatch, setFilterMatch] = useState<number>(0);

  const [jobs, setJobs] = useState<string[]>([]);

  useEffect(() => {
    const fetchCandidates = async () => {
      setLoading(true);
      try {
        const res = await fetch("https://19e71b04da22e75b.mokky.dev/employer-posting");
        const data = await res.json();

        setCandidates(data);

        // Генерация списка вакансий
        const jobTitles = [...new Set(data.map((job: any) => job.jobTitle))];
        setJobs(jobTitles);
        setSelectedJob(jobTitles[0] || "");

      } catch (err) {
        console.error(err);
        setError("Failed to load candidates.");
      } finally {
        setLoading(false);
      }
    };

    fetchCandidates();
  }, []);
  const filteredCandidates = candidates.filter(c => c.matchPercentage >= filterMatch);

  const getMatchColor = (percentage: number) => {
    if (percentage >= 90) return "green";
    if (percentage >= 80) return "orange";
    return "red";
  };

  if (loading) return <div>Loading candidates...</div>;
  if (error) return <div>{error}</div>;


  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar role="employer" userName={employerName} />

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Candidate Ranking</h1>
          <p className="text-gray-600">AI-ranked candidates based on match percentage</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Job Position
                </label>
                <select
                  value={selectedJob}
                  onChange={(e) => setSelectedJob(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  {jobs.map((job) => (
                    <option key={job} value={job}>
                      {job}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Min Match %
                </label>
                <select
                  value={filterMatch}
                  onChange={(e) => setFilterMatch(Number(e.target.value))}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value={0}>All Candidates</option>
                  <option value={90}>90%+ Match</option>
                  <option value={80}>80%+ Match</option>
                  <option value={70}>70%+ Match</option>
                </select>
              </div>
            </div>

            <div className="text-sm text-gray-600">
              Showing <span className="font-semibold text-gray-900">{filteredCandidates.length}</span> candidates
            </div>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid md:grid-cols-4 gap-4 mb-6">
          <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg p-4 text-white">
            <p className="text-sm text-green-100 mb-1">90%+ Match</p>
            <p className="text-3xl font-bold">{candidates.filter(c => c.matchPercentage >= 90).length}</p>
          </div>
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-4 text-white">
            <p className="text-sm text-blue-100 mb-1">80-89% Match</p>
            <p className="text-3xl font-bold">
              {candidates.filter(c => c.matchPercentage >= 80 && c.matchPercentage < 90).length}
            </p>
          </div>
          <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg p-4 text-white">
            <p className="text-sm text-orange-100 mb-1">70-79% Match</p>
            <p className="text-3xl font-bold">
              {candidates.filter(c => c.matchPercentage >= 70 && c.matchPercentage < 80).length}
            </p>
          </div>
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg p-4 text-white">
            <p className="text-sm text-purple-100 mb-1">Avg Match</p>
            <p className="text-3xl font-bold">
              {Math.round(candidates.reduce((acc, c) => acc + c.matchPercentage, 0) / candidates.length)}%
            </p>
          </div>
        </div>

        {/* Candidates List */}
        <div className="space-y-4">
          {filteredCandidates.map((candidate, index) => {
            const isExpanded = expandedCandidate === candidate.id;
            const matchColor = getMatchColor(candidate.matchPercentage);

            return (
              <div
                key={candidate.id}
                className="bg-white rounded-xl border border-gray-200 hover:shadow-lg transition-all overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                        {candidate.name.split(' ').map(n => n[0]).join('')}
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-semibold text-gray-900">{candidate.name}</h3>
                          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium">
                            #{index + 1} Ranked
                          </span>
                        </div>

                        <div className="grid md:grid-cols-2 gap-2 text-sm text-gray-600 mb-3">
                          <div className="flex items-center gap-2">
                            <Mail className="w-4 h-4" />
                            {candidate.email}
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4" />
                            {candidate.phone}
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            {candidate.location}
                          </div>
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4" />
                            {candidate.experienceLevel}
                          </div>
                        </div>

                        {(candidate.github || candidate.portfolio) && (
                          <div className="flex gap-3 mb-3">
                            {candidate.github && (
                              <a
                                href={`https://${candidate.github}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700"
                              >
                                <Github className="w-4 h-4" />
                                GitHub
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            )}
                            {candidate.portfolio && (
                              <a
                                href={`https://${candidate.portfolio}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700"
                              >
                                <ExternalLink className="w-4 h-4" />
                                Portfolio
                              </a>
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Match Score */}
                    <div className="ml-4">
                      <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl p-4 text-white text-center min-w-[120px]">
                        <p className="text-4xl font-bold">{candidate.matchPercentage}%</p>
                        <p className="text-xs text-green-100 mt-1">Match Score</p>
                      </div>
                      <div className="mt-2 text-center">
                        <p className="text-xs text-gray-600">Readiness</p>
                        <p className="text-sm font-semibold text-gray-900">{candidate.marketReadiness}%</p>
                      </div>
                    </div>
                  </div>

                  {/* Summary */}
                  <p className="text-gray-700 mb-4">{candidate.summary}</p>

                  {/* Matching Skills */}
                  <div className="mb-3">
                    <p className="text-sm font-medium text-gray-700 mb-2">
                      Matching Skills ({candidate.matchingSkills.length})
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {candidate.matchingSkills.slice(0, isExpanded ? undefined : 5).map((skill) => (
                        <SkillBadge key={skill} skill={skill} variant="strong" />
                      ))}
                      {!isExpanded && candidate.matchingSkills.length > 5 && (
                        <span className="px-3 py-1.5 text-sm text-gray-600">
                          +{candidate.matchingSkills.length - 5} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Missing Skills */}
                  {candidate.missingSkills.length > 0 && (
                    <div className="mb-3">
                      <p className="text-sm font-medium text-gray-700 mb-2">
                        Missing Skills ({candidate.missingSkills.length})
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {candidate.missingSkills.slice(0, isExpanded ? undefined : 3).map((skill) => (
                          <SkillBadge key={skill} skill={skill} variant="missing" />
                        ))}
                        {!isExpanded && candidate.missingSkills.length > 3 && (
                          <span className="px-3 py-1.5 text-sm text-gray-600">
                            +{candidate.missingSkills.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Match Progress */}
                  <div className="mb-4">
                    <ProgressBar value={candidate.matchPercentage} color={matchColor as any} />
                  </div>

                  {/* Expanded Content */}
                  {isExpanded && (
                    <div className="pt-4 border-t border-gray-200">
                      <h4 className="font-semibold text-gray-900 mb-3">Soft Skills</h4>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {candidate.softSkills.map((skill) => (
                          <span
                            key={skill}
                            className="px-3 py-1.5 bg-purple-50 text-purple-700 rounded-lg border border-purple-200 text-sm font-medium"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>

                      <div className="bg-purple-50 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-900 mb-2">AI Recommendation</h4>
                        <p className="text-sm text-gray-700">
                          {candidate.matchPercentage >= 90
                            ? "Highly recommended candidate with excellent skill alignment. Strong fit for senior-level responsibilities."
                            : candidate.matchPercentage >= 80
                            ? "Recommended candidate with good skill match. May need some onboarding for missing skills."
                            : "Potential candidate with growth opportunity. Consider for roles with mentorship support."}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
                    <button
                      onClick={() => setExpandedCandidate(isExpanded ? null : candidate.id)}
                      className="flex items-center gap-2 text-sm text-purple-600 hover:text-purple-700 font-medium"
                    >
                      {isExpanded ? (
                        <>
                          <ChevronUp className="w-4 h-4" />
                          Show Less
                        </>
                      ) : (
                        <>
                          <ChevronDown className="w-4 h-4" />
                          View Full Profile
                        </>
                      )}
                    </button>

                    <div className="flex gap-3">
                      <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium flex items-center gap-2">
                        <Star className="w-4 h-4" />
                        Save
                      </button>
                      <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium flex items-center gap-2">
                        <Download className="w-4 h-4" />
                        Resume
                      </button>
                      <button className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium">
                        Schedule Interview
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
