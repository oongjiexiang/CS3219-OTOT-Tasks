import { Link } from "react-router-dom";

const JobList = ({ jobs, title}) => {
  return (
    <div className="job-list">
      <h2>{ title }</h2>
      {jobs.map(job => (
        <div className="job-preview" key={job._id}>
          <Link to={`/job/${job._id}`}>
            <h2>{ job.title }</h2>
            <p>{ job.salary }</p>
            <p>{ job.description }</p>
          </Link>
        </div>
      ))}
    </div>
  );
}
 
export default JobList;