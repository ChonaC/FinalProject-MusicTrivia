import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import ProgressBar from "../components/ProgressBar";
import Question from "../components/Question";
import { searchArtist } from "../utils/API";

import { useMutation } from "@apollo/client";
import { ADD_SCORE } from "../utils/mutations";
import { GET_SCORES } from "../utils/queries";

import { Typography, Statistic, Result, Button, Space } from "antd";
import { TrophyOutlined } from "@ant-design/icons";
const { Title, Paragraph } = Typography;

function useQuery() {
    const { search } = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
}

const Quiz = () => {
    const [gameOver, setGameOver] = useState(false);
    const length = useQuery().get("length");
    const artistName = useQuery().get("artist");

    const [completed, setCompleted] = useState(0);
    const [correct, setCorrect] = useState(0);
    console.log(completed, length);

    const [songTitle, setSongTitle] = useState("");
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
                    key: i,
                    title: hits[i].result.title,
                    image: hits[i].result.song_art_image_thumbnail_url,
                };
                songs.push(song);
            }
            setAllSongs(songs);
            console.log(songs);

            let random = Math.floor(Math.random() * 10);
            do {
                random = Math.floor(Math.random() * 10);
            } while (songs[random] === undefined);

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
        let random = Math.floor(Math.random() * 10);
        // do {
        //     random = Math.floor(Math.random() * 10);
        // } while (allSongs[random] === undefined);
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

    const [addScore, { error }] = useMutation(ADD_SCORE, {
        refetchQueries: [{ query: GET_SCORES }],
    });

    const handleAddScore = async () => {
        try {
            await addScore({
                variables: {
                    points: Math.round(correct * 100),
                    tags: [length, artistName],
                },
            });
        } catch (e) {
            console.log(e);
        }
    };

    if (completed >= length) {
        console.log("GAME OVER");
        setGameOver(true);
        setCompleted(0);
        handleAddScore();
    }

    return (
        <div className="page">
            <ProgressBar
                completed={completed}
                length={length}
                gameOver={gameOver}
            />

            {gameOver ? (
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
                        <Title level={4} italic={true}>
                            {correct} correct x 100 = {correct * 100} pts
                        </Title>,
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
