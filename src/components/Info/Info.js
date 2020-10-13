import React, { useState, useEffect } from "react";
import "./Info.css";
import { Link } from "react-router-dom";
import LocationMap from "../Maps/LocationMap";
import GoogleReactMap from "../Maps/GoogleReactMap";

function Info() {
  const [address, setAddress] = useState();

  useEffect(() => {
    localStorage.setItem("address", address);
  }, [address]);

  useEffect(() => {
    getGeolocation();
    localStorage.getItem(address);
  }, []);

  const handleChange = (e) => {
    setAddress(e.target.value);
  };

  const showInput = () => {
    if (document.getElementById("show").style.visibility === "hidden") {
      document.getElementById("show").style.visibility = "visible";
    } else {
      document.getElementById("show").style.visibility = "hidden";
    }
  };

  const setLocation = (position) => {
    const coords = {
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    };
    setAddress(coords);
  };

  const getGeolocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
    } else {
      navigator.geolocation.getCurrentPosition(setLocation);
    }
  };

  return (
    <div className="info-page">
      <div className="reset">
        <Link to="/settings">
          <button className="settings-btn">Settings</button>
        </Link>
        <button className="reset-btn">Reset</button>
      </div>

      <div className="location-section">
        <h1 className="title">Patient Location:</h1>
        <br />
        <div className="patient-location-section">
          {/*map image place holder */}
          {/* <img src="../images/map_example.jpg" alt="" /> */}

          {/* MAP USING react-google-maps/api}
          {/* <LocationMap position={address} /> */}

          {/* MAP USING google-react-maps*/}
          <div className="mapContainer">
            <GoogleReactMap position={address} />
          </div>
        </div>

        <div className="manual-address-input">
          <button className="manual-address-btn" onClick={showInput}>
            Manual Address Input
          </button>
          <input
            type="text"
            value={address}
            id="show"
            placeholder="Enter Address Here ..."
            style={{ visibility: "hidden" }}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="centered">
        <div className="menu-section">
          <h1 className="title">Hospital Selection:</h1>
          <br />
          <form>
            <select>
              <option value="providence">Providence</option>
              <option value="legacy">Legacy</option>
            </select>
          </form>
        </div>

        <br />

        <div className="menu-section">
          <h1 className="title">Helicopter Site:</h1>
          <br />
          <form>
            <select>
              <option value="site1">Site 1</option>
              <option value="site2">Site 2</option>
            </select>
          </form>
        </div>

        <br />

        <div className="menu-section">
          <h1 className="title">Estimated Patient Loading Time</h1>
          <br />
          <form>
            <select>
              <option value="ex1">5 minutes</option>
              <option value="ex2">10 minutes</option>
              <option value="ex2">15 minutes</option>
            </select>
          </form>
        </div>
        <br />
        <div className="calculate-section">
          <br />
          <Link to="/results">
            <button className="calculate-btn">Calculate</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Info;
