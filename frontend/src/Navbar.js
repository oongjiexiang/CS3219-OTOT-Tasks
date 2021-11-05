import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className="navbar">
      <h1>Jobs Available</h1>
      <div className="links">
        <Link to="/">Home</Link>
        <Link to="/job/create">Create Job</Link>
      </div>
    </div>
  );
}
 
export default Navbar;