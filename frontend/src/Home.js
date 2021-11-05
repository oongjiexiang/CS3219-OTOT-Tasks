import JobList from "./JobList";
import useGet from "./useGet";


const Home = () => {
  const {data: jobs, isPending, error} = useGet('https://cs3219-otot-tasks-mv57od22ua-uc.a.run.app/student');
  return (
    <div className="home">
      {error && <div>{error}</div>}
      {isPending && <div>Loading...</div>}
      {jobs && <JobList jobs={jobs} title="Opportunities"/>}
    </div>
  );
}
 
export default Home;