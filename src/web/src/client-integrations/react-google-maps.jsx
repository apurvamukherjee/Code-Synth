import React from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

const containerStyle = {
  width: '400px',
  height: '400px'
};

const center = {
  lat: -3.745,
  lng: -38.523
};

const ReactGoogleMaps = () => {
  return (
    <LoadScript
      googleMapsApiKey="YOUR_API_KEY" // Replace with your Google Maps API key
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
      >
        { /* Child components, such as markers, can be added here */ }
      </GoogleMap>
    </LoadScript>
  );
};

export default ReactGoogleMaps;