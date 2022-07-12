import styles from '../styles/Login.module.css';
import { useRouter } from 'next/router';

const userSelection = () => {

    const router = useRouter();

    return (
        <div className={styles.root}>
            <div className={styles["button-group"]}>
                <img style={{ height: '50px', marginTop: '1rem' }} src="/logo.png" />
                <h1 className={styles.title}>Login is required</h1>
                <button className={styles.option} onClick={e => {
                    router.push('/api/auth/login');
                }}>Login</button>
            </div>
        </div>
    )
}

export default userSelection;