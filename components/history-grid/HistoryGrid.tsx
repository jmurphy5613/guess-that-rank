import styles from './HistoryGrid.module.css'


interface HistoryGridProps {
    guesses: Array<Object>
}

const HistoryGrid:React.FC<HistoryGridProps> = ({ guesses }) => {
    return  (
        <div className={styles.grid}>
            {guesses.map((element, index) => {
                return (
                    <div className={styles["grid-item"]}>
                        <h1>Hello World</h1>
                    </div>
                )
            })}
        </div>
    )
}

export default HistoryGrid;