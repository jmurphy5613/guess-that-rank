import styles from './ClipGrid.module.css';
import { useRouter } from 'next/router';

interface ClipGridProps {
    clips: Array<Object>
}

const ClipGrid:React.FC<ClipGridProps> = ({ clips }) => {

    const router = useRouter();

    return (
        <div className={styles.grid}>
            {clips.map(item => {
                return (
                    <div className={styles["grid-item"]} onClick={e => {
                        router.push(`/valorant/${item.id}`)
                    }}>
                        <img className={styles.video} src={`//image.thum.io/get/${item.videoURL}`} />
                        <h4 className={styles.title}>{item.videoName}&nbsp;<span style={{ color: '#C25Eff' }}>@{item.user}</span></h4>

                    </div>
                )
            })}
        </div>
    )
}

export default ClipGrid;