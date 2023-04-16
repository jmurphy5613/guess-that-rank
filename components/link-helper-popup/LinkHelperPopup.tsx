import styles from './LinkHelperPopup.module.css'

const LinkHelperPopup = () => {
    return (
        <div className={styles["modal-container"]}>
            <div className={styles["modal"]}>
                <h1 className={styles["modal-title"]}>How to get your link!</h1>
                <img className={styles.image} src='/link-help.jpg' />
            </div>
        </div>
    )
}

export default LinkHelperPopup