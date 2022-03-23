import '../styles/globals.scss';
import styles from '../styles/app.module.scss';
import { ContextProvider } from '../components/context/context';


import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ContextProvider>
      <div className={styles.wrapper}>
        <main>
          <Component {...pageProps} />
        </main>
      </div>
    </ContextProvider>


  )
}

export default MyApp
