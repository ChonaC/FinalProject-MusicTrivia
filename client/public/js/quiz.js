// making elements for each id
var questionsEl = document.querySelector("#questions");
var choicesEl = document.querySelector("#choices");
var submitBtn = document.querySelector("#submit");
var startBtn = document.querySelector("#start");
var initialsEl = document.querySelector("#initials");
var feedbackEl = document.querySelector("#feedback");
var quizLengthEl = document.querySelector("#quiz-length");
var quizProgressBarEl = document.querySelector("#quiz-bar");

// key for musixmatch
var MXM_KEY = "d1cd42f8fb7251efca450254d1063094";

// used to store the answers to the quiz questions
var quizAnswers = [];
var generatedResults = [];
var answer = "";

const theme = new Audio("./sounds/theme.mp3");
// default length of 5
var quizLength = 5;

function playTheme() {
    theme.play();
    theme.volume = 0.25;
}

function stopTheme() {
    theme.pause();
    theme.currentTime = 0;
}

function artistResults(json) {
    console.log(json);
    var titleEl = document.getElementById("question-title");
    var returnBtn = document.createElement("button");
    returnBtn.textContent = "Go Back";
    returnBtn.classList.add("btn", "btn-primary", "mb-2");

    var returnEl = document.createElement("a");
    returnEl.href = "index.html";
    returnEl.classList.add("d-flex", "justify-content-center");
    returnEl.append(returnBtn);

    if (
        json.message.header.status_code == "200" &&
        json.message.body.artist.artist_name !== ""
    ) {
        artist = json.message.body.artist.artist_name;
        getTracks(artist);
    } else if (json.message.header.status_code == "403") {
        questionsEl.insertBefore(returnEl, choicesEl);
        titleEl.textContent =
            "403 Error: Unauthorized access to Musixmatch API, please renew your API key.";
    } else if (json.message.header.status_code == "401") {
        questionsEl.insertBefore(returnEl, choicesEl);
        titleEl.textContent =
            "401 Error: Daily use maxed out for Musixmatch API, 2000 Api Calls per day and 500 Lyrics display per day.";
    } else {
        console.log("artistsResults() had an error.  Starting over.");
        getArtist();
    }
}

// json results for track array from searched artist
function trackResults(json) {
    //empty array to store generated track list
    generatedResults = [];
    //check to make sure we get a result, and that there's at least 5 tracks
    if (
        json.message.header.status_code == "200" &&
        json.message.body.track_list.length > 5
    ) {
        for (var i = 0; i < 5; i++) {
            //check to make sure track isn't explicit, and has lyrics and add it to the array of results
            if (
                json.message.body.track_list[i].track.explicit == 0 &&
                json.message.body.track_list[i].track.has_lyrics == 1
            )
                generatedResults.push({
                    trackID: json.message.body.track_list[i].track.track_id,
                    artist: json.message.body.track_list[i].track.artist_name,
                    trackName: json.message.body.track_list[i].track.track_name,
                });
        }
        //if no or too few results meet our criteria pull another random artist
        if (generatedResults.length == 0 || generatedResults.length < 5) {
            getArtist();
        } else {
            //otherwise pick a track at random and get the lyrics, and set it as the answer
            var random = randomize(generatedResults.length);
            var trackID = generatedResults[random];
            answer = trackID.trackName;
            console.log(generatedResults);
            getLyrics(trackID);
        }
    } else {
        //no good results, pull another random artist
        console.log("trackResults() had an error.  Starting over.");
        getArtist();
    }
}

// json results for lyrics to specific track
function lyricResults(json) {
    if (
        json.message.header.status_code == "200" &&
        json.message.body.lyrics_body !== ""
    ) {
        //split lyrics at \n (new line) to make it only display 2 lines

        var lyric = json.message.body.lyrics.lyrics_body.split(/\r?\n/);
        var lyrics = [];
        for (var i = 0; i < 3; i++) {
            lyrics += lyric[i] + "\n";
        }
        //generate the questions and send it with the lyrics
        generateQuestions(lyrics);
    } else {
        //no good lyrics, call a new random artist
        console.log("lyricResults() had an error.  Starting over.");
        getArtist();
    }
}

//call to the API to find an artist at random, returns as a callback function
function getArtist() {
    var randomID = randomize(9999);
    var artistURL =
        "https://api.musixmatch.com/ws/1.1/artist.get?format=jsonp&callback=callback&artist_id=" +
        randomID +
        "&apikey=" +
        MXM_KEY;
    $.ajax({
        url: artistURL,
        dataType: "jsonp",
        jsonpCallback: "artistResults",
    });
}

//call to the API to get tracks from specified artist, returns as a callback function
function getTracks(artist) {
    var trackURL =
        "https://api.musixmatch.com/ws/1.1/track.search?format=jsonp&callback=callback&q_artist=" +
        artist +
        "&f_lyrics_language=en&f_has_lyrics=1&quorum_factor=1&apikey=" +
        MXM_KEY;
    $.ajax({ url: trackURL, dataType: "jsonp", jsonpCallback: "trackResults" });
}

//call to the API to get lyrics from specified track, returns as a callback function
function getLyrics(trackID) {
    lyricID = trackID.trackID;
    var trackURL =
        "https://api.musixmatch.com/ws/1.1/track.lyrics.get?format=jsonp&callback=callback&track_id=" +
        lyricID +
        "&apikey=" +
        MXM_KEY;
    $.ajax({ url: trackURL, dataType: "jsonp", jsonpCallback: "lyricResults" });
}

function generateQuestions(lyric) {
    //get the element and display the lyric
    var titleEl = document.getElementById("question-title");
    titleEl.textContent = lyric + "\n " + generatedResults[0].artist;
    titleEl.classList.add("text-center");
    choicesEl.innerHTML = "";

    //iterate through the results array and display in the question buttons
    for (var i = 0; i < generatedResults.length; i++) {
        var choice = generatedResults[i].trackName;
        var answerButton = document.createElement("button");
        answerButton.setAttribute("class", "choice");
        answerButton.classList.add("btn", "btn-outline-primary");
        answerButton.setAttribute("value", choice);
        answerButton.textContent = i + 1 + ". " + choice;
        answerButton.addEventListener("click", questionClick);
        choicesEl.appendChild(answerButton);
    }
}

//little helper function to get a random number
function randomize(length) {
    return Math.floor(Math.random() * (length - 1));
}

// quiz variables
var currentQuestionIndex = 0;
var finalScore = 0;

function startQuiz(e) {
    e.preventDefault();
    playTheme();

    quizLength = quizLengthEl.value;
    // hides the start screen
    var startScreenEl = document.getElementById("start-screen");
    startScreenEl.setAttribute("class", "hide");

    // reveals the questions
    questionsEl.classList.remove("hide");

    getArtist();
}

function questionClick() {
    // check if answer is correct
    if (this.value !== answer) {
        feedbackEl.textContent = "Incorrect";
    } else {
        feedbackEl.textContent = "Correct";
        finalScore++;
    }

    quizAnswers.push(answer);

    // feedback on if the answer was right or wrong
    feedbackEl.setAttribute("class", "feedback");
    setTimeout(function () {
        feedbackEl.setAttribute("class", "feedback hide");
    }, 2000);

    currentQuestionIndex++;

    let progress = (currentQuestionIndex / quizLength).toFixed(2) * 100;
    quizProgressBarEl.style.width = progress + "%";
    quizProgressBarEl.setAttribute("aria-valuenow", progress);

    // end after last question else move to next question
    if (currentQuestionIndex >= quizLength) {
        quizEnd();
        stopTheme();
    } else {
        getArtist();
    }
}

// switches display from the questions screen to the results screen
async function quizEnd() {
    questionsEl.classList.add("hide");

    quizProgressBarEl.classList.remove("progress-bar-animated");
    quizProgressBarEl.classList.remove("progress-bar-striped");

    // // show end screen
    var endScreenEl = document.getElementById("end-screen");
    endScreenEl.classList.remove("hide");

    var finalScoreEl = document.getElementById("final-score");
    const points = (finalScore / quizLength).toFixed(2);

    finalScoreEl.textContent = points * 100 + "%";

    console.log(quizAnswers);

    // * Push scores to leaderboard
    fetch("music-trivia-api/scores", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            points: points,
        }),
    });

    var answerslist = $("#answers-list");

    for (var i = 0; i < quizAnswers.length; i++) {
        var quizAnswer = quizAnswers[i];
        var videoId = await searchtest(quizAnswer);

        fetch("music-trivia-api/songs", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                song_name: quizAnswer,
                video_id: videoId,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Success:", data);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }
}

$("#answers-list").on("click", searchtest);
function searchtest(quizAnswer) {
    console.log(quizAnswer);
    const YOUTUBE_API_KEY = "AIzaSyAixJPKcw7Fb9_nGDh0Jlm-XiWeh8p_Alo";
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${quizAnswer}&key=${YOUTUBE_API_KEY}`;
    console.log(url);
    return fetch(url)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            if (data.items !== undefined) {
                return data.items[0].id.videoId;
            } else {
                return "";
            }
        });
}

// start quiz
if (startBtn != null) {
    startBtn.addEventListener("click", startQuiz);
}
