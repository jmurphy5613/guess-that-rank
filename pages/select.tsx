//@ts-check

import styles from '../styles/ChooseGame.module.css';
import { useRouter } from 'next/router';
import ValorantNavbar from '../components/navbar/valorant/valorant-nav';
import { useEffect } from 'react';
import ReactGa from 'react-ga';


const ChooseGame = () => {

    const router = useRouter();

    useEffect(() => {
        ReactGa.initialize('UA-234221342-1');
        ReactGa.pageview(router.pathname);
    }, [router.isReady]);

    return (
        <div className={styles.root}>
            <ValorantNavbar />
            <h1 className={styles.title}>Choose your game</h1>
            <div className={styles["games-container"]}>
                <div className={styles.games}>
                    <div onClick={e => {
                        window.location.href = "/valorant";
                    }} className={styles.val}>
                        <div className={styles.overlay}>
                            <img src="/val.png" style={{ height: '70px', width: '80px' }} />
                            <h2 className={styles["val-label"]}>Valorant</h2>
                        </div>
                    </div>
                </div>
                <div className={styles.games}>
                    <div onClick={e => {
                        window.location.href = "/rocket-league";
                    }} className={styles.rl}>
                        <div className={styles.overlay}>
                            <img src="/rl-logo.webp" style={{ height: '200px' }} />
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default ChooseGame;