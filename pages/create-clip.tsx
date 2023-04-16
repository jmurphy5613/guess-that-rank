//@ts-nocheck

import styles from "../styles/CreateClip.module.css";
import Select from "react-select";
import { AiOutlineLeft } from "react-icons/ai";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useUser } from "@auth0/nextjs-auth0";
import { medalConvert } from "../utils/formatting";
import ValorantNavbar from "../components/navbar/valorant/valorant-nav";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { gameOptions, rlRankOptions, valRankOptions, platformOptions } from "../utils/constants";
import LinkHelperPopup from "../components/link-helper-popup/LinkHelperPopup";

import ReactGa from "react-ga";


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
  const [rankOptions, setRankOptions] = useState([]);

  const [linkHelp, setLinkHelp] = useState(false)

  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    ReactGa.initialize("UA-234221342-1");
    ReactGa.pageview(router.pathname);
  }, [router.isReady]);

  return (
    <>
      {linkHelp && <LinkHelperPopup />}
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
            if (e?.value === "valorant") {
              setRankOptions(valRankOptions);
            } else if (e?.value === "rocket-league") {
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
          style={{ marginBottom: "0" }}
          onChange={(e) => {
            setVideoURL(e.target.value);
          }}
        />
        <h3 className={styles["link-helper"]} onClick={() => {
          setLinkHelp(true)
        }}>What is this?</h3>
        <input
          className={styles["url-input"]}
          placeholder={"Clip Title"}
          onChange={(e) => {
            setClipTitle(e.target.value);
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
    </>
  );
};

export default CreateClip;
