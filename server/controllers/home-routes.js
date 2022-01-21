const router = require("express").Router();
const { User, Score, Song } = require("../models");
const withAuth = require("../utils/auth");

// Use withAuth middleware to prevent access to route
router.get("/", withAuth, async (req, res) => {
    try {
        // Find the logged in user based on the session ID
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ["password"] },
            // include: [{ model: nameof the model }],
        });

        const user = userData.get({ plain: true });

        res.render("quiz", {
            ...user,
            logged_in: true,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get("/login", (req, res) => {
    // If the user is already logged in, redirect the request to another route
    if (req.session.logged_in) {
        res.redirect("/");
        return;
    }

    res.render("login");
});

router.get("/signup", (req, res) => {
    if (req.session.logged_in) {
        res.redirect("/");
        return;
    }

    res.render("signup");
});

// * Leaderboard page
router.get("/scores", async (req, res) => {
    try {
        const scoreData = await Score.findAll({
            // The names of the users from the User model
            include: [{ model: User }],
            // Highest points at the top of the board
            order: [["points", "DESC"]],
        });
        const scores = scoreData.map((score) => score.get({ plain: true }));

        res.render("scores", {
            scores,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// * Songs page
router.get("/songs", withAuth, async (req, res) => {
    try {
        const songData = await Song.findAll({
            where: {
                user_id: req.session.user_id,
            },
        });
        const songs = songData.map((song) => song.get({ plain: true }));

        res.render("songs", {
            songs,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
