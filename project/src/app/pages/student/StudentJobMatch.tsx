import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../../components/Navbar";
import { SkillBadge } from "../../components/SkillBadge";
import { ProgressBar } from "../../components/ProgressBar";
import {
  MapPin,
  DollarSign,
  Clock,
  Info,
  ChevronDown,
  ChevronUp,
  Building2,
} from "lucide-react";

interface CandidateAttempt {
  date: string;
  MatchingSkills: string; // строка через запятую
  MissingSkills: string;  // строка через запятую
  score: number;
}

interface PostCandidate {
  id: number;
  jobId: number;
  attempts: CandidateAttempt[];
}

interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  description: string;
}

export function StudentJobMatch() {
  const navigate = useNavigate();
  const [expandedJob, setExpandedJob] = useState<number | null>(null);
  const [hoveredMatch, setHoveredMatch] = useState<number | null>(null);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [candidates, setCandidates] = useState<PostCandidate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [jobsRes, candidatesRes, employersRes] = await Promise.all([
          fetch("https://19e71b04da22e75b.mokky.dev/employer-posting"),
          fetch("https://19e71b04da22e75b.mokky.dev/post-candidate"),
          fetch("https://19e71b04da22e75b.mokky.dev/employers"),
        ]);

        const jobsDataRaw = await jobsRes.json();
        const candidatesDataRaw: PostCandidate[] = await candidatesRes.json();
        const employers: { id: number; companyName: string }[] = await employersRes.json();

        const jobsData: Job[] = jobsDataRaw.map((j: any) => ({
          id: j.id,
          title: j.jobTitle,
          company: employers.find((e) => e.id === j["id-employer"])?.companyName ?? j.postedBy,
          location: j.location,
          salary: `${j.salaryMin} - ${j.salaryMax}`,
          type: j.jobType,
          description: j.description,
        }));

        setJobs(jobsData);

        // Преобразуем строки навыков в массивы
        const candidatesData = candidatesDataRaw.map((c) => ({
          ...c,
          attempts: c.attempts.map((a: CandidateAttempt) => ({
            ...a,
            matchingSkills: a.MatchingSkills ? a.MatchingSkills.split(",").map(s => s.trim()) : [],
            missingSkills: a.MissingSkills ? a.MissingSkills.split(",").map(s => s.trim()) : [],
          })),
        }));

        setCandidates(candidatesData);
      } catch (err) {
        console.error("Job match load error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading jobs...</div>;

  const getMatchColor = (percentage: number) => {
    if (percentage >= 80)
      return { color: "green", bg: "bg-green-50", text: "text-green-700", border: "border-green-200" };
    if (percentage >= 60)
      return { color: "orange", bg: "bg-orange-50", text: "text-orange-700", border: "border-orange-200" };
    return { color: "red", bg: "bg-red-50", text: "text-red-700", border: "border-red-200" };
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar role="student" userName="John Doe" />

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Job Matches</h1>
          <p className="text-gray-600">Opportunities based on your skills and past attempts</p>
        </div>

        <div className="space-y-4">
          {jobs.map((job) => {
            const candidate = candidates.find((c) => c.jobId === job.id);
            const lastAttempt = candidate?.attempts?.[candidate.attempts.length - 1];

            const matchPercentage = lastAttempt?.score ?? 0;
            const matchingSkills = lastAttempt?.matchingSkills ?? [];
            const missingSkills = lastAttempt?.missingSkills ?? [];

            const matchStyle = getMatchColor(matchPercentage);
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

                    <div
                      className="relative ml-4"
                      onMouseEnter={() => setHoveredMatch(job.id)}
                      onMouseLeave={() => setHoveredMatch(null)}
                    >
                      <div
                        className={`${matchStyle.bg} ${matchStyle.border} border-2 rounded-xl p-4 text-center min-w-[120px]`}
                      >
                        <p className={`text-3xl font-bold ${matchStyle.text}`}>{matchPercentage}%</p>
                        <p className="text-xs text-gray-600 mt-1">Match Score</p>
                        <Info className="w-4 h-4 text-gray-400 mx-auto mt-2" />
                      </div>

                      {hoveredMatch === job.id && (
                        <div className="absolute right-0 top-full mt-2 w-64 bg-gray-900 text-white text-xs rounded-lg p-4 z-10 shadow-xl">
                          <p className="font-semibold mb-2">Match Details:</p>
                          <ul className="space-y-1">
                            {matchingSkills.map((s) => (
                              <li key={s}>✔ {s}</li>
                            ))}
                            {missingSkills.map((s) => (
                              <li key={s}>✖ {s}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-700 mb-2">Matching Skills:</p>
                    <div className="flex flex-wrap gap-2">
                      {matchingSkills.length > 0
                        ? matchingSkills.map((skill) => <SkillBadge key={skill} skill={skill} variant="strong" />)
                        : "No passed skills yet"}
                    </div>
                  </div>

                  {missingSkills.length > 0 && (
                    <div className="mb-4">
                      <p className="text-sm font-medium text-gray-700 mb-2">Missing Skills:</p>
                      <div className="flex flex-wrap gap-2">
                        {missingSkills.map((skill) => (
                          <SkillBadge key={skill} skill={skill} variant="missing" />
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="mb-4">
                    <ProgressBar value={matchPercentage} color={matchStyle.color as any} />
                  </div>

                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => setExpandedJob(isExpanded ? null : job.id)}
                      className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 font-medium"
                    >
                      {isExpanded ? (
                        <>
                          <ChevronUp className="w-4 h-4" /> Show Less
                        </>
                      ) : (
                        <>
                          <ChevronDown className="w-4 h-4" /> View Details
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => navigate(`/student/skill-test/${job.id}`)}
                      className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm"
                    >
                      Apply Now
                    </button>
                  </div>

                  {isExpanded && (
                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <h4 className="font-semibold text-gray-900 mb-2">Job Description</h4>
                      <p className="text-gray-600 mb-4">{job.description}</p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}