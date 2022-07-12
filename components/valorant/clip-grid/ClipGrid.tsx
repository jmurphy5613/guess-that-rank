// @ts-nocheck


import styles from './ClipGrid.module.css';
import { useRouter } from 'next/router';

interface ClipGridProps {
    clips: Array<Object>
}

const ClipGrid:React.FC<ClipGridProps> = ({ clips }) => {

    const router = useRouter();

    return (
        <div className={styles.grid}>
            {clips.map((item, index) => {
                return (
                    <div className={styles["grid-item"]} key={index} onClick={e => {
                        router.push(`/valorant/${item.id}`)
                    }}>
                        <img className={styles.video} src={`//image.thum.io/get/auth/60836-jmurphy5613/${item.videoURL}`} />
                        {item.videoName.length > 15 ? <h4 className={styles.title}>{item.videoName.substring(0, 15)}...&nbsp;<span style={{ color: '#C25Eff' }}>@{item.user}</span></h4> : <h4 className={styles.title}>{item.videoName}&nbsp;<span style={{ color: '#C25Eff' }}>@{item.user}</span></h4>}

                    </div>
                )
            })}
        </div>
    )
}

export default ClipGrid;