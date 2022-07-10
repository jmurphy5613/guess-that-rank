import styles from './valorant-nav.module.css';
import { useUser } from '@auth0/nextjs-auth0';


const ValorantNavbar = () => {

    const { user } = useUser();

    return (
        <div className={styles.root}>
            <img src="/logo.png" className={styles.logo} />
            <div className={styles["button-wrapper"]}>
                <h2 className={styles["identity-title"]}>{user?.nickname}</h2>
                {user && <a href="/api/auth/logout">
                    <button className={styles.signin}>Logout</button>
                </a>}
                {!user && <a href="/api/auth/login">
                    <button className={styles.signin}>Login</button>\
                </a>}
            </div>
        </div>
    )
}

export default ValorantNavbar;