import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className="navbar">
      <h1>Class Students</h1>
      <div className="links">
        <Link to="/">Home</Link>
        <Link to="/create">Add Student</Link>
      </div>
    </div>
  );
}
 
export default Navbar;