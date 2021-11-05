import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css';
import Navbar from './Navbar';
import AddJob from './AddJob';
import Home from './Home';
import JobDetails from './JobDetails';
import NotFound from './NotFound';
import UpdateJob from './UpdateJob';

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
          <Route exact path="/job/create">
            <AddJob />
          </Route>
          <Route exact path="/job/:id">
            <JobDetails />
          </Route>
          <Route exact path="/job/update/:id">
            <UpdateJob />
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
