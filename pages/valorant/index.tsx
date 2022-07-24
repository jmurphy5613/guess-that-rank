// @ts-nocheck

import styles from '../../styles/ValorantHome.module.css';
import ValorantNavbar from '../../components/navbar/valorant/valorant-nav';
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useUser } from '@auth0/nextjs-auth0';
import { useRouter } from 'next/router';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import ClipGrid from '../../components/valorant/clip-grid/ClipGrid';
import { AiOutlineLeft } from 'react-icons/ai';
import ReactGa from 'react-ga';


const ValorantHome = () => {

    const { user } = useUser();
    const router = useRouter();

    const [tabSelected, setTabSelected] = useState("incomplete");

    const [incompleteClips, setIncompleteClips] = useState([]);
    const [completedClips, setCompletedClips] = useState([]);

    const [dataFetched, setDataFetched] = useState(false);


    useEffect(() => {
        if(!user) {

            const guessedClips = localStorage.getItem('guessedClipsValorant');
            axios.get('https://guessthatrank.herokuapp.com/clips/get-all/val').then(e => {
                setIncompleteClips(e.data.filter(clip => !guessedClips?.includes(clip.id)));
                setCompletedClips(e.data.filter(clip => guessedClips?.includes(clip.id)));
            });

            setDataFetched(true);
            return;
        }

        ReactGa.initialize('UA-234221342-1');
        ReactGa.pageview(router.pathname);

        console.log('ehllo');

        if(user) {
            axios.get(`https://guessthatrank.herokuapp.com/guess/not-guessed-clips/val/${user.nickname}`).then(e => {
                console.log(e.data);
                setIncompleteClips(e.data);
            });
            axios.get(`https://guessthatrank.herokuapp.com/guess/guessed-clips/val/${user.nickname}`).then(e => {
                setCompletedClips(e.data);
            })
        }
        
        setDataFetched(true);

    }, [router.isReady])


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

            <div className={styles["go-back"]} onClick={() => {
                router.push('/')
            }}>
                <AiOutlineLeft color="#C25Eff" />
                <h3 className={styles["back-text"]}>Go Back</h3>
            </div>

            <div className={styles["button-container"]}>
                <button className={styles.play} onClick={() => {
                    if(incompleteClips.length === 0) playedAllCips();
                    else {
                        router.push(`/valorant/${incompleteClips[0].id}`);
                    }
                }}>Play</button>
                <button className={styles.play} onClick={e => {
                    if(user) {
                        router.push('/create-clip')
                    } else {
                        noAccountNotify();
                    }
                }}>Create clip</button>
            </div>
            <ValorantNavbar />
            <div className={styles["tabs"]}>
                <div className={styles["tab-container"]}>
                    <h2 className={styles.tab} onClick={() => {
                        setTabSelected("completed")
                    }}>Completed ({completedClips.length})</h2>
                    {tabSelected === "completed" && <div className={styles["tab-indicator"]}></div>}
                </div>
                <div className={styles["tab-container"]}>
                    <h2 className={styles.tab} onClick={() => {
                        setTabSelected("incomplete")
                    }}>Incomplete ({incompleteClips.length})</h2>
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
            {tabSelected == 'completed' && <ClipGrid clips={completedClips} />}
            {tabSelected == 'incomplete' && <ClipGrid clips={incompleteClips} />}

        </div>
    )
}

export default ValorantHome;