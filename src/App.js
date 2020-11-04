import React from "react";
import Sidebar from "./Sidebar";
import InputPage from "./InputPage";
import Results from "./Results";
import "./App.css";
import {BrowserRouter as Router, Route, Link, Switch, useRouteMatch} from 'react-router-dom'

function App() {
  return (
    <div className="app">
      <Sidebar />
      <InputPage />
      <Results />
    </div>
  );
}

export default App;