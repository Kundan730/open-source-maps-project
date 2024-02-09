// 'use client'

// import { Cartesian3, Color } from 'cesium'
// import { useState } from 'react';
// import { Entity, Viewer } from 'resium'

// export default function Cesium() {
//   const [flag, setFlag] = useState(false);

//   return (
//     <Viewer full>
//       <Entity
//         name="Tokyo"
//         position={Cartesian3.fromDegrees(139.767052, 35.681167, 100)}
//         point={{ pixelSize: 20, color: Color.WHITE }}
//         description="Tokyo, Japan"
//         onClick={() => setFlag(f => !f)}
//       />
//       {flag && (
//         <Entity
//           name="India"
//           position={Cartesian3.fromDegrees(78.9629, 20.5937, 100)} // Coordinates for India (longitude, latitude)
//           point={{ pixelSize: 20, color: Color.RED }}
//           description="New Delhi, India"
//         />
//       )}
//     </Viewer>
//   )
// }

// import { Viewer } from "resium";

// function Location() {
//   return <Viewer />;
// }

// export default Location;

// const LocationMarker = () => {
//   const [position, setPosition] = useState(null)
//   const map = useMapEvents({
//     click() {
//       map.locate()
//     },
//     locationfound(e) {
//       setPosition(e.latlng)
//       map.flyTo(e.latlng, map.getZoom())
//     },
//   })

//   return position === null ? null : (
//     <Marker position={position}>
//       <Popup>You are here</Popup>
//     </Marker>
//   )
// }

// render(
//   <MapContainer
//     center={{ lat: 51.505, lng: -0.09 }}
//     zoom={13}
//     scrollWheelZoom={false}>
//     <TileLayer
//       attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//       url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//     />
//     <LocationMarker />
//   </MapContainer>
// ) 

// export default LocationMarker