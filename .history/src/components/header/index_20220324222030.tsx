
import styles from './styles.module.scss';
/* 
import format from 'date-fns/format';
import prBR from 'date-fns/locale/pt-BR'; */

import { Dropdown, Dropdown2 } from '../buttonsAndDropdown/dropdown';

import { useData } from '../context/context';

import { FaCheck, FaQuestion, FaBan } from 'react-icons/fa'

import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';


//FaQuestion  FaCheck  FaBan

export function Header() {

  /* const date = format(new Date(), 'EEEEEE, d MMMM', {
    locale: prBR,
  });//converte a Data() em string */

  const {
    estado,
    cidadeSelecionada,
    cidade,
    position,
    checkFrom,
    setCheckFrom,
    confirmedPosition,
    checkWhere,
    setCheckWhere,

  } = useData();


  return (
    <header className={styles.headerContainer}>

      <h1>Distance Between</h1>

      <div className={styles.localeDiv}>
        <p>Onde você está
          {
            position.lat && cidade ? (
              checkFrom ? (//quer dizer que confirmou
                <OverlayTrigger
                  placement="right"
                  delay={{ show: 200, hide: 300 }}
                  overlay={
                    <Tooltip id="button-tooltip">
                      Voltar a selecionar?
                    </Tooltip>
                  }
                >
                  <button className={styles.buttons} type='button'>
                    <FaBan
                      className={styles.buttonIcon}
                      size={'1.25rem'}
                      //@ts-ignore
                      onClick={() => setCheckFrom(checkFrom => !checkFrom)}
                    />
                  </button>
                </OverlayTrigger>

              ) : (//se checkFrom for false quer dizer que ainda nao confirmou
                <OverlayTrigger
                  placement="right"
                  delay={{ show: 200, hide: 300 }}
                  overlay={
                    <Tooltip id="button-tooltip">
                      Confirmar
                    </Tooltip>
                  }
                >
                  <button className={styles.buttons} type='button'>
                    <FaCheck
                      className={styles.buttonIcon}
                      size={'1.25rem'}
                      //@ts-ignore
                      onClick={() => setCheckFrom(s => !s)}

                    />
                  </button>
                </OverlayTrigger>
              )
            ) :
              (//cidade e posicao ainda nao selecionado
                <OverlayTrigger
                  placement="right"
                  delay={{ show: 200, hide: 300 }}
                  overlay={
                    <Tooltip id="button-tooltip">
                      {
                        cidade ? (//se cidade estiver ok
                          'Selecione a posição'
                        ) : (//se nao quer dizer que ainda elee nao selecionou a cidade
                          'Selecione a cidade'
                        )
                      }
                    </Tooltip>
                  }
                >
                  <button className={styles.buttons} type='button'>
                    <FaQuestion
                      className={styles.buttonIcon}
                      size={'1.25rem'}
                    />
                  </button>
                </OverlayTrigger>
              )
          }
        </p>
        {/* falta mexer aki, aonde vc quer ir...,
        e linkar com destiny */}

        <p className={!confirmedPosition.lat ? styles.confirmedP : ''}>Onde você quer ir
          {confirmedPosition.lat && cidade ? (
            checkWhere ? ( //se sim checkWhere
              <OverlayTrigger
                placement="right"
                delay={{ show: 200, hide: 300 }}
                overlay={
                  <Tooltip id="button-tooltip">
                    Voltar a selecionar?
                  </Tooltip>
                }
              >
                <button className={styles.buttons} type='button'>
                  <FaBan
                    className={styles.buttonIcon}
                    size={'1.25rem'}
                    //@ts-ignore
                    onClick={() => setCheckWhere(checkFrom => !checkFrom)}
                  />
                </button>
              </OverlayTrigger>
            ) : (//se nao checkWhere
              <OverlayTrigger
                placement="right"
                delay={{ show: 200, hide: 300 }}
                overlay={
                  <Tooltip id="button-tooltip">
                    Confirmar
                  </Tooltip>
                }
              >
                <button
                  className={checkFrom ? styles.buttons2 : styles.buttons}
                  type='button'
                  disabled={!checkFrom}
                >
                  <FaCheck
                    className={styles.buttonIcon}
                    size={'1.25rem'}
                    //@ts-ignore
                    onClick={() => setCheckWhere(s => !s)}

                  />
                </button>
              </OverlayTrigger>
            )
          ) : (
            <OverlayTrigger
              placement="right"
              delay={{ show: 200, hide: 300 }}
              overlay={
                <Tooltip id="button-tooltip">
                  Selecione onde você está
                </Tooltip>
              }
            >
              <button className={styles.buttons} type='button'>
                <FaQuestion
                  className={styles.buttonIcon}
                  size={'1.25rem'}
                />
              </button>
            </OverlayTrigger>
          )}

        </p>
      </div>


      {
        estado ? //se estados for true
          (cidadeSelecionada ? (<p>Selecione dois pontos</p>) : //estados sendo true e cidades sendo true 
            (<p>Selecione o cidade que você está</p>)) ://se estados sendo true e cidades false
          (<p>Selecione o estado que você está</p>)//se estados sendo false
      }


      <div className={styles.dropdown}>
        <Dropdown />
        <Dropdown2 />
      </div>
      {/*  <span>{date}</span> */}
    </header >
  )
}