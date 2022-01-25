const axios = require("axios").default;

const apiKey =
    "UOy53dlbskIQx_L56GilNS4V0jle_RAeA75vlr5LOamwzmzt8En4fZ_yh-u72hcJ";

export const searchSong = async () => {
    const random = Math.floor(Math.random() * 2000000);

    const res = axios.get(`https://api.genius.com/songs/${random}`, {
        headers: { Authorization: "Bearer " + apiKey },
    });

    return res;
};

export const searchArtist = async (artist) => {
    const res = axios.get(`https://api.genius.com/search?q=${artist}`, {
        headers: { Authorization: "Bearer " + apiKey },
    });

    return res;
};
