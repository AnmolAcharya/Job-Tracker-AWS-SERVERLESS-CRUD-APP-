import { useEffect, useState } from "react";
import { fetchJobs, createJob } from "./utils/apis";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const JobCard = ({ job, onDelete }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/details/${job.jobId}`);
    };

    return (
        <div className="job-card" onClick={handleClick}>
            <div className="company-logo-wrapper">
                <img src="/company.png" alt={job.Name} className="company-logo" />
            </div>
            <h3>{job.Name}</h3>
            <div className={`status-badge ${job.Status.toLowerCase()}`}>
                {job.Status}
            </div>
            <div className="job-info">
                <p>Applied: {job.AppliedDate}</p>
                <p>{job.Referall ? "Referred" : "Not Referred"}</p>
            </div>
        </div>
    );
};

const Home = () => {
  const [jobs, setJobs] = useState([]);
  const [jobId, setJobId] = useState("");
  const [name, setName] = useState("");
  const [appliedDate, setAppliedDate] = useState("");
  const [status, setStatus] = useState("");
  const [referall, setReferall] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchJobs().then(data => setJobs(data.Items || []));
  }, []);

  const handleAddJob = async () => {
    if (!jobId || !name || !appliedDate || !status) {
      alert("Please fill all fields");
      return;
    }
    const newJob = { jobId, Name: name, AppliedDate: appliedDate, Status: status, Referall: referall };
    await createJob(newJob);
    setJobs([...jobs, newJob]);
    setJobId("");
    setName("");
    setAppliedDate("");
    setStatus("");
    setReferall(false);
  };

  const getStatusClass = (status) => {
    const statusLower = status.toLowerCase();
    return `status status-${statusLower}`;
  };

  return (
    <div className="app-container">
      <header className="header">AWS SERVERLESS JOB TRACKER (CRUD)</header>
      <main className="main-content">
        <aside className="sidebar-form">
          <input 
            className="styled-input"
            type="text"
            placeholder="Job ID"
            value={jobId}
            onChange={(e) => setJobId(e.target.value)}
          />
          <input
            className="styled-input"
            type="text"
            placeholder="Company Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="styled-input"
            type="date"
            placeholder="Applied Date"
            value={appliedDate}
            onChange={(e) => setAppliedDate(e.target.value)}
          />
          <select
            className="styled-input"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="">Select Status</option>
            <option value="applied">Applied</option>
            <option value="interview">Interview</option>
            <option value="offer">Offer</option>
            <option value="rejected">Rejected</option>
            <option value="waitlist">Waitlist</option>
          </select>
          <label>
            <input
              type="checkbox"
              checked={referall}
              onChange={(e) => setReferall(e.target.checked)}
            />
            Referral
          </label>
          <button onClick={handleAddJob}>Add Job</button>
        </aside>
        
        <section className="job-section">
          {jobs.map(job => (
            <JobCard key={job.jobId} job={job} />
          ))}
        </section>
      </main>
    </div>
  );
};

export default Home;