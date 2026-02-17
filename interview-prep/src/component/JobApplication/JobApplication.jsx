import React, { useEffect, useState } from "react";
import "./style.css";

function JobForm() {
  const [job, setJob] = useState({
    title: "",
    description: "",
    minSalary: "",
    maxSalary: "",
    location: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJob({ ...job, [name]: value });
  };
  useEffect(() => {
    async function fetJob() {
      const res = await fetch("http://localhost:8080/jobs");
      const response = await res.json();
      console.log(response, "response");
    }
    fetJob();
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Job Data:", job);

    // Call backend API
    fetch("http://localhost:8080/jobs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(job),
    })
      .then((res) => res.json())
      .then((data) => alert("Job added successfully!"))
      .catch((err) => console.error(err));
  };
  console.log("data fetch application");
  return (
    <div className="form-container">
      <h2>Add New Job</h2>
      <form onSubmit={handleSubmit}>
        <label>Title</label>
        <input
          type="text"
          name="title"
          value={job.title}
          onChange={handleChange}
          placeholder="Job title"
          required
        />

        <label>Description</label>
        <textarea
          name="description"
          value={job.description}
          onChange={handleChange}
          placeholder="Job description"
          rows="4"
          required
        ></textarea>

        <label>Minimum Salary</label>
        <input
          type="text"
          name="minSalary"
          value={job.minSalary}
          onChange={handleChange}
          placeholder="e.g., 30000"
          required
        />

        <label>Maximum Salary</label>
        <input
          type="text"
          name="maxSalary"
          value={job.maxSalary}
          onChange={handleChange}
          placeholder="e.g., 50000"
          required
        />

        <label>Location</label>
        <input
          type="text"
          name="location"
          value={job.location}
          onChange={handleChange}
          placeholder="City, Country"
          required
        />

        <button type="submit">Add Job</button>
      </form>
    </div>
  );
}

export default JobForm;
