import type { AppProps } from "next/app";
import styles from "../styles/Home.module.css";
import Head from "next/head";
import NavBar from "./NavBar";

type Props = {
  children: JSX.Element;
};

const layout = ({ children }: Props) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Crypto USDT whales TRACKER</title>
        <meta name="title" content="Crypto USDT whales TRACKER" />
        <meta
          name="description"
          content="USDT WHALE TRANSFERS TRACKER WITH A THRESHOLD OF 1M$"
        />

        <meta property="og:type" content="website" />
        <meta property="og:title" content="Crypto USDT whales TRACKER" />
        <meta
          property="og:description"
          content="USDT WHALE TRANSFERS TRACKER WITH A THRESHOLD OF 1M$"
        />
        <meta
          property="og:image"
          content="https://metatags.io/assets/meta-tags-16a33a6a8531e519cc0936fbba0ad904e52d35f34a46c97a2c9f6f7dd7d336f2.png"
        />

        <link rel="icon" href="/g.png" />
      </Head>
      <NavBar />
      <main className={styles.main}>{children}</main>
      <footer className={styles.footer}></footer>
    </div>
  );
};

export default layout;
