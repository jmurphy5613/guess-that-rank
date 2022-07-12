import styles from './PostGuessPopup.module.css';
import { useRouter } from 'next/router';
import { shortRankToLong } from '../../utils/convertions';
import { useEffect, useState } from 'react';
import axios from 'axios';
interface PostGuessPopupProps {
    correct: boolean,
    rankGuessed: string,
    correctRank: string,
    clipId: number
}

const PostGuessPopup:React.FC<PostGuessPopupProps> = ({ correct, rankGuessed, correctRank, clipId }) => {

    const router = useRouter();

    const [percentCorrect, setPercentCorrect] = useState(0);

    useEffect(() => {
        axios.get(`http://localhost:3002/guess/percent-correct/${clipId}`).then(e => {
            setPercentCorrect(e.data.percent);
        });
    }, [])

    console.log(correctRank)

    return (
        <div className={styles.root}>
            <div className={styles.popup}>
                {!correct && <h2 className={styles.guess}>You guessed: {shortRankToLong(rankGuessed)}</h2>}
                {!correct &&
                <>
                    <h2 className={styles["actual-rank"]}>Actual Rank: {shortRankToLong(correctRank)}</h2>
                </>
                }
                {correct &&
                    <h2 className={styles["actual-rank"]}>Correct!</h2>
                }
                <h2 className={styles.stats}>{percentCorrect}% got this correct</h2>
                <button className={styles["go-next"]} onClick={e => {
                    router.push(`/valorant/${clipId+1}`)
                }}>Go Next</button>
            </div>
        </div>
    )
}

export default PostGuessPopup;