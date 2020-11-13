// Renders Ambulance and Helicopter Route
import googleMapReact from "google-map-react";
import React from "react";
import {useStateValue} from "../Context/StateProvider";

// TODO: Origin, Destination, Helicopter = {lat: #, lng: #}  or Place objects <-- Determine this 
const renderDirections = (gmaps, origin, destination, helicopter) => {
    const { map, maps } = gmaps;
    // Initialize Three Locations
    var patientLocation = {};
    var hospital = {};
    var helicopterOrigin = {};
    //  Assign Each Location
    if(origin!=null) {
        patientLocation = {lat: origin.geometry.location.lat(), lng:origin.geometry.location.lng()};
    }
    else {
        patientLocation = { lat: 45.523062, lng: -122.676482 };
    }
    if(destination!=null) {
        hospital = {lat: destination.geometry.location.lat(), lng:destination.geometry.location.lng()};
    }
    else {
        hospital = { lat: 47.608013, lng: -122.335167 };
    }
    if(helicopter!=null) {
        helicopterOrigin = {lat: helicopter.geometry.location.lat(), lng:helicopter.geometry.location.lng()};
    }
    else {
        helicopterOrigin = { lat: 47.608013, lng: -122.335167 };
    }
    var directionsService = new maps.DirectionsService();
    var directionsRenderer = new maps.DirectionsRenderer();
    // Helicopter Route
    const flightPlanCoordinates = [
        helicopterOrigin,
        patientLocation,
        hospital,
    ]

    const flightPath = new maps.Polyline({
        path: flightPlanCoordinates,
        geodesic: true,
        strokeColor: "#FF0000",
        strokeOpacity: 1.0,
        strokeWeight: 2,
    })
    flightPath.setMap(null);
    flightPath.setMap(map);

    // Ambulance Route
    directionsRenderer.setMap(map);
    directionsService.route(
        {
            origin: patientLocation
            ,
            destination: hospital
            ,
            travelMode: 'DRIVING'
        },
        (response, status) => {
            if (status === "OK") {
                directionsRenderer.setDirections(response);
                let distance = response.routes[0].legs[0].distance;
                let duration = response.routes[0].legs[0].duration;
                console.log('distance: ', distance);
                console.log('duration: ', duration);

            } else {
                window.alert("Directions request failed due to " + status);
            }
        }
    );

};


export default renderDirections;
