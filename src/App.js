import React, { useState } from "react";
import Sidebar from "./Sidebar";
import InputPage from "./InputPage";
import Results from "./Results";
import LocationMap from "./Maps/LocationMap"
import "./App.css";

function App() {
    const [gmaps, setGmaps] = useState(true);

    const mapsHasLoaded = (map, maps) => {
        setGmaps({ map, maps })
    }

    return (
        <div className="app">
            {gmaps && (<Sidebar />)}
            <div className="input-page">
                <LocationMap mapsHasLoaded={mapsHasLoaded}/>
                <InputPage gmaps={gmaps}/>
            </div>
            <Results />
        </div>
    );
}
export default App;