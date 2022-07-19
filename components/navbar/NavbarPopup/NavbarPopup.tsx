import styles from './NavbarPopup.module.css';
import Popup from 'reactjs-popup';
import { useUser } from '@auth0/nextjs-auth0';


const NavbarPopup = () => {

    const { user } = useUser();

    return (
        <div className={styles.root}>
            <Popup arrow={false} closeOnDocumentClick trigger={ <img src={`https://gradient-avatar.glitch.me/${user?.nickname}`} alt="" className={styles.icon} /> }>
                <div className={styles["popup-container"]}>
                    <button className={styles.button}>View Profile</button>
                    <button className={styles.button}>Logout</button>
                </div>
            </Popup>
        </div>
    )
}

export default NavbarPopup;