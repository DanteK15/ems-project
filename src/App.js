import React, { useState } from "react";
import Sidebar from "./Settings/Sidebar";
import InputPage from "./Input/InputPage";
import Results from "./Results/Results";
import "./App.css";

function App() {


    return (
        <div className="app">
            <Sidebar />
            <div className="inputPage">
                <InputPage />
            </div>
            <div className="result-page">
             <Results />
            </div>
        </div>
    );
}
export default App;