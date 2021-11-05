import { useParams } from 'react-router-dom'
import { useHistory } from 'react-router'
import useGet from './useGet'

const placeholderText = 'Not Available';

const JobDetails = () => {
  const { id } = useParams()
  const { data: job, isPending, error } = useGet('https://cs3219-otot-b1.herokuapp.com/job/' + id)
  const history = useHistory()

  const handleDelete = (e) => {
    fetch('https://cs3219-otot-b1.herokuapp.com/job/' + id, {
      method: "DELETE"
    }).then(() => history.push('/'))
  }

  return (
    <div className='job-detail'>
      {isPending && <p>Loading...</p>}
      {error && <p>{ error }</p>}
      {job && 
        <article>
          <h2>{ job.result.title }</h2>
          <div id="salary-cat">
            <span>Salary: ${ job.result.salary || placeholderText}</span>
            <span>Job Category: { job.result.jobType || placeholderText}</span>
          </div>

          <div id="description">
            <p>Description</p>
            <p>{ job.result.description }</p>
          </div>

          <div id="contact">
            <p>Contact person</p>
            <p>{ job.result.contact || placeholderText}</p>
          </div>
          
          <button onClick={handleDelete}>Delete</button>
        </article>
      }
    </div>
  );
}
 
export default JobDetails;