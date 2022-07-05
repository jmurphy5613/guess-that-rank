import styles from '../styles/CreateClip.module.css';
import Select from 'react-select';
import { AiOutlineLeft } from 'react-icons/ai';
import { useRouter } from 'next/router';


import { useState } from 'react';


const gameOptions = [
    {value: 'val', label: 'Valorant'},
    {value: 'rl', label: 'Rocket League'}
]
const platformOptions = [
    {value: 'medal', label: 'Medal'},
    {value: 'youtube', label: 'Youtube'}
]

const CreateClip = () => {

    const [gameSelectedOption, setGameSelctionOption] = useState("");
    const [platformSelectedOption, setPlatformSelectedOption] = useState("");

    const router = useRouter();

    return (
        <div className={styles.root}>

            <div className={styles["go-back"]} onClick={() => {
                router.push('/valorant')
            }}>
                <AiOutlineLeft color="#C25Eff" />
                <h3 className={styles["back-text"]}>Go Back</h3>
            </div>

            <h1 className={styles.title}>Upload your own clip!</h1>
            <Select
                className={styles.select}
                options={gameOptions}
                onChange={setGameSelctionOption}
            />
            <Select
                className={styles.select}
                options={platformOptions}
                onChange={setPlatformSelectedOption}
            />
            <input className={styles["url-input"]} placeholder={"Clip URL"} />
            <button className={styles.submit}>Submit</button>
        
        </div>
    )
}

export default CreateClip;