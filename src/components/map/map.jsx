import 'leaflet/dist/leaflet.css';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
  LayersControl
} from 'react-leaflet'
import "leaflet";
//import L from 'leaflet';


import 'leaflet/dist/leaflet.css';
//corrige o bug do icon nao aprecer
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css';
import 'leaflet-defaulticon-compatibility';

import 'leaflet-routing-machine';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
//-------------------------------------------

import styles from './styles.module.scss'


import { useData } from '../context/context';
import { useEffect, useRef } from 'react';

import RoutingMachine from './routingMachine';
import { set } from 'date-fns/esm';


export default function Map() {

  const machineRef = useRef();//aki usará como ref O ponto do 


  const {
    city,//objeto contendo dados de latlng e nome da cidade
    /* citySelected */
    position,
    setPosition,
    destiny,
    setDestiny,
    cidade,
    state,
    checkFrom,
    setConfirmedPosition,//posicao final do user
    confirmedPosition,
    checkWhere,
    setConfirmedDestiny,
    confirmedDestiny,
    setCheckWhere


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

  /* useEffect para adicionar origem confirmada pelo user */
  useEffect(() => {
    if (checkFrom) {//se for true
      setConfirmedPosition(position);
    }
    else if (!checkFrom) {
      setPosition(confirmedPosition);
      /*       setDestiny({ lat: 0, lng: 0 });
            setConfirmedDestiny({ lat: 0, lng: 0 }); */
      setCheckWhere(false);
    }

  }, [checkFrom]);

  /* useEffect para adicionar destino confirmado pelo user */
  useEffect(() => {
    if (checkWhere && checkFrom) {//se for true
      setConfirmedDestiny(destiny);
    }
    else if (!checkWhere && !checkFrom) {
      setDestiny(confirmedDestiny)
    }
  }, [checkWhere]);

  /* atualiza a referencia do waypoints ao trocar de destino */
  useEffect(() => {
    if (machineRef.current) {
      if (checkFrom && checkWhere && position.lat !== 0 && destiny.lat !== 0) {
        machineRef.current.setWaypoints([[confirmedPosition.lat, confirmedPosition.lng], [confirmedDestiny.lat, confirmedDestiny.lng]]);
      }
    }

  }, [destiny, checkWhere]);



  /* recebe evento onClick */
  function OnClick() {
    if (cidade) {//se cidade estiver selecionada entao ele poderá selecionar os pontos
      const map = useMapEvents({
        click: () => {
          map.on('click', (e) => {
            //@ ts ignore serve para tirar os erros ts, porem nesse caso eh calido
            // pois latlng da um erro, mas funciona perfeitamente
            //@ts-ignore
            setPosition({ lat: e.latlng.lat, lng: e.latlng.lng });
            //@ts-ignore
            setDestiny({ lat: e.latlng.lat, lng: e.latlng.lng });
          });
        }
      });
    }
    return null;
  }

  /* Baselayer para trocar de layer */
  const { BaseLayer } = LayersControl;

  return (
    <div className={styles.leaflef}>
      <MapContainer
        /* center={ (citySelected && !!city )? ([city.lat, city.lng]) : ([-15.6031467, -56.095039])} */
        center={[-15.6031467, -56.095039]}
        zoom={4}
        style={{ width: "100vw", height: "80vh" }}
      >
        <LayersControl>
          <BaseLayer checked name='Open Street Map'>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </BaseLayer>
          <BaseLayer checked name='Open Street Map'>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </BaseLayer>

        </LayersControl>

        {//se position for true e checkMarker
          position && checkFrom ? (
            <Marker
              position={[confirmedPosition.lat, confirmedPosition.lng]}
            >
              <Popup>Origem</Popup>
            </Marker>
          ) : (//se nao
            position.lat !== 0 && (
              <Marker
                position={[position.lat, position.lng]}
              >
                <Popup>Origem</Popup>
              </Marker>
            )
          )
        }

        {
          destiny.lat !== 0 && checkFrom && checkWhere ? (
            <Marker
              position={[confirmedDestiny.lat, confirmedDestiny.lng]}
            >
              <Popup>Destino</Popup>
            </Marker>
          ) : (

            destiny.lat !== 0 && (
              <Marker
                position={[destiny.lat, destiny.lng]}
              >
                <Popup>Destino</Popup>
              </Marker>
            )

          )
        }

        {
          confirmedPosition.lat !== 0 && destiny.lat !== 0 &&
          <RoutingMachine
            ref={machineRef}
            waypoints={[[confirmedPosition.lat, confirmedPosition.lng], [destiny.lat, destiny.lng]]}
          />
        }
        <FlyTo />

        <OnClick />
      </MapContainer>
    </div>

  )
}