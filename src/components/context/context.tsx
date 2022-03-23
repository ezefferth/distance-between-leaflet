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


//typagem da estrutura do context
type Data = {
  estados: Array<string>;
  estado: string;
  setEstado: (estado: string) => void;
  cidade: string;
  setCidade: (cidade: string) => void;
  cidades: City[];
  cidadeSelecionada: string;
  setCidadeSelecionada: (cidadeSelecionada: string) => void;
  city?: City;
  setCity: (city: City) => void;
  citySelected: boolean;
  setCitySelected: (citySeletec: boolean) => void;
}


/* data context sera objetos do tipo Data */
export const DataContext = createContext({} as Data);

type DataContextProviderProps = {
  /* ReactNode, vem de dentro do proprio react feita para isso quando nao se sabe
  o conteudo que tem ou que pode ter, qualquer coisa que react aceitaria como conteudo JSX*/
  children: ReactNode;
}


export function ContextProvider({ children }: DataContextProviderProps) {

  const estados = states.sort();

  //const cidades = MTcities;

  const [estado, setEstado] = useState<string>('');
  const [cidade, setCidade] = useState<string>('');
  const [cidades, setCidades] = useState<City[]>([]);
  const [cidadeSelecionada, setCidadeSelecionada] = useState<string>('');
  const [city, setCity] = useState<City | undefined>()
  const [citySelected, setCitySelected] = useState<boolean>(false)


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
        estado,
        setEstado,
        cidade,
        setCidade,
        cidades,
        cidadeSelecionada,
        setCidadeSelecionada,
        city,
        setCity,
        citySelected,
        setCitySelected
      }}
    >
      {children}
    </DataContext.Provider>
  )
}


export const useData = () => {
  return useContext(DataContext);
}