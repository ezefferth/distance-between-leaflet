
//import { estados } from "../data/estados";
import { useState } from 'react';
import { City, useData } from '../context/context';

import styles from './dropdown.module.scss'



export function Dropdown() {
  const {
    estados,
    estado,
    setEstado,
  } = useData();





  function handleDropdown(state: string) {
    setEstado(state)
  }
  return (
    <div className='dropdown'>
      {/* desta forma eh possivel colocar variavel do styles.dropdown  */}
      <a className={`btn btn-secondary dropdown-toggle ${styles.dropdown}`}
        role="button"
        id="dropdownMenuLink"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        {/* condicional se o estado(q vem do context) estiver maior que 0 
        quer dizer que ele foi selecionado*/}
        {estado.length > 0 ? (
          estado
        ) : (
          'Estado'
        )}
      </a>
      <ul className="dropdown-menu">
        {estados.map(estado => {
          return (<li key={estado} >
            <button
              className="dropdown-item"
              onClick={() => handleDropdown(estado)}
            >{estado}</button>

          </li>
          )
        })}

      </ul>
    </div>
  )
}

export function Dropdown2() {
  const {
    cidades,
    cidadeSelecionada,
    setCidadeSelecionada,
    city,
    setCity,
    /* setCitySelected */
  } = useData()

  console.log('xx',city);

  function handleDropdown(state: string, cityObj: City) {//tipo exportado do context
    //cidade recebe o nome selecionado
    setCidadeSelecionada(state);
    //city recebe o objeto selecionado
    setCity(cityObj);

    /* setCitySelected(true); */
  }

  return (
    <div className='dropdown'>
      {/* desta forma eh possivel colocar variavel do styles.dropdown  */}
      <a className={`btn btn-secondary dropdown-toggle ${styles.dropdown}`}
        role="button"
        id="dropdownMenuLink"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        {/* condicional se o estado(q vem do context) estiver maior que 0 
        quer dizer que ele foi selecionado*/}
        {cidadeSelecionada.length > 0 ? (
          cidadeSelecionada
        ) : (
          'Cidade'
        )}
      </a>
      <ul className="dropdown-menu">
        
        {/* coomo o cidades eh um array de objetos, entao... */}
        {cidades.map((cidade, index) => {
          /* console.log('city', cidade.name) */
          return (
            <li key={index}>
              <button
                className='dropdown-item'
                onClick={() => handleDropdown(cidade.name, cidade)}
              >{cidade.name}
              </button>
            </li>
          )
        })}

      </ul>   {/* se city existir */}
      <button onClick={() => console.log(process.env.MAPBOX_TOKEN)}>teste</button>
    </div>
  )
}