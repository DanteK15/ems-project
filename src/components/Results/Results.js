/*global google*/
import React, { useState, useEffect } from 'react'
import './Results.css'
import {Link} from 'react-router-dom'
import { compose, withProps, lifecycle} from "recompose"
import {withScriptjs, withGoogleMap, GoogleMap, DirectionsRenderer, Polyline, Marker} from "react-google-maps"

const MapWithADirectionsRenderer = compose(
    withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places",
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `400px` }} />,
        mapElement: <div style={{ height: `100%` }} />,
    }),
    withScriptjs,
    withGoogleMap,
    lifecycle({
        componentDidMount() {
            const DirectionsService = new google.maps.DirectionsService();

            DirectionsService.route({
                origin: new google.maps.LatLng(41.8507300, -87.6512600),
                destination: new google.maps.LatLng(41.8525800, -87.6514100),
                travelMode: google.maps.TravelMode.DRIVING,
            }, (result, status) => {
                if (status === google.maps.DirectionsStatus.OK) {
                    // const overViewCoords = result.routes[0].overview_path;
                    this.setState({
                        directions: result,
                        // distance: result.routes[0].legs[0].distance.val,
                        // lineCoordinates: overViewCoords,
                    });
                    alert(result.routes[0].legs[0].distance.value)
                } else {
                    console.error(`error fetching directions ${result}`);
                }
            });
        }
    })
)(props =>
    <GoogleMap
        defaultZoom={7}
        defaultCenter={new google.maps.LatLng(41.8507300, -87.6512600)}
    >
        {props.directions && <DirectionsRenderer directions={props.directions}/>}
        {/*<Polyline*/}
        {/*    path={props.lineCoordinates}*/}
        {/*    geodesic={false}*/}
        {/*    options={{*/}
        {/*        strokeColor: '#38B44F',*/}
        {/*        strokeOpacity: 1,*/}
        {/*        strokeWeight: 7,*/}
        {/*    }}*/}
        {/*/>*/}
    </GoogleMap>
);

function Results() {
    return (
        <div className="results-section">
        <button className="restart">Restart</button>

        <div className="results">
            <div className="results-output-section">
                <h1 className="title">Helicopter:</h1>
                <label className="ETA-to-patient-label">ETA to Patient:</label>
                <input placehodler=""/>
                <br />
                <label className="ETA-to-hospital-label">ETA to Hospital:</label>     
                <input placehodler=""/>
                <br />

                <h1 className="title">Ambulance:</h1>
                <label className="ETA-to-patient-label">ETA to Patient:</label>
                <input placehodler=""/>
                <br />
                <label className="ETA-to-hospital-label">ETA to Hospital:</label>
                <input placehodler=""/>
                <br />

                <div className = "navigate-section">
                    {/*<img src = "../images/map_example.jpg" alt = ""/>*/}
                </div>

                {/*<MyMapComponent*/}
                {/*    isMarkerShown*/}
                {/*    googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAlfhEWVHzGhLdO2tT4hFUFLGT2pjLViho&v=3.exp&libraries=geometry,drawing,places"*/}
                {/*    loadingElement={<div style={{ height: `100%` }} />}*/}
                {/*    containerElement={<div style={{ height: `400px` }} />}*/}
                {/*    mapElement={<div style={{ height: `100%` }} />}*/}
                {/*/>*/}
                <MapWithADirectionsRenderer />

                <div className = "back-section">
                <br />
                    <Link to="/"><button className = "back-btn">Back</button></Link>
                </div>

            </div>
        </div>
        </div>
    )
}

export default Results
