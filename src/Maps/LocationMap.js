import React, { useEffect, useState } from 'react';
import GoogleMapReact from 'google-map-react';
import isEmpty from 'lodash/isEmpty';
import { LocationPin, HospitalPin, HelicopterPin } from './Icons'
import { useStateValue } from '../Context/StateProvider'
import { actionTypes } from '../Context/reducer'
import './LocationMap.css';
import helicopterIcon from '@iconify/icons-mdi/helicopter';
import hospitalMarker from '@iconify/icons-mdi/hospital-marker';

// Initial map location
const PORTLAND = { lat: 45.523062, lng: -122.676482 };

// Renders map with current location marker and provides manual location input with 
// autocomplete
const LocationMap = (props) => {

    const [{ patientLocal }, dispatch] = useStateValue();
    const [position, setPosition] = useState(PORTLAND);
    const [place, setPlace] = useState();

    useEffect(() => {
        getGeolocation();
    })

    useEffect(() => {
        if (place) {
            dispatch({
                type: actionTypes.SET_LOC,
                patientLocal: place
            })
        }
    }, [place])

    const setLocation = (position) => {
        const coords = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
        };
        setPosition(coords);
    };

    const getGeolocation = () => {
        if (!navigator.geolocation) {
            alert("Geolocation is not supported by your browser");
        } else {
            navigator.geolocation.getCurrentPosition(setLocation);
        }
    };

    // Reverse geocode user location to get place object
    // TODO: consider just using Lat/Lng for patient instead of Place object. Will need to change context
    const reverseGeocode = (maps) => {
        const geocoder = new maps.Geocoder();
        geocoder.geocode({ location: position }, (results, status) => {
            if (status === "OK") {
                if (results[0]) {
                    setPlace(results[0]);
                } else {
                    // TODO: use general error handler
                    window.alert("No results found");
                }
            } else {
                // TODO: use general error handler
                window.alert("Geocoder failed due to: " + status);
            }
        })
    };

    // Google-Map-React callback to expose Google maps api internals 
    // Calls dispatch to globally set Maps object
    const apiHasLoaded = (map, maps) => {
        map.setCenter(position);
        const ambulanceMarker = new maps.Marker({
            map,
            label: {
                text:'Ambulance',
                fontSize: '25px',
                fontWeight: '30px'
            },
        });
        const helicopterMarker = new maps.Marker({
            map,
            label: {
                text:'Helicopter',
                fontSize: '25px',
                fontWeight: '30px'
            },
        });
        const polyline = new maps.Polyline({
            geodesic: true,
            strokeColor: "#FF0000",
            strokeOpacity: 1.0,
            strokeWeight: 2,
        })
        const directionsRenderer = new maps.DirectionsRenderer({ suppressMarkers: true });
        const directionsService = new maps.DirectionsService();
        reverseGeocode(maps);
        console.log(directionsRenderer);
        dispatch({
            type: actionTypes.SET_MAPS,
            gmaps: { map, maps }
        })
        dispatch({
            type: actionTypes.SET_POLY,
            polyline: polyline
        })
        dispatch({
            type: actionTypes.SET_REND,
            directionsRenderer: directionsRenderer
        })
        dispatch({
            type: actionTypes.SET_SERV,
            directionsService: directionsService
        })
        dispatch({
            type: actionTypes.SET_AMARK,
            ambulanceMarker: ambulanceMarker
        })
        dispatch({
            type: actionTypes.SET_HMARK,
            helicopterMarker: helicopterMarker
        })
    };

    return (
        <div className='locationContainer'>
                <GoogleMapReact
                    bootstrapURLKeys={{
                        key: process.env.REACT_APP_MAP_KEY,
                        libraries: ['places', 'geometry']
                    }}
                    defaultCenter={position ? position : PORTLAND}
                    defaultZoom={10}
                    yesIWantToUseGoogleMapApiInternals
                    onGoogleApiLoaded={({ map, maps }) => apiHasLoaded(map, maps)}

                >
                    {!isEmpty(patientLocal) && (
                        <LocationPin
                            text="Patient Location"
                            lat={patientLocal.geometry.lat}
                            lng={patientLocal.geometry.lng} />

                    )}
                </GoogleMapReact>
        </div>
    );
};

export default LocationMap;