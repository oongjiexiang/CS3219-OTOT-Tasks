import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css';
import Navbar from './Navbar';
import AddStudent from './AddStudent';
import Home from './Home';
import StudentDetails from './StudentDetails';
import NotFound from './NotFound';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="content">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/student/add">
            <AddStudent />
          </Route>
          <Route exact path="/student/:id">
            <StudentDetails />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
