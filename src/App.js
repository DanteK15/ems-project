import React from 'react';
import './App.css';
import Info from './components/Info/Info';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Results from './components/Results/Results'
import Settings from './components/Settings/Settings'

function App() {
  return (
    <div className="App">
        <Router>
          <Route exact path = "/">
            <Info />
          </Route>
          <Route path = "/results">
            <Results />
          </Route>
          <Route path="/settings">
            <Settings />
          </Route>
        </Router>
    </div>
  );
}

export default App;
