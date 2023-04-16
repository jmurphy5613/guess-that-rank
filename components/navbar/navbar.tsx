import styles from './navbar.module.css';
import { AiOutlineLeft } from 'react-icons/ai';

import { useRouter } from 'next/router';
import { useUser } from '@auth0/nextjs-auth0';
import { useState } from 'react';

import NavbarPopup from './NavbarPopup/NavbarPopup';

type NavbarProps = {
    title: string,
    username: string,
    game: string,
}

const Navbar:React.FC<NavbarProps> = ({ title, username, game }) => {

    const router = useRouter();

    const { user } = useUser();

    const [showPopup, setShowPopup] = useState(false);

    return (
        <div className={styles.root}>
            <h1 className={styles.title}>
                <AiOutlineLeft onClick={() => {
                    window.location.href = `/${game}`;
                }} className={styles.arrow} color="#C25Eff" />
                &quot;{title}&quot; by&nbsp;
                <span className={styles.pink}>{`@${username}`}</span>
            </h1>
            <div className={styles["button-wrapper"]}>
                <h2 className={styles["identity-title"]}>{user?.nickname}</h2>
                {user && 
                    <NavbarPopup />
                }
                {!user &&
                    <button className={styles.signin} onClick={e => {
                        router.push("/api/auth/login");
                    }}>Login</button>
                }
            </div>
        </div>
    )
}

export default Navbar;