import styles from '../styles/Login.module.css';
import { useRouter } from 'next/router';


const userSelection = () => {

    const router = useRouter();

    return (
        <div className={styles.root}>
            <div className={styles["button-group"]}>
                <img style={{ height: '50px', marginTop: '1rem' }} src="/logo.png" />
                <h1 className={styles.title}>Would you like to:</h1>
                <button className={styles.option} onClick={() => {
                    router.push('/select')
                }}>Continue As Guest</button>
                <a href="/api/auth/login">
                    <button className={styles.option}>Login</button>
                </a>
            </div>
        </div>
    )
}

export default userSelection;