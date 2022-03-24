import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, useMap, useMapEvents, useMapEvent } from 'react-leaflet'
import "leaflet";
import L from 'leaflet';

import styles from './styles.module.scss'


import { useData } from '../context/context';
import { useRef } from 'react';

import RoutingMachine from './routingMachine';



export default function Map() {


  const machineRef = useRef();//aki usará como ref O ponto do 



  const {
    city,//objeto contendo dados de latlng e nome da cidade
    /* citySelected */
    position,
    setPosition,
    destiny,
    setDestiny,
    cidade
  } = useData();


  function FlyTo() {
    const map = useMap();//funcao useMap
    if (city) {//verifica se existe algo
      //cada mudança de city ele irá alterar no mapa para cidade selecionda
      map.flyTo([city.lat, city.lng], 13)//se existir ele fly para a localização
    }
    return null;
  }



  function OnClick() {

    if (cidade) {//se cidade estiver selecionada entao ele poderá selecionar os pontos
      const map = useMapEvents({
        click: () => {
          map.on('click', (e) => {
            setPosition({ lat: e.latlng.lat, lng: e.latlng.lng });
            console.log('latlng', position);
          })
        }
      });
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
        <FlyTo />
        <OnClick />
        <RoutingMachine />
      </MapContainer>
    </div>

  )
}