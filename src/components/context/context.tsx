import { createContext, ReactNode, useContext, useEffect, useState } from 'react'

import {
  states,
  MTcities,
  ROcities,
  PRcities

} from '../data/estados';

/* refatorar */
export type City = {
  name: string,
  lat: number,
  lng: number
}
export type States = {
  name: string,
  lat: number,
  lng: number
}

type LatLng = {
  lat: number,
  lng: number
}

//typagem da estrutura do context
type Data = {
  estados: States[];
  estado: string;
  setEstado: (estado: string) => void;
  cidade: string;
  setCidade: (cidade: string) => void;
  cidades: City[];
  cidadeSelecionada: string;
  setCidadeSelecionada: (cidadeSelecionada: string) => void;
  city?: City;
  setCity: (city: City) => void;
  state?: States;
  setState: (state: States) => void;
  routes: any;
  setRoutes: any;
  routes2: any;
  setRoutes2: any;
  destiny: LatLng;
  setDestiny: (destiny: LatLng) => void;
  position: LatLng;
  setPosition: (userPosition: LatLng) => void;
  //citySelected: boolean;
  //setCitySelected: (citySeletec: boolean) => void;
  checkFrom: boolean;
  setCheckFrom: (checkFrom: boolean) => void;
  checkWhere: boolean;
  setCheckWhere: (checkWhere: boolean) => void;
  confirmedPosition: LatLng;
  setConfirmedPosition: (confirmedPosition: LatLng) => void;
  confirmedDestiny: LatLng;
  setConfirmedDestiny: (confirmedPosition: LatLng) => void;
  distanceRoutes: number;
  timingRoutes: number

}


/* data context sera objetos do tipo Data */
export const DataContext = createContext({} as Data);

type DataContextProviderProps = {
  /* ReactNode, vem de dentro do proprio react feita para isso quando nao se sabe
  o conteudo que tem ou que pode ter, qualquer coisa que react aceitaria como conteudo JSX*/
  children: ReactNode;
}


export function ContextProvider({ children }: DataContextProviderProps) {

  const estados = [...states];

  //setEstados(states)
  //const cidades = MTcities;

  const [checkFrom, setCheckFrom] = useState<boolean>(false);
  const [checkWhere, setCheckWhere] = useState<boolean>(false);




  const [estado, setEstado] = useState<string>('');//qnd o estado eh selecionado
  const [cidade, setCidade] = useState<string>('');//recebe o nome da city
  const [cidades, setCidades] = useState<City[]>([]);//vai receber as cidades a partir da selecao do estado
  const [cidadeSelecionada, setCidadeSelecionada] = useState<string>('');
  const [city, setCity] = useState<City | undefined>()//guardara a lista dsa cidades
  const [state, setState] = useState<States | undefined>();//recebe os estados
  /* const [citySelected, setCitySelected] = useState<boolean>(false) */

  const [routes, setRoutes] = useState<any>();
  const [routes2, setRoutes2] = useState<any>();
  const [distanceRoutes, setDistanceRoutes] = useState<any>(0);
  const [timingRoutes, setTimingRoutes] = useState<any>(0);

  //destino do usuário
  const [destiny, setDestiny] = useState<LatLng>({
    lat: 0,
    lng: 0
  });
  //position do usuario
  const [position, setPosition] = useState<LatLng>({
    lat: 0,
    lng: 0
  });
  const [confirmedPosition, setConfirmedPosition] = useState<LatLng>({
    lat: 0,
    lng: 0
  });
  const [confirmedDestiny, setConfirmedDestiny] = useState<LatLng>({
    lat: 0,
    lng: 0
  });

  useEffect(() => {
    if (routes !== null && routes !== undefined) {
      const distance: number = Number((routes.totalDistance / 1000));
      const timing: number = Number (routes.totalTime / 60);

      /* const dist = typeof distance === 'number' ? distance.toFixed(2) : 0 */

      setDistanceRoutes(distance.toFixed(2));
    setTimingRoutes(timing.toFixed(0));
    }
  }, [routes]);


//const []


/* useEffect qnd se altera o estado, ele recebe as cidades */
useEffect(() => {
  //console.log(MTcities);
  if (estado === 'MT') {
    setCidades(MTcities);
  }
  else if (estado === 'PR') {
    setCidades(PRcities);
  }
  else if (estado === 'RO') {
    setCidades(ROcities);
  }

}, [estado])


return (
  <DataContext.Provider
    value={{
      estados, 
      estado, //nome do estado selecionado
      setEstado, 
      cidade, //nome da cidade selecionada
      setCidade,
      cidades, //array de cidades
      cidadeSelecionada,//cidade selecionada usada o <p> do header
      setCidadeSelecionada,
      city,// obj de cidade selecionada
      setCity,
      routes,//rota que vem do routingMachine
      setRoutes,
      destiny,// destino o user
      setDestiny,
      position,//posicao do user
      setPosition,
      state,//estado selecionado
      setState,
      checkFrom,//boolean do icone na header
      setCheckFrom,
      checkWhere,//boolean do icone na header
      setCheckWhere,
      confirmedPosition,//posicao confirmada origin
      setConfirmedPosition,
      confirmedDestiny, //posicao confirmada destino
      setConfirmedDestiny,
      distanceRoutes,//distancia da rota 
      timingRoutes, //tempo de ida da rota

      routes2,
      setRoutes2
    }}
  >
    {children}
  </DataContext.Provider>
)
}


export const useData = () => {
  return useContext(DataContext);
}