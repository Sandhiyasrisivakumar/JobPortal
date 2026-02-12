import { useState, useEffect } from "react";
import ProgressBar from "../components/ProgressBar";
import { saveData, loadData } from "../utils/storage";
import "./Dashboard.css";
import { useNavigate } from "react-router-dom";
import {
  FaUserCircle,
  FaSignOutAlt,
  FaBriefcase,
  FaBookmark,
  FaCheckCircle
} from "react-icons/fa";



function Dashboard() {
 const navigate = useNavigate();
  // Default skills
  const defaultSkills = [
    { name: "React", done: false },
    { name: "JavaScript", done: false },
    { name: "DSA", done: false },
    { name: "HTML & CSS", done: false },
    { name: "Node js", done: false },
    { name: "Java", done: false },
    { name: "Git & GitHub", done: false },
    { name: "Python", done: false }
  ];

  const [skills, setSkills] = useState(
    loadData("skills") || defaultSkills
  );

  // Save to localStorage whenever skills change
  useEffect(() => {
    saveData("skills", skills);
  }, [skills]);

useEffect(() => {
  const user = localStorage.getItem("user");
  if (!user) {
    navigate("/");
  }
}, [navigate]);


  // Toggle skill
  const toggleSkill = (index) => {
    const updatedSkills = [...skills];
    updatedSkills[index].done = !updatedSkills[index].done;
    setSkills(updatedSkills);
  };

 

 

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  // Reset skills
  const resetSkills = () => {
    const reset = skills.map(skill => ({
      ...skill,
      done: false
    }));
    setSkills(reset);
    localStorage.removeItem("skills");
  };

  const [newSkill, setNewSkill] = useState("");
const addSkill = () => {
  if (newSkill.trim() === "") return;

  setSkills(prev => [
    ...prev,
    { name: newSkill, done: false }
  ]);

  setNewSkill("");
};


  // Progress calculation
  const completed = skills.filter(skill => skill.done).length;
  const percent = Math.round((completed / skills.length) * 100);

  const [role, setRole] = useState("Frontend Developer");
const allSkills = Object.values(skills).flat();
const completedAll = allSkills.filter(s => s.done).length;
const overallPercent = allSkills.length
  ? Math.round((completedAll / allSkills.length) * 100)
  : 0;

  const readyToApply = overallPercent >= 70;

  const jobsData = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "Google",
    skills: ["React", "JavaScript", "CSS"],
    location: "Remote"
  },
  {
    id: 2,
    title: "Backend Developer",
    company: "Amazon",
    skills: ["Node.js", "MongoDB"],
    location: "Bangalore"
  },
  {
    id: 3,
    title: "Full Stack Developer",
    company: "Microsoft",
    skills: ["React", "Node.js"],
    location: "Hyderabad"
  },
    {
    id: 4,
    title: "Software Testing",
    company: "Wipro",
    skills: ["React", "Node.js"],
    location: "Hyderabad"
  },
      {
    id: 5,
    title: "Data Analyst",
    company: "Wipro",
    skills: ["Javascript", "Node.js"],
    location: "Hyderabad"
  },
];

const userSkills = skills
  .filter(skill => skill.done)
  .map(skill => skill.name);


const recommendedJobs = jobsData.filter(job =>
  job.skills.some(skill => userSkills.includes(skill))
);

const [appliedJobs, setAppliedJobs] = useState(
  JSON.parse(localStorage.getItem("appliedJobs")) || []
);

const handleApply = (jobId) => {
  navigate(`/apply/${jobId}`);
};



const [savedJobs, setSavedJobs] = useState(
  JSON.parse(localStorage.getItem("savedJobs")) || []
);


const toggleSaveJob = (job) => {
  let updated;

  if (savedJobs.some(j => j.id === job.id)) {
    updated = savedJobs.filter(j => j.id !== job.id);
  } else {
    updated = [...savedJobs, job];
  }

  setSavedJobs(updated);
  localStorage.setItem("savedJobs", JSON.stringify(updated));
};



  return (
    <div className="dashboard">
      <h2>Welcome to Dashboard</h2>

   
   <div className="menu">
  <button className="menu-btn" onClick={() => navigate("/profile")}>
    <FaUserCircle /> Profile
  </button>

  <button className="menu-btn logout" onClick={handleLogout}>
    <FaSignOutAlt /> Logout
  </button>
</div>


      <h2>My Skill Progress</h2>

      <ProgressBar  percent={percent} />

      <p className="percentage-text">
        {percent}% Completed
      </p>
      <ul>
        {skills.map((skill, index) => (
          <li key={index}>
            <input
              type="checkbox"
              checked={skill.done}
              onChange={() => toggleSkill(index)}
            />
            {skill.name}
          </li>
        ))}
      </ul>

      <div className="add-skill-box">
  <input
    type="text"
    placeholder="Add new skill..."
    value={newSkill}
    onChange={(e) => setNewSkill(e.target.value)}
    className="add-skill-input"
  />

  <button className="add-skill-btn" onClick={addSkill}>
    + Add Skill
  </button>
</div>


      <button onClick={resetSkills} className="reset-btn">
        Reset Skills
      </button>
      <button onClick={() => navigate("/jobs")} className="jobs-btn">
  View Jobs
</button>


      
      <div className="profile-card">

<h2> <FaBriefcase />Recommended Jobs</h2>

{recommendedJobs.length === 0 ? (
  <p>No jobs match your skills yet</p>
) : (
  recommendedJobs.map(job => (
    <div key={job.id} className="job-card">
      <h3>{job.title}</h3>
      <p>{job.company}</p>
      <p>{job.location}</p>
     <button
  onClick={() => handleApply(job.id)}
  className="apply-btn"
>
  <FaCheckCircle />Apply
</button>


<button onClick={() => toggleSaveJob(job)} className="save-btn">
  <FaBookmark />{savedJobs.some(j => j.id === job.id) ? "Saved" : "Save"}
</button>


    </div>
  ))
)}

<h2>Saved Jobs</h2>

{savedJobs.length === 0 ? (
  <p>No saved jobs</p>
) : (
  savedJobs.map(job => (
    <div key={job.id} className="job-card">
      <h3>{job.title}</h3>
      <p>{job.company}</p>
    </div>
  ))
)}

  <h3>Profile Summary</h3>
  <p><strong>Role:</strong> {role}</p>
  <p><strong>Status:</strong> Actively preparing for placements</p>

  <div className="overall-progress">
  <h3>Overall Progress</h3>
  <ProgressBar percent={overallPercent} />
  <p>{overallPercent}% Completed</p>
</div>

</div>
<p className={readyToApply ? "ready" : "not-ready"}>
  {readyToApply
    ? "✅ Ready to Apply for Jobs"
    : "⚠️ Complete more skills to apply"}
</p>

    </div>
  );
}

export default Dashboard;
