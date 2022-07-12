import styles from './PostGuessPopup.module.css';
import { useRouter } from 'next/router';
import { shortRankToLong } from '../../utils/convertions';
import { useEffect, useState } from 'react';
import { useUser } from '@auth0/nextjs-auth0';
import axios from 'axios';
interface PostGuessPopupProps {
    correct: boolean,
    rankGuessed: string,
    correctRank: string,
    clipId: number
}

const PostGuessPopup:React.FC<PostGuessPopupProps> = ({ correct, rankGuessed, correctRank, clipId }) => {

    const router = useRouter();
    const { user } = useUser();

    const [percentCorrect, setPercentCorrect] = useState(0);
    const [unGuessedClips, setUnGuessedClips] = useState([{} as any]);

    useEffect(() => {
        axios.get(`https://guessthatrank.herokuapp.com/percent-correct/${clipId}`).then(e => {
            setPercentCorrect(e.data.percent);
        });
        axios.get(`https://guessthatrank.herokuapp.com/guess/not-guessed-clips/${user?.nickname}`).then(e => {
            setUnGuessedClips(e.data);
        });
    }, [])

    console.log(unGuessedClips)

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
                    router.push(`/valorant/${unGuessedClips[0].id}`)
                }}>Go Next</button>
            </div>
        </div>
    )
}

export default PostGuessPopup;