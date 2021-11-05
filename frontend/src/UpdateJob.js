import { useState, useEffect } from "react";
import {useHistory, useParams} from 'react-router'
import useGet from "./useGet";
 
const UpdateJob = () => {
  const { id } = useParams()
  const { data: job, ..._} = useGet('https://cs3219-otot-b1.herokuapp.com/job/' + id)
  const history = useHistory()

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [salary, setSalary] = useState("")
  const [jobType, setJobtype] = useState("")

  useEffect(() => {
    if(job !== null){
      setTitle(job.result.title)
      setDescription(job.result.description)
      setSalary(job.result.salary)
      setJobtype(job.result.jobType)
    }
  }, [job])
  

  const [success, setSuccess] = useState(false)
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsPending(true);

    if(isNaN(Number(salary))) alert('salary must be an integer')
    else{
      const newJob = {title, description, salary, jobType};

      fetch('https://cs3219-otot-b1.herokuapp.com/job/' + id, {
        method: "PUT",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(newJob)
      })
        .then(response => {
          if(response.status === 200){
            setSuccess(true)
            history.push('/')
          }
          else setError("Job fails to be updated")
          setIsPending(false)
        })
        .catch(err => {
          setIsPending(false)
          console.log(err)
        })
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="update-job">
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
        {!isPending && <button>Update</button>}
        {isPending && <button disabled>Updating...</button>}
        {error && <p>Oh no! Your job is not updated! Try again later?</p>}
      </div>
    </form>
  );
}
 
export default UpdateJob;