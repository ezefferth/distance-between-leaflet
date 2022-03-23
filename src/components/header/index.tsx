
import styles from './styles.module.scss';

import format from 'date-fns/format';
import prBR from 'date-fns/locale/pt-BR';

import { Dropdown, Dropdown2 } from '../buttonsAndDropdown/dropdown';

export function Header() {

  const date = format(new Date(), 'EEEEEE, d MMMM', {
    locale: prBR,
  });//converte a Data() em string

  return (
    <header className={styles.headerContainer}>

      <h1>Distance Between</h1>
      <p>Selecione onde você está</p>

      <div className={styles.dropdown}>
        <Dropdown />
        <Dropdown2/>
      </div>
     {/*  <span>{date}</span> */}
    </header>
  )
}