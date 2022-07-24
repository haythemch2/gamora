import type { AppProps } from 'next/app'
import styles from '../styles/Home.module.css'
import Head from 'next/head'
import NavBar from './NavBar'

type Props ={
    children : JSX.Element
}

const layout = ({children}:Props) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Gamora</title>
        <meta name="description" content="Whale tracker" />
        <link rel="icon" href="/g.png" />
      </Head>
      <NavBar/>
      <main className={styles.main}>
       {children}
      </main>
      <footer className={styles.footer}>
      </footer>
    </div>
  )
}

export default layout