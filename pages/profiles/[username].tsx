import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ReactGa from 'react-ga';
import { AiOutlineLeft } from "react-icons/ai";
import styles from '../../styles/Profile.module.css';
import axios from "axios";
import ClipGrid from "../../components/valorant/clip-grid/ClipGrid";


const Profile = () => {

    const router = useRouter();
    const { username } = router.query;

    const [tabSelected, setTabSelected] = useState("History");
    const [allClips, setAllClips] = useState([]);
    const [allGuesses, setAllGuesses] = useState([]);
    
    useEffect(() => {
        if(!router.isReady) {
            return;
        }
        ReactGa.initialize('UA-234221342-1');
        ReactGa.pageview(router.pathname);

        axios.get(`http://localhost:3002/clips/get-all/by-user/${username}`).then(e => {
            console.log(e.data);
            setAllClips(e.data);
        });
    }, [router.isReady])

    return (
        <div className={styles.root}>

            <div className={styles["go-back"]} onClick={() => {
                router.back();
            }}>
                <AiOutlineLeft color="#C25Eff" />
                <h3 className={styles["back-text"]}>Go Back</h3>
            </div>

            <img src={`https://gradient-avatar.glitch.me/${username}`} className={styles.icon} />
            <h1 className={styles.username}>{username}</h1>

            <div className={styles["tabs"]}>
                <div className={styles["tab-container"]}>
                    <h2 className={styles.tab} onClick={() => {
                        setTabSelected("History");
                    }}>History ()</h2>
                    {tabSelected === "History" && <div className={styles["tab-indicator"]}></div>}
                </div>
                <div className={styles["tab-container"]}>
                    <h2 className={styles.tab} onClick={() => {
                        setTabSelected("Clips")
                    }}>Clips ({allClips.length})</h2>
                    {tabSelected === "Clips" && <div className={styles["tab-indicator"]}></div>}
                </div>
            </div>
            {tabSelected === "Clips" && <ClipGrid clips={allClips} /> }
        </div>
    )
}

export default Profile;