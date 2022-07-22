// @ts-nocheck

import styles from '../../styles/App.module.css';
import Navbar from '../../components/navbar/navbar';
import axios from 'axios';
import { Router, useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { useUser } from '@auth0/nextjs-auth0';
import Select from 'react-select';
import PostGuessPopup from '../../components/post-guess-popup/PostGuessPopup';
import ReactGa from 'react-ga';


const rankOptions = [
    {value: 'iron1', label: 'Iron 1'},
    {value: 'iron2', label: 'Iron 2'},
    {value: 'iron3', label: 'Iron 3'},
    {value: 'bronze1', label: 'Bronze 1'},
    {value: 'bronze2', label: 'Bronze 2'},
    {value: 'bronze3', label: 'Bronze 3'},
    {value: 'silver1', label: 'Silver 1'},
    {value: 'silver2', label: 'Silver 2'},
    {value: 'silver3', label: 'Silver 3'},
    {value: 'gold1', label: 'Gold 1'},
    {value: 'gold2', label: 'Gold 2'},
    {value: 'gold3', label: 'Gold 3'},
    {value: 'plat1', label: 'Platinum 1'},
    {value: 'plat2', label: 'Platinum 2'},
    {value: 'plat3', label: 'Platinum 3'},
    {value: 'diamond1', label: 'Diamond 1'},
    {value: 'diamond2', label: 'Diamond 2'},
    {value: 'diamond3', label: 'Diamond 3'},
    {value: 'ascendant1', label: 'Ascendant 1'},
    {value: 'ascendant2', label: 'Ascendant 2'},
    {value: 'ascendant3', label: 'Ascendant 3'},
    {value: 'immortal1', label: 'Immortal 1'},
    {value: 'immortal2', label: 'Immortal 2'},
    {value: 'immortal3', label: 'Immortal 3'},
    {value: 'radiant', label: 'Radiant'}
]

const ClipPage = () => {

    const { user } = useUser();
    const router = useRouter();
    const { gameId } = router.query;

    const [currentClip, setCurrentClip] = useState({
        user: '',
        videoName: '',
        videoURL: ''

    });
    const [selectedRank, setSelectedRank] = useState({
        value: ''
    });

    const [guessed, setGuessed] = useState(false);
    const [correct, setCorrect] = useState(false);
    const [correctRank, setCorrectRank] = useState("");

    const [dataFetched, setDataFetched] = useState(false);

    const [alreadyGuessed, setAlreadyGuessed] = useState("");

    useEffect(() => {
        //fetch data here
        if(!router.isReady) return;
        const { gameId } = router.query;

        if(!user) {
            const guessedClips = localStorage.getItem('guessedClipsValorant');
            if(guessedClips?.indexOf(gameId) == -1) {
                setAlreadyGuessed("false");
            }

            axios.get(`https://guessthatrank.herokuapp.com/clips/by-id/${gameId}`).then(e => {
                setCurrentClip(e.data);
            });

            setDataFetched(true);
            return;
        }

        ReactGa.initialize('UA-234221342-1');
        ReactGa.pageview(router.pathname);

        axios.get(`https://guessthatrank.herokuapp.com/clips/by-id/${gameId}`).then(e => {
            setCurrentClip(e.data);
        });

        axios.get(`https://guessthatrank.herokuapp.com/guess/has-already-gussed/${gameId}/${user?.nickname}`).then(e => {
            setAlreadyGuessed(e.data.response);
        })

        setDataFetched(true);

    }, [router.isReady]);

    const isCorrect = () => {
        return selectedRank.value === currentClip.rank;
    }

    const handleGuess = () => {

        if(!user) {
            localStorage.setItem('guessedClipsValorant', `${localStorage.getItem('guessedClipsValorant')},${gameId}`);
            axios.post(`https://guessthatrank.herokuapp.com/guess/add`, {
                clipId: parseInt(gameId),
                user: 'guest',
                rank: selectedRank.value,
                isCorrect: isCorrect()
            }).then(e => {
                setGuessed(true);
                if(e.data.response == correct) setCorrect(true);
                setCorrectRank(e.data.correctRank);
            });
            return;
        }

        axios.post(`https://guessthatrank.herokuapp.com/guess/add`, {
            clipId: parseInt(gameId),
            rank: selectedRank.value,
            user: user?.nickname,
            isCorrect: isCorrect()
        }).then(e => {
            setCorrectRank(e.data.correctRank);
            if(e.data.response == correct) setCorrect(true);
            setGuessed(true);
        });
    }

    if(!dataFetched) return <div></div>

    return (
        <div className={styles.root}>
            <Navbar username={currentClip.user} title={currentClip.videoName} />
            {alreadyGuessed == "false" && <div style={{ display: 'flex', maxWidth: '100vw' }}>
                {user?.nickname !== currentClip.user ?                 
                <>
                    <Select 
                        options={rankOptions}
                        onChange={setSelectedRank}
                        className={styles["rank-select"]}
                    />
                    <button className={styles["make-guess"]} onClick={handleGuess}>Lock In</button> 
                </>
                :
                <h2 className={styles.thankyou}>Thanks for sumbitting this clip!</h2>
            }
            </div>}
            <iframe className={styles.video} width="65%" height="70%" src={`${currentClip.videoURL}`} frameBorder="0" allow="autoplay" allowFullScreen></iframe>

            {guessed && <PostGuessPopup correct={isCorrect()} rankGuessed={selectedRank.value} correctRank={correctRank} clipId={gameId} />}

        </div>
    )
}


export default ClipPage;