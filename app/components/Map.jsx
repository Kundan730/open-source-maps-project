'use client';

import 'leaflet/dist/leaflet.css';
import React, { useState, useRef, useMemo, useCallback } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from 'react-leaflet';
import { FaMapMarkerAlt } from 'react-icons/fa';
import Convert from './Convert';

const markerIconOptions = {
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconRetinaUrl:
    'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  shadowSize: [41, 41],
  shadowAnchor: [12, 41],
};

const MapClickHandler = ({ handleMapClick }) => {
  useMapEvents({
    click: handleMapClick,
  });

  return null;
};

const LocationMarker = React.memo(() => {
  const [position, setPosition] = useState(null);
  const map = useMapEvents({
    click() {
      map.locate();
    },
    locationfound(e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  return position === null ? null : (
    <Marker position={position} icon={L.icon(markerIconOptions)}>
      <Popup>You are around here</Popup>
    </Marker>
  );
});

LocationMarker.displayName = 'LocationMarker';

const Map = ({ center, zoom }) => {
  const [clickedPosition, setClickedPosition] = useState('');
  const [showLocationMarker, setShowLocationMarker] = useState(false);
  const locationButtonRef = useRef(null);

  const handleMapClick = useCallback((e) => {
    if (
      locationButtonRef.current &&
      locationButtonRef.current.contains(e.originalEvent.target)
    ) {
      return;
    }
    const { lat, lng } = e.latlng;
    setClickedPosition([lat, lng]);
    setShowLocationMarker(false);
  }, []);

  const handleButtonClick = useCallback(() => {
    setShowLocationMarker(true);
  }, []);

  const memoizedMarkerIcon = useMemo(() => L.icon(markerIconOptions), []);

  return (
    <div className="flex flex-col items-center p-4 relative">
      <div className="w-full h-96 rounded-lg shadow-lg relative z-0">
        <MapContainer
          center={center}
          zoom={zoom}
          className="w-full h-full relative"
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <MapClickHandler handleMapClick={handleMapClick} />
          {clickedPosition && (
            <Marker position={clickedPosition} icon={memoizedMarkerIcon}>
              <Popup>
                Clicked coordinates: {clickedPosition[0]}, {clickedPosition[1]}
              </Popup>
            </Marker>
          )}
          <button
            ref={locationButtonRef}
            onMouseDown={handleButtonClick}
            className="custom-map-button absolute top-4 right-4 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline z-10"
            style={{ zIndex: 1000 }}
          >
            <FaMapMarkerAlt className="mr-2" />
          </button>

          {showLocationMarker && <LocationMarker />}
        </MapContainer>
      </div>
      <Convert clickedPosition={clickedPosition} />
    </div>
  );
};

export default Map;
