import styles from '../../styles/Valorant.module.css';


const userSelection = () => {
    return (
        <div className={styles.root}>
            <div className={styles["button-group"]}>
                <img style={{ height: '50px', marginTop: '1rem' }} src="/logo.png" />
                <h1 className={styles.title}>Would you like to:</h1>
                <button className={styles.option}>Continue As Guest</button>
                <button className={styles.option}>Login</button>
            </div>
        </div>
    )
}

export default userSelection;