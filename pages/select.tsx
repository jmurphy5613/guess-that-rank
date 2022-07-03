import styles from '../styles/ChooseGame.module.css';
import { useRouter } from 'next/router';


const ChooseGame = () => {

    const router = useRouter();

    return (
        <div className={styles.root}>
            <h1 className={styles.title}>Choose your game</h1>
            <div className={styles.games}>
                <div onClick={e => {
                    router.push('/rocketleague')
                }} className={styles.rl}>
                    <div className={styles.overlay}>
                        <h2 className={styles.label}>Rocket League</h2>
                    </div>
                </div>
                {/* <h1 className={styles.or}>OR</h1> */}
                <div onClick={e => {
                    router.push('/valorant')
                }} className={styles.val}>
                    <div className={styles.overlay}>
                        <h2 className={styles.label}>Valorant</h2>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default ChooseGame;