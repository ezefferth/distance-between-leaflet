
//import { useState } from 'react';
import { City, States, useData } from '../context/context';

import styles from './dropdown.module.scss'



export function Dropdown() {
  const {
    estados,
    estado,
    setEstado,
    setCidadeSelecionada,
    setState,
    setCity,
    setCidade

  } = useData();





  function handleDropdown(stateObj: States) {
    setEstado(stateObj.name);
    setState(stateObj);

    //quando troca de estado altera os dados da cidade
    setCity({
      name: '',
      lat: 0,
      lng: 0
    });
    setCidade('');

    setCidadeSelecionada('');
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
        {estados.map((estado, index) => {
          return (
            <li key={index} >
              <button
                className="dropdown-item"
                onClick={() => handleDropdown(estado)}
              >{estado.name}</button>

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
    cidade,
    setCidade,
    setCity,
    setCidadeSelecionada,
    position,//so para console log
    /* setCitySelected */
    checkFrom
  } = useData()


  function handleDropdown(state: string, cityObj: City) {//tipo exportado do context
    //cidade recebe o nome selecionado
    setCidade(state);
    //city recebe o objeto selecionado
    setCity(cityObj);
    //cidade selecionada sendo diferente da cidade, para usar no header
    setCidadeSelecionada(state);//no header a cada mudança do estado, troca o <p> do titulo
    //quando estado muda cidadeSelecionada eh '', ai troca o titulo para selecionar a cidade

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
        {cidade.length > 0 ? (
          cidade
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
      <button onClick={() => console.log('position', checkFrom)}>teste</button>
    </div>
  )
}