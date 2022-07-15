import styles from './valorant-nav.module.css';
import { useUser } from '@auth0/nextjs-auth0';
import { useRouter } from 'next/router';
import Link from 'next/link';



const ValorantNavbar = () => {

    const router = useRouter();
    const { user } = useUser();

    return (
        <div className={styles.root}>
            <Link href="/">
                <img src="/logo.png" className={styles.logo} />
            </Link>
            <div className={styles["button-wrapper"]}>
                <h2 className={styles["identity-title"]}>{user?.nickname}</h2>
                {user && 
                    <button className={styles.signin} onClick={e => {
                        router.push('/api/auth/logout');
                    }}>Logout</button>
                }
                {!user && 
                    <button className={styles.signin} onClick={e => {
                        router.push('/api/auth/login');
                    }}>Login</button>
                }
            </div>
        </div>
    )
}

export default ValorantNavbar;