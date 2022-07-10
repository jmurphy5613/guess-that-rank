import styles from './navbar.module.css';
import { AiOutlineLeft } from 'react-icons/ai';

import { useRouter } from 'next/router';
import { useUser } from '@auth0/nextjs-auth0';
import Link from 'next/link';


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
                    router.push('/valorant');
                }} className={styles.arrow} color="#C25Eff" />
                &quot;{title}&quot; by&nbsp;
                <span className={styles.pink}>{`@${username}`}</span>
            </h1>
            <div className={styles["button-wrapper"]}>
                <h2 className={styles["identity-title"]}>{user?.nickname}</h2>
                {user && <Link href="/api/auth/logout">
                    <button className={styles.signin}>Logout</button>
                </Link>}
                {!user && <Link href="/api/auth/login">
                    <button className={styles.signin}>Login</button>\
                </Link>}
            </div>
        </div>
    )
}

export default Navbar;