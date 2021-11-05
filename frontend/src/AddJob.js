import { useState } from "react";
import {useHistory} from 'react-router'

const AddJob = () => {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [salary, setSalary] = useState("")
  const [jobType, setJobtype] = useState("")

  const [success, setSuccess] = useState(false)
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState("")

  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsPending(true);

    if(isNaN(Number(salary))) alert('salary must be an integer')
    else{
      const newJob = {title, description, salary, jobType};

      fetch('https://cs3219-otot-b1.herokuapp.com/job', {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(newJob)
      })
        .then(response => {
          if(response.status === 200) setSuccess(true)
          else setError("The job fails to be posted")
          setIsPending(false)
          history.push('/')
        })
        .catch(err => {
          setIsPending(false)
          console.log(err)
        })
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="create-job">
        <label>Job Title</label>
        <input type="text" required value={title} onChange={(e) => setTitle(e.target.value)}></input>
        <label>Description</label>
        <textarea type="text" required value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
        <label>Salary per hour</label>
        <input type="text" required value={salary} onChange={(e) => setSalary(e.target.value)}></input>
        <label>Job Type</label>
        <select required value={jobType} onChange={(e) => setJobtype(e.target.value)}>
          <option>Technology</option>
          <option>Research</option>
          <option>Tutoring</option>
          <option>Ad Hoc</option>
        </select>
        {!isPending && <button>Create Job</button>}
        {isPending && <button disabled>Creating...</button>}
        {error && <p>Oh no! Your job is not created! Try again?</p>}
      </div>
    </form>
  );
}
 
export default AddJob;