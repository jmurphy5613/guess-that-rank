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
                        <img className={styles.video} src={`//image.thum.io/get/${item.videoURL}`} />


                    </div>
                )
            })}
        </div>
    )
}

export default ClipGrid;