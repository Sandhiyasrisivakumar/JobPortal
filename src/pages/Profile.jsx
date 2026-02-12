import { useState } from "react";
import ProfilePhoto from "../components/ProfilePhoto";
import "./Profile.css";

function Profile() {

   


  const [profile, setProfile] = useState({
    name: "Sandhiyasri",
    email: "sandhiya@gmail.com",
    phone: "",
    location: "",
    education: "",
    experience: "",
    skills: [],
    about: "",
    resume: "",
    headline: "",
  });

  const [editMode, setEditMode] = useState(true);

   const [skillInput, setSkillInput] = useState("");


    const fields = [
  profile.name,
  profile.phone,
  profile.location,
  profile.education,
  profile.experience,
  profile.skills,
  profile.about,
  profile.resume
];
const filled = fields.filter((f) => f && f.length > 0).length;
const percentage = Math.round((filled / fields.length) * 100);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  
const addSkill = () => {
  if (
    skillInput.trim() &&
    !profile.skills.includes(skillInput) &&
    profile.skills.length < 15
  ) {
    setProfile({
      ...profile,
      skills: [...profile.skills, skillInput.trim()]
    });
    setSkillInput("");
  }
};

const removeSkill = (skill) => {
  setProfile({
    ...profile,
    skills: profile.skills.filter((s) => s !== skill)
  });
};


  const handleSave = () => {
    localStorage.setItem("profile", JSON.stringify(profile));
    alert("✅ Profile saved successfully");
  };

 const [photo, setPhoto] = useState(null);





  return (
    <div className="profile-page">



<ProfilePhoto
  photo={photo}
  setPhoto={setPhoto}
  editMode={editMode}
/>

        <button
  className="edit-btn"
  onClick={() => setEditMode(!editMode)}
>
  {editMode ? "View Profile" : "Edit Profile"}
</button>


      <h2>User Profile</h2>

      <div className="progress-box">
  <p>Profile Completion: {percentage}%</p>
  <div className="progress-bar">
    <div
      className="progress-fill"
      style={{ width: `${percentage}%` }}
    ></div>
  </div>
</div>




      <div className="profile-card">
        <div className="profile-section">
          <label>Full Name</label>
          <input
            type="text"
            name="name"
            value={profile.name}
            onChange={handleChange}
            disabled={!editMode}
  
          />
        </div>

        <div className="profile-section">
  <label>Professional Headline</label>
  <input
    type="text"
    name="headline"
    maxLength="120"
    placeholder="Frontend Developer skilled in React, JavaScript..."
    value={profile.headline}
    onChange={handleChange}
    disabled={!editMode}
  />
  <small>{profile.headline.length}/120</small>
</div>


        <div className="profile-section">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={profile.email}
            onChange={handleChange}
            disabled={!editMode}
          />
        </div>

        <div className="profile-section">
          <label>Phone</label>
          <input
            type="text"
            name="phone"
            placeholder="Enter phone number"
            value={profile.phone}
            onChange={handleChange}
            disabled={!editMode}
          />
        </div>

        <div className="profile-section">
          <label>Location</label>
          <input
            type="text"
            name="location"
            placeholder="City, Country"
            value={profile.location}
            onChange={handleChange}
            disabled={!editMode}
          />
        </div>

        <div className="profile-section">
          <label>Education</label>
          <textarea
            name="education"
            placeholder="Degree, College, Year"
            value={profile.education}
            onChange={handleChange}
            disabled={!editMode}
          />
        </div>

        <div className="profile-section">
          <label>Experience</label>
          <textarea
            name="experience"
            placeholder="Company, Role, Years"
            value={profile.experience}
            onChange={handleChange}
          />
        </div>

     <div className="profile-section">
  <label>Skills</label>

  {editMode && (
    <div className="skill-input">
      <input
        type="text"
        placeholder="Add skill (React, Java, SQL...)"
        value={skillInput}
        onChange={(e) => setSkillInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && addSkill()}
      />
      <button type="button" onClick={addSkill}>
        Add
      </button>
    </div>
  )}

  <div className="skills-container">
    {profile.skills.map((skill, index) => (
      <span key={index} className="skill-tag">
        {skill}
        {editMode && (
          <span
            className="remove-skill"
            onClick={() => removeSkill(skill)}
          >
            ×
          </span>
        )}
      </span>
    ))}
  </div>
</div>


       

        <div className="profile-section">
          <label>About You</label>
          <textarea
            name="about"
            placeholder="Short professional summary"
            value={profile.about}
            onChange={handleChange}
            disabled={!editMode}
          />
        </div>

        <div className="profile-section">
  <label>Resume (PDF)</label>

  <input
    type="file"
    accept=".pdf"
    disabled={!editMode}
    onChange={(e) =>
      setProfile({
        ...profile,
        resume: e.target.files[0]?.name
      })
    }
  />

  {profile.resume && (
    <p className="resume-name">📄 {profile.resume}</p>
  )}
</div>


        <button className="save-btn" onClick={handleSave}>
          Save Profile
        </button>
      </div>
    </div>
  );
}

export default Profile;
