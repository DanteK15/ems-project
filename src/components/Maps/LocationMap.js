import React, {useState, useEffect} from 'react'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '700px',
  height: '500px'
};

const center = {
  lat: 45.5051,
  lng: -122.6750
};

function LocationMap(position) {
  const [coords, setCoords] = useState(center);

  useEffect(() => {
    setCoords(position.position);
  },[position]);

  return (
    <LoadScript
      googleMapsApiKey={process.env.REACT_APP_MAP_KEY}
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={coords}
        zoom={10}
      >
      { /* Child components, such as markers, info windows, etc. */ }
      <Marker position={coords} title="Patient Location"/>

      </GoogleMap>
    </LoadScript>
  )
}


export default React.memo(LocationMap)
