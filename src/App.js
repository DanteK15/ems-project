import React, { useState } from "react";
import Sidebar from "./Sidebar";
import InputPage from "./InputPage";
import Results from "./Results";
import LocationMap from "./Maps/LocationMap"
import {useStateValue} from './StateProvider'
import {actionTypes} from './reducer'
import "./App.css";

function App() {


    return (
        <div className="app">
            <Sidebar />
            <div className="input-page">
                <LocationMap />
                <InputPage />
            </div>
            <Results />
        </div>
    );
}
export default App;