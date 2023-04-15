import styles from '../../styles/GameHome.module.css'
import ValorantNavbar from "../../components/navbar/valorant/valorant-nav";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useUser } from "@auth0/nextjs-auth0";
import { useRouter } from "next/router";
import "react-toastify/dist/ReactToastify.css";
import ClipGrid from "../../components/valorant/clip-grid/ClipGrid";
import ReactGa from "react-ga";
import GoBack from '../../components/go-back/GoBack';

const ValorantHome = () => {
    const { user } = useUser();
    const router = useRouter();

    const [tabSelected, setTabSelected] = useState("incomplete");

    const [incompleteClips, setIncompleteClips] = useState([]);
    const [completedClips, setCompletedClips] = useState([]);

    const [dataFetched, setDataFetched] = useState(false);

    useEffect(() => {



        ReactGa.initialize("UA-234221342-1");
        ReactGa.pageview(router.pathname);

        setDataFetched(true);
    }, [router.isReady, user]);

    const noAccountNotify = () => {
        toast.error("You need to login to do that!", {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };

    const playedAllCips = () => {
        toast.error("You have seen every clip!", {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };

    if (!dataFetched) return <div></div>;

    return (
        <div className={styles.root}>
            <GoBack />
            <div className={styles["button-container"]}>
                <button
                    className={styles.play}
                    onClick={() => {
                        if (incompleteClips.length === 0) playedAllCips();
                        else {

                        }
                    }}
                >
                    Play
                </button>
                <button
                    className={styles.play}
                    onClick={(e) => {
                        if (user) {
                            router.push("/create-clip");
                        } else {
                            noAccountNotify();
                        }
                    }}
                >
                    Create clip
                </button>
            </div>
            <ValorantNavbar />
            <div className={styles["tabs"]}>
                <div className={styles["tab-container"]}>
                    <h2
                        className={styles.tab}
                        onClick={() => {
                            setTabSelected("completed");
                        }}
                    >
                        Completed ({completedClips.length})
                    </h2>
                    {tabSelected === "completed" && (
                        <div className={styles["tab-indicator"]}></div>
                    )}
                </div>
                <div className={styles["tab-container"]}>
                    <h2
                        className={styles.tab}
                        onClick={() => {
                            setTabSelected("incomplete");
                        }}
                    >
                        Incomplete ({incompleteClips.length})
                    </h2>
                    {tabSelected === "incomplete" && (
                        <div className={styles["tab-indicator"]}></div>
                    )}
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
                    theme={"dark"}
                />
            </div>

            {tabSelected == "completed" && (
                <ClipGrid game="valorant" clips={completedClips} />
            )}
            {tabSelected == "incomplete" && (
                <ClipGrid game="valorant" clips={incompleteClips} />
            )}
        </div>
    );
};

export default ValorantHome;