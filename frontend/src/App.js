import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css';
import Navbar from './Navbar';
import AddJob from './AddJob';
import Home from './Home';
import JobDetails from './JobDetails';
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
          <Route exact path="/job/add">
            <AddJob />
          </Route>
          <Route exact path="/job/:id">
            <JobDetails />
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
