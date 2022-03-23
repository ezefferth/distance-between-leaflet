

import dynamic from 'next/dynamic';
import { useMemo } from 'react';

import { Header } from '../components/header';

import styles from './styles.module.scss';

export default function Home() {
  const Map = useMemo(() => dynamic(
    () => import('../components/map/map'),
    {
      loading: () => <p>A map is loading</p>,
      ssr: false
    }
  ), []);

  return (
    <div className={styles.divContainer}>
      <section>
        <Header />
      </section>
      <section>
        <Map />
      </section>
      <section>
        {/* footer here */}
      </section>
    </div>
  )
}