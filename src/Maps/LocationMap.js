import React, { useEffect, useState } from 'react';
import GoogleMapReact from 'google-map-react';
import AutoComplete from './AutoComplete';
import './LocationMap.css';
// import { MapMarker } from './Icons';

// Initial map location
const PORTLAND = { lat: 45.523062, lng: -122.676482 };


// Renders map with current location marker and provides manual location input with 
// autocomplete
const LocationMap = (props) => {

    // Google-Map-React callback to expose Google maps api internals 
    const apiHasLoaded = (map, maps) => {
        // populatePlace(maps);
        // setInstance(map);
        // setApi(maps);
        // map.setCenter(position);
        // setLoaded(true);
        props.mapsHasLoaded(map,maps);
    };

    return (
        <div className='locationContainer'>
            <div className='mapContainer'>
                <GoogleMapReact
                    bootstrapURLKeys={{
                        key: process.env.REACT_APP_MAP_KEY,
                        libraries: ['places', 'geometry']
                    }}
                    defaultCenter={PORTLAND}
                    defaultZoom={10}
                    yesIWantToUseGoogleMapApiInternals
                    onGoogleApiLoaded={({ map, maps }) => apiHasLoaded(map, maps)}
                >
                    {/* {place && (
                        <MapMarker
                            text={place.name ? place.name : 'patient location'}
                            lat={place.geometry.location.lat()}
                            lng={place.geometry.location.lng()}
                        />
                    )} */}
                </GoogleMapReact>
            </div>
            {/* <div className="manual-address-input">
                <button className="manual-address-btn" onClick={() => { setAuto(!auto) }}>
                    Manual Address Input
         </button>
                {auto ? mapApiLoaded && (
                    < AutoComplete
                        placeHolder='Enter Patient Address'
                        map={mapInstance}
                        mapApi={mapApi}
                        newPlace={newPlace} />
                ) : <></>}
            </div> */}
        </div>
    );
};

export default LocationMap;