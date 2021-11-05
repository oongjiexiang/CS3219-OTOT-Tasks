import { useParams } from 'react-router-dom'
import { useHistory } from 'react-router'
import useGet from './useGet'

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
          <p>{ job.result.salary }</p>
          <p>{ job.result.jobType }</p>
          <p>{ job.result.description }</p>
          <button onClick={handleDelete}>Delete</button>
        </article>
      }
    </div>
  );
}
 
export default JobDetails;