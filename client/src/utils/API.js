const axios = require("axios").default;

const apiKey =
    process.env.API_KEY ||
    "FhWeIZZgVmSVvLQFz-lIhHKNngbo2AOkwNp_FjUxPfyzRx-bXRDXwVk8_Tl_WqHr";

export const searchSong = async () => {
    const random = Math.floor(Math.random() * 2000000);

    const res = axios.get(`https://api.genius.com/songs/${random}`, {
        headers: { Authorization: "Bearer " + apiKey },
    });

    return res;
};

export const searchArtist = async (artist) => {
    const res = axios.get(
        `https://api.genius.com/search?q=${artist}&access_token=${apiKey}`
        // const res = axios.get(`https://api.genius.com/search?q=${artist}`, {
        //     headers: { Authorization: "Bearer " + apiKey },
        // }
    );

    return res;
};
