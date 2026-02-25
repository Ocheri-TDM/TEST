import { useState, useEffect } from "react";
import { Navbar } from "../../components/Navbar";
import { SkillBadge } from "../../components/SkillBadge";
import { ProgressBar } from "../../components/ProgressBar";
import { User, Mail, Phone, MapPin, ChevronDown, ChevronUp, Github, ExternalLink, Star, Download } from "lucide-react";

interface Candidate {
  id: number;
  studentId: number;
  studentName: string;
  studentEmail?: string;
  studentPhone?: string;
  studentLocation?: string;
  matchPercentage: number;
  matchingSkills: string[];
  missingSkills: string[];
  softSkills: string[];
  marketReadiness: number;
  summary: string;
  github?: string;
  portfolio?: string;
}

interface Job {
  id: number;
  title: string;
}

export function EmployerCandidates() {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [students, setStudents] = useState<any[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [selectedJob, setSelectedJob] = useState<number | null>(null);
  const [filterMatch, setFilterMatch] = useState<number>(0);
  const [expandedCandidate, setExpandedCandidate] = useState<number | null>(null);

  const employerName = localStorage.getItem("userName") || "Employer";

  useEffect(() => {
    // Получаем студентов
    fetch("https://19e71b04da22e75b.mokky.dev/students")
      .then(res => res.json())
      .then(data => setStudents(data));

    // Получаем результаты тестов
    fetch("https://19e71b04da22e75b.mokky.dev/post-candidate")
      .then(res => res.json())
      .then(data => {
        console.log("Candidates raw:", data);
        const parsed = data.map((c: any) => ({
          ...c,
          matchingSkills: Array.isArray(c.MatchingSkills) ? c.MatchingSkills : c.MatchingSkills?.split(",") || [],
          missingSkills: Array.isArray(c.MissingSkills) ? c.MissingSkills : c.MissingSkills?.split(",") || [],
          softSkills: c.SoftSkills || [],
          marketReadiness: c.MarketReadiness || 0,
          summary: c.Summary || "",
          github: c.Github || "",
          portfolio: c.Portfolio || "",
          jobId: c.jobId || "Unknown Job",
        }));
        setCandidates(parsed);
      });

    // Получаем вакансии
    fetch("https://19e71b04da22e75b.mokky.dev/employer-posting")
      .then(res => res.json())
      .then(data => {
        const jobTitles = data.map((j: any) => ({
          id: j.id,
          title: j.jobTitle
        }));

        setJobs(jobTitles);

        if (jobTitles.length > 0) {
          setSelectedJob(jobTitles[0].id);
        }
      });
  }, []);

  // Объединяем кандидатов со студентами
  const enrichedCandidates = candidates.map(c => {
    const student = students.find(s => s.id === c.studentId);
    return {
      ...c,
      studentName: student?.name || "Unknown",
      studentEmail: student?.email || "",
      studentPhone: student?.phone || "",
      studentLocation: student?.location || "",
      studentGithub: student?.github || "",
      studentPortfolio: student?.portfolio || "",
    };
  });

  // Фильтрация кандидатов по вакансии и минимальному совпадению
  const filteredCandidates = enrichedCandidates.filter(
    c =>
      (!selectedJob || c.jobId === selectedJob) &&
      c.matchPercentage >= filterMatch
  );

  const getMatchColor = (percentage: number) => {
    if (percentage >= 70) return "green";
    if (percentage >= 40) return "yellow";
    return "red";
  };

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
                <label className="block text-sm font-medium text-gray-700 mb-2">Job Position</label>
                <select
                  value={selectedJob ?? ""}
                  onChange={(e) => setSelectedJob(Number(e.target.value))}
                  className="px-4 py-2 border border-gray-300 rounded-lg"
                >
                  {jobs.map((job) => (
                    <option key={job.id} value={job.id}>
                      {job.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Min Match %</label>
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
            <p className="text-3xl font-bold">{filteredCandidates.filter(c => c.matchPercentage >= 90).length}</p>
          </div>
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-4 text-white">
            <p className="text-sm text-blue-100 mb-1">80-89% Match</p>
            <p className="text-3xl font-bold">
              {filteredCandidates.filter(c => c.matchPercentage >= 80 && c.matchPercentage < 90).length}
            </p>
          </div>
          <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg p-4 text-white">
            <p className="text-sm text-orange-100 mb-1">70-79% Match</p>
            <p className="text-3xl font-bold">
              {filteredCandidates.filter(c => c.matchPercentage >= 70 && c.matchPercentage < 80).length}
            </p>
          </div>
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg p-4 text-white">
            <p className="text-sm text-purple-100 mb-1">Avg Match</p>
            <p className="text-3xl font-bold">
              {filteredCandidates.length > 0
                ? Math.round(filteredCandidates.reduce((acc, c) => acc + c.matchPercentage, 0) / filteredCandidates.length)
                : 0}%
            </p>
          </div>
        </div>

        {/* Candidate Cards */}
        <div className="space-y-4">
          {filteredCandidates.map((candidate, index) => {
            const isExpanded = expandedCandidate === candidate.id;
            const matchColor = getMatchColor(candidate.matchPercentage);
            const gradientClass =
              matchColor === "green"
                ? "from-green-500 to-emerald-600"
                : matchColor === "yellow"
                ? "from-yellow-500 to-yellow-600"
                : "from-red-500 to-red-600";

            return (
              <div
                key={candidate.studentId}
                className="bg-white rounded-xl border border-gray-200 hover:shadow-lg transition-all overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                        {candidate.studentName.split(" ").map(n => n[0]).join("")}
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-semibold text-gray-900">{candidate.studentName}</h3>
                          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium">
                            #{index + 1} Ranked
                          </span>
                        </div>

                        <div className="grid md:grid-cols-2 gap-2 text-sm text-gray-600 mb-3">
                          <div className="flex items-center gap-2">
                            <Mail className="w-4 h-4" />
                            {candidate.studentEmail}
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4" />
                            {candidate.studentPhone}
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            {candidate.studentLocation}
                          </div>
                        </div>

                        {(candidate.studentGithub || candidate.studentPortfolio) && (
                          <div className="flex gap-3 mb-3">
                            {candidate.studentGithub && (
                              <a
                                href={`${candidate.studentGithub}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700"
                              >
                                <Github className="w-4 h-4" />
                                GitHub
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            )}
                            {candidate.studentPortfolio && (
                              <a
                                href={`${candidate.studentPortfolio}`}
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
                      <div className={`bg-gradient-to-br ${gradientClass} rounded-xl p-4 text-white text-center min-w-[120px]`}>
                        <p className="text-4xl font-bold">{candidate.matchPercentage}%</p>
                        <p className="text-xs text-white/80 mt-1">Match Score</p>
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
                      {candidate.matchingSkills.slice(0, isExpanded ? undefined : 5).map(skill => (
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
                        {candidate.missingSkills.slice(0, isExpanded ? undefined : 3).map(skill => (
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
                        {candidate.softSkills.map(skill => (
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
                            ? "Highly recommended candidate with excellent skill alignment."
                            : candidate.matchPercentage >= 80
                            ? "Recommended candidate with good skill match."
                            : "Potential candidate with growth opportunity."}
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