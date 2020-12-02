// Renders Ambulance and Helicopter Route
import googleMapReact from "google-map-react";
import React from "react";
import { isCompositeComponent } from "react-dom/test-utils";
import {useStateValue} from "../Context/StateProvider";

const renderDirections = (gmaps, origin, destination, helicopter, ambulanceMarker, helicopterMarker, polyline, directionsRenderer, directionsService, callback) => {
    const { map, maps } = gmaps;
    var returnDuration = [-1,-1,-1];

    //Clear Previous Routes
    directionsRenderer.setMap(null);
    polyline.setMap(null);
    // Initialize Three Locations
    var patientLocation = {};
    var hospital = {};
    var helicopterOrigin = {};

    //  Assign Each Location
    if(origin!=null) {
        patientLocation = {lat: origin.geometry.lat, lng:origin.geometry.lng};
    }
    else {
        patientLocation = { lat: 45.523062, lng: -122.676482 };
    }
    if(destination!=null) {
        hospital = {lat: destination.geometry.lat, lng:destination.geometry.lng};
    }
    else {
        hospital = { lat: 47.608013, lng: -122.335167 };
    }
    if(helicopter!=null) {
        helicopterOrigin = {lat: helicopter.geometry.lat, lng:helicopter.geometry.lng};
    }
    else {
        helicopterOrigin = { lat: 47.608013, lng: -122.335167 };
    }

    // Create boundry for map
    var bounds = new maps.LatLngBounds();
    bounds.extend(patientLocation);
    bounds.extend(hospital);
    bounds.extend(helicopterOrigin);

    // Helicopter Route
    const flightPlanCoordinates = [
        helicopterOrigin,
        patientLocation,
        hospital,
    ]
    //Convert location to latlng object that setPosition method would accept
    const ambulanceLatlng = new maps.LatLng(hospital.lat, hospital.lng);
    const helicopterLatlng = new maps.LatLng(helicopterOrigin.lat, helicopterOrigin.lng);
    //Set positon of both marker
    ambulanceMarker.setPosition(ambulanceLatlng);
    helicopterMarker.setPosition(helicopterLatlng);
    //Set the polyline

    //Helicopter Route Distance From Helicopter Origin to Patient
    var earthRadius = 6371e3; // metres
    var lat1 = helicopterOrigin.lat * Math.PI/180; // φ, λ in radians
    var lat2 = patientLocation.lat * Math.PI/180;
    var changeLat = (patientLocation.lat-helicopterOrigin.lat) * Math.PI/180;
    var changeLng = (patientLocation.lng-helicopterOrigin.lng) * Math.PI/180;

    var angle = (Math.sin(changeLat/2) * Math.sin(changeLat/2)) +
            (Math.cos(lat1) * Math.cos(lat2) *
            Math.sin(changeLng/2) * Math.sin(changeLng/2));

    var circumference = 2 * Math.atan2(Math.sqrt(angle), Math.sqrt(1-angle));

    var helicopterDistance1 = earthRadius * circumference; // in metres
    helicopterDistance1 = helicopterDistance1 / 1609.34; // in miles


    //Helicopter Route Distance from Patient to Hospital
    lat1 = patientLocation.lat * Math.PI/180; // φ, λ in radians
    lat2 = hospital.lat * Math.PI/180;
    changeLat = (hospital.lat-patientLocation.lat) * Math.PI/180;
    changeLng = (hospital.lng-patientLocation.lng) * Math.PI/180;

    angle = (Math.sin(changeLat/2) * Math.sin(changeLat/2)) +
                (Math.cos(lat1) * Math.cos(lat2) *
                Math.sin(changeLng/2) * Math.sin(changeLng/2));

    circumference = 2 * Math.atan2(Math.sqrt(angle), Math.sqrt(1-angle));

    var helicopterDistance2 = earthRadius * circumference; // in metres
    helicopterDistance2 = helicopterDistance2 / 1609.34; // in miles
    

    polyline.setPath(flightPlanCoordinates);
    polyline.setMap(map);

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
                map.fitBounds(bounds)
                let distance = response.routes[0].legs[0].distance;
                let duration = response.routes[0].legs[0].duration;
                returnDuration = [duration, helicopterDistance1, helicopterDistance2];
                callback(returnDuration);
            } else {
                window.alert("Directions request failed due to " + status);
            }

        }
    );
};

export default renderDirections;
