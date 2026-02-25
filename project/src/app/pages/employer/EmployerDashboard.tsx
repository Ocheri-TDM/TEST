import { useNavigate } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import { Navbar } from "../../components/Navbar";
import { StatCard } from "../../components/StatCard";
import {
  Users,
  Briefcase,
  TrendingUp,
  Plus,
  ArrowRight,
  Star,
  Clock,
} from "lucide-react";

interface Candidate {
  id: number;
  name: string;
  matchPercentage: number;
  experienceLevel: string;
  matchingSkills?: string[];
}

interface JobPosting {
  id: number;
  jobTitle: string;       
  description: string;
  location: string;
  jobType: string;
  experienceLevel: string;
  salaryMin: string;
  salaryMax: string;
  employerId: number;    
}

interface Employer {
  id: number;
  companyName: string;
}

export function EmployerDashboard() {
  const navigate = useNavigate();

  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [jobs, setJobs] = useState<JobPosting[]>([]);
  const [employer, setEmployer] = useState<Employer | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const employerId = localStorage.getItem("employerId");

    if (!token || !employerId) {
      navigate("/");
      return;
    }

    const fetchAll = async () => {
      try {
        const [candRes, jobRes, empRes] = await Promise.all([
          fetch("https://19e71b04da22e75b.mokky.dev/post-candidate"),
          fetch("https://19e71b04da22e75b.mokky.dev/employer-posting"),
          fetch("https://19e71b04da22e75b.mokky.dev/employers"),
        ]);

        const candidatesData = await candRes.json();
        const jobsData = await jobRes.json();
        const employersData = await empRes.json();
        console.log("employerId:", employerId);
        console.log("jobsData:", jobsData);

        // 🔥 Фильтр вакансий по employerId
        const employerJobs = jobsData.filter(
          (job: any) =>
            Number(job["id-employer"]) === Number(employerId)
        );

        setJobs(employerJobs);  

        const currentEmployer = employersData.find(
          (emp: any) =>
            String(emp.id) === String(employerId)
        );

        setEmployer(currentEmployer || null);

        const employerJobIds = employerJobs.map((j: any) => j.id);

        const employerCandidates = candidatesData.filter((c: any) =>
          employerJobIds.includes(c.jobId)
        );

        setCandidates(employerCandidates);
      } catch (err) {
        console.error("Dashboard loading error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, [navigate]);

  /* ==========================
     📊 Dynamic Calculations
  ========================== */

  const activeJobs = jobs.filter((j) => j.status === "active").length;

  const totalApplicants = candidates.length;

  const averageMatch = totalApplicants
    ? Math.round(
        candidates.reduce((acc, c) => acc + c.matchPercentage, 0) /
          totalApplicants
      )
    : 0;

  const pendingReviews = candidates.filter(
    (c) => c.matchPercentage >= 70 && c.matchPercentage < 85
  ).length;

  const topCandidates = useMemo(() => {
    return [...candidates]
      .sort((a, b) => b.matchPercentage - a.matchPercentage)
      .slice(0, 3);
  }, [candidates]);

  const applicantsPerJob = useMemo(() => {
    return jobs.map((job) => {
      const relatedCandidates = candidates.filter(
        (c: any) => c.jobId === job.id
      );

      const topMatch =
        relatedCandidates.length > 0
          ? Math.max(...relatedCandidates.map((c) => c.matchPercentage))
          : 0;

      return {
        ...job,
        applicants: relatedCandidates.length,
        topMatch,
      };
    });
  }, [jobs, candidates]);

  if (loading) return <div>Loading dashboard...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar
        role="employer"
        userName={employer?.companyName || "Employer"}
      />

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Welcome */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 text-white mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Welcome back, {employer?.companyName || "Employer"} 👋
          </h1>
          <p className="text-purple-100 mb-6">
            You have {totalApplicants} total applicants across {activeJobs} active job postings
          </p>

          <button
            onClick={() => navigate("/employer/create-job")}
            className="px-6 py-3 bg-white text-purple-600 rounded-lg font-semibold hover:bg-purple-50 transition-colors flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Create New Job Posting
          </button>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Active Job Postings"
            value={activeJobs}
            icon={Briefcase}
            iconColor="bg-purple-100 text-purple-600"
          />
          <StatCard
            title="Total Applicants"
            value={totalApplicants}
            icon={Users}
            iconColor="bg-blue-100 text-blue-600"
          />
          <StatCard
            title="Average Match Rate"
            value={`${averageMatch}%`}
            icon={TrendingUp}
            iconColor="bg-green-100 text-green-600"
          />
          <StatCard
            title="Pending Reviews"
            value={pendingReviews}
            icon={Clock}
            iconColor="bg-orange-100 text-orange-600"
          />
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* LEFT SIDE */}
          <div className="lg:col-span-2 space-y-6">
            {/* Job Postings */}
            <div className="bg-white rounded-xl border p-6">
              <h2 className="text-xl font-semibold mb-6">
                Active Job Postings
              </h2>

              <div className="space-y-4">
                {applicantsPerJob.map((job) => (
                  <div
                    key={job.id}
                    className="p-5 bg-gray-50 hover:bg-gray-100 rounded-lg cursor-pointer"
                    onClick={() => navigate("/employer/candidates")}
                  >
                    <div className="flex justify-between mb-3">
                      <div>
                        <h3 className="font-semibold">{job.jobTitle}</h3>
                        <p className="text-sm text-gray-600">
                          {job.applicants} applicants
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-purple-600">
                          {job.topMatch}%
                        </p>
                        <p className="text-xs text-gray-600">Top Match</p>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <button className="text-sm text-purple-600 flex items-center gap-1">
                        View Candidates
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="space-y-6">
            {/* Top Candidates */}
            <div className="bg-white rounded-xl border p-6">
              <h2 className="text-xl font-semibold mb-4">
                Top Candidates
              </h2>

              <div className="space-y-4">
                {topCandidates.map((candidate) => (
                  <div key={candidate.id} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex justify-between">
                      <h3 className="font-semibold">{candidate.name}</h3>
                      <span className="font-bold text-green-600">
                        {candidate.matchPercentage}%
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-2">
                      {candidate.matchingSkills?.slice(0, 3).map((skill) => (
                        <span
                          key={skill}
                          className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => navigate("/employer/candidates")}
                className="w-full mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg"
              >
                View All Candidates
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}