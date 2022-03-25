import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, useMap, useMapEvents } from 'react-leaflet'
import "leaflet";
import L from 'leaflet';


import 'leaflet/dist/leaflet.css';
//corrige o bug do icon nao aprecer
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css';
import 'leaflet-defaulticon-compatibility';
//-------------------------------------------

import styles from './styles.module.scss'


import { useData } from '../context/context';
import { useEffect, useRef } from 'react';

import RoutingMachine from './routingMachine';


export default function Map() {

  const machineRef = useRef();//aki usará como ref O ponto do 


  const {
    city,//objeto contendo dados de latlng e nome da cidade
    /* citySelected */
    position,
    setPosition,
    //destiny,
    setDestiny,
    cidade,
    state,
    checkFrom,
    setConfirmedPosition,//posicao final do user
    confirmedPosition
  } = useData();


  function FlyTo() {
    const map = useMap();//funcao useMap

    if (state) {
      map.flyTo([state.lat, state.lng], 7);
      //se tiver alguma coisa em city ou se ele nao for undefinided 
      if (city?.name) {//verifica se existe algo
        //cada mudança de city ele irá alterar no mapa para cidade selecionda
        map.flyTo([city.lat, city.lng], 13)//se existir ele fly para a localização
      }
    }


    return null;
  }

  useEffect(() => {
    if(checkFrom){//se for true
      setConfirmedPosition(position);
    }
    else if(!checkFrom){
      setPosition(confirmedPosition)
    }
  }, [checkFrom])


  function OnClick() {

    if (cidade && !checkFrom) {//se cidade estiver selecionada entao ele poderá selecionar os pontos
      const map = useMapEvents({
        click: () => {
          map.on('click', (e) => {
            //@ ts ignore serve para tirar os erros ts, porem nesse caso eh calido
            // pois latlng da um erro, mas funciona perfeitamente
            //@ts-ignore
            setPosition({ lat: e.latlng.lat, lng: e.latlng.lng });


          });
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
        {
          position && checkFrom ? (
            <Marker
              position={[confirmedPosition.lat, confirmedPosition.lng]}
            >

            </Marker>
          ) : (
            <Marker
              position={[position.lat, position.lng]}
            ></Marker>
          )
        }
        <FlyTo />

        <OnClick />
        <RoutingMachine />
      </MapContainer>
    </div>

  )
}