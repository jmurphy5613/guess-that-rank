import styles from './navbar.module.css';
import { AiOutlineLeft } from 'react-icons/ai';

import { useRouter } from 'next/router';


type NavbarProps = {
    title: string,
    username: string,
}

const Navbar:React.FC<NavbarProps> = ({ title, username }) => {

    const router = useRouter();

    return (
        <div className={styles.root}>
            
            <h1 className={styles.title}>
                <AiOutlineLeft onClick={() => {
                    router.push('/');
                }} className={styles.arrow} color="#C25Eff" />"{title}" by 
                <span className={styles.pink}>@{username}</span>
            </h1>
            <div className={styles["button-wrapper"]}>
                <a href="">
                    
                </a>
                <button className={styles.signin}>Sign In</button>
            </div>
        </div>
    )
}

export default Navbar;