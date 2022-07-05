import styles from '../styles/CreateClip.module.css';
import Select from 'react-select';

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


    return (
        <div className={styles.root}>
            <h1 className={styles.title}>Upload your own clip!</h1>
            <Select
                options={gameOptions}
                onChange={setGameSelctionOption}
            />
            <Select 
                options={platformOptions}
                onChange={setPlatformSelectedOption}
            />
            <input placeholder={"Clip URL"} />
            <button className={styles.submit}>Submit</button>
        </div>
    )
}

export default CreateClip;