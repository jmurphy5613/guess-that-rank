import type { NextPage } from 'next'
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  return (
    <div className={styles.root}>
      <div className={styles["main-content"]}>
        <div className={styles.text}>
          <h1 className={styles.title}><span className={styles["text-gradient"]}></span>Guess the rank of other players!</h1>
          <h3 className={styles.description}>We're putting a spin on the widely popularize guess the rank game that has been popularized on youtube</h3>
          <button className={styles.button}>Open App</button>
        </div>

      </div>
      <video autoPlay muted loop className={styles.video}>
          <source src='/full.mp4' type='video/mp4' />
      </video>
    </div>
  )
}

export default Home
