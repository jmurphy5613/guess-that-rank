import styles from './GoBack.module.css'
import { useRouter } from "next/router";
import { AiOutlineLeft } from "react-icons/ai";

const GoBack = () => {
    const router = useRouter();

    return (
        <div
            className={styles["go-back"]}
            onClick={() => {
                router.push("/select");
            }}
        >
            <AiOutlineLeft color="#C25Eff" />
            <h3 className={styles["back-text"]}>Go Back</h3>
        </div>
    )
};

export default GoBack;