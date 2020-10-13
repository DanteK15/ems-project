import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import React, {useState, useEffect} from 'react';

const style = {
    width: '700px',
    height: '500px',
    display: 'inline-block'
};

// const center = {
//   lat: 45.5051,
//   lng: -122.6750
// };

const GoogleReactMap = props => {
  console.log(props.position);

  if (!props.loaded) return <div>Loading...</div>;

  return (
    <Map
      google={props.google}
      className="map"
      style={style}
      zoom={14}
      initialCenter={props.position}>

      <Marker
        name="SOMA"
        position={props.position}
        title="The marker`s title will appear as a tooltip."
      />

    </Map>
  );
};

 
export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_MAP_KEY})(GoogleReactMap)