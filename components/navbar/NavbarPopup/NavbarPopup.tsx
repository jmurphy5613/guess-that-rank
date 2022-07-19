import styles from './NavbarPopup.module.css';
import Popup from 'reactjs-popup';
import { useUser } from '@auth0/nextjs-auth0';
import { useRouter } from 'next/router';

const NavbarPopup = () => {

    const { user } = useUser();
    const router = useRouter();

    return (
        <div className={styles.root}>
            <Popup arrow={false} closeOnDocumentClick trigger={ <img src={`https://gradient-avatar.glitch.me/${user?.nickname}`} alt="" className={styles.icon} /> }>
                <div className={styles["popup-container"]}>
                    <button className={styles.button} onClick={() => {
                        router.push('/profiles/' + user?.nickname);
                    }}>View Profile</button>
                    <button className={styles.button} onClick={() => {
                        router.push('/api/auth/logout');
                    }}>Logout</button>
                </div>
            </Popup>
        </div>
    )
}

export default NavbarPopup;