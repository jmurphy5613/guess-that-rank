import styles from '../styles/Login.module.css';
import Link from 'next/link';


const userSelection = () => {

    return (
        <div className={styles.root}>
            <div className={styles["button-group"]}>
                <img style={{ height: '50px', marginTop: '1rem' }} src="/logo.png" />
                <h1 className={styles.title}>Login is required</h1>
                {/* <button className={styles.option} onClick={() => {
                    router.push('/select')
                }}>Continue As Guest</button> */}
                <Link href="/api/auth/login">
                    <button className={styles.option}>Login</button>
                </Link>
            </div>
        </div>
    )
}

export default userSelection;