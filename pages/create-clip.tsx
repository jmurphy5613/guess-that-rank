import styles from '../styles/CreateClip.module.css';
import Select from 'react-select';
import { AiOutlineLeft } from 'react-icons/ai';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useUser } from '@auth0/nextjs-auth0';
import axios from 'axios';


const gameOptions = [
    {value: 'val', label: 'Valorant'},
    {value: 'rl', label: 'Rocket League'}
]
const platformOptions = [
    {value: 'medal', label: 'Medal'},
    {value: 'youtube', label: 'Youtube'}
]

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

const CreateClip = () => {

    const [gameSelectedOption, setGameSelctionOption] = useState("");
    const [platformSelectedOption, setPlatformSelectedOption] = useState("");
    const [rankOption, setRankOption] = useState("");
    const [videoURL, setVideoURL] = useState("");

    const { user } = useUser();
    const router = useRouter();

    // videoSource: {
    //     type: DataTypes.STRING,
    //     allowNull: false
    // },
    // videoURL: {
    //     type: DataTypes.STRING,
    //     allowNull: false
    // },
    // user: {
    //     type: DataTypes.STRING,
    //     allowNull: false
    // },
    // rank: {
    //     type: DataTypes.STRING,
    //     allowNull: false
    // }


    const uploadClip = () => {
        axios.post('http://localhost:3002/clips/add-clip', {
            videoSource: platformSelectedOption.value,
            videoURL: videoURL,
            user: user?.nickname,
            rank: rankOption.value,
            game: gameSelectedOption.value
        }).then(res => console.log(res.data));
    }

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
            <Select 
                className={styles.select}
                options={rankOptions}
                onChange={setRankOption}
            />
            <input className={styles["url-input"]} placeholder={"Clip URL"} onChange={e => {
                setVideoURL(e.target.value);
            }} />
            <button className={styles.submit} onClick={uploadClip}>Submit</button>
        </div>
    )
}

export default CreateClip;