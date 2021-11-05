import { useState } from "react";

const AddJob = () => {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [salary, setSalary] = useState("")
  const [jobType, setJobtype] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault();
    if(isNaN(Number(salary))) alert('salary must be an integer')
    else console.log("received value")
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>Job Title</label>
      <input type="text" required value={title} onChange={(e) => setTitle(e.target.value)}></input>
      <label>Description</label>
      <textarea type="text" required value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
      <label>Salary per hour</label>
      <input type="text" required value={salary} onChange={(e) => setSalary(e.target.value)}></input>
      <label></label>
      <select required value={jobType} onChange={(e) => setJobtype(e.target.value)}>
        <option>Technology</option>
        <option>Research</option>
        <option>Tutoring</option>
        <option>Ad Hoc</option>
      </select>
      <button type="submit">Create Job</button>
    </form>
  );
}
 
export default AddJob;