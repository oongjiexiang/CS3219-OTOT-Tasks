import { Link } from "react-router-dom";

const JobList = ({ jobs, title}) => {
  return (
    <div className="job-list">
      <h2>{ title }</h2>
      {jobs.map(job => (
        <div className="job-preview" key={job._id}>
          <Link to={`/job/${job._id}`}>
            <h3>{ job.title }</h3>
            <p id="salary">Salary per hour: ${ job.salary }</p>
            <p>{ job.description }</p>
          </Link>
        </div>
      ))}
    </div>
  );
}
 
export default JobList;