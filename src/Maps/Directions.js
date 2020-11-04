// Renders Ambulance and Helicopter Route

import googleMapReact from "google-map-react";

// TODO: Origin, Destination, Helicopter = {lat: #, lng: #}  or Place objects <-- Determine this 
const renderDirections = (gmaps, origin, destination, helicopter) => {
    const { map, maps } = gmaps;
    const directionsService = new maps.DirectionsService();
    const directionsRenderer = new maps.DirectionsRenderer();

    // Helicopter Route
    const flightPlanCoordinates = [
        { lat: 45.523062, lng: -122.676482 },
        { lat: 47.608013, lng: -122.335167 },
    ]

    const flightPath = new maps.Polyline({
        path: flightPlanCoordinates,
        geodesic: true,
        strokeColor: "#FF0000",
        strokeOpacity: 1.0,
        strokeWeight: 2,
    })
    flightPath.setMap(map);

    // Ambulance Route
    directionsRenderer.setMap(map);
    directionsService.route(
        {
            origin: 'Portland'
            ,
            destination: 'Seattle'
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
