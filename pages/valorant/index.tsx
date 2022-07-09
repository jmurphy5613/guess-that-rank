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

    const [incompleteClips, setIncompleteClips] = useState([]);

    const [dataFetched, setDataFetched] = useState(false);


    useEffect(() => {
        if(!user) return;
        axios.get(`http://localhost:3002/guess/not-guessed/${user.nickname}`).then(e => {
            setIncompleteClips(e.data);
            setDataFetched(true);
        })
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
                    }}>Completed ({incompleteClips.length})</h2>
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
            {tabSelected == 'completed' && <ClipGrid clips={incompleteClips} />}
            {tabSelected == 'incomplete' && <ClipGrid clips={incompleteClips} />}

        </div>
    )
}

export default ValorantHome;