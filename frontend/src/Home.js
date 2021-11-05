import StudentList from "./StudentList";
import useGet from "./useGet";


const Home = () => {
  const {data: students, isPending, error} = useGet('https://cs3219-otot-tasks-mv57od22ua-uc.a.run.app/student');
  return (
    <div className="home">
      {error && <div>{error}</div>}
      {isPending && <div>Loading...</div>}
      {students && <StudentList students={students} title="All Students"/>}
    </div>
  );
}
 
export default Home;