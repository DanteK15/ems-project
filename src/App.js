import React, { useState } from "react";
import Sidebar from "./Settings/Sidebar";
import InputPage from "./Input/InputPage";
import Results from "./Results/Results";
import "./App.css";
import Footer from "./Footer/Footer";

function App() {
    return (
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
            <Footer />
        </div>
    );
}
export default App;