import { useState } from "react";

function AdminDashboard() {
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");

  const addJob = async (e) => {
    e.preventDefault(); // ⭐ very important

    console.log("Add Job clicked"); // DEBUG

    try {
      const res = await fetch("https://jobportal-1-x84n.onrender.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ title, company }),
      });

      const data = await res.json();
      console.log("RESPONSE:", data);

      if (res.ok) {
        setMessage("✅ Job added successfully");
        setTitle("");
        setCompany("");
      } else {
        setMessage(data.message || "❌ Failed to add job");
      }
    } catch (err) {
      console.error(err);
      setMessage("❌ Server error");
    }
  };

  return (
    <div style={{ padding: "40px" }}>
      <h2>Admin Dashboard</h2>

      <form onSubmit={addJob}>
        <input
          type="text"
          placeholder="Job Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <br /><br />

        <input
          type="text"
          placeholder="Company Name"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          required
        />

        <br /><br />

        <button type="submit">Add Job</button>
      </form>

      <p>{message}</p>
    </div>
  );
}

export default AdminDashboard;
