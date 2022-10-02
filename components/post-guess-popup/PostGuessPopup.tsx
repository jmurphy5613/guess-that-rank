import styles from './PostGuessPopup.module.css';
import { useRouter } from 'next/router';
import { shortRankToLongVal } from '../../utils/convertions';
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

    const [unGuessedClips, setUnGuessedClips] = useState([{} as any]);

    const [numberCorrect, setNumberCorrect] = useState(0);
    const [numberIncorrect, setNumberIncorrect] = useState(0);

    useEffect(() => {

        if(!user) {
            setNumberCorrect(localStorage.getItem('correctValorantGuesses') ? parseInt(localStorage.getItem('correctValorantGuesses') as string) : 0);
            setNumberIncorrect(localStorage.getItem('incorrectValorantGuesses') ? parseInt(localStorage.getItem('incorrectValorantGuesses') as string) : 0);

            const guessedClips = localStorage.getItem('guessedClipsValorant');
            axios.get('https://guessthatrank.herokuapp.com/clips/get-all/val').then(e => {
                const unGuessedClips = e.data.filter((clip: any) => !guessedClips?.includes(clip.id));
                setUnGuessedClips(unGuessedClips);
                console.log(unGuessedClips)
            });

            return;
        }

        axios.get(`https://guessthatrank.herokuapp.com/guess/not-guessed-clips/${user?.nickname}`).then(e => {
            setUnGuessedClips(e.data);
        });
        axios.get(`https://guessthatrank.herokuapp.com/guess/record/${user?.nickname}`).then(e => {
            setNumberCorrect(e.data.correct);
            setNumberIncorrect(e.data.total - e.data.correct);
            console.log(e.data.total);
        });

        console.log(correct);
    }, [])

    return (
        <div className={styles.root}>
            <div className={styles.popup}>
                {/* <h1 style={{ color: 'white' }}>{`Record: ${numberCorrect}-${numberIncorrect}`}</h1>
                {!correct && <h2 className={styles.guess}>You guessed: {shortRankToLongVal(rankGuessed)}</h2>}
                {!correct &&
                <>
                    <h2 className={styles["actual-rank"]}>Actual Rank: {shortRankToLongVal(correctRank)}</h2>
                </>
                }
                {correct &&
                    <h2 className={styles["actual-rank"]}>Correct!</h2>
                }
                <button className={styles["go-next"]} onClick={e => {
                    if(unGuessedClips.length  == 0) router.push('/valorant');
                    else {
                        router.push(`/valorant/gameId=${unGuessedClips[0].id}`, `/valorant/${unGuessedClips[0].id}`);
                    }
                }}>Go Next</button> */}
                <div className={styles["total-points"]}>
                    <h1 className={styles.total}>5</h1>
                    <h3 className={styles.label}>points</h3>
                </div>
                <div className={styles["point-contributions"]}>
                    <div className={styles["point-contribution"]}>
                        <h2 className={styles["contribution-points"]}>1</h2>
                        <h3 className={styles["contribution-label"]}>correct rankset</h3>
                    </div>
                    <h3 className={styles.plus}>+</h3>
                    <div className={styles["point-contribution"]}>
                        <h2 className={styles["contribution-points"]}>1</h2>
                        <h3 className={styles["contribution-label"]}>correct rankset</h3>
                    </div>
                    <h3 className={styles.plus}>+</h3>
                    <div className={styles["point-contribution"]}>
                        <h2 className={styles["contribution-points"]}>1</h2>
                        <h3 className={styles["contribution-label"]}>correct rankset</h3>
                    </div>
                    <h3 className={styles.plus}>+</h3>
                    <div className={styles["point-contribution"]}>
                        <h2 className={styles["contribution-points"]}>1</h2>
                        <h3 className={styles["contribution-label"]}>correct rankset</h3>
                    </div>
                </div>
                <div className={styles.leave}>

                </div>
            </div>
        </div>
    )
}

export default PostGuessPopup;