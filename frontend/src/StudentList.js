import { Link } from "react-router-dom";

const StudentList = ({ students, title}) => {
  console.log("in StudentList, ", students)
  console.log("in StudentList, ", title)
  return (
    <div className="student-list">
      <h2>{ title }</h2>
      {students.map(student => (
        <div className="student-preview" key={student._id}>
          <Link to={`/student/${student._id}`}>
            <h2>{ student.name }</h2>
            <p>{ student.username }</p>
          </Link>
        </div>
      ))}
    </div>
  );
}
 
export default StudentList;