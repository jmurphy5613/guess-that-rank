import styles from './navbar.module.css';
import { AiOutlineLeft } from 'react-icons/ai';


type NavbarProps = {
    title: string,
    username: string,
}

const Navbar:React.FC<NavbarProps> = ({ title, username }) => {


    return (
        <div className={styles.root}>
            
            <h1 className={styles.title}>
                <AiOutlineLeft className={styles.arrow} color="#C25Eff" />"{title}" by 
                <span className={styles.pink}>@{username}</span>
            </h1>
        </div>
    )
}

export default Navbar;