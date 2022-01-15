module.exports = {
    // * Get the users ranking by getting the index and adding one
    get_rank: (index) => {
        return index + 1;
    },

    // * Convert the decimal score into a percentage value
    convert_percent: (decimal) => {
        return decimal * 100 + "%";
    },

    // * Format the date to MM/DD/YYYY
    format_date: (date) => {
        return date.toLocaleDateString("en-US");
    },

    // ! Not needed anymore
    video_link: (video_id) => {
        return "https://www.youtube.com/watch/" + video_id;
    },
    // ! Not needed anymore
    video_image: (video_id) => {
        return "https://img.youtube.com/vi/" + video_id + "/hqdefault.jpg";
    },

    // * Returns the link for the embed video
    video_embed: (video_id) => {
        return "https://www.youtube.com/embed/" + video_id + "?rel=0";
    },
};
