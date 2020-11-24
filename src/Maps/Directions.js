// Renders Ambulance and Helicopter Route
import googleMapReact from "google-map-react";
import React from "react";
import { isCompositeComponent } from "react-dom/test-utils";
import {useStateValue} from "../Context/StateProvider";

// TODO: Origin, Destination, Helicopter = {lat: #, lng: #}  or Place objects <-- Determine this 
const renderDirections = (gmaps, origin, destination, helicopter, polyline, directionsRenderer, directionsService, callback) => {
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
    // Helicopter Route
    const flightPlanCoordinates = [
        helicopterOrigin,
        patientLocation,
        hospital,
    ]
    
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
 
  //   returnDuration[1] = helicopterDistance1;
     console.log("HeliRoute1", helicopterDistance1);

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

 //   returnDuration[2] = helicopterDistance2;
    console.log("HeliRoute12", helicopterDistance2);

	//Commenting this out until I can verify it runs correctly this weekend ~Brandon~
	//Will figure out how to store this in context API this weekend
	//var totalHelicopterDistance = getDistance(helicopterOrigin, patientLocation) + getDistance(patientLocation, hospital)
	
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
                let distance = response.routes[0].legs[0].distance;
                let duration = response.routes[0].legs[0].duration;
                console.log('distance: ', distance);
                console.log('duration: ', duration);
                returnDuration = [duration, helicopterDistance1, helicopterDistance2];
                callback(returnDuration);
            } else {
                window.alert("Directions request failed due to " + status);
            }
        }
    );
};
	//Commenting this out until I can verify it runs correctly this weekend ~Brandon~
	
//	var rad = function(x) { return x * Math.PI / 180; }; 

	
	
	//Commenting this out until I can verify it runs correctly this weekend ~Brandon~
/*	
	var getDistance = function(p1, p2) { 
		var R = 6378137; // Earth’s mean radius in meters 
		var dLat = rad(p2.lat - p1.lat); 
		var dLong = rad(p2.lng - p1.lng); 
		var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(rad(p1.lat)) * Math.cos(rad(p2.lat)) * Math.sin(dLong / 2) * Math.sin(dLong / 2); 
		var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
		var d = R * c; return d / 1609.34; // returns the distance in miles
};
*/	

export default renderDirections;
