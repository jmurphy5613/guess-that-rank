//@ts-check

import styles from '../styles/ChooseGame.module.css';
import { useRouter } from 'next/router';
import ValorantNavbar from '../components/navbar/valorant/valorant-nav';


const ChooseGame = () => {

    const router = useRouter();

    return (
        <div className={styles.root}>
            <ValorantNavbar />
            <h1 className={styles.title}>Choose your game</h1>
            <div className={styles.games}>
                <div onClick={e => {
                    router.push('/valorant')
                }} className={styles.val}>
                    <div className={styles.overlay}>
                        <img src="/val.png" style={{ height: '70px', width: '80px' }} />
                        <h2 className={styles["val-label"]}>Valorant</h2>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default ChooseGame;