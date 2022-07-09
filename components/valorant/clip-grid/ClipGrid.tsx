import styles from './ClipGrid.module.css';

interface ClipGridProps {
    clips: Array<Object>
}

const ClipGrid:React.FC<ClipGridProps> = ({ clips }) => {


    return (
        <div className={styles.grid}>
            {clips.map(item => {
                return (
                    <div className={styles["grid-item"]}>
                        <h2 className={styles.title}>{item.user}</h2>
                    </div>
                )
            })}
        </div>
    )
}

export default ClipGrid;