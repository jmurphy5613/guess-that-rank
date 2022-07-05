import styles from '../../styles/ValorantHome.module.css';
import ValorantNavbar from '../../components/navbar/valorant/valorant-nav';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useUser } from '@auth0/nextjs-auth0';
import { useRouter } from 'next/router';
import 'react-toastify/dist/ReactToastify.css';


const ValorantHome = () => {

    const { user } = useUser();
    const router = useRouter();

    const [tabSelected, setTabSelected] = useState("completed");

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

    return (
        <div className={styles.root}>
            <ValorantNavbar />
            {/* <div className={styles["tabs"]}>
                <div className={styles["tab-container"]}>
                    <h2 className={styles.tab} onClick={() => {
                        setTabSelected("completed")
                    }}>Completed</h2>
                    {tabSelected === "completed" && <div className={styles["tab-indicator"]}></div>}
                </div>
                <div className={styles["tab-container"]}>
                    <h2 className={styles.tab} onClick={() => {
                        setTabSelected("incomplete")
                    }}>Incomplete</h2>
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
            </div> */}
            <button className={styles.play} onClick={() => {
                router.push('/valorant/1');
            }}>Play</button>
            <button className={styles["create-clip"]} onClick={() => {
                if(user) {
                    router.push('/create-clip')
                } else {
                    noAccountNotify();
                }
            }}>+</button>
        </div>
    )
}

export default ValorantHome;