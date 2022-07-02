import styles from './navbar.module.css';


type NavbarProps = {
    title: string,
    owner: string,
}

const Navbar:React.FC<NavbarProps> = ({ title, owner }) => {


    return (
        <div className={styles.root}>
            <h1 className={styles.title}>"{title}" by {owner}</h1>
        </div>
    )
}

export default Navbar;