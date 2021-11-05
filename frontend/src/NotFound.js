import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="not-found">
      <h2>Oops...</h2>
      <p>The page you requested doesn't exist</p>
      <Link to="/">Back to Homepage</Link>
    </div>
  );
}
 
export default NotFound;