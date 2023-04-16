import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ReactGa from "react-ga";
import { AiOutlineLeft } from "react-icons/ai";
import styles from "../../styles/Profile.module.css";
import axios from "axios";
import ClipGrid from "../../components/valorant/clip-grid/ClipGrid";
import HistoryGrid from "../../components/history-grid/HistoryGrid";
import { useUser } from '@auth0/nextjs-auth0';

const Profile = () => {
  const router = useRouter();
  const { username } = router.query;
  const { user } = useUser();

  const [dataFetched, setDataFetched] = useState(false);

  const [tabSelected, setTabSelected] = useState("History");
  const [allClips, setAllClips] = useState([]);
  const [allGuesses, setAllGuesses] = useState([]);

  useEffect(() => {
    if (!router.isReady) {
      return;
    }
    ReactGa.initialize("UA-234221342-1");
    ReactGa.pageview(router.pathname);

    axios
      .get(
        `https://guess-that-rank-server-production.up.railway.app/clips/get-all/by-user/${username}`
      )
      .then((e) => {
        setAllClips(e.data);
      });

    axios
      .get(
        `https://guess-that-rank-server-production.up.railway.app/guess/all-guesses/${username}`
      )
      .then((e) => {
        console.log(e.data);
        setAllGuesses(e.data);
      });

    setDataFetched(true);
  }, [router.isReady]);

  if (!dataFetched) return <div></div>;

  return (
    <div className={styles.root}>
      <div
        className={styles["go-back"]}
        onClick={() => {
          router.back();
        }}
      >
        <AiOutlineLeft color="#C25Eff" />
        <h3 className={styles["back-text"]}>Go Back</h3>
      </div>

      <img
        src={`${user?.picture}`}
        className={styles.icon}
      />
      <h1 className={styles.username}>{username}</h1>
    </div>
  );
};

export default Profile;
