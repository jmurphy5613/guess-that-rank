import styles from './PostGuessPopup.module.css';
import { useRouter } from 'next/router';
interface PostGuessPopupProps {
    correct: boolean,
    rankGuessed: string,
    correctRank: string,
    clipId: number
}

const PostGuessPopup:React.FC<PostGuessPopupProps> = ({ correct, rankGuessed, correctRank, clipId }) => {

    const router = useRouter();

    return (
        <div className={styles.root}>
            <div className={styles.popup}>
                {!correct &&
                <>
                    <h2 className={styles["actual-rank"]}>Actual Rank: {correctRank}</h2>
                </>
                }
                {correct &&
                    <h1 style={{ color: '#ffffff' }}>Correct!</h1>
                }
                <button className={styles["go-next"]} onClick={e => {
                    router.push(`/valorant/${clipId+1}`)
                }}>Go Next</button>
            </div>
        </div>
    )
}

export default PostGuessPopup;