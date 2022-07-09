import styles from '../../styles/ValorantHome.module.css';
import ValorantNavbar from '../../components/navbar/valorant/valorant-nav';
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useUser } from '@auth0/nextjs-auth0';
import { useRouter } from 'next/router';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import ClipGrid from '../../components/valorant/clip-grid/ClipGrid';


const ValorantHome = () => {

    const { user } = useUser();
    const router = useRouter();

    const [tabSelected, setTabSelected] = useState("completed");

    const [guessedClipsIds, setGuessedClipsIds] = useState([]);
    const [notGuessClipsIds, setNonGuessedClipsIds] = useState([]);
    const [completeClipObjects, setCompleteClipObjects] = useState([]);
    const [incompleteClipObjects, setIncompleteClipObjects] = useState([]);

    const [dataFetched, setDataFetched] = useState(false);


    useEffect(() => {
        if(!user) return;

        //get the ids of all the guessed clips
        let guessed:number[] = [];
        axios.get(`http://localhost:3002/guess/guessed/${user.nickname}`).then(e => {
            const res = e.data;
            for(let i = 0; i < res.length; i++) {
                guessed.push(res[i].clipId);
            }
            setGuessedClipsIds(guessed);
            for(let i = 0; i < guessedClipsIds.length; i++) {
                axios.get(`http://localhost:3002/clips/by-id/${guessedClipsIds[i]}`).then(e => {
                    completeClipObjects.push(e.data);
                })
            }
        })

        //get the ids of all clips that have not been guessed
        let notGuessed:number[] = [];
        axios.get('http://localhost:3002/clips/get-all').then(e => {
            for(let i = 0; i < e.data.length; i++) {
                let isInGuessed = false;
                for(let j = 0; j < guessed.length; j++) {
                    if(guessed[j] == e.data[i].id) {
                        isInGuessed = true;
                    }
                }
                if(!isInGuessed) notGuessed.push(e.data[i].id);
            }
            setNonGuessedClipsIds(notGuessed);
            for(let i = 0; i < notGuessClipsIds.length; i++) {
                axios.get(`http://localhost:3002/clips/by-id/${notGuessClipsIds[i]}`).then(e => {
                    incompleteClipObjects.push(e.data);
                });
            }
    
        });

        setDataFetched(true);
    }, [user])


    const noAccountNotify = () => {
        toast.error('You need to login to do that!', {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }

    const playedAllCips = () => {
        toast.error('You have seen every clip!', {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }

    if(!dataFetched) return <div></div>

    return (
        <div className={styles.root}>
            <button className={styles.play} onClick={() => {
                if(notGuessClipsIds.length === 0) playedAllCips();
                else {
                    router.push(`/valorant/${notGuessClipsIds[0]}`);
                }
            }}>Play</button>
            <button className={styles["create-clip"]} onClick={() => {
                if(user) {
                    router.push('/create-clip')
                } else {
                    noAccountNotify();
                }
            }}>+</button>
            <ValorantNavbar />
            <div className={styles["tabs"]}>
                <div className={styles["tab-container"]}>
                    <h2 className={styles.tab} onClick={() => {
                        setTabSelected("completed")
                    }}>Completed ({guessedClipsIds.length})</h2>
                    {tabSelected === "completed" && <div className={styles["tab-indicator"]}></div>}
                </div>
                <div className={styles["tab-container"]}>
                    <h2 className={styles.tab} onClick={() => {
                        setTabSelected("incomplete")
                    }}>Incomplete ({notGuessClipsIds.length})</h2>
                    {tabSelected === "incomplete" && <div className={styles["tab-indicator"]}></div>}
                </div>
                <ToastContainer
                    position="bottom-center"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme={'dark'}
                />
            </div>

            {/*This is where the clip grid will be*/}
            {tabSelected == 'completed' && <ClipGrid />}
            {tabSelected == 'incomplete' && <ClipGrid />}

        </div>
    )
}

export default ValorantHome;