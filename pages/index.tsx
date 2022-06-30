import type { NextPage } from 'next'
import styles from '../styles/Home.module.css';
import { useRouter } from 'next/router';

import Popup from 'reactjs-popup';

const Home: NextPage = () => {

  const router = useRouter();

  return (
    <div className={styles.root}>
      <div className={styles["main-content"]}>
        <div className={styles.text}>
          <h1 className={styles.title}>Guess the rank of other players!</h1>
          <h3 className={styles.description}>We are making an open platform for guess the rank, which has been popularized on youtube. Submit your gameplay and see what rank others think you are!</h3>
          <Popup arrow={false} position="bottom center" trigger={ <button className={styles.button}>Open App</button> }>
            <div className={styles["game-selection"]}>
              <img src="/val.png" className={styles["val-icon"]} />
              <img src="/rl.png" className={styles["rl-icon"]} />
            </div>
          </Popup>
        </div>

      </div>
      <video autoPlay muted loop className={styles.video}>
          <source src='/full.mp4' type='video/mp4' />
      </video>
    </div>
  )
}

export default Home
