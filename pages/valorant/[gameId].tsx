import styles from '../../styles/App.module.css';
import Navbar from '../../components/navbar/navbar';
import axios from 'axios';
import { Router, useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { useUser } from '@auth0/nextjs-auth0';
import Select from 'react-select';
import PostGuessPopup from '../../components/post-guess-popup/PostGuessPopup';



const rankOptions = [
    {value: 'iron1', label: 'Iron 1'},
    {value: 'iron2', label: 'Iron 2'},
    {value: 'iron3', label: 'Iron 3'},
    {value: 'brronze1', label: 'Bronze 1'},
    {value: 'brronze2', label: 'Bronze 2'},
    {value: 'brronze3', label: 'Bronze 3'},
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

    const {user} = useUser();
    const router = useRouter();
    const { gameId } = router.query;

    const [currentClip, setCurrentClip] = useState({});
    const [selectedRank, setSelectedRank] = useState({});

    const [guessed, setGuessed] = useState(false);
    const [correct, setCorrect] = useState(false);
    const [correctRank, setCorrectRank] = useState("");

    useEffect(() => {
        //fetch data here
        if(!router.isReady) return;

        const { gameId } = router.query;
        axios.get(`http://localhost:3002/clips/by-id/${gameId}`).then(e => {
            setCurrentClip(e.data);
        })

    }, [router.isReady]);


    const handleGuess = () => {
        axios.post(`http://localhost:3002/guess/add`, {
            clipId: parseInt(gameId),
            rank: selectedRank.value,
            user: user?.nickname
        }).then(e => {
            console.log(e.data);
            setCorrectRank(e.data.correctRank);
            if(e.data.response == 'correct') setCorrect(true);
        });
        setGuessed(true);
    }

    return (
        <div className={styles.root}>
            <Navbar username={currentClip.user} title={currentClip.videoName} />
            <div style={{ display: 'flex' }}>
                <Select 
                    options={rankOptions}
                    onChange={setSelectedRank}
                    className={styles["rank-select"]}
                />
                <button className={styles["make-guess"]} onClick={handleGuess}>Lock In</button>
            </div>
            <iframe className={styles.video} width="65%" height="70%" src="https://medal.tv/clip/py3JYxhFSz3gR/vpW9j0a5T" frameborder="0" allow="autoplay" allowfullscreen></iframe>

            {guessed && <PostGuessPopup correct={correct} rankGuessed={selectedRank.value} correctRank={correctRank} clipId={gameId} />}

        </div>
    )
}


export default ClipPage;