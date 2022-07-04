import styles from './valorant-nav.module.css';


const ValorantNavbar = () => {
    return (
        <div className={styles.root}>
            <img src="/logo.png" className={styles.logo} />
        </div>
    )
}

export default ValorantNavbar;