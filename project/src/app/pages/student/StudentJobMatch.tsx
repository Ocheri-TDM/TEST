import { useState, useEffect, useMemo } from "react";
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
  ArrowRight,
} from "lucide-react";

interface PostCandidate {
  jobId: number;
  score: number;
}

interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  description: string;
  matchPercentage?: number;
  matchingSkills: string[];
  missingSkills: string[];
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
        const candidatesDataRaw = await candidatesRes.json();
        const employers: { id: number; companyName: string }[] = await employersRes.json();

        const jobsData: Job[] = jobsDataRaw.map((j: any) => {
          const jobCandidates = candidatesDataRaw.filter(
            (c: any) => c.jobId === j.id
          );

          const attempts = jobCandidates.map((c: any) => c.matchPercentage || 0);
          const avgMatch =
            attempts.length > 0
              ? Math.round(attempts.reduce((sum: number, val: number) => sum + val, 0) / attempts.length)
              : 0;

          return {
            id: j.id,
            title: j.jobTitle,
            company: employers.find((e) => e.id === j["id-employer"])?.companyName ?? j.postedBy,
            location: j.location,
            salary: `${j.salaryMin} - ${j.salaryMax}`,
            type: j.jobType,
            description: j.description,
            matchPercentage: avgMatch,
            matchingSkills: j.matchingSkills || [],
            missingSkills: j.missingSkills || [],
          };
        });

        setJobs(jobsData);
        setCandidates(candidatesDataRaw);
      } catch (err) {
        console.error("Job match load error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getMatchColor = (percentage: number) => {
    if (percentage >= 80)
      return { color: "green", bg: "bg-green-50", text: "text-green-700", border: "border-green-200" };
    if (percentage >= 60)
      return { color: "orange", bg: "bg-orange-50", text: "text-orange-700", border: "border-orange-200" };
    return { color: "red", bg: "bg-red-50", text: "text-red-700", border: "border-red-200" };
  };

  const totalMatches = useMemo(() => jobs?.length || 0, [jobs]);
  const bestMatch = useMemo(() => (jobs && jobs.length > 0 ? Math.max(...jobs.map(j => j.matchPercentage || 0)) : 0), [jobs]);
  const avgMatchScore = useMemo(() => (jobs && jobs.length > 0 ? Math.round(jobs.reduce((acc, j) => acc + (j.matchPercentage || 0), 0) / jobs.length) : 0), [jobs]);

  if (loading) return <div>Loading jobs...</div>;

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
              <p className="text-4xl font-bold">{totalMatches}</p>
            </div>
            <div>
              <p className="text-blue-100 text-sm mb-1">Best Match</p>
              <p className="text-4xl font-bold">{bestMatch}%</p>
            </div>
            <div>
              <p className="text-blue-100 text-sm mb-1">Avg Match Score</p>
              <p className="text-4xl font-bold">{avgMatchScore}%</p>
            </div>
          </div>
        </div>

        {/* Jobs List */}
        <div className="space-y-4">
          {jobs && jobs.length > 0 ? jobs.map((job) => {
            const matchStyle = getMatchColor(job.matchPercentage || 0);
            const isExpanded = expandedJob === job.id;

            return (
              <div key={job.id} className="bg-white rounded-xl border border-gray-200 hover:shadow-lg transition-all overflow-hidden">
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
                    <ProgressBar value={job.matchPercentage || 0} color={matchStyle.color as any} />
                  </div>

                  {/* Expand/Collapse */}
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

                    <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm"
                    onClick={() => navigate(`/student/skill-test/${job.id}`)}>
                      Apply Now
                    </button>
                  </div>

                  {/* Expanded Details */}
                  {isExpanded && (
                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <h4 className="font-semibold text-gray-900 mb-2">Job Description</h4>
                      <p className="text-gray-600 mb-4">{job.description}</p>
                    </div>
                  )}
                </div>
              </div>
            );
          }) : (
            <p className="text-gray-500">No job matches available.</p>
          )}
        </div>
      </div>
    </div>
  );
}