import styles from '../styles/App.module.css';
import Navbar from '../components/navbar/navbar';

import { useState, useEffect } from 'react';

const App = () => {

    const [makingGuess, setMakingGuess] = useState(false);

    const [username, setUsername] = useState("jandro")
    const [title, setTitle] = useState("4k")

    useEffect(() => {
        //fetch data here
    }, [])

    return (
        <div className={styles.root}>
            <iframe className={styles.video} width="65%" height="70%" src="https://medal.tv/clip/py3JYxhFSz3gR/vpW9j0a5T?invite=cr-MSx2OEYsNzA1NTY5NTcs" frameborder="0" allow="autoplay" allowfullscreen></iframe>
            <button className={styles["make-guess"]}>Make Guess</button>
        </div>
    )
}

export default App;