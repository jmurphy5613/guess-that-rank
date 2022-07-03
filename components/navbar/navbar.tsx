import styles from './navbar.module.css';
import { AiOutlineLeft } from 'react-icons/ai';

import { useRouter } from 'next/router';
import { useUser } from '@auth0/nextjs-auth0';


type NavbarProps = {
    title: string,
    username: string,
}

const Navbar:React.FC<NavbarProps> = ({ title, username }) => {

    const router = useRouter();

    const { user } = useUser();

    return (
        <div className={styles.root}>
            <h1 className={styles.title}>
                <AiOutlineLeft onClick={() => {
                    router.push('/');
                }} className={styles.arrow} color="#C25Eff" />"{title}" by 
                <span className={styles.pink}>@{username}</span>
            </h1>
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

export default Navbar;