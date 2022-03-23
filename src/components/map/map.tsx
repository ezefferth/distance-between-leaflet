import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet'
import "leaflet";

import styles from './styles.module.scss'


import { useData } from '../context/context';
import { useEffect } from 'react';



export default function Map() {

  const {
    city,//objeto contendo dados de latlng e nome da cidade
    citySelected
  } = useData();

  function FlyTo() {
    const map = useMap();
    if (city) {
      map.flyTo([city.lat, city.lng], 13)
    }
    return null;
  }

  return (
    <div className={styles.leaflef}>
      <MapContainer
        /* center={ (citySelected && !!city )? ([city.lat, city.lng]) : ([-15.6031467, -56.095039])} */
        center={[-15.6031467, -56.095039]}
        zoom={4}
        style={{ width: "100vw", height: "80vh" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* <Marker position={[51.505, -0.09]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker> */}
        <FlyTo/>
      </MapContainer>
    </div>

  )
}