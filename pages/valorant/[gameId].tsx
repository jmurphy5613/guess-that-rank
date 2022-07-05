import styles from '../../styles/App.module.css';
import Navbar from '../../components/navbar/navbar';
import axios from 'axios';
import { Router, useRouter } from 'next/router';
import { useState, useEffect } from 'react';

const ClipPage = () => {

    const router = useRouter();

    const [makingGuess, setMakingGuess] = useState(false);

    const [currentClip, setCurrentClip] = useState({});

    useEffect(() => {
        //fetch data here
        if(!router.isReady) return;

        const { gameId } = router.query;
        console.log(gameId);
        axios.get(`http://localhost:3002/clips/by-id/${gameId}`).then(e => {
            setCurrentClip(e.data);
        })

    }, [router.isReady])

    return (
        <div className={styles.root}>
            <Navbar username={currentClip.user} title={currentClip.videoName} />
            <iframe className={styles.video} width="65%" height="70%" src="https://medal.tv/clip/py3JYxhFSz3gR/vpW9j0a5T" frameborder="0" allow="autoplay" allowfullscreen></iframe>
            <button className={styles["make-guess"]}>Make Guess</button>
        </div>
    )
}


export default ClipPage;