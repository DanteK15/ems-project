import React, { useState } from "react";
import Sidebar from "./Settings/Sidebar";
import InputPage from "./Input/InputPage";
import Results from "./Results/Results";
import LocationMap from "./Maps/LocationMap"
import "./App.css";

function App() {


    return (
        <div className="app">
            <Sidebar className="sidebar"/>
            <div className="inputPage">
                <LocationMap />
                <InputPage />
            </div>
            <div className="result-page">
             <Results />
            </div>
        </div>
    );
}
export default App;