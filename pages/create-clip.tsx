//@ts-nocheck

import styles from "../styles/CreateClip.module.css";
import Select from "react-select";
import { AiOutlineLeft } from "react-icons/ai";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useUser } from "@auth0/nextjs-auth0";
import axios from "axios";
import { medalConvert } from "../utils/formatting";
import ValorantNavbar from "../components/navbar/valorant/valorant-nav";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ReactGa from "react-ga";

const gameOptions = [
  { value: "val", label: "Valorant" },
  { value: "rl", label: "Rocket League" },
];
const platformOptions = [{ value: "medal", label: "Medal" }];

const valRankOptions = [
  { value: "iron1", label: "Iron 1" },
  { value: "iron2", label: "Iron 2" },
  { value: "iron3", label: "Iron 3" },
  { value: "bronze1", label: "Bronze 1" },
  { value: "bronze2", label: "Bronze 2" },
  { value: "bronze3", label: "Bronze 3" },
  { value: "silver1", label: "Silver 1" },
  { value: "silver2", label: "Silver 2" },
  { value: "silver3", label: "Silver 3" },
  { value: "gold1", label: "Gold 1" },
  { value: "gold2", label: "Gold 2" },
  { value: "gold3", label: "Gold 3" },
  { value: "plat1", label: "Platinum 1" },
  { value: "plat2", label: "Platinum 2" },
  { value: "plat3", label: "Platinum 3" },
  { value: "diamond1", label: "Diamond 1" },
  { value: "diamond2", label: "Diamond 2" },
  { value: "diamond3", label: "Diamond 3" },
  { value: "ascendant1", label: "Ascendant 1" },
  { value: "ascendant2", label: "Ascendant 2" },
  { value: "ascendant3", label: "Ascendant 3" },
  { value: "immortal1", label: "Immortal 1" },
  { value: "immortal2", label: "Immortal 2" },
  { value: "immortal3", label: "Immortal 3" },
  { value: "radiant", label: "Radiant" },
];

const rlRankOptions = [
  { value: "bronze1", label: "Bronze 1" },
  { value: "bronze2", label: "Bronze 2" },
  { value: "bronze3", label: "Bronze 3" },
  { value: "silver1", label: "Silver 1" },
  { value: "silver2", label: "Silver 2" },
  { value: "silver3", label: "Silver 3" },
  { value: "gold1", label: "Gold 1" },
  { value: "gold2", label: "Gold 2" },
  { value: "gold3", label: "Gold 3" },
  { value: "plat1", label: "Platinum 1" },
  { value: "plat2", label: "Platinum 2" },
  { value: "plat3", label: "Platinum 3" },
  { value: "diamond1", label: "Diamond 1" },
  { value: "diamond2", label: "Diamond 2" },
  { value: "diamond3", label: "Diamond 3" },
  { value: "champ1", label: "Champion 1" },
  { value: "champ2", label: "Champion 2" },
  { value: "champ3", label: "Champion 3" },
  { value: "grandchamp1", label: "Grand Champion 1" },
  { value: "grandchamp2", label: "Grand Champion 2" },
  { value: "grandchamp3", label: "Grand Champion 3" },
  { value: "supersoniclegend", label: "Supersonic Legend" },
];

const CreateClip = () => {
  const [gameSelectedOption, setGameSelctionOption] = useState({
    value: "val",
    label: "Valorant",
  });
  const [platformSelectedOption, setPlatformSelectedOption] = useState({
    value: "medal",
    label: "Medal",
  });
  const [rankOption, setRankOption] = useState({
    value: "iron1",
    label: "Iron 1",
  });
  const [videoURL, setVideoURL] = useState("");
  const [clipTitle, setClipTitle] = useState("");
  const [customDisplayName, setCustomDisplayName] = useState("");
  const [rankOptions, setRankOptions] = useState([]);

  const { user } = useUser();
  const router = useRouter();

  const getUsername = () => {
    if (customDisplayName !== "") {
      return customDisplayName;
    } else {
      return user?.nickname;
    }
  };

  const uploadClip = () => {
    if (videoURL === "" || clipTitle === "") {
      toast.error("Please fill out all fields", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }
    axios
      .post(
        "https://guess-that-rank-server-production.up.railway.app/clips/add-clip",
        {
          videoSource: platformSelectedOption.value,
          videoURL: medalConvert(videoURL),
          user: getUsername(),
          rank: rankOption.value,
          game: gameSelectedOption.value,
          videoName: clipTitle,
        }
      )
      .then((res) => {
        if (gameSelectedOption.value === "val") {
          router.push(`/valorant/${res.data.id}`);
        } else if (gameSelectedOption.value === "rl") {
          router.push(`/rocket-league/${res.data.id}`);
        }
      });

    //if there is a custom display name, register it
    if (customDisplayName !== "" && user?.nickname !== "jmurphy5613") {
      axios
        .post(
          "https://guess-that-rank-server-production.up.railway.app/users/add-display-name",
          {
            username: user?.nickname,
            nickname: customDisplayName,
          }
        )
        .then((res) => {
          console.log(res);
        });
    }
  };

  useEffect(() => {
    ReactGa.initialize("UA-234221342-1");
    ReactGa.pageview(router.pathname);
  }, [router.isReady]);

  return (
    <div className={styles.root}>
      <ValorantNavbar />
      <div
        className={styles["go-back"]}
        onClick={() => {
          router.push("/valorant");
        }}
      >
        <AiOutlineLeft color="#C25Eff" />
        <h3 className={styles["back-text"]}>Go Back</h3>
      </div>

      <h1 className={styles.title}>Upload your own clip!</h1>
      <Select
        placeholder="Select the game"
        className={styles.select}
        options={gameOptions}
        onChange={(e) => {
          setGameSelctionOption(e);
          console.log(gameSelectedOption);
          if (e?.value === "val") {
            setRankOptions(valRankOptions);
          } else if (e?.value === "rl") {
            setRankOptions(rlRankOptions);
          }
        }}
      />
      <Select
        placeholder="Select a platform"
        className={styles.select}
        options={platformOptions}
        onChange={setPlatformSelectedOption}
      />
      <Select
        placeholder="Select a rank"
        className={styles.select}
        options={rankOptions}
        onChange={setRankOption}
      />
      <input
        className={styles["url-input"]}
        placeholder={"Clip URL"}
        onChange={(e) => {
          setVideoURL(e.target.value);
        }}
      />
      <input
        className={styles["url-input"]}
        placeholder={"Clip Title"}
        onChange={(e) => {
          setClipTitle(e.target.value);
        }}
      />
      <input
        className={styles["url-input"]}
        placeholder={"Custom Display Name (optional)"}
        onChange={(e) => {
          setCustomDisplayName(e.target.value);
        }}
      />
      <button
        className={styles.submit}
        onClick={(e) => {
          uploadClip();
        }}
      >
        Submit
      </button>

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
  );
};

export default CreateClip;
