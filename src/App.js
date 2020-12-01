import React, { useState } from "react";
import Sidebar from "./Settings/Sidebar";
import InputPage from "./Input/InputPage";
import Results from "./Results/Results";
import "./App.css";
import Footer from "./Footer/Footer";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./Header/Header";
import About from './Header/About'
import Instructions from './Header/Instructions'

function App() {
    return (
    <Router>
        <Header />
        <Switch>
        <Route path="/about"><About /></Route>
        <Route path="/instructions"><Instructions /></Route>
        <Route exact path="/">
        <div className="app">
        <div>
            <Sidebar className="sidebar"/>
            <div className="inputPage">
                <InputPage />
            </div>
            <div className="result-page">
            <Results />
            </div>
        </div>
        </div>


        </Route>
        </Switch>
        <Footer />
        
    {/* <div className="app">
        <Header />
        <div>
            <Sidebar className="sidebar"/>
            <div className="inputPage">
                <InputPage />
            </div>
            <div className="result-page">
            <Results />
            </div>
        </div>
        
    </div> */}
    </Router>
    );
}

export default App;

{/* <div className="app">
<Header />
<div>
    <Sidebar className="sidebar"/>
    <div className="inputPage">
        <InputPage />
    </div>
    <div className="result-page">
    <Results />
    </div>
</div>
<Footer />
</div> */}