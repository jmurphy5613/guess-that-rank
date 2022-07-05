import type { NextPage } from 'next'
import styles from '../styles/Home.module.css';
import { useRouter } from 'next/router';
import { useUser } from '@auth0/nextjs-auth0';


import Popup from 'reactjs-popup';

const Home: NextPage = () => {

  const router = useRouter();
  const { user } = useUser();

  return (
    <div className={styles.root}>
      <div className={styles["main-content"]}>
        <div className={styles.text}>
          <h1 className={styles.title}>Guess the rank of other players!</h1>
          <h3 className={styles.description}>We are making an open platform for guess the rank, which has been popularized on youtube. Submit your gameplay and see what rank others think you are!</h3>
          <button className={styles.button} onClick={() => {
            if(user) {
              router.push('/select');
            } else {
              router.push('/login');
            }
          }}>Open App</button>
        </div>

      </div>
      <video autoPlay muted loop className={styles.video}>
          <source src='/full.mp4' type='video/mp4' />
      </video>
    </div>
  )
}

export default Home
