import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import ProgressBar from "../components/ProgressBar";
import Question from "../components/Question";
import { getLyrics, getSong } from "genius-lyrics-api";
import { searchArtist } from "../utils/API";

import { Typography, Statistic, Result, Button, Space } from "antd";
import { TrophyOutlined } from "@ant-design/icons";
const { Title, Paragraph } = Typography;

function useQuery() {
    const { search } = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
}

const Quiz = () => {
    const length = useQuery().get("length");
    const artistName = useQuery().get("artist");

    const [completed, setCompleted] = useState(0);
    const [correct, setCorrect] = useState(0);
    console.log(completed, length);

    const [songTitle, setSongTitle] = useState("Song Title");
    const [songImage, setSongImage] = useState("");
    const [allSongs, setAllSongs] = useState([]);

    const songs = [];
    const [choices, setChoices] = useState([]);

    const getSongs = async () => {
        try {
            const { data } = await searchArtist(artistName);
            const hits = data.response.hits;
            for (let i = 0; i < hits.length; i++) {
                let song = {
                    title: hits[i].result.title,
                    image: hits[i].result.song_art_image_thumbnail_url,
                };
                songs.push(song);
            }
            setAllSongs(songs);
            console.log(songs);

            const random = Math.floor(Math.random() * 10);
            const targetSong = songs[random].title;
            const targetImage = songs[random].image;

            setSongTitle(targetSong);
            setSongImage(targetImage);
            console.log(targetSong);
            const choices = [targetSong];
            // console.log(choices);
            for (let i = 0; i < 3; i++) {
                let randomSong = targetSong;
                do {
                    const random = Math.floor(Math.random() * 10);
                    randomSong = songs[random].title;
                } while (choices.includes(randomSong));
                const randomInsert = Math.floor(Math.random() * 2);
                choices.splice(randomInsert, 0, randomSong);
            }
            setChoices(choices);
            // console.log(choices);
            // ! open -na Google\ Chrome --args --user-data-dir=/tmp/temporary-chrome-profile-dir --disable-web-security
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        getSongs();
    }, []);

    const newQuestion = () => {
        console.log("songs", allSongs);
        const random = Math.floor(Math.random() * 10);
        const targetSong = allSongs[random].title;
        const targetImage = allSongs[random].image;

        setSongTitle(targetSong);
        setSongImage(targetImage);
        console.log(targetSong);
        const choices = [targetSong];
        for (let i = 0; i < 3; i++) {
            let randomSong = targetSong;
            do {
                const random = Math.floor(Math.random() * 10);
                randomSong = allSongs[random].title;
            } while (choices.includes(randomSong));
            const randomInsert = Math.floor(Math.random() * 2);
            choices.splice(randomInsert, 0, randomSong);
        }
        setChoices(choices);
    };

    if (completed >= length) {
        console.log("GAME OVER");
    }

    return (
        <div className="page">
            <ProgressBar completed={completed} length={length} />
            {completed >= length ? (
                <Result
                    icon={<TrophyOutlined />}
                    title={
                        <Statistic
                            title="Score"
                            value={correct}
                            suffix={"/ " + length}
                        />
                    }
                    extra={[
                        <Link to="/">
                            <Button type="primary">Play again</Button>
                        </Link>,
                        <Link to="/leaderboard">
                            <Button>Leaderboard</Button>
                        </Link>,
                    ]}
                />
            ) : (
                <>
                    <Question
                        newQuestion={newQuestion}
                        songImage={songImage}
                        songTitle={songTitle}
                        choices={choices}
                        correct={correct}
                        setCorrect={setCorrect}
                        completed={completed}
                        setCompleted={setCompleted}
                    />
                </>
            )}
        </div>
    );
};

export default Quiz;
