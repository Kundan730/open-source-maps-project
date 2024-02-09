'use client';

import React, { useState, useEffect } from 'react';

import S2 from 's2-geometry';
import { latLngToCell } from 'h3-js';

const Convert = ({ clickedPosition }) => {
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [type, setType] = useState('');
  const [conversionResult, setConversionResult] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // Update latitude and longitude when clickedPosition changes
    setLatitude(clickedPosition[0]);
    setLongitude(clickedPosition[1]);
  }, [clickedPosition]);

  const convertToDMS = (coordinate, isLatitude) => {
    if (coordinate === 0) {
      return `0° ${isLatitude ? 'N' : 'E'}`;
    }

    const absolute = Math.abs(coordinate);
    const degrees = Math.floor(absolute);
    const minutesNotTruncated = (absolute - degrees) * 60;
    const minutes = Math.floor(minutesNotTruncated);
    const seconds = Math.round((minutesNotTruncated - minutes) * 60);

    let direction = '';
    if (isLatitude) {
      direction = coordinate > 0 ? 'N' : 'S';
    } else {
      direction = coordinate > 0 ? 'E' : 'W';
    }

    return `${degrees}° ${minutes}' ${seconds}" ${direction}`;
  };

  const handleConvert = () => {
    if (!latitude || !longitude || !type) {
      setError('Please fill in all fields.');
      return;
    }

    if (type === 'gps') {
      const latitudeDMS = convertToDMS(parseFloat(latitude), true);
      const longitudeDMS = convertToDMS(parseFloat(longitude), false);

      setConversionResult(
        `Latitude: ${latitudeDMS}, Longitude: ${longitudeDMS}`
      );
      setError('');
    } else if (type === 's2') {
      const s2Key = S2.S2.latLngToKey(
        parseFloat(latitude),
        parseFloat(longitude),
        parseInt(15)
      );

      const id = S2.S2.keyToId(s2Key);

      setConversionResult(`S2 Cell: ${s2Key}, ID: ${id}`);
      setError('');
    } else if (type === 'h3') {
        const h3Cell = latLngToCell(latitude, longitude, 7);
    
        setConversionResult(`H3 Cell: ${h3Cell}`);
        setError('');
    } else {
      setError('This conversion type is not supported yet.');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="lat"
        >
          Latitude:
        </label>
        <input
          id="lat"
          type="number"
          step="any"
          min="-90"
          max="90"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          value={latitude}
          onChange={(e) => setLatitude(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="lng"
        >
          Longitude:
        </label>
        <input
          id="lng"
          type="number"
          step="any"
          min="-180"
          max="180"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          value={longitude}
          onChange={(e) => setLongitude(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="type"
        >
          Type:
        </label>
        <select
          id="type"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="">Select a type...</option>
          <option value="gps">GPS</option>
          <option value="s2">Google S2</option>
          <option value="h3">Uber H3</option>
        </select>
      </div>
      {error && <p className="text-red-500">{error}</p>}
      <button
        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        onClick={handleConvert}
      >
        Convert
      </button>

      {conversionResult && <p className="mt-4">{conversionResult}</p>}
    </div>
  );
};

export default Convert;
