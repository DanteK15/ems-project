import React, { useEffect, useState } from 'react';
import GoogleMapReact from 'google-map-react';
import isEmpty from 'lodash/isEmpty';
import { LocationPin, HospitalPin, HelicopterPin } from './Icons'
import { useStateValue } from '../Context/StateProvider'
import { actionTypes } from '../Context/reducer'
import './LocationMap.css';

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
        reverseGeocode(maps);
        dispatch({
            type: actionTypes.SET_MAPS,
            gmaps: { map, maps }
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
                            lat={patientLocal.geometry.location.lat()}
                            lng={patientLocal.geometry.location.lng()} />

                    )}
                </GoogleMapReact>
        </div>
    );
};

export default LocationMap;