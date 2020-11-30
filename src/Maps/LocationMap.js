import React, { useEffect, useState } from 'react';
import GoogleMapReact from 'google-map-react';
import isEmpty from 'lodash/isEmpty';
import { LocationPin, HospitalPin, HelicopterPin } from './Icons'
import { useStateValue } from '../Context/StateProvider'
import { actionTypes } from '../Context/reducer'
import './LocationMap.css';
import helicopterIcon from '@iconify/icons-mdi/helicopter';
import hospitalMarker from '@iconify/icons-mdi/hospital-marker';
import * as errorMessage from '../Input/error.js';

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
    const reverseGeocode = (maps) => {
        // Back up patient location if reverse geocode lookup fails
        let newPlace = {
            geometry: {
                location: {
                    lat: function () { return position.lat },
                    lng: function () { return position.lng }
                }
            },
            address: '',
            name: '',
        }

        const geocoder = new maps.Geocoder();
        geocoder.geocode({ location: position }, (results, status) => {
            // Reverse geocode sucessful API call 
            if (status === "OK") {
                // Reverse look up result available, set patient location to result
                if (results[0]) {
                    setPlace(results[0]);
                
                // No results, set patient location to backup patient location.
                } else {
                    errorMessage.toast.error(
                        "could not reverse geocode current location",
                        errorMessage.errorOptions);
                    setPlace(newPlace);
                }
            } else {
                errorMessage.toast.error(
                    "Geocoder failed due to: " + status, errorMessage.errorOptions);
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
                text: 'Hospital',
                fontSize: '25px',
                fontWeight: '30px'
            },
        });
        const helicopterMarker = new maps.Marker({
            map,
            label: {
                text: 'Helicopter',
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
        const directionsRenderer = new maps.DirectionsRenderer({ suppressMarkers: true, preserveViewport: true });
        const directionsService = new maps.DirectionsService();
        reverseGeocode(maps);
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
        <div className="map">
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
        </div>
    );
};

export default LocationMap;
